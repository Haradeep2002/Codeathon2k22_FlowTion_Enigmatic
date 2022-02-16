//user side show flow charts of certain category

import { useState, useEffect } from "react"
import { getFlows, getFlow } from "./apiHelper";
import { withRouter } from "react-router-dom";
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
        <div>
            <br></br>
            <br></br>
            <h2 style={{ marginLeft: '20%', color: 'black' }}>Select a Flowchart</h2>

            <br></br>
            <br></br>
            {/* {JSON.stringify(props.flow)} */}
            <div style={{ display: 'flex',flexWrap: 'wrap' }} >
                {
                    props.flow && props.flow.map((fc, i) => {

                        return (<div key={i}>

                            <button style={{marginBottom:'20px', minWidth:'100px', backgroundColor: '#131D5A', color: 'white', padding: '10px', textAlign: 'center', marginLeft: '80px', fontSize: '30px', height: '100px', borderRadius: '10px' }} key={i} value={fc._id} onClick={(e) => handleClick(e)}>
                                {fc.name}

                            </button>
                            <br></br>
                            <br></br>

                        </div>)
                    })
                }
                {/* {currentFlowChart && JSON.stringify(currentFlowChart)} */}
            </div>
        </div >
    )
}
export default withRouter(Showflow)