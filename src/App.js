import React from 'react';
import logo from './logo.svg';
import './App.css';
import Headroom from "react-headroom";
import InfiniteScroll from "react-infinite-scroller";

const api = {
  baseUrl: 'https://api.twilio.com'
};

// Class for sent messages
class SentMessages extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        allMessages: [],
        nextPage: null,
        hasMoreItems: true
      }
  }

  // Loads first page of messages
  componentDidMount() {
    fetch('/messages')
      .then(res => res.json())
      .then(res => this.setState({
              allMessages: res.messages,
              nextPage: res.next_page_uri
            }))
      .catch((err) => this.setState({ loaded: true }));
  }

  // Load more pages for Infinite Scroll
  loadNextPage(page) {
    var self = this;
    let nextPageUrl = "";
    if (this.state.nextPage) {
      nextPageUrl = api.baseUrl + this.state.nextPage;
    }
    const obj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url : nextPageUrl
      })
    };
    fetch('/messages', obj)
      .then(res => res.json())
      .then(res => {
        if (res) {
          var updatedMessages = self.state.allMessages;
          res.messages.map(message => {
            updatedMessages.push(message);
          })
          if (res.nextPage) {
            self.setState({
              allMessages: updatedMessages,
              nextPage: res.nextPage
            });
          } else {
            self.setState({
              hasMoreItems: false
            });
          }
        }
      })
      .catch((err) => {console.log(err);});
  }

  render() {
    const loader = <p className="loader">Loading messages...</p>;

    var items = [];
    this.state.allMessages.map(message => {
      items.push(
        <div key={message.id} className="message">
        <p className="body">{message.body}</p>
        <p className="date">{new Date(message.date_sent).toLocaleString()}</p>
        <p className="rec">{message.to}</p>
      </div>
      );
      return items;
    });

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={this.loadNextPage.bind(this)}
            hasMore={this.state.hasMoreItems}
            loader={loader}>

            <div className="messageFeed">
                {items}
            </div>
        </InfiniteScroll>
    );
  }
}

// Return app
function App() {
  return (
    <div className="App">
      <Headroom>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Mantra Health</h1>
        </div>
      </Headroom>
      <div>
        <h2>Messages</h2>
        <SentMessages />
      </div>
    </div>
  );
}

export default App;
