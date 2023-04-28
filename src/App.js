import React, { Component } from 'react';
import './App.css';
import Messages from './components/Messages';
import Input from './components/Input';

function randomName() {
  const firstNames = [
    "Charlie", "Osian", "Raja", "Timothy", "Aamir", "Zac", "Tia", "Brayden",
    "Yasir", "Kaan", "Billie", "Subhan", "Robert", "Loui", "Callan", "Eden",
    "Faisal", "Leonardo", "Alexis", "Imran"
  ];
  const lastNames = [
    "Munoz", "Preston", "Bryant", "Slater", "Reyes", "Galvan", "Dale", "Rich",
    "Wall", "Sears", "Archer", "Herman", "Foster", "Moody", "Yoder", "Schultz",
    "Barnes", "Medina", "Carpenter", "Grimes"
  ];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return firstName + '_' + lastName;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("hVNVHEytH04bFwxS", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-spyros01");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Free Chat Room</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    if (message === "") {
      alert("Please enter your message")
    }
    else{
      this.drone.publish({
        room: "observable-spyros01",
        message
      });
    }
  }

}

export default App;