import React from 'react';
//import logo from './logo.svg';
import './App.css';

class SentMessages extends React.Component {
  constructor(props) {
      super(props);
      this.state = { messages: [] };
  }

  componentDidMount() {
    fetch('/messages')
      .then(res => res.json())
      .then(messages => this.setState({ messages }));
  }

  render() {
    if (!this.state.messages) {
      return <p>No Messages to be Found</p>
    } else {
      return (
        <dl>
          {this.state.messages.map((message) =>
            <React.Fragment>
              <dt key={message.id}>{message.body}</dt>
              <dd key={message.id}>{message.date}</dd>
              <dd key={message.id}>{message.rec}</dd>
            </React.Fragment>
          )}
        </dl>
      )
    }
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <h1>Messages</h1>
      <SentMessages />
    </div>
  );
}

export default App;
