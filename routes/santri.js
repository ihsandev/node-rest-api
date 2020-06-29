const express = require('express')
const router = express.Router()
const Santri = require('../models/Santri')

const verifyToken = require('../routes/verifyToken')

// CREATE
router.post('/', async (req, res) => {
    const santriPost = new Santri({
        nama: req.body.nama,
        alamat: req.body.alamat
    })

    try {
        const santri = await santriPost.save()
        res.json(santri)
    }catch(err){
        res.json({message: err})
    }
})

// READ
router.get('/', verifyToken, async (req, res) => {
    try {
        const santri  = await Santri.find()
        res.json(santri)
    }catch(err){
        res.json({message: err})
    }
})

// UPDATE
router.put('/:santriId', async (req, res) => {
    try{
        const santriUpdate = await Santri.updateOne({_id: req.params.santriId}, {
            nama: req.body.nama,
            alamat: req.body.alamat
        })
        res.json(santriUpdate)
    }catch(err){
        res.json({message: err})
    }
})

// DELETE
router.delete('/:santriId', async (req, res) => {
    try{
        const santriUpdate = await Santri.deleteOne({_id: req.params.santriId})
        res.json(santriUpdate)
    }catch(err){
        res.json({message: err})
    }
})

module.exports = router