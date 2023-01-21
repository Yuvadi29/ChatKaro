import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { io } from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import Text from '../Text/Text';
import { useLocation } from 'react-router';

let socket;

const Chat = () => {

  const location = useLocation();

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const EndPoint = 'http://localhost:5000';

  // This will return us a URL  
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(EndPoint);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [EndPoint, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(messages => [...messages, message]); //Add every new message sent by anyone to array
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {

    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  console.log(message, messages);

  return (
    <>
      <div className="bg-wrapper">
        <div className="bg-grad orange active"></div>
        <div className="bg-grad red"></div>
        <div className="bg-grad purple"></div>
        <div className="bg-grad blue"></div>
        <div className="bg-grad green"></div>
        <div className="bg-grad yellow"></div>
      </div>
      <div className='outerContainer'>
        <div className='innerContainer'>
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
        </div>
      </div>
    </>
  )

}

export default Chat;