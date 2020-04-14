# Codenames

Version en ligne du jeu Codenames en cours de développement.
Fonctionnel pour un client unique.
Recharger la page pour obtenir un nouveau plateau

## Installation de l'environement de développement (Linux)

### API

> cd Codenames/api
> python3.7 -m venv venv
> source venv/bin/activate
> pip install --upgrade pip
> pip install --upgrade setuptools
> pip install -r requirements.txt
> export FLASK_APP=codenames.py
> export FLASK_ENV=development

### UI

> cd ../ui
> yarn

### Lancement des serveurs

> flask run
> yarn start
