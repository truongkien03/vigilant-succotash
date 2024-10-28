document.getElementById('user_input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    var userInput = document.getElementById('user_input');
    var message = userInput.value.trim();
    if (message !== "") {
        appendMessage("You", message, "user-message");

        fetch('/get_response', {
            method: 'POST',
            body: new URLSearchParams({
                'user_message': message
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => response.json())
        .then(data => {
            appendMessage("Bot", data.bot_response, "bot-message");
        });

        userInput.value = '';
    }
}

function appendMessage(sender, message, className) {
    var chat = document.getElementById('chat');
    var messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + className;
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chat.appendChild(messageDiv);
    chat.scrollTop = chat.scrollHeight;
}

function toggleTheme() {
    var body = document.body;
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');

    // Change button icon based on the theme
    var button = document.getElementById('toggle-theme');
    if(body.classList.contains('light-mode')) {
        button.textContent = '🌞';
    } else {
        button.textContent = '🌙';
    }
}

function startVoiceRecognition() {
    if ('webkitSpeechRecognition' in window) {
        var recognition = new webkitSpeechRecognition();

        recognition.onresult = function(event) {
            var result = event.results[0][0].transcript;
            document.getElementById('user_input').value = result;
        };

        recognition.start();
    } else {
        alert("Speech recognition is not supported by this browser.");
    }
}