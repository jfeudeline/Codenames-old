FROM python:3.8.2-buster

COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt

RUN useradd --create-home appuser
WORKDIR /home/appuser
USER appuser

COPY . .


EXPOSE 8000
CMD [ "gunicorn", "--bind=0.0.0.0", "--workers=1", "--worker-class=eventlet", "codenames:app" ]
