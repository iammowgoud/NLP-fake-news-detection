from flask import Flask, jsonify, request, render_template
from predictionModel import PredictionModel
import pandas as pd
from random import randrange
import pickle
# from joblib import load

app = Flask(__name__, static_folder="./public/static",
            template_folder="./public")

with open("pickle/pipeline.pkl", 'rb') as f:
    pipeline = pickle.load(f)


# pipeline = load('jupyter_project/pipeline.joblib')

@app.route("/")
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    global pipeline
    model = PredictionModel(pipeline, request.json)
    return jsonify(model.predict())


@app.route('/random', methods=['GET'])
def random():
    data = pd.read_csv("data/fake_or_real_news_test.csv")
    index = randrange(0, len(data)-1, 1)
    return jsonify({'title': data.loc[index].title, 'text': data.loc[index].text})


if __name__ == '__main__':
    app.run()
