//user side flowchart playground to find correct flowchart

import { useStopwatch } from 'react-timer-hook';
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Menu from "../core/Menu"
import ReactFlow, {
    removeElements,
    updateEdge,
    addEdge,
    Background,
    MiniMap,
    Controls
} from "react-flow-renderer";
import { nodeTypes } from "../react-flow-renderer/Nodes";
import { getFlow, sendTimeData } from './apiHelper'
const Displayflow = (props) => {
    const [elements, setElements] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [arr, setArr] = useState([])
    const [flag, setFlag] = useState(false)
    const [activeNode, setActiveNode] = useState();
    const [clicked, setClicked] = useState(false)
    const [newName, setNewName] = useState("");
    const [instance, setInstance] = useState();
    const [time, setTime] = useState(1000)
    const [data, setData] = useState(false)
    const [button, setButton] = useState(false)
    const [hint, setHint] = useState(false)
    const [penal, setPenal] = useState(0)
    const [leader, setLeader] = useState([])
    const {
        seconds,
        minutes,
    } = useStopwatch({ autoStart: true });

    useEffect(() => {
        console.log(props.elements)
        showCurrentFlow(props.match.params.id)
        if (activeNode) setNewName(activeNode.data.label);
    }, [activeNode]);

    const connectHandler = (params) => {
        setElements((prev) => addEdge(params, prev));
    };
    const edgeUpdateHandler = (oldEdge, newConnection) =>
        setElements((els) => updateEdge(oldEdge, newConnection, els));

    const onLoad = (reactFlowInstance) => {
        setInstance(reactFlowInstance);
        reactFlowInstance.fitView();
    };
    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    var arr1 = []
    const showCurrentFlow = (id) => {
        getFlow(id)
            .then(data => {
                if (data.error) {

                } else {
                    setData(data)
                    setTime(data.best_time)
                    console.log(data)
                    setAnswer(data.nodes)
                    let x = data.nodes;
                    let y = []
                    let q = []
                    for (let i of x) {
                        if (i.hasOwnProperty("position")) {
                            y.push(i)
                        }
                        else if (i["flg"] === 1) {
                            console.log(i)
                            q = elements
                            q.push(i)

                        }
                        else {
                            let p = arr
                            p.push(i)
                            setArr(p)
                        }

                    }
                    y = shuffle(y)
                    let z = 0
                    for (let i of y) {

                        i["position"]["x"] = 0
                        i["position"]["y"] = 100 * z
                        z++;
                    }
                    for (let i = 0; i < q.length; i++) {
                        y.push(q[i])
                    }
                    console.log(y)
                    setElements(y)

                }
            });
    }
    const saveChangesHandler = () => {
        setClicked(true)

        if (elements.length !== answer.length)
            console.log("wrong answer")
        else {

            // for (let ele of answer) {
            //     const index = elements.findIndex((element) => JSON.stringify(element) === JSON.stringify(ele);
            //     if (index === -1)
            //         console.log("wrong ")
            // }
            var x = elements
            for (let i of x) {
                if (i.hasOwnProperty("position") === false) {
                    arr1.push(i)
                }
            }

            arr.sort();
            arr1.sort();
            console.log(arr)
            console.log(arr1)
            let i = 0

            for (i = 0; i < arr.length; i++) {

                let src = arr[i]["source"]

                var index = arr1.findIndex((a) => (a["source"] === src))

                if (arr1[index]["target"] !== arr[i]["target"]) {
                    console.log("wrong answer")

                    break;
                }
            }
            if (i == arr.length) {
                console.log("correct")
                setFlag(true)
                let w = minutes * 60 + seconds + penal
                let u = data.leaderboard
                let r = JSON.parse(localStorage.getItem('jwt')).user["name"]
                u.push({ name: r, time: w })
                let o = {
                    leaderboard: u
                }
                sendTimeData(props.match.params.id, o).then(data => {
                    console.log(data)

                    console.log(time > w)
                    if (time > w) {
                        setTime(w)
                        let g = {
                            best_time: w,
                            best_name: JSON.parse(localStorage.getItem('jwt')).user["name"]
                        }
                        sendTimeData(props.match.params.id, g).then(data => {
                            console.log(data)
                        })
                    }
                })
            }
        }

    };
    const buttonHandler = () => {
        setButton(true)
        alert("You will be penalized")
        console.log(minutes)
        setPenal(10)
    }
    // const hintHandler = () => {
    //     setHint(true)
    //     alert(data.hint)
    //     setHint(false)
    // }
    const leaderHandler = () => {
        setLeader(data.leaderboard)
    }

    return (<div  style={{ backgroundColor: 'rgba(5,0,255,0.4)' 
    // backgroundImage: 'url("https://unsplash.com/photos/8ob67fX0mk0")',
}}>
        <Menu></Menu>
        <div>

            {/* <h3 style={{ color: 'darkBlue' }}>
                Best Score: {data && data.best_time}<br></br>
                By:{data && data.best_name}
            </h3> */}


    

            <div style={{ display: 'flex' }}>
                {/* <button style={{ marginLeft: '150px', backgroundColor: 'black', color: 'white', paddingLeft: '20px', width: '300px', height: '60px', borderRadius: '40px' }} onClick={leaderHandler}>Show Leaderboard</button>
                {
                    JSON.stringify(leader)} */}
                <br></br><br></br>

                {!button &&
                    <div style={{             
                        appearance: 'button',
                        backgroundColor: '#131D5A',
                        backgroundImage: 'none',
                        border: '1px solicd #000',
                        borderRadius: '4px',
                        boxShadow: '#fff 4px 4px 0 0,#000 4px 4px 0 1px',
                        boxSizing: 'border-box',
                        color: '#fff',
                        cursor: 'pointer', 
                        fontSize: '20px',
                        margin: '0 260px 10px 13%',
                        fontWeight: '650',
                        lineHeight: '20px',
                        overflow: 'visible',
                        padding: '20px 30px',
                        textAlign: 'center',
                        textTransform: 'none',
                        touchAction: 'manipulation',
                        userSelect: 'none',
                        webkitUserSelect: 'none',
                        verticalAlign: 'middle',
                        whiteSpace: 'nowrap', 
            }} onClick={buttonHandler}>
                Show Hint</div>
            }

                {button && <p style={{            
                        appearance: 'button',
                        backgroundColor: '#131D5A',
                        backgroundImage: 'none',
                        border: '1px solicd #000',
                        borderRadius: '4px',
                        boxShadow: '#fff 4px 4px 0 0,#000 4px 4px 0 1px',
                        boxSizing: 'border-box',
                        color: '#fff',
                        cursor: 'pointer', 
                        fontSize: '20px',
                        margin: '0 260px 10px 13%',
                        fontWeight: '650',
                        lineHeight: '20px',
                        overflow: 'visible',
                        padding: '20px 30px',
                        textAlign: 'center',
                        textTransform: 'none',
                        touchAction: 'manipulation',
                        userSelect: 'none',
                        webkitUserSelect: 'none',
                        verticalAlign: 'middle',
                        whiteSpace: 'nowrap',  }}>
                {data.hint}</p>}

                <h1 style={{ backgroundColor: '#131D5A',
                backgroundImage: 'none',
                border: '1px solid #000',
                borderRadius: '4px',
                boxShadow: '#fff 4px 4px 0 0,#000 4px 4px 0 1px',
                boxSizing: 'border-box',
                color: '#fff',
                cursor: 'pointer',
                display: 'inline-block',
                fontFamily: 'ITCAvantGardeStd-Bk,Arial,sans-serif',
                fontSize: '45px',
                fontWeight: '400',
                lineHeight: '20px',
                margin: '0 5px 10px 40px',
                overflow: 'visible',
                padding: '12px 40px',
                textAlign: 'center',
                textTransform: 'none',
                touchAction: 'manipulation',
                userSelect: 'none',
                webkitUserSelect: 'none',
                verticalAlign: 'middle',
                whiteSpace: 'nowrap', }}>
                    <span>{minutes}</span>:<span>{seconds}</span>
                </h1>
                {!clicked && <div style={{ appearance: 'button',
                backgroundColor: '#131D5A',
                backgroundImage: 'none',
                border: '1px solid #000',
                borderRadius: '4px',
                boxShadow: '#fff 4px 4px 0 0,#000 4px 4px 0 1px',
                boxSizing: 'border-box',
                color: '#fff',
                cursor: 'pointer',
                display: 'inline-block',
                fontFamily: 'ITCAvantGardeStd-Bk,Arial,sans-serif',
                fontSize: '20px',
                fontWeight: '650',
                lineHeight: '20px',
                margin: '0px 5px 10px 320px',
                overflow: 'visible',
                padding: '12px 40px',
                textAlign: 'center',
                textTransform: 'none',
                touchAction: 'manipulation',
                userSelect: 'none',
                webkitUserSelect: 'none',
                verticalAlign: 'middle',
                whiteSpace: 'nowrap', }} type="button" onClick={saveChangesHandler}>
                    Submit
                </div>
                }
                {
                    flag && <div style={{ appearance: 'button',
                backgroundColor: 'green',
                backgroundImage: 'none',
                border: '1px solid #000',
                borderRadius: '4px',
                boxShadow: '#fff 4px 4px 0 0,#000 4px 4px 0 1px',
                boxSizing: 'border-box',
                color: '#fff',
                cursor: 'pointer',
                display: 'inline-block',
                fontFamily: 'ITCAvantGardeStd-Bk,Arial,sans-serif',
                fontSize: '20px',
                fontWeight: '650',
                lineHeight: '20px',
                margin: '0px 5px 10px 290px',
                overflow: 'visible',
                padding: '20px 40px',
                textAlign: 'center',
                textTransform: 'none',
                touchAction: 'manipulation',
                userSelect: 'none',
                webkitUserSelect: 'none',
                verticalAlign: 'middle',
                whiteSpace: 'nowrap', }}>
                      Correct!🚀
                    </div>
                }
                {

                    !flag && clicked && <div style={{ appearance: 'button',
                backgroundColor: 'red',
                backgroundImage: 'none',
                border: '1px solid #000',
                borderRadius: '4px',
                boxShadow: '#fff 4px 4px 0 0,#000 4px 4px 0 1px',
                boxSizing: 'border-box',
                color: '#fff',
                cursor: 'pointer',
                display: 'inline-block',
                fontFamily: 'ITCAvantGardeStd-Bk,Arial,sans-serif',
                fontSize: '20px',
                fontWeight: '650',
                lineHeight: '20px',
                margin: '0px 5px 10px 290px',
                overflow: 'visible',
                padding: '20px 40px',
                textAlign: 'center',
                textTransform: 'none',
                touchAction: 'manipulation',
                userSelect: 'none',
                webkitUserSelect: 'none',
                verticalAlign: 'middle',
                whiteSpace: 'nowrap',  }}>
                Wrong one🙁
                </div>
                }

            </div>
            <div
                style={{
                    height: "86vh",
                    width: "75vw",
                    border: "1px solid black",
                    marginLeft: "12.5vw",
                    backgroundColor: 'rgba(19, 29, 90, 0.8)'
                }}
            >

                <ReactFlow
                    elements={elements}
                    onConnect={connectHandler}
                    deleteKeyCode={8 || 46}
                    onEdgeUpdate={edgeUpdateHandler}
                    nodeTypes={nodeTypes}
                    snapToGrid={true}
                    snapGrid={[16, 16]}
                    connectionLineStyle={{ stroke: "black", strokeWidth: 2 }}
                    onLoad={onLoad}
                >
                    {/* <Background variant="dots" gap={15} size={2} color="#c8c8c8" /> */}

                    <MiniMap
                        nodeColor={(node) => {
                            switch (node.type) {
                                case "rectangle":
                                    return "red";
                                case "startNode":
                                    return "#00ff00";
                                case "endNode":
                                    return "rgb(0,0,255)";
                                case "paraNode":
                                    return "rgb(120,120,120)"
                                default:
                                    return "#eee";
                            }
                        }}
                    />

                    <Controls />
                </ReactFlow>






            </div>
        </div></div>
    );
};

export default withRouter(Displayflow);