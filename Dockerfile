FROM ubuntu:16.04



RUN apt-get update -y && \
  apt-get install -y python-pip python-dev

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN python -m pip install --upgrade pip

RUN pip install -r requirements.txt

COPY . /app

CMD gunicorn -t 120 -b :$PORT app:app --worker-class eventlet --workers 3