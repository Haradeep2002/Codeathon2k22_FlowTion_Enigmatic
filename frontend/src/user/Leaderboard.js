import { isAuthenticated } from '../auth'
import { getCategories, getFlows } from "./apiHelper";
import { useEffect, useState } from "react";
import ReactFlowRenderer from '../react-flow-renderer';
import Showflow from './Showflow'
import Menu from "../core/Menu";
import { Redirect } from 'react-router-dom';
import ShowLeader from './ShowLeader';
import ShowFlow1 from './ShowFlow1';
import './card.css';
const Leaderboard = () => {
    const [categories, setCategories] = useState(false)
    const [flowcharts, setFlowcharts] = useState(false)
    const [currentFlowChart, setCurrentFlowChart] = useState([])
    const [myflag, setMyflag] = useState(false)
    const [flag, setFlag] = useState(false)
    const init = () => {
        getCategories().then(data => {
            if (data.error) { console.log("error occured") }
            else {
                let mySet1 = new Set()
                data.map((d, i) => {
                    // console.log(d.category)
                    mySet1.add(d.category)
                })
                const array = [...mySet1]; setCategories(array)
            }
        })

        getFlows().then(data => { if (data.error) { console.log("error occured") } else { setFlowcharts(data) } })
    };
    const handleClick = (e) => {
        setCurrentFlowChart([]) // console.log(e.target.value) 
        let x = []
        flowcharts.map((fc, i) => { // console.log(fc.category === e.target.value) 
            if (fc.category === e.target.value) { x.push(fc) }
        })
        setCurrentFlowChart(x)
        setFlag(true)

        // console.log(currentFlowChart)
    }
    useEffect(() => { init(); }, []);
    return (
        <div style={{height:'1000px'}}>
    <div style={{ backgroundColor: 'rgba(5, 0, 255, 0.4)' }}>
        <Menu>  </Menu>

        {!flag &&
            <div>
                <h2 style={{ marginLeft: '20%', color: 'black' ,fontWeight:'bolder'}} >Please select a Category</h2>
                <br></br>

                <div style={{ width: '100%', display: 'flex',flexWrap: 'wrap' }}>
                    {categories && categories.map((fc, i) => {
                        return (<div key={i} style={{margin:'50px'}}>
                            <div className="cards-list">
                                    <div class="card 3">
                                        <div class="card_image">
                                            <img style ={{backgroundColor: 'pink'}}src="https://media0.giphy.com/media/iF0qnPWMvobyNk5g8C/200w.webp?cid=ecf05e47u9ciivmvaqhvs9izrqch4ghgwatnms4hii2usyil&rid=200w.webp&ct=g" />
                                        </div>
                                        <div class="card_title">
                                            <button type="submit" key={i} value={fc} onClick={(e) => handleClick(e)} >
                                                <text>🚀</text> {fc}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                        </div>)
                    })}

                </div>
            </div>
        }
        {flag && <ShowFlow1 flow={currentFlowChart}></ShowFlow1>}

    </div ></div>
    )
}
export default Leaderboard;