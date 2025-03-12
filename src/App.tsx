import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Homepage from './components/homepage';
import WebSocketSection from "./components/websocket";
import LampSection from "./components/lamp-section";
import { useSelector } from 'react-redux'
import Chat from './components/chat';

function App() {
    const box = useSelector((state: any) => state.box.value)

  return (
    <div className="App">

      {/* Navbar */}
      <Navbar />


      {/* Main */}
      <main className="container-fluid text-center" style={{marginTop: "56px"}} >
          <div className="row">
              {/* Homepage */}
              {box === 0 && <Homepage/>}

              {/* Lamp */}
              {box === 1 && <LampSection/>}

              {/* Websocket */}
              {box === 2 && <WebSocketSection/>}

              {/* Chat */}
              {box === 3 && <Chat />}
          </div>
      </main>


    </div>
  );
}

export default App;
