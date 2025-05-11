from flask import Flask, request, jsonify
from flask_cors import CORS
import requests  # Assuming you're using an external AI model or service

app = Flask(__name__)
CORS(app)  # Allow frontend (JS) to access the backend

@app.route('/caption', methods=['POST'])
def caption_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    image = request.files['image']
    
    # Save the image temporarily
    image.save("/tmp/temp_image.jpg")

    # Call your AI model to process the image, here is an example with a mock AI API:
    ai_url = "https://9grrr5sfjc.execute-api.us-west-2.amazonaws.com"
    files = {'file': open('/tmp/temp_image.jpg', 'rb')}
    response = requests.post(ai_url, files=files)

    if response.status_code == 200:
        caption = response.json().get("caption", "No caption found")
    else:
        caption = "Error processing image"

    return jsonify({'caption': caption})

if __name__ == '__main__':
    app.run(debug=True)
