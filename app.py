from flask import Flask, request, jsonify
import torch
import json
from model import NeuralNet
from nltk_utils import bag_of_words, tokenize
import random

app = Flask(__name__)

# Tải mô hình đã lưu
FILE = "data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data["all_words"]
tags = data["tags"]
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size)
model.load_state_dict(model_state)
model.eval()

# Đọc intents.json để lấy responses
with open('intents.json', 'r', encoding='utf-8') as f:
    intents = json.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    sentence = request.json['sentence']
    sentence = tokenize(sentence)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).float()
    
    output = model(X)
    _, predicted = torch.max(output, dim=1)
    tag = tags[predicted.item()]
    
    # Tìm responses tương ứng với tag dự đoán
    for intent in intents['intents']:
        if intent['tag'] == tag:
            responses = intent['responses']
            break
    
    response = random.choice(responses)
    return jsonify({"message": response})

if __name__ == '__main__':
    app.run(debug=True)