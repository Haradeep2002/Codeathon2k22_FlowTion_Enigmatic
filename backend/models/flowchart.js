const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const flowchartSchema = new mongoose.Schema({
    nodes: {
        type: Array,
        default: [],
    },
    name: {
        type: String,
        default: "my flowchart"
    },
    category: {
        type: String,
        default: "category default"
    },
    hint:{
        type:String,
        default:"No hint provided"
    },
    best_time:{
        type:Number,
        default:1000
    },
    best_name:{
        type: String,
        default:'None'
    },
    leaderboard:{
        type:Array,
        default:[]
    }
}, {
    timestamps: true
})
const Flowchart = mongoose.model('Flowchart', flowchartSchema)

module.exports = Flowchart
// data: {label: 'NODE2', id: '1644572106096'}
// id: "1644572106096"
// position: {x: 560, y: 240}
// type: "rectangle"


// id: "reactflow__edge-16445721170561644572117056.right1-16445721060961644572106096.left"
// source: "1644572117056"
// sourceHandle: "1644572117056.right1"
// target: "1644572106096"
// targetHandle: "1644572106096.left"
// type: "default"