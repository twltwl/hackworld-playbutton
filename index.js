import 'babel-polyfill';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {PlayButton, utils} from './src/index';

const data = {
  heading: 'Utländska premiepensionsfonder dyrast enligt SVT',
  text: `<p>Av premiepensionssystemets cirka 850 fonder är knappt 500 registrerade utomlands, och framförallt i Luxemburg. Svenskregistrerade fonder har en genomsnittlig avgift på 0,36 procent efter rabatten. Fonder registrerade i Luxemburg har en snittavgift på 0,63 procent, alltså 80 procent högre.<p>
       <p>Samtidigt är avkastningen något högre för svenskregistrerade fonder, i genomsnitt 10,4 procent per år de senaste fem åren, jämfört med fonderna i Luxemburg som avkastat 9,9 procent årligen.</p>
       `
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
        return <PlayButton text={utils.stripHTML(data.text)} config={{}} ><Article heading={data.heading} text={data.text} /></PlayButton>;
    }
}

render(<Example />,
  document.getElementById('root')
)
