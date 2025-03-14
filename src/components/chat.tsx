import mqtt from "mqtt";
import {useEffect, useState, useRef} from "react";
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux'
import { changeUsername } from "../redux/reducer/userReducer";

interface messageTypes {
    id: string;
    user: string;
    msg: string;
    timestamp: string;
}

export default function Chat() {
    const [message, setMessage] = useState<messageTypes>();
    const [chat, setChat] = useState<Array<messageTypes>>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const client = mqtt.connect(process.env.REACT_APP_BROKER_URL as string, {
        username: process.env.REACT_APP_MQTT_USER,
        password: process.env.REACT_APP_MQTT_PASSWORD
    })
    const topic: string = process.env.REACT_APP_TOPIC_CHAT as string
    const username: string = useSelector((state: any) => state.user.value);
    const dispatch = useDispatch()
    const [reconnect, setReconnect] = useState<boolean>(false)

    // update username
    function updateUsername() {
        const newUsername: string | null = prompt("Enter username");
        if (newUsername) {
            chat.map(item => {
                if(item.user === username) {
                    item.user = newUsername;
                }
            })
            dispatch(changeUsername(newUsername));
        }
    }

    // send msg on key press
    function enterSend(event: any) {
        if (event.key === "Enter") {
            sendMessage()
        }
    }

    // send msg
    function sendMessage() {
        if (inputRef.current?.value === "") {
            alert('Inserire un messaggio')
            return
        }
        if (inputRef.current) {
            setMessage({id: uuidv4().slice(0, 8), user: username, msg: inputRef.current?.value, timestamp: new Date().toLocaleTimeString("it-IT")});
            inputRef.current.value = "";
        }
    }

    // publish useEffect
    useEffect(() => {
        client.publish(topic, JSON.stringify(message))
    }, [message]);

    // scroll chat useEffect
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [chat]);

    // handle connection, reconnection, subscribing
    useEffect(() => {

        client.on("connect", () => {
            console.log("Connected");
            client.subscribe(topic);
        })

        client.on("error", (err) => {
            console.log("Errore :" + err)
        })

        client.on("close", () => {
            console.log("Client closed")
        })

        client.on("message", function (topic, payload){
            if (payload.toString() === "") {
                return
            }
            let data = JSON.parse(payload.toString());
            setChat(prevData => [...prevData, data])
        })

    }, []);

    return (
        <div className="col-12 baseStyle">
            <div className="row baseStyle justify-content-center">
                <div className="col-12 chat-box">
                    {chat.map(item => {
                        return (
                            <div key={item.id} className={item.user === username ? "row justify-content-end" : "row justify-content-start"}>
                                <div className="col-8">
                                    <p className={item.user === username ? "user-style" : "else-style"}>{item.user}</p>
                                    <p className={item.user === username ? "chat-user" : "chat-else"}>{item.msg}</p>
                                    <p className={item.user === username ? "timestamp-user" : "timestamp-else"}>{item.timestamp}</p>
                                </div>
                            </div>
                        )
                    })}
                    <div ref={scrollRef}></div>
                </div>
                <div className="col-10" style={{marginTop: "20px"}}>
                    <div className="row gy-2 gy-md-0 justify-content-center">
                        <div className="col-12 col-md-6 col-lg-8">
                            <input className="form-control" type="text" onKeyDown={enterSend} ref={inputRef}/>
                        </div>
                        <div className="col-4 col-md-2 col-lg-1">
                            <button className="btn send-btn" onClick={sendMessage}>SEND</button>
                        </div>
                        <div className="col-4 col-md-2 col-lg-1">
                            <button className="btn send-btn" onClick={updateUsername}>NICKNAME</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}