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
                    <p>Temperatura = {temp}°C</p>
                    <p>Umidità = {hum}%</p>
                    <p>Pressione = {press} hPA</p>
                    <p>Orario = {time}</p>
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

    useEffect(() => {
        const websocketUrl: string = 'ws://192.168.7.254/ws';
        const ws = new WebSocket(websocketUrl);
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
    }, []);

    return (
        <div className="col-12">
            <div className="row baseStyle" style={{height:'100%'}}>
                <div className="col-12 col-lg-6">
                    <RealtimeBoard temp={realtime.temperature} hum={realtime.humidity} press={realtime.pressure} time={realtime.time} />
                    {/*temp={} hum={} press={} time={}*/}
                </div>
                <div className="col-12 col-lg-6 chart-div">
                    <h2>Temperatura(°C)</h2>
                    <ReactECharts option={temperatureOption} style={{padding: "5px"}} theme="dark" />
                </div>
                <div className="col-12 col-lg-6 chart-div">
                    <h2>Umidità(%)</h2>
                    <ReactECharts option={humidityOption} style={{padding: "5px"}} theme="dark" />
                </div>
                <div className="col-12 col-lg-6 chart-div">
                    <h2>Pressione(hPA)</h2>
                    <ReactECharts option={pressureOption} style={{padding: "5px"}} theme="dark" />
                </div>
            </div>
        </div>
    )
}