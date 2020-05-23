from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, leave_room, send, emit
import eventlet

from games import Games

games = Games()
games.set_new_game("a")
games.set_new_game("b")


app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'secret!'
socket = SocketIO(app, cors_allowed_origins='*')


@app.route('/')
def index():
    return "Bienvenue sur Codenames"


@app.route('/api')
def api():
    return games.games


@app.route('/api/new_game', methods=['POST'])
def new_game():
    games.set_new_game(request.get_json())


@app.route('/api/delete_game', methods=['POST'])
def delete_game():
    games.delete_game(request.get_json())


@socket.on('connect')
def handle_connect():
    print(f'{request.sid} connected!')


@socket.on('disconnect')
def handle_disconnect():
    print(f'{request.sid} disconnected')


@socket.on('join')
def on_join(game_name):
    print(f'{request.sid} joined the room {game_name}')
    join_room(game_name)
    if game_name not in games.get_game_names():
        games.set_new_game(game_name)
    update_cards(game_name)


@socket.on('leave')
def on_leave(game_name):
    print(f'{request.sid} leaved the room {game_name}')
    leave_room(game_name)
    send(f'Room {game_name} leaved!', room=game_name)


@socket.on('change cards')
def handle_change_cards(game_name):
    print('New cards')
    games.set_new_deck(game_name)
    update_cards(game_name)


@socket.on('choose word')
def handle_choose_word(game_name, id):
    print(f"{request.sid} clicked {games.get_cards(game_name)[id]['word']} !")
    games.choose_word(game_name, id)
    update_cards(game_name)


def update_cards(game_name):
    socket.emit('update', games.get_cards(game_name), room=game_name)


if __name__ == '__main__':
    socket.run(app, debug=True)
