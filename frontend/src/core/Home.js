import { isAuthenticated } from '../auth'
import { getCategories, getFlows } from "../user/apiHelper";
import { useEffect, useState } from "react";
import ReactFlowRenderer from '../react-flow-renderer';
import Showflow from '../user/Showflow'
import Menu from "./Menu";
import './style.css'
import { Redirect } from 'react-router-dom';
const Home = () => {
    const [categories, setCategories] = useState(false)
    const [flowcharts, setFlowcharts] = useState(false)
    const [currentFlowChart, setCurrentFlowChart] = useState([])
    const [flag, setFlag] = useState(false)
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log("error occured")
            } else {

                let mySet1 = new Set()
                data.map((d, i) => {
                    // console.log(d.category)
                    mySet1.add(d.category)
                })
                const array = [...mySet1];
                setCategories(array)
            }
        })

        getFlows().then(data => {
            if (data.error) {
                console.log("error occured")
            } else {
                setFlowcharts(data)
            }
        })
    };
    const handleClick = (e) => {
        setCurrentFlowChart([])
        setFlag(true)
        // console.log(e.target.value)
        let x = []
        flowcharts.map((fc, i) => {
            // console.log(fc.category === e.target.value)
            if (fc.category === e.target.value) {
                x.push(fc)
            }
        })
        setCurrentFlowChart(x)
        // console.log(currentFlowChart)
    }

    useEffect(() => {
        init();
    }, []);


    return (

        <div>


            {/* {isAuthenticated().user.role === 0 && */}
            <div style={{ backgroundColor: 'rgba(5, 0, 255, 0.4)', height: '1000px' }}>
                <Menu></Menu>
                {
                    !isAuthenticated() && <Redirect to="/signin"></Redirect>
                }
                <div>




                    {
                        !flag && isAuthenticated() && isAuthenticated().user.role === 0 && <h2 style={{ marginLeft: '20%', color: 'black' }}>Please select a Category</h2>
                    }

                    <br></br>
                    <br></br>


                    <div style={{ width: '100%', display: 'flex' ,flexWrap: 'wrap'}}>
                        {

                            !flag && isAuthenticated() && isAuthenticated().user.role === 0 &&
                            categories && categories.map((fc, i) => {
                                return (<div key={i}>
                                    <button style={{marginBottom:'20px', minWidth:'100px', backgroundColor: '#131D5A', color: 'white', padding: '10px', textAlign: 'center', marginLeft: '80px', fontSize: '30px', height: '100px', borderRadius: '10px' }} key={i} value={fc} onClick={(e) => handleClick(e)} >
                                        {fc}
                                    </button>
                                    <br></br>
                                    <br></br>
                                </div>)
                            })
                        }
                    </div>


                </div>


                {/* } */}

                {isAuthenticated() && isAuthenticated().user.role === 1 &&


                    <ReactFlowRenderer />

                }
                {flag && isAuthenticated() && isAuthenticated().user.role === 0 &&
                    <Showflow flow={currentFlowChart}></Showflow>
                }

            </div >



        </div >
    )
}

export default Home;