import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

const Join = () => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

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
      <div className="login-wrapper">
        <div className="x-wrapper">
          <div className="y-wrapper">
            <div className="title-wrapper">
              <h2>Welcome!</h2>
              <h4>Please SignIn</h4>
            </div>
            <div className="input-box">
              <input type="text" placeholder="Name" onChange={(event) => setName(event.target.value)} />
              <input type="text" placeholder="Room" onChange={(event) => setRoom(event.target.value)} />
            </div>
            <div className="button-wrapper">
              <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                <button className="login-btn" type="submit">Sign In</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Join;