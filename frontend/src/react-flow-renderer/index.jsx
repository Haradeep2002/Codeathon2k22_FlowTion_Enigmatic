//admin side to create flowchart

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import ReactFlow, {
  removeElements,
  updateEdge,
  addEdge,
  Background,
  MiniMap,
  Controls
} from "react-flow-renderer";
import { saveFlow } from "./apiUser";

import { nodeTypes } from "./Nodes";

const ReactFlowRenderer = (props) => {
  const [elements, setElements] = useState([]);

  const [name, setName] = useState("");
  const [flowname, setflowName] = useState("");
  const [catname, setcatName] = useState("");
  const [activeNode, setActiveNode] = useState();
  const [newName, setNewName] = useState("");
  const [instance, setInstance] = useState();
  const [hint, setHint] = useState("");

  useEffect(() => {
    if (activeNode) setNewName(activeNode.data.label);
  }, [activeNode]);

  const elementRemoveHandler = (elementTobeRemoved) => {
    setElements((prev) => removeElements(elementTobeRemoved, prev));
  };

  const connectHandler = (params) => {
    setElements((prev) => addEdge(params, prev));
  };

  const addRectangleHandler = () => {
    const newNode = {
      id: `${Date.now()}`,
      data: { label: `${name}` },
      type: "rectangle",
      position: {
        x: 0,
        y: 0
      }
    };
    newNode.data = { ...newNode.data, id: `${newNode.id}` };

    setElements((prev) => {
      return [...prev, newNode];
    });
    setName("");
  };
  const addDiamondHandler = () => {
    const newNode = {
      id: `${Date.now()}`,
      data: { label: `${name}` },
      type: "diamond",
      position: {
        x: 100,
        y: 0
      }
    };
    newNode.data = { ...newNode.data, id: `${newNode.id}` };

    const newNode1 = {
      id: `${Date.now() + 1}`,
      data: { label: `Yes` },
      type: "rectangle",
      position: {
        x: 0,
        y: 100
      }
    };
    newNode1.data = { ...newNode1.data, id: `${newNode1.id}` };

    const newNode2 = {
      id: `${Date.now() + 2}`,
      data: { label: `No` },
      type: "rectangle",
      position: {
        x: 200,
        y: 100
      }
    };
    newNode2.data = { ...newNode2.data, id: `${newNode2.id}` };


    const edge1 = {
      id: `${Date.now() + 3}`,
      source: `${newNode.id}`,
      // target: '2',
      sourceHandle: `${newNode.id}.bottom`,
      target: `${newNode1.id}`,
      targetHandle: `${newNode1.id}.top`,
      flg: 1
    }

    const edge2 = {
      id: `${Date.now() + 4}`,
      source: `${newNode.id}`,
      sourceHandle: `${newNode.id}.top`,
      target: `${newNode2.id}`,
      targetHandle: `${newNode2.id}.top`,
      flg: 1
    }

    setElements((prev) => {
      return [...prev, newNode, newNode1, newNode2, edge1, edge2];
    });
    console.log(elements)
    setName("");
  };

  const addParalellogramHandler = () => {
    const newNode = {
      id: `${Date.now()}`,
      data: { label: `${name}` },
      type: "paraNode",
      position: {
        x: 0,
        y: 0
      }
    };
    newNode.data = { ...newNode.data, id: `${newNode.id}` };

    setElements((prev) => {
      return [...prev, newNode];
    });
    setName("");
  };

  const addStartHandler = () => {
    const newNode = {
      id: `${Date.now()}`,
      data: { label: `${name}` },
      type: "startNode",
      position: {
        x: 0,
        y: 0
      }
    };
    newNode.data = { ...newNode.data, id: `${newNode.id}` };

    setElements((prev) => {
      return [...prev, newNode];
    });
    setName("");
  };

  const addEndHandler = () => {
    const newNode = {
      id: `${Date.now()}`,
      data: { label: `${name}` },
      type: "endNode",
      position: {
        x: 0,
        y: 0
      }
    };
    newNode.data = { ...newNode.data, id: `${newNode.id}` };

    setElements((prev) => {
      return [...prev, newNode];
    });
    setName("");
  };


  const edgeUpdateHandler = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));

  const clickHandler = (e) => {
    var htmlString = e.target.outerHTML.toString();
    var index = htmlString.indexOf(` id="`);
    index += 5;
    const currentId = htmlString.substr(index, 13);

    elements.forEach((_current) => {
      if (_current.id === currentId) {
        setActiveNode(_current);
      }
    });
    // setNewName(activeNode.data.label)
  };

  const updateNodeHandler = () => {
    if (!activeNode) return;
    setElements(
      elements.map((_current) => {
        if (_current.id === activeNode.id) {
          return {
            ..._current,
            data: { label: newName, id: _current.data.id }
          };
        }

        return _current;
      })
    );
  };

  const onLoad = (reactFlowInstance) => {
    setInstance(reactFlowInstance);
    reactFlowInstance.fitView();
  };

  const saveChangesHandler = () => {
    let x = {}
    x["nodes"] = instance.getElements()
    x["name"] = flowname
    x["category"] = catname
    x["hint"] = hint
    saveFlow(JSON.stringify(x))
      .then(data => {
        if (data.error) {

        } else {
          console.log(data)
          // props.history.push('/')
          alert("changes saved")
        }
      });
  };

  return (
    <div><div>
      <h1>Create Flow Chart</h1>
      <label>Enter name of your flowchart :</label>
      <input
        value={flowname}
        onChange={(e) => setflowName(e.target.value)}
        type="text"
        placeholder="flowchart name"
      />
      <br></br>
      <label>Enter the category  : </label>
      <input
        value={catname}
        onChange={(e) => setcatName(e.target.value)}
        type="text"
        placeholder="category"
      /><br></br>
      <label>Enter hint  : </label>
      <input
        value={hint}
        onChange={(e) => setHint(e.target.value)}
        type="text"
        placeholder="hint"
      />

    </div>
      <br></br>
      <div
        style={{
          height: "87vh",
          width: "87vw",
          border: "1px solid black",
          marginLeft: "6vw",
          backgroundColor: '#131D5A'
        }}
      >

        <ReactFlow
          elements={elements}
          onElementsRemove={elementRemoveHandler}
          onConnect={connectHandler}
          deleteKeyCode={8 || 46}
          onEdgeUpdate={edgeUpdateHandler}
          nodeTypes={nodeTypes}
          snapToGrid={true}
          snapGrid={[16, 16]}
          connectionLineStyle={{ stroke: "black", strokeWidth: 2 }}
          onDoubleClick={clickHandler}
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
                  return "rgb(120,120,120)";

                default:
                  return "#eee";
              }
            }}
          />

          <Controls />
        </ReactFlow>

        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter new node name"
          />
          <button type="button" onClick={addStartHandler}>
            Create Start Node
          </button>
          <button type="button" onClick={addRectangleHandler}>
            Create Rectangle
          </button>
          <button type="button" onClick={addParalellogramHandler}>
            Create Paralellogram
          </button>
          <button type="button" onClick={addEndHandler}>
            Create End Node
          </button>
          <button type="button" onClick={addDiamondHandler}>
            Create Diamond
          </button>
        </div>


        <div>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            type="text"
          />

          <button type="button" onClick={updateNodeHandler}>
            Update
          </button>
        </div>

        <button type="button" onClick={saveChangesHandler}>
          Save changes
        </button>
      </div>
    </div>
  );
};

export default withRouter(ReactFlowRenderer);