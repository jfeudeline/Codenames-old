from secrets import token_urlsafe

games = {}


def generate_game_id():
    return token_urlsafe(8)
