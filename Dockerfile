FROM python:3.7-stretch

RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential

COPY . /app
WORKDIR /app

RUN python -m pip install --upgrade pip

RUN pip install -r requirements.txt

CMD gunicorn -t 120 -b :$PORT app:app
