import React from 'react';
//import logo from './logo.svg';
import './App.css';

class SentMessages extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        messages: [],
        loaded: false
      }
  }

  componentDidMount() {
    fetch('/messages')
      .then(res => res.json())
      .then(loadedMessages => this.setState({ messages: loadedMessages, loaded: true }))
      .catch((err) => this.setState({ loaded: true }));
  }

  render() {
    if (this.state.messages.length === 0 && this.state.loaded === false) {
      return <p>Loading messages...</p>
    } else if (this.state.messages.length === 0 && this.state.loaded === true) {
      return <p>No messages to be found.</p>
    } else {
      return (
        <div className="messageFeed">
          {this.state.messages.map((message) =>
            <div key={message.id} className="message">
              <p className="body">{message.body}</p>
              <p className="date">{message.date}</p>
              <p className="rec">{message.rec}</p>
            </div>
          )}
        </div>
      )
    }
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mantra Health</h1>
      </header>
      <h2>Messages</h2>
      <SentMessages />
    </div>
  );
}

export default App;
