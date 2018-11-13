// server.js
// andrewj 2018-11-13

const express = require('express'),
const url = require('url')
const md = require('markdown-it')()
const ch = require('./chords.js')


const app = express()

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/README', function (req, res) {
  res.send(md.render(__dirname + '/README.md'))
})

// Get all chords
app.get('/chords', (req, res) => {
  console.log('GET /chords')
  res.json(ch.all_chords)
})

// Get a given chord
app.get('/chord/:note/:chord', (req, res) => {
  const note = req.params.note
  const chord = req.params.chord
  const tr = Number(url.parse(req.url, true).query.transpose || 0)
  
  console.log(`Chord: ${note}${chord}, transpose by ${tr}`)
  res.json(ch.getChord(note, chord, tr))
})

app.get('/test/:x', (req, res) => {
  const x = Number(req.params.x)
  
  console.log(`Test: ${x}`)
  res.json(ch.transpose(x, "G"))
})



// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

// The End