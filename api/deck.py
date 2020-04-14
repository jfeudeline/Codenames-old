from random import randrange, sample, shuffle


def init_deck(n_cards=25, n_clues=8):
    first_color = 'red' if randrange(2) else 'blue'

    with open("words.txt") as f:
        words = sample(f.read().split("\n"), n_cards)

    colors = [first_color] + \
        ['red']*n_clues + \
        ['blue']*n_clues + \
        ['black'] + \
        ['nocolor']*(n_cards-2*n_clues-2)
    shuffle(colors)

    cards = []

    for id, (word, color) in enumerate(zip(words, colors)):
        card = {
            'id': id,
            'word': word,
            'color': color,
            'isPlayed': False
        }
        cards.append(card)

    return cards


if __name__ == '__main__':
    print(init_deck())
