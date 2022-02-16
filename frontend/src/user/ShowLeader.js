//user side flowchart playground to find correct flowchart
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Menu from "../core/Menu";
import { getFlow } from './apiHelper'
const ShowLeader = (props) => {
    const [data, setData] = useState(false)
    const [name, setName] = useState(false)
    useEffect(() => {
        showCurrentFlow(props.match.params.id)
    }, []);

    const showCurrentFlow = (id) => {
        getFlow(id)
            .then(data => {
                if (data.error) {

                } else {
                    data.leaderboard.sort((a, b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0))
                    setName(data.name)
                    setData(data.leaderboard)
                    console.log(data.leaderboard)
                }
            });
    }
    const goBack = () => (
        <div className="mt-5">
            <br></br>
            <Link to="/leaderboard" className="text-white" style={{ border: '2px solid black', backgroundColor: 'black', color: '#001233', textDecoration: 'none', padding: '10px' }}>
                Back to Leaderboard
            </Link>
        </div>
    );

    return (<div style={{ backgroundColor: 'rgba(5, 0, 255, 0.4)' }}><Menu>  </Menu>
        <div style={{
            width: '100%',
            height: '1000px',
            // backgroundColor: 'rgba(5, 0, 255, 0.4)',
            display: 'flex',
            flexWrap: 'wrap'
        }}>

            <ul style={{ listStyle: 'none' }}>
                <h1>Leaderboard of {name}</h1>
                <br></br>
                <br></br>
                {data &&
                    data.map((a, i) => {
                        return (<div>
                            <li key={i}>
                                <div style={{ backgroundColor: '#131D5A', color: 'white', padding: '10px', textAlign: 'center', marginLeft: '80px', fontSize: '25px', height: '70px', borderRadius: '10px' }} >{a.name} | {a.time} seconds</div></li><br></br></div>)

                    })}
            </ul>
            
            {goBack()}
        </div>
        </div>
    );
};

export default ShowLeader;