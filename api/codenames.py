from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from flask_socketio import SocketIO
import eventlet


from deck import init_deck
cards = init_deck()


app = Flask(__name__, template_folder='./templates')
CORS(app)

app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins='*')


@app.route('/', methods=['GET', 'POST'])
def sessions():
    return render_template('session.html')


def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')


@socketio.on('message')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    global cards
    print('card clicked !')

    cards = json
    socketio.emit('message', cards, callback=messageReceived)


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


if __name__ == '__main__':
    socketio.run(app, debug=True)
