import mqtt from "mqtt";
import {useEffect, useState, useRef} from "react";

export default function Chat() {
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const client = mqtt.connect(process.env.REACT_APP_BROKER_URL as string, {
        username: process.env.REACT_APP_MQTT_USER,
        password: process.env.REACT_APP_MQTT_PASSWORD
    })
    const topic: string = process.env.REACT_APP_TOPIC_CHAT as string

    function sendMessage() {
        if (inputRef.current) {
            let utente: string = "Marco"
            let msg: string = inputRef.current?.value;
            setMessage(msg);
        }
    }

    useEffect(() => {
        if (message === "") {
            return
        }
        client.publish(topic, message)
    }, [message]);

    useEffect(() => {

        client.on("connect", () => {
            console.log("Connected");
            client.subscribe(topic);
        })

        client.on("message", function (topic, payload){
            let data = payload.toString();
            console.log(data)
            setChat(prevData => [...prevData, data])
        })

    }, []);

    return (
        <div className="col-12 baseStyle">
            <div> {chat} </div>
            <input type="text" ref={inputRef}/>
            <button onClick={sendMessage}>SEND</button>
        </div>
    )
}