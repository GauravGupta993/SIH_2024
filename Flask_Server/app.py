from flask import Flask, request, jsonify, render_template
import gensim.downloader as api
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import nltk
from pypdf import PdfReader
import os

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize Flask app
app = Flask(__name__)

# Download NLTK data (if not already downloaded)
nltk.download('punkt')
nltk.download('stopwords')

# Load pre-trained Word2Vec model (e.g., Google News vectors)
model = api.load("word2vec-google-news-300")  # This loads the 300-dimensional Google News Word2Vec model

# Function to preprocess text
def preprocess(text):
    # Tokenize text and remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = word_tokenize(text.lower())  # Convert to lowercase and tokenize
    tokens = [word for word in tokens if word.isalpha() and word not in stop_words]  # Remove non-alphabetic tokens and stopwords
    return tokens

# Function to get the average Word2Vec embedding for a text
def get_average_word2vec(tokens, model):
    # Only include tokens that are in the Word2Vec model's vocabulary
    valid_tokens = [word for word in tokens if word in model.key_to_index]
    
    if not valid_tokens:  # If no valid tokens, return a zero vector
        return np.zeros(model.vector_size)
    
    # Get the Word2Vec embeddings for the valid tokens and calculate the mean
    word_vectors = np.array([model[word] for word in valid_tokens])
    return np.mean(word_vectors, axis=0)

# Function to calculate cosine similarity between two texts
def calculate_similarity(text1, text2, model):
    # Preprocess both texts
    tokens1 = preprocess(text1)
    tokens2 = preprocess(text2)
    
    # Get average Word2Vec embeddings
    vector1 = get_average_word2vec(tokens1, model)
    vector2 = get_average_word2vec(tokens2, model)
    
    # Reshape vectors for cosine similarity calculation
    vector1 = vector1.reshape(1, -1)
    vector2 = vector2.reshape(1, -1)
    
    # Calculate and return cosine similarity
    return cosine_similarity(vector1, vector2)[0][0]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'resume' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['resume']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.endswith('.pdf'):
        # Save the file to a temporary location
        file_path = os.path.join('/tmp', file.filename)
        file.save(file_path)

        # Extract text from the PDF
        reader = PdfReader(file_path)
        page = reader.pages[0]
        text1 = page.extract_text()

        # Example job description text
        text2 = request.form.get('job_description', '')

        # Calculate similarity
        similarity_score = calculate_similarity(text1, text2, model)

        # Remove the temporary file
        os.remove(file_path)

        return jsonify({"similarity_score": similarity_score}), 200

    return jsonify({"error": "Invalid file format"}), 400

if __name__ == '__main__':
    app.run(debug=True)