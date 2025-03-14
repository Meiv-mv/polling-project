import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Homepage from './components/homepage';
import WebSocketSection from "./components/websocket";
import { useSelector } from 'react-redux'
import Chat from './components/chat';

function App() {
    const box = useSelector((state: any) => state.box.value)

  return (
    <div className="App">

      {/* Navbar */}
      <Navbar />


      {/* Main */}
      <main className="container-fluid text-center justify-content-center" style={{marginTop: "56px"}} >
          <div className="row">
              {/*/!* Homepage *!/*/}
              {box === 0 && <Homepage/>}

              {/* Websocket */}
              {box === 1 && <WebSocketSection/>}

              {/* Chat */}
              {box === 2 && <Chat />}
          </div>
      </main>


    </div>
  );
}

export default App;
