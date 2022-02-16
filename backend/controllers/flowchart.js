const Flowchart = require('../models/flowchart')
const saveflow = async (req, res) => {
    console.log("in here")
    const flowchart = new Flowchart(req.body)
    try {
        await flowchart.save()
        res.status(201).send(flowchart)
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}

const updateFlow = async (req, res) => {
    const updates = Object.keys(req.body)
    const id = req.params.id;
    let flowchart = await Flowchart.findById(id)
    console.log(req.body['best_time'])
    try {
        updates.forEach((update) => flowchart[update] = req.body[update])
        console.log(flowchart)
        await flowchart.save()
        res.status(201).send(flowchart)
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}


const read = async (req, res) => {
    try {
        const id = req.params.id;
        const fc = await Flowchart.findById(id)
        if (!fc) {
            throw new Error("flowchart not found")
        }
        res.status(200).send(fc)


    } catch (e) {
        return res.status(400).json({
            error: e
        })

    }
}
const readAll = async (req, res) => {
    try {

        const fc = await Flowchart.find()
        if (!fc) {
            throw new Error("flowchart not found")
        }
        res.status(200).send(fc)


    } catch (e) {
        return res.status(400).json({
            error: e
        })

    }
}


const readAllCat = async (req, res) => {
    try {

        const fc = await Flowchart.find().select("category")
        if (!fc) {
            throw new Error("flowchart not found")
        }
        res.status(200).send(fc)


    } catch (e) {
        return res.status(400).json({
            error: e
        })

    }
}
module.exports = { read, readAll,readAllCat, saveflow,updateFlow }