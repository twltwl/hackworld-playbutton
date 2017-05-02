import 'babel-polyfill';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {PlayButton} from './src/index';

class Example extends Component {

    render() {


        return <PlayButton />;
    }
}

render(<Example />,
  document.getElementById('root')
)
