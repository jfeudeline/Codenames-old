from flask import Flask, jsonify, request, abort
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


@app.route('/api/<game_id>', methods=['GET', 'POST'])
def get_deck(game_id):
    if game_id not in games:
        abort(404, description="Resource not found") # Gestion de l'erreur 404
        return jsonify([])
    if request.method == 'POST':
        games[game_id] = request.get_json()
    return jsonify(games[game_id])


@app.route('/login')
def login():
    if request.method == 'POST':
        return do_the_login()
    else:
        return show_the_login_form()


@app.route('/api/<game_id>/new-deal')
def new_deal(game_id):
    if game_id not in games:
        return jsonify([])
    deck = init_deck()
    games[game_id] = deck
    return jsonify(deck)


@app.route('/api/new-game')
def new_game():
    deck = init_deck()
    game_id = generate_game_id()
    games[game_id] = deck
    print(f'Nouveau jeu : {game_id}')
    return game_id
