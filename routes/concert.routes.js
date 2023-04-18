const Concert = require("../models/Concert.model")

const router = require("express").Router()

router.post('/getFilteredConcerts', (req, res, next) => {

    const { artist, city } = req.body
    if (artist && city) {
        Concert
            .find({
                $and: [
                    { 'artist': { '$regex': artist, '$options': 'i' } },
                    { 'city': { '$regex': city, '$options': 'i' } }
                ]
            })
            .then(data => res.status(200).json(data))
            .catch(err => next(err))
    }

    else if (!city) {
        Concert
            .find({ 'artist': { '$regex': artist, '$options': 'i' } })
            .then(data => res.status(200).json(data))
            .catch(err => next(err))
    }

    else if (!artist) {
        Concert
            .find({ 'city': { '$regex': city, '$options': 'i' } })
            .then(data => res.status(200).json(data))
            .catch(err => next(err))
    }

    else if (!artist && !city) {
        Concert
            .find()
            .then(data => res.json(data))
            .catch(err => next(err))
    }
})

router.get('/details/:id', (req, res, next) => {
    const { id } = req.params
    Concert
        .findById(id)
        .then(data => res.status(200).json(data))
        .catch(err => next(err))
})

module.exports = router