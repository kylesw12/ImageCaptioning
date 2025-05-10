from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend (JS) to access the backend

@app.route('/caption', methods=['POST'])
def caption_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    image = request.files['image']
    
    # --- Here you would run your AI model on the image ---
    # For now, return a mock caption
    caption = "testing testing"

    return jsonify({'caption': caption})

if __name__ == '__main__':
    app.run(debug=True)
