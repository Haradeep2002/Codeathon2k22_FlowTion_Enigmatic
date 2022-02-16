import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";
import classes from './Menu.module.css'
import logo from './logo.png';
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { backgroundColor: '#131D5A', borderRadius: '30px', color: 'white' }
    }
    else {
        return { color: 'black', fontWeight: 'bolder' }
    }
}

const Menu = (props) => {
    return (<div style={{paddingBottom:'150px'}}>
        <ul className={`nav nav-tabs justify-content-start ${classes.nav}`} style={{ float: 'left', width: '50%', margin: 0, padding: 0 }}>
            <li className="nav-item">
            <Link className="nav-link" to="/"><img height="80px" width="200px"src={logo}></img></Link>
            </li>
            {/* {isAuthenticated() &&
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history, '/dashboard')} to="/dashboard">Dashboard</Link>
                </li>
            } */}

            <li className="nav-item">
                <Link className="nav-link mt-3" style={isActive(props.history, '/leaderboard')} to="/leaderboard">🏆Leaderboard</Link>
            </li>


        </ul>
        <ul className={`nav nav-tabs justify-content-end ${classes.nav}`} style={{ float: 'right', width: '50%', margin: '0', padding: '20px', paddingRight: '50px' }}>
            {!isAuthenticated() &&
                <React.Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(props.history, '/signin')} to="/signin">Signin</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(props.history, '/signup')} to="/signup">Signup</Link>
                    </li>
                </React.Fragment>
            }
            {isAuthenticated() &&
                <li className="nav-item " >
                    <span className={`nav-link ${classes.signout}`} style={{ cursor: 'pointer', fontWeight: 'bolder' }} onClick={
                        () =>
                            signout(() => {
                                props.history.push("/")
                            })
                    }>Signout 🚶</span>
                </li>
            }



        </ul>
    </div>
    )
}

export default withRouter(Menu);