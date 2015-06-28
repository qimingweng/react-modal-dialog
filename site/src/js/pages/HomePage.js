// HomePage
import React, {PropTypes} from 'react';
import marked from 'marked';
import customMarkedRenderer from '../customMarkedRenderer';

import HomePageExampleModalButton from '../components/HomePageExampleModalButton.react';

require('../../css/HomePage.scss');

export default class HomePage extends React.Component {
  render() {
    return (
      <div id="home-page">
        <header>
          <Container>
            <h1>React Modal Dialog</h1>
            <h2>A simple, idiomatic way to create and launch modal dialogs in ReactJS</h2>

            <HomePageExampleModalButton/>
          </Container>
        </header>

        <section className="body-section">
          <Container>
            <ExampleCode/>
          </Container>
        </section>
      </div>
    )
  }
}

const code = `
\`\`\`javascript
class Button extends React.Component {
  state = {
    isShowingModal: false
  }
  openModal = () => {
    this.setState({isShowingModal: true});
  }
  render() {
    return (
      <a onClick={this.openModal}>
        Button Text
        {this.state.isShowingModal ? 
          <Modal/>
        : null}
      </a>
    )
  }
}
\`\`\`
`;

class ExampleCode extends React.Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{
        __html: marked.parse(code, {renderer: customMarkedRenderer})
      }}/>
    )
  }
}

class Container extends React.Component {
  render() {
    return (
      <div style={{width: 600, margin: '0 auto'}}>
        {this.props.children}
      </div>
    )
  }
}