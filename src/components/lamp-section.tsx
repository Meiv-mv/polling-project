import React, { useState, useEffect } from "react";
import axios from "axios";

const RELAY_URL = "http://192.168.7.200/relay"; // URL del relay

const LampSection: React.FC = () => {
    const [relayState, setRelayState] = useState<"on" | "off">("off");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Funzione per ottenere solo lo stato attuale del relay
    const fetchRelayState = async () => {
        try {
            const response = await axios.get(RELAY_URL, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }, params: { id: 1 }, // Parametro per identificare il relay
            });

            // Verifica se la risposta contiene il campo "state"
            if (response.data && response.data.state) {
                setRelayState(response.data.state);  // Imposta solo lo stato
            } else {
                setError("Stato non trovato nella risposta");
            }
        } catch (err) {
            setError("Errore nel recupero dello stato");
            console.error("Errore GET:", err);
        }
    };

    // Funzione per accendere/spegnere la lampada
    const toggleRelay = async () => {
        const newState = relayState === "off" ? "on" : "off";
        setLoading(true);
        setError(null);

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
            setError("Errore nel cambio stato");
            console.error("Errore POST:", err);
        } finally {
            setLoading(false);
        }
    };

    // Effettua la GET ogni 1 secondo per aggiornare lo stato
    useEffect(() => {
        fetchRelayState(); // Prima richiesta immediata
        const interval = setInterval(fetchRelayState, 10000000); // Aggiorna ogni 1 secondo
        return () => clearInterval(interval); // Pulisce l'intervallo al termine
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Stato Lampada: {relayState.toUpperCase()}</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={toggleRelay} disabled={loading} style={{ fontSize: "18px", padding: "10px 20px" }}>
                {loading ? "Attendere..." : relayState === "off" ? "Accendi" : "Spegni"}
            </button>
        </div>
    );
};

export default LampSection;