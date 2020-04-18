# Codenames :

https://jfeudeline-codenames.herokuapp.com/

- Version en ligne du jeu Codenames en cours de développement.
- Le serveur ne gère qu'une unique partie multijoueur simultanée

### Installation de l'environement de développement (Linux)

#### API

```bash
cd Codenames/api
python3.7 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install --upgrade setuptools
pip install -r requirements.txt
python codenames.py
```

#### UI

```bash
cd Codenames/ui
yarn
yarn start
```

Modifier l'URL dans Board.js pour choisir entre le serveur local ou distant.
