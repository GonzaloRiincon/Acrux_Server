const Concert = require("../models/Concert.model")

const router = require("express").Router()

router.get('/getFilteredConcerts', (req, res, next) => {

    const { artist, city } = req.query

    if (artist && city) {
        Concert
            .find({
                $and: [
                    { 'artist': { '$regex': artist, '$options': 'i' } },
                    { 'city': { '$regex': city, '$options': 'i' } }
                ]
            })
            .then(data => res.json(data))
            .catch(err => next(err))
    }

    if (!city) {
        Concert
            .find({ 'artist': { '$regex': artist, '$options': 'i' } })
            .then(data => res.json(data))
            .catch(err => next(err))
    }

    if (!artist) {
        Concert
            .find({ 'city': { '$regex': city, '$options': 'i' } })
            .then(data => res.json(data))
            .catch(err => next(err))
    }

    if (!artist && !city) {
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
        .then(concert => res.json(concert))
        .catch(err => next(err))
})

module.exports = router