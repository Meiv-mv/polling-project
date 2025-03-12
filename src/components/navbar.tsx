import { useSelector, useDispatch } from 'react-redux';
import {changeBox} from "../redux/reducer/boxReducer";

export default function Navbar() {
    const box = useSelector((state: any) => state.box.value)
    const dispatch = useDispatch()



    return (
        <nav className="navbar navbar-dark navbar-expand-sm fixed-top bg-body-tertiary" data-bs-theme="dark">
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
                            <a className={box === 1 ? "nav-link active" : "nav-link"} onClick={() => dispatch(changeBox(1))}>Lamp</a>
                        </li>
                        <li className="nav-item">
                            <a className={box === 0 ? "nav-link active" : "nav-link"} onClick={() => dispatch(changeBox(0))}>WebSocket</a>
                        </li>
                        <li className="nav-item">
                            <a className={box === 3 ? "nav-link active" : "nav-link"} onClick={() => dispatch(changeBox(3))}>Chat</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}