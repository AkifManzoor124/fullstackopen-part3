require('dotenv').config()
const express = require('express')
const db = require('./models/person')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

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

app.get('/api/persons', (req, res) => {
  db.find ({}).then(result => {
    res.json(result)
  }).catch(error => {
    console.log(error)
  })
})

app.delete('/api/persons/:id', (req, res) => {

  db.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => {
      console.log(error)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  db.findByIdAndUpdate(req.params.id, person, { new: true, runValidators:true, context:'query' } )
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res) => {

  db.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    }
    else {
      res.status(404).end()
    }
  }).catch(error => {
    console.log(error)
  })

})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body['name'] === undefined || body['number'] === undefined) {
    return res.status(401).json({
      error: 'content missing'
    })
  }
  const person = new db({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  }).catch(error => {
    console.log(error)
  })
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
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