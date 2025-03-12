import mqtt from "mqtt";
import {useEffect, useState, useRef} from "react";

interface messageTypes {
    user: string;
    msg: string;
}

export default function Chat() {
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<Array<messageTypes>>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const client = mqtt.connect(process.env.REACT_APP_BROKER_URL as string, {
        username: process.env.REACT_APP_MQTT_USER,
        password: process.env.REACT_APP_MQTT_PASSWORD
    })
    const topic: string = process.env.REACT_APP_TOPIC_CHAT as string

    function sendMessage() {
        if (inputRef.current) {
            let msg: string = inputRef.current?.value;
            setMessage(msg);
            inputRef.current.value = "";
        }
    }

    useEffect(() => {
        if (message === "") {
            return
        }
        let obj: object = {user: "Carmine", msg: message}
        client.publish(topic, JSON.stringify(obj))
    }, [message]);

    useEffect(() => {

        client.on("connect", () => {
            console.log("Connected");
            client.subscribe(topic);
        })

        client.on("message", function (topic, payload){
            let data = JSON.parse(payload.toString());
            console.log(data)
            setChat(prevData => [...prevData, data])
        })

    }, []);

    return (
        <div className="col-12 baseStyle">
            <div className="row baseStyle justify-content-center">
                <div className="col-12 chat-box">
                    {chat.map(item => {
                        return (
                            <div className={item.user === "Marco" ? "row justify-content-end" : "row justify-content-start"}>
                                <div className="col-8">
                                    <p className={item.user === "Marco" ? "user-style" : "else-style"}>{item.user}</p>
                                    <p className={item.user === "Marco" ? "chat-user" : "chat-else"}>{item.msg}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="col-8" style={{marginTop: "20px"}}>
                    <div className="row">
                        <div className="col-10">
                            <input className="form-control" type="text" ref={inputRef}/>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-info" onClick={sendMessage}>SEND</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}