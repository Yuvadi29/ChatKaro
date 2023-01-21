import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { io } from 'socket.io-client';
import './Chat.css';

let socket;

const Chat = ({ location }) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const EndPoint = 'http://localhost:5000';

  // This will return us a URL  
  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);
    socket = io(EndPoint);

    setName(name);
    setRoom(room);

    socket.emit("join", { name: name, room: room }, () => {
      // alert();
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [EndPoint]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]); //Add every new message sent by anyone to array
    });
  }, [messages]);

  const sendMessage = (event) => {

    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  console.log(message,messages);

  return (
    <div className='outerContainer'>
      <div className='innerContainer'>
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
      </div>
    </div>
  )

}

export default Chat;