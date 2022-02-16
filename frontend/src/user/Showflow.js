//user side show flow charts of certain category

import { useState, useEffect } from "react"
import { getFlows, getFlow } from "./apiHelper";
import { withRouter } from "react-router-dom";
import './card.css'
const Showflow = (props) => {
    const [flowcharts, setFlowcharts] = useState(false)
    const [currentFlowChart, setCurrentFlowChart] = useState(false)
    const init = () => {
        getFlows().then(data => {
            if (data.error) {
                console.log("error occured")
            } else {
                setFlowcharts(data)
            }
        })
    };
    useEffect(() => {
        init();

    }, []);
    const handleClick = (e) => {

        getFlow(e.target.value).then(data => {
            if (data.error) {
                console.log("error occured")
            } else {
                setCurrentFlowChart(data)
                console.log(currentFlowChart)
                props.history.push(`/display/${data._id}`)
            }
            //  console.log(e.target.value)
            //console.log("clicked ")
        })
    }

    

    return (
        <div style={{height:'1000px'}}>
            
            <h2 style={{ marginLeft: '20%', color: 'black' ,fontWeight:'bolder'}}>Select a Flowchart</h2>

            <br></br>
            <br></br>
            {/* {JSON.stringify(props.flow)} */}
            <div style={{ display: 'flex',flexWrap: 'wrap' }} >
                {
                    props.flow && props.flow.map((fc, i) => {

                        return (<div key={i} style={{margin:'50px'}}>

                            <div className="cards-list">
                                    <div class="card 3">
                                        <div class="card_image">
                                            <img  style ={{backgroundColor: '#E4BCFE'}}src="https://media1.giphy.com/media/veOuvpRopgi8w0qZL9/giphy.gif?cid=790b76110cad0a93128f073275dc8536ddec9e7d86993d08&rid=giphy.gif&ct=s  " />
                                        </div>
                                        <div class="card_title">
                                            <button type="submit" key={i} value={fc._id} onClick={(e) => handleClick(e)} >
                                                🚀{fc.name}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                        </div>)
                    })
                }
                {/* {currentFlowChart && JSON.stringify(currentFlowChart)} */}
            </div>
        </div >
    )
}
export default withRouter(Showflow)