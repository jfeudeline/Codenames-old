from flask import Flask, jsonify
from flask_cors import CORS

from deck import init_deck
from games import games, generate_game_id


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/')
def index():
    return "Bienvenue sur Codenames."


@app.route('/api')
def api():
    ids = [id for id in games]
    return jsonify(ids)


@app.route('/api/<game>')
def game(game):
    if game in games:
        return jsonify(games[game])
    return jsonify([])


@app.route('/api/new-game')
def new_game():
    deck = init_deck()
    game_id = generate_game_id()
    games[game_id] = deck
    return game_id
