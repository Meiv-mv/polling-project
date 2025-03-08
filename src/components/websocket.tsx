import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { EChartsOption } from 'echarts-for-react';

// const websocketUrl: string = 'ws://192.168.7.254/ws';
// const ws = new WebSocket(websocketUrl);
// ws.onopen = () => {
//     console.log("WebSocket Opened");
// }
// ws.onmessage = (event) => {
//     console.log(event.data)
// }

function RealtimeBoard() {
    return(
        <div className="row">
            <div className="12">
                <h2>Ultimo dato aggiunto</h2>
            </div>
            <div className="col-12" style={{marginTop: "20px"}}>
                <div className="row">
                    <p>Temperatura = {}</p>
                    <p>Umidità = {}</p>
                    <p>Pressione = {}</p>
                    <p>Orario = {}</p>
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
    const temperatureOption: EChartsOption = {
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

    interface fakeObjType {
        temperature: string;
        humidity: string;
        pressure: string;
        time: string;
    }

    function fakeObj() {
        const obj: fakeObjType = {
            temperature: "20",
            humidity: "35",
            pressure: "1020.50",
            time: "10:00:00",
        }


        setXData(prevData => [...prevData, obj.time]);
        setYTemperature(prevData => [...prevData, JSON.parse(obj.temperature)]);
        setYHumidity(prevData => [...prevData, JSON.parse(obj.humidity)]);
        setYPressure(prevData => [...prevData, JSON.parse(obj.pressure)]);
    }

    return (
        <div className="col-12">
            <div className="row baseStyle" style={{height:'100%'}}>
                <div className="col-12 col-lg-6">
                    <RealtimeBoard />
                    <button onClick={fakeObj}>Test</button>
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