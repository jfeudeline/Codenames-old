from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
import eventlet


from deck import init_deck
cards = init_deck()


app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'secret!'
socket = SocketIO(app, cors_allowed_origins='*')


@app.route('/')
def index():
    return 'Bienvenue sur Codenames'


@socket.on('connect')
def handle_connect():
    print('new client connected !')
    socket.emit('connect', 'Bienvenue sur Codenames !')
    socket.emit('update', cards)


@socket.on('change cards')
def handle_change_cards():
    print('Nouvelle donne')
    global cards
    cards = init_deck()
    socket.emit('update', cards)


@socket.on('choose word')
def handle_choose_word(id):
    global cards
    print(f"{cards[id]['word']} clicked !")
    cards[id]['isPlayed'] = True
    socket.emit('update', cards)


@socket.on('update')
def handle_change_cards():
    socket.emit('update', cards)


if __name__ == '__main__':
    socket.run(app, debug=True)
