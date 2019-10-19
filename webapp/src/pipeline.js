import React from 'react';
import ReactDOM from 'react-dom';

export class Pipeline extends React.Component {
  state = { hidden: true }
  toggle = () => {
    this.setState(prevState => ({ hidden: !prevState.hidden }))
  };

  // highlight = (posTagged) => {
  //   return posTagged.split(/\s/)
  //     .map(word => {
  //       let posTag = word.match(/([A-Z]+-)(.*)/);
  //       if (posTag) {
  //         return (<span>posTag[1]</span>) + posTag[2];
  //       } else {
  //         return word;
  //       }
  //     })
  // }
render() {
  if (this.props.prediction)
    return (
      <div className="pipeline">
        <p className="show" onClick={this.toggle}>
          {this.state.hidden ? 'Show' : 'Hide'} text processing pipeline <span role="img" aria-label="Show pipeline">⬇️</span></p>

        <div className="output" hidden={this.state.hidden}>
          <div>
            <h2>Original text</h2>
            {this.props.original}
          </div>
          <div>
            <h2>Preprocessed text</h2>
            {this.props.preprocessed}
          </div>
          <div>
            <h2>Pos-tagged text</h2>
            {this.props.pos_tagged}
          </div>
        </div>
      </div>
    )

  return null
}
}