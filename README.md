# how to use
## steps
### 1. Clone the repository
#### open terminal
```
git clone https://github.com/truongkien03/vigilant-succotash.git
cd vigilant-succotash/
```

### 2. Create a virtual environment
#### create a virtual environment to isolate your project dependencies:
```
python -m venv venv
```
### 3. Activate the virtual environment
#### On Windown
```
venv\Scripts\activate
```
#### On linux/MacOS
```
source .venv/bin/activate
```
### 4. Install requirements
#### Install the required packages using the requirements.txt file:
```
pip install -r requirement.txt
```
### 5. Run the test
#### First you train the data
```
python train.py
```
#### Then run this file generate api:
```
python app.py
```
### 6. Deactivate the Virtual Environment (Optional)
#### After you’re done, you can deactivate the virtual environment:
```
deactivate
```
