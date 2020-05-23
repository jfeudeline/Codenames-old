from deck import init_deck


class Games():

    def __init__(self):
        self.games = {}

    def get_game_names(self):
        return self.games.keys()

    def set_new_game(self, name):
        self.games[name] = init_deck()
        return self.games[name]

    def delete_game(self, name):
        del self.games[name]
        return None

    def set_new_deck(self, name):
        self.games[name] = init_deck()
        return self.games[name]

    def get_cards(self, name):
        return self.games[name]

    def choose_word(self, name, id):
        self.games[name][id]['isPlayed'] = True
        return self.games[name]
