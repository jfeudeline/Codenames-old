FROM python:3.8.2-buster


RUN pip install --upgrade pip
COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt

RUN useradd --create-home appuser
WORKDIR /home/appuser
USER appuser

COPY . .


EXPOSE 8000
CMD [ "gunicorn", "--bind=0.0.0.0", "--workers=2",  "codenames:app" ]