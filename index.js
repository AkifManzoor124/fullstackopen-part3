require('dotenv').config()
const express = require('express')
const db = require('./models/person')
const fs = require('fs')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const { response } = require('express')

const app = express()

morgan.token('entry', function getEntry (res) {
    return JSON.stringify(res.body)
})

app.use(bodyParser.json())
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :entry'))
app.use(cors())
app.use(express.static('build'))


app.get('/', (req, res) => {
    res.send('hello world')
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id

    db.findByIdAndRemove(req.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.get('/api/persons', (req, res) => {
    console.log("First:" , db)
    db.find ({}).then(result => {
        console.log("Get request", result)
        res.json(result)
    }).catch(error =>{
        console.log(error)
    })
})
 
app.get('/api/persons/:id', (req, res) => {
 
    db.findById(req.params.id).then(person => {
        if (person) {
            res.json(person)
        }
        else {
            res.status(404).end()
        }
    }).catch(error => next(error))
 
})
 
app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log('Body:' , body.number)
    console.log('Body:' , body["number"])
    
    db.find({}).then(result => {
        console.log("Persons:" , result)
    }).catch(error => {
        console.log(error)
    })

    if (body["name"] == undefined || body["number"] == undefined) {
        return res.status(401).json({
            error: 'content missing'
        })
    }
    // else if (db.find((person) => person["number"] == body.number)) {
    //     return res.status(402).json({
    //         error: 'Phone number already exists'
    //     })
    // }
    const person = new db({
        name: body.name,
        number: body.number
    })
    db.save().then(savedNote => {
        res.json(savedNote)
    })
})
 
 
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
 
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
 
    next(error)
}
 
app.use(errorHandler)

app.get('/info/', (req, res) => {
    res.send(`This phonebook has ${db.length} items 
    <br>
    ${new Date}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})