import React, { useState, useEffect } from "react";
import axios from "axios";
import mqtt from "mqtt";

// URL relay
const RELAY_URL = "http://192.168.7.200/relay";

const LampSection: React.FC = () => {
    const [relayState, setRelayState] = useState<"on" | "off">("off"); // relay state
    const [loading, setLoading] = useState<boolean>(false); // State loading
    const [error, setError] = useState<string | null>(null); // State erro

    const [isConnected, setIsConnected] = useState(false);
    // Connessione MQTT
    const client = mqtt.connect(process.env.REACT_APP_BROKER_URL as string, {
        username: process.env.REACT_APP_MQTT_USER,
        password: process.env.REACT_APP_MQTT_PASSWORD,
    });

    const topic: string = process.env.REACT_APP_TOPIC_LAMP as string;

    //messaggio MQTT per avvisare della modifica
    function sendmsg() {
        client.publish(topic, "Kiriodas collegato");
    }

    useEffect(() => {

            client.on("connect", () => {
                client.subscribe(topic);
                console.log("connesso al broker")
            });

        client.on("reconnect", () => {
            console.log("riconnessione broker...");
        });

        client.on("offline", () => {
            console.log("MQTT client offline");
            setIsConnected(false);
        });

        client.on("error", (err) => {
            console.error("MQTT error: ", err);
            client.end();
        });


        fetchRelayState(); // Recupera lo stato iniziale del relay

        // Ascolta i messaggi in arrivo e aggiorna lo stato
        client.on("message", (topic, payload) => {
            let data = payload.toString();
            console.log(data);
            fetchRelayState();
        });
    }, []);

    // Funzione stato relay
    const fetchRelayState = async () => {
        try {
            const response = await axios.get(RELAY_URL, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                params: { id: 1 }, // Parametro per identificare il relay
            });

            // Verifica il campo "state"
            if (response.data && response.data.state) {
                setRelayState(response.data.state); // Imposta lo stato
            } else {
                setError("Stato non trovato nella risposta");
            }
        } catch (err) {
            setError("Errore nel recupero dello stato");
            console.error("Errore GET:", error);
        }
    };

    // Funzione per accendere/spegnere la lampada
    const toggleRelay = async () => {
        const newState = relayState === "off" ? "on" : "off";
        setLoading(true);
        setError(null);
        sendmsg(); // Invia un messaggio MQTT

        try {
            const response = await axios.post(
                RELAY_URL,
                new URLSearchParams({ id: "1", state: newState }).toString(),
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                }
            );

            console.log("Risposta POST relay:", response.data);
            setRelayState(newState);
        } catch (err) {
            setError("Il relay risulta offline");
            console.error("Errore POST:", err);
        } finally {
            setLoading(false);
        }
    };

    // Mostra un alert in caso di errore
    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    return (
        <button onClick={toggleRelay} disabled={loading} style={{ fontSize: "16px", color: "white", background: "none", border: "none" }}>
            <img
                src={relayState === "off" ? "/images/lampoff.webp" : "/images/lampon.png"}
                alt={relayState === "off" ? "Lampada Spenta" : "Lampada Accesa"}
                style={{ width: "30px", height: "30px" }}
            />
            {loading ? "Attendere..." : relayState === "off" ? "Accendi" : "Spegni"}
        </button>
    );
};

export default LampSection;
