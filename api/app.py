from flask import Flask, jsonify, request
from predictionModel import PredictionModel
import pandas as pd
from random import randrange


app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def predict():
    model = PredictionModel(request.form['text'])
    return jsonify(model.predict())


@app.route('/random', methods=['GET'])
def random():
    data = pd.read_csv("data/fake_or_real_news_test.csv")
    index = randrange(0, len(data)-1, 1)
    return jsonify({'title': data.loc[index].title, 'text': data.loc[index].text})


if __name__ == '__main__':
    app.run()
