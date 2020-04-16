from flask import Flask, jsonify, request
from flask_cors import CORS

from deck import init_deck
cards = init_deck()


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/')
def index():
    return "Bienvenue sur Codenames."


@app.route('/api', methods=['GET', 'POST'])
def get_deck():
    if request.method == 'POST':
        global cards
        cards = request.get_json()
    return jsonify(cards)


@app.route('/api/new-deal')
def new_deal():
    global cards
    cards = init_deck()
    return jsonify(cards)
