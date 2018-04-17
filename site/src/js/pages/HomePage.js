// HomePage
import React, {PropTypes} from 'react';
import marked from 'marked';
import customMarkedRenderer from '../customMarkedRenderer';

import HomePageExampleModalButton from '../components/HomePageExampleModalButton.react';

require('../../css/HomePage.scss');

export default class HomePage extends React.Component {
  render() {
    return <div id="home-page">
      <header>
        <Container>
          <h1>React Modal Dialog</h1>
          <h2>A simple, idiomatic, and declarative way to launch modal dialogs in ReactJS</h2>

          <HomePageExampleModalButton className="header-link"/>
          <a className="header-link" href="https://github.com/qimingweng/react-modal-dialog">Github</a>
        </Container>
      </header>

      <section className="body-section">
        <Container>
          <HomeContent/>
        </Container>
      </section>
    </div>;
  }
}

const markdown = require('raw!../../../../README.md');

class HomeContent extends React.Component {
  render() {
    return <div dangerouslySetInnerHTML={{
      __html: marked.parse(markdown, {renderer: customMarkedRenderer}),
    }}/>;
  }
}

class Container extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }
  render() {
    return <div style={{width: 600, margin: '0 auto'}}>
      {this.props.children}
    </div>;
  }
}
