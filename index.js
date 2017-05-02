import 'babel-polyfill';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {PlayButton, utils} from './src/index';

const data1 = {
  heading: 'Artikel 1',
  text: 'brödtext 123'
}

const data2 = {
  heading: 'Artikel 2',
  text: 'en massa text'
}

class Article extends Component {
  render() {
    return (
    <div>
      <h1>{this.props.heading}</h1>
      <p dangerouslySetInnerHTML={{__html: this.props.text}} />
    </div>
    )
  }
}

class Example extends Component {

    render() {
        return (
          <div>
            <PlayButton heading={data1.heading} text={utils.stripHTML(data1.text)} config={{}} >
              <Article heading={data1.heading} text={data1.text} />
            </PlayButton>
            <PlayButton heading={data2.heading} text={utils.stripHTML(data2.text)} config={{}} >
              <Article heading={data2.heading} text={data2.text} />
            </PlayButton>
          </div>
        )
    }
}

render(<Example />,
  document.getElementById('root')
)
