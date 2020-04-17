from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from flask_socketio import SocketIO


from deck import init_deck
cards = init_deck()


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/')
def sessions():
    return render_template('session.html')


def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')


@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('my response', json, callback=messageReceived)


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
    socketio.run(app)
