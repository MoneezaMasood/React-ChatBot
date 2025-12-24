import { useState } from 'react'
import './App.css'
import {Chatbot} from 'supersimpledev'

   function ChatInput({ input, setInput }) {
      console.log(input);

      return (
        <>
          <input
            value={input} // controlled input field, value is tied to state variable input
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter prompt"
          />
        </>
      );
    }
    function ChatMessage({ message, sender }) {
      return (
        <div className={`chat-message ${sender}`}>
          <img
            src={sender === 'robot' ? 'robot.png' : 'user.png'}
            width="40"
          />
          <span className="bubble">{message}</span>
        </div>
      );
    }

    function ChatMessages({ ChatMessages }) {
      // Destructuring the ChatMessages prop
      // Same as:
      // function ChatMessages(props) {
      //   const ChatMessages = props.ChatMessages;

      return (
        <>
          {ChatMessages.map(chatMessage => (
            <ChatMessage
              key={chatMessage.id}
              message={chatMessage.message}
              sender={chatMessage.sender}
            />
          ))}
        </>
      );
    }


function App() {
  // const [error, setError] = React.useState('');
  const [input, setInput] = useState('');

  const [chatMessages, setChatMessages] = useState([
    { id: 1, message: "Hello Chat", sender: "user" },
    { id: 2, message: "Hi User", sender: "robot" }
  ]);

  function sendMessage() {
    if (input.trim() === '') {
      // setError('Please enter a message');
      alert('Please enter a prompt');
      return;
    }

    // setError(''); // clear error if valid //this is another method to do the 

    const userMessage = {
      message: input,
      sender: 'user',
      id: crypto.randomUUID()
    };

    const response = Chatbot.getResponse(input);

    const robotMessage = {
      message: response,
      sender: 'robot',
      id: crypto.randomUUID()
    };

    setChatMessages([
      ...chatMessages,
      userMessage,
      robotMessage
    ]);

    setInput('');
  }


  return (
    <div className="chat-app">
      <h2 className="chat-title">💬 Chatbot</h2>

      <div className="chat-window">
        <ChatMessages ChatMessages={chatMessages} />
      </div>

      <div className="chat-input">
        <ChatInput input={input} setInput={setInput} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}


export default App
