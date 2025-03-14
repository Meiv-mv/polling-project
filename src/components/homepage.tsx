import "../App.css"

export default function Homepage() {
    return (
        <div className="col-12">
            <h2 className="text-center">CODING</h2>
            <div className="row baseStyle" style={{height:'100%'}}>
                <div className="col-12 col-lg-4 home-div d-flex align-items-center justify-content-center text-center">
                    <div>
                        <h3>REACT</h3>
                        <h6>Libreria JavaScript open-source sviluppata da Facebook per costruire interfacce utente (UI) dinamiche e interattive. Si basa sul concetto di componenti, che sono blocchi riutilizzabili di codice che gestiscono il rendering della UI e l'interazione con l'utente. React utilizza un "DOM virtuale" che ottimizza l'aggiornamento delle pagine, rendendo le applicazioni più veloci ed efficienti.</h6>
                    </div>
                </div>
                <div className="col-12 col-lg-4 home-div d-flex align-items-center justify-content-center text-center">
                    <div>
                        <h3>MQTT</h3>
                        <h6>(Message Queuing Telemetry Transport) è un protocollo di messaggistica leggero e open-source progettato per la comunicazione tra dispositivi. MQTT utilizza un modello di pubblicazione/sottoscrizione, in cui i client possono "pubblicare" messaggi su un "topic" e "sottoscriversi" a questi topic per ricevere i messaggi. </h6>
                    </div>
                </div>
                <div className="col-12 col-lg-4 home-div d-flex align-items-center justify-content-center text-center">
                    <div>
                        <h3>WEBSOCKET</h3>
                        <h6>Protocollo di comunicazione che consente una connessione bidirezionale e persistente tra un client (di solito un browser) e un server. A differenza dei tradizionali protocolli HTTP, che sono basati su richieste e risposte, WebSocket mantiene la connessione aperta, permettendo lo scambio continuo di dati in tempo reale senza la necessità di riaprire la connessione per ogni comunicazione.</h6>
                    </div>
                </div>
                <div className="col-12 col-lg-4 home-div d-flex align-items-center justify-content-center text-center">
                    <div>
                        <h3>RELAY</h3>
                        <h6>Può essere programmato per inviare comandi attraverso un pin di controllo, consentendo di gestire dispositivi come luci e altro ancora. Questo tipo di applicazione è comunemente utilizzato in progetti di domotica e automazione.</h6>
                    </div>
                </div>
                <div className="col-12 col-lg-4 home-div d-flex align-items-center justify-content-center text-center">
                    <div>
                        <h3>BOOTSTRAP</h3>
                        <h6>Framework open-source per lo sviluppo di applicazioni web e siti responsivi, sviluppato inizialmente da Twitter. Si tratta di un insieme di strumenti che facilitano la creazione di interfacce utente moderne e reattive, riducendo il tempo di sviluppo e migliorando la compatibilità tra diversi dispositivi e browser.</h6>
                    </div>
                </div>
                <div className="col-12 col-lg-4 home-div d-flex align-items-center justify-content-center text-center mt-5">
                    <div>
                        <h3>ECHARTS</h3>
                        <h6>Apache ECharts TM è una libreria di visualizzazione JavaScript open source, ottimizzata sia per PC che per dispositivi mobili. Compatibile con la maggior parte dei browser web moderni, tra cui IE9/10/11, Chrome, Firefox e Safari, ECharts utilizza ZRender , un motore di rendering grafico, per creare grafici intuitivi, interattivi e altamente personalizzabili.</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}
