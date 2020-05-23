# Codenames :

- Version en ligne du jeu Codenames en cours de développement.

### Installation de l'environement de développement (Linux)

#### API

```bash
cd Codenames/api
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
python codenames.py
```

#### UI

```bash
cd Codenames/ui
yarn
yarn start-local-api
```

### Instalation locale via docker

#### API
docker run --publish 8000:8000 --rm jfeudeline/codenames-api:latest

#### UI
docker run --publish 8080:80 --rm --env REACT_APP_BASE_API_URL=http://localhost:8000 jfeudeline/codenames-ui:latest

