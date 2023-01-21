import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { io } from 'socket.io-client';
import './Chat.css';

let socket;

const Chat = ({ location }) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
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

    return () =>{
      socket.emit('disconnect');
      
      socket.off();
    }
  },[EndPoint]);


  return (
    <div>
      <h1>Chat</h1>
    </div>
  )
}

export default Chat;