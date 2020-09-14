const express = require('express')
const db = require('./db.json')
const fs = require('fs')
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


app.get('/', (req, res) => {
    res.send('hello world')
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const persons = db.filter(person => person.id != id)
    fs.writeFile("db.json", JSON.stringify(persons), (err) => {
        if(err) throw err;
        console.log('Deleted entry');
    })
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = db.find(person => person.id == id)
    res.json(person)
})

app.post('/api/persons/', (req,res) => {

    const entry = req.body
    console.log(db.find(person => person.name == res.name))
    if(entry["name"] == undefined || entry["number"] == undefined){
        res.send({error: 'name or number undefined'})
    }else if(db.find(person => person.name == entry.name)){
        res.send({error: 'name already defined'})
    }else{
        const id = Math.floor(Math.random() * 1000)
        entry.id = id;
        db.push(entry)
    
        fs.writeFile("db.json", JSON.stringify(db), (err) => {
            if(err) throw err;
            console.log('Added new entry')
        })
        res.send(db)
    }
})

app.get('/api/persons', (req, res) => {
    res.json(db)
})

app.get('/info/', (req, res) => {
    res.send(`This phonebook has ${db.length} items 
    <br>
    ${new Date}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})