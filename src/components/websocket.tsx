import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { EChartsOption } from 'echarts-for-react';

interface realtimeProps {
    temp?: number,
    hum?: number,
    press?: number,
    time?: string
}
interface objType {
    temperature?: number;
    humidity?: number;
    pressure?: number;
    time?: string;
}

function RealtimeBoard({temp, hum, press, time}: realtimeProps) {
    return(
        <div className="row">
            <div className="12">
                <h2>Ultimo dato aggiunto</h2>
            </div>
            <div className="col-12" style={{marginTop: "20px"}}>
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-3 value">
                        <p>Temperatura = {temp}°C</p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 value">
                        <p>Umidità = {hum}%</p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 value">
                        <p>Pressione = {press} hPA</p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 value">
                        <p>Orario = {time}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function WebSocketSection() {
    const [xData, setXData] = useState<Array<string>>([]);
    const [yTemperature, setYTemperature] = useState<Array<number>>([]);
    const [yHumidity, setYHumidity] = useState<Array<number>>([]);
    const [yPressure, setYPressure] = useState<Array<number>>([]);
    const [realtime, setRealtime] = useState<objType>({});
    const temperatureOption: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xData
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: yTemperature,
                type: 'line',
                areaStyle: {}
            }
        ]
    };
    const humidityOption: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xData
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: yHumidity,
                type: 'line',
                areaStyle: {}
            }
        ]
    };
    const pressureOption: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xData
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: yPressure,
                type: 'line',
                areaStyle: {}
            }
        ]
    };
    const websocketUrl: string = 'ws://192.168.7.254/ws';
    const [reconnect, setReconnect] = useState<boolean>(false);


    function connect() {
        const ws = new WebSocket(websocketUrl);

        return ws;
    }

    useEffect(() => {
        const ws = connect();

        ws.onopen = () => {
            console.log("WebSocket Opened");
        }
        ws.onmessage = (event) => {
            let obj: objType = JSON.parse(event.data);
            let date: Date = new Date();
            obj.time = date.toLocaleTimeString("it-IT");


            setRealtime(obj);
            setXData(prevData => [...prevData, obj.time as string]);
            setYTemperature(prevData => [...prevData, obj.temperature as number]);
            setYHumidity(prevData => [...prevData, obj.humidity as number]);
            setYPressure(prevData => [...prevData, obj.pressure as number]);
        }
        ws.onerror = (err) => {
            console.log("Errore di connessione alla WS, nuovo tentativo di connessione in corso...");
            ws.close();
        }
        ws.onclose = () => {
            setTimeout(function() {
                setReconnect(!reconnect);
            }, 2000);
        }
    }, [reconnect]);

    return (
        <div className="col-12">
            <div className="row baseStyle" style={{height:'100%'}}>
                <div className="col-12">
                    <RealtimeBoard temp={realtime.temperature} hum={realtime.humidity} press={realtime.pressure} time={realtime.time} />
                    {/*temp={} hum={} press={} time={}*/}
                </div>
                <div className="col-12 col-lg-4 chart-div">
                    <h2>Temperatura(°C)</h2>
                    <ReactECharts option={temperatureOption} style={{padding: "5px"}} />
                </div>
                <div className="col-12 col-lg-4 chart-div">
                    <h2>Umidità(%)</h2>
                    <ReactECharts option={humidityOption} style={{padding: "5px"}} />
                </div>
                <div className="col-12 col-lg-4 chart-div">
                    <h2>Pressione(hPA)</h2>
                    <ReactECharts option={pressureOption} style={{padding: "5px"}} />
                </div>
            </div>
        </div>
    )
}