import { useSelector, useDispatch } from 'react-redux';
import {changeBox} from "../redux/reducer/boxReducer";
import LampSection from "./lamp-section";


export default function Navbar() {
    const box = useSelector((state: any) => state.box.value)
    const dispatch = useDispatch()



    return (
        <nav className="navbar navbar-dark navbar-expand-sm fixed-top bg-body-tertiary" style={{background: "linear-gradient(100deg,#2C3239,#2C3239"}}>
            <div className="container-fluid">
                <a className="navbar-brand" onClick={() => dispatch(changeBox(0))}>Home</a>
                <button className="navbar-toggler text-info" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className={box === 0 ? "nav-link active" : "nav-link"} onClick={() => dispatch(changeBox(0))}>WebSocket</a>
                        </li>
                        <li className="nav-item">
                            <a className={box === 3 ? "nav-link active" : "nav-link"} onClick={() => dispatch(changeBox(3))}>Chat</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <LampSection/>
                </div>
            </div>
        </nav>
    )
}