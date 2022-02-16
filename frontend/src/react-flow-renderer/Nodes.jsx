import React from "react";
import { Handle } from "react-flow-renderer";
import './diamond.css'
const RectangleNode = ({ data }) => {
  return (
    <div style={{ background: "yellow", padding: "1rem",border:"2px solid black" }}>
      <Handle
        type="target"
        position="top"
        id={`${data.id}.top`}
        style={{ borderRadius: 0 }}
      />
      <div id={data.id}>{data.label}</div>
      <Handle
        type="source"
        position="bottom"
        id={`${data.id}.bottom`}
        style={{ borderRadius: 0 }}
      />
    </div>
  );
};

const ParaNode = ({ data }) => {
  return (
    <div style={{
      background: "lightBlue", padding: "1rem",
      transform: "skew(155deg)",border:"2px solid black"
    }}>
      <Handle
        type="target"
        position="top"
        id={`${data.id}.top`}
        style={{ borderRadius: 0 }}
      />
      <div id={data.id}>{data.label}</div>
      <Handle
        type="source"
        position="bottom"
        id={`${data.id}.bottom`}
        style={{ borderRadius: 0 }}
      />
    </div>
  );
};

const DiamondNode = ({ data }) => {
  return (
    <div style={{
      background: 'orange',
      transform: 'rotate(45deg)',
      minWidth: '100px',
      minHeight: '100px',
      width: '60%',
      height: '60%',
      textAlign: 'left'
      ,border:"2px solid black"
    }}>


      <Handle
        type="target"
        position="top"
        id={`${data.id}.top`}
        style={{ left: "0%", borderRadius: 0 }}
      />
      <Handle
        type="source"
        position="top"
        id={`${data.id}.top`}
        style={{ left: "100%", borderRadius: 0 }}
      />

      <div className="mydiv" id={data.id}>{data.label}</div>
      <Handle
        type="source"
        position="bottom"
        id={`${data.id}.bottom`}
        style={{ left: "0%", borderRadius: 0 }}
      />
    </div >
  );
};


const StartNode = ({ data }) => {
  return (
    <div
      style={{
        background: "lightGreen", padding: "1rem", borderRadius: '50%',border:"2px solid black"
      }}
    >
      <div id={data.id}>{data.label}</div>
      <Handle
        type="source"
        position="bottom"
        id={`${data.id}.bottom`}
        style={{ borderRadius: 0 }}
      />
    </div>
  );
};

const EndNode = ({ data }) => {
  return (
    <div
      style={{
        background: "lightGreen", padding: "1rem", borderRadius: '50%',border:"2px solid black"
      }}
    >
      <Handle
        type="target"
        position="top"
        id={`${data.id}.top`}
        style={{ borderRadius: "0" }}
      />
      <div id={data.id}>{data.label}</div>
    </div>
  );
};

export const nodeTypes = {
  rectangle: RectangleNode,
  startNode: StartNode,
  endNode: EndNode,
  paraNode: ParaNode,
  diamond: DiamondNode

};