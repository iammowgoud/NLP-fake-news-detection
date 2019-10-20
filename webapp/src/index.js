import React from 'react';
import ReactDOM from 'react-dom';
import { Pipeline } from './pipeline'
import './index.scss';
class NLPInterface extends React.Component {

  MIN_WORDS = 25;
  MAX_WORDS = 3500;

  state = {
    text: '',
    wordsHint: `You have to write at least ${this.MIN_WORDS} words`,
    loading: false,
    error: false,
    prediction: null,
    original: null,
    pos_tagged: null,
    preprocessed: null
  }


  random = () => fetch("/random")
    .then(response => response.json())
    .then(article => article.title + '\n\n' + article.text)
    .then(text => this.setState({
      text, wordsHint: this.getWordsHint(text), prediction: null,
      original: null,
      pos_tagged: null,
      preprocessed: null }))
    .catch(error => this.setState({ error: true }));

  updateInput = ({ target: { value } }) => this.setState({ text: value, prediction: null, wordsHint: this.getWordsHint(value) });

  getWordsHint = (text) => {
    let count = text.split(/\s/).length;
    if (count < this.MIN_WORDS) return `You have to write ${this.MIN_WORDS - count} more words`
    if (count >= this.MIN_WORDS) return `You can write up to ${this.MAX_WORDS - count} more words`
  }
  predict = () => {
    if (this.MAX_WORDS - this.state.text.split(/\s/).length < 0) return;

    this.setState({ loading: true, prediction: null });

    fetch("/predict", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.text)
    })
      .then(response => response.json())
      .then(({ original, pos_tagged, preprocessed, prediction }) => {
        this.setState({ loading: false, prediction, original, pos_tagged, preprocessed })
      })
      .catch(error => this.setState({ loading: false, error: true }))

  }

  render() {
    return (
      <div className="container">
        <h1>NLP Fake News Detector Classifier</h1>
        <textarea autoFocus disabled={this.state.loading} value={this.state.text} onChange={this.updateInput}>
        </textarea>

        <span className="hint"> {this.state.wordsHint}</span>

        <button disabled={this.state.loading} className="random" onClick={this.random}> Load random News from test dataset ? Click here.</button>
        <button disabled={
          this.state.loading ||
          this.MIN_WORDS - this.state.text.split(/\s/).length > 0 ||
          this.MAX_WORDS - this.state.text.split(/\s/).length < 0} className="cta" onClick={this.predict}> Predict </button>

        {this.state.loading ? <h1>Classifying ...</h1> : ''}

        {this.state.error ? <h1>ERROR</h1> : ''}

        <h1 className={this.state.prediction}>
          {this.state.prediction}
        </h1>

        <Pipeline
          prediction={this.state.prediction}
          original={this.state.original}
          pos_tagged={this.state.pos_tagged}
          preprocessed={this.state.preprocessed}
        />
      </div>
    )
  }
}



ReactDOM.render(
  <NLPInterface />,
  document.getElementById('root'));
