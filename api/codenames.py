from flask import Flask, jsonify
from flask_cors import CORS, logging


from deck import init_deck
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/')
def index():
    return "Bienvenue sur Codenames."


@app.route('/api')
def api():
    return jsonify(init_deck())
