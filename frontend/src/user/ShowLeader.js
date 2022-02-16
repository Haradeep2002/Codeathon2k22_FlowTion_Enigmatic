//user side flowchart playground to find correct flowchart
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Menu from "../core/Menu";
import { getFlow } from './apiHelper'
import './card.css'
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
            <br></br><br></br>
            <Link to="/leaderboard" className="text-white" style={{ border: '2px solid black', backgroundColor: 'black',marginLeft: '80px', color: '#001233', textDecoration: 'none', padding: '30px' }}>
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
                <br></br><br></br><br></br>
                <h1>Leaderboard of {name}</h1>
                <br></br>
                <br></br>
                {data &&
                    data.map((a, i) => {
                        return (<div><li key={i}>
                                <div className="cards-list">
                                    <div class="card 2">
                                        <div class="card_image">
                                            <img style ={{backgroundColor: 'pink'}}src="https://media4.giphy.com/media/7FrOU9tPbgAZtxV5mb/200w.webp?cid=ecf05e47ziso8zl7yag6mibkrhsz3j5fwbqk3nixrvtjomp9&rid=200w.webp&ct=g" />
                                        </div>
                                        <div class="card_title">
                                            <div style={{ backgroundColor: '#000002', color: 'white', padding: '1px', textAlign: 'center', marginLeft: '5px', fontSize: '25px', height: '70px', borderRadius: '20px' }} >
                                 {a.name} | {a.time} seconds</div>
                                        </div>
                                    </div>
                                </div>
                                 </li>
                                 <br></br>
                                 </div>)

                    })}
            </ul>
            
            {goBack()}
        </div>
        </div>
    );
};

export default ShowLeader;