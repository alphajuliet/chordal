// server.js
// andrewj 2018-11-13

// Imports
const fs = require('fs'),
      express = require('express'),
      app = express(),
      url = require('url'),
      md = require('markdown-it')(),
      R = require('ramda'),
      ch = require('./chords.js')

// -------------------------------
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Render and display the README.md file with the API documentation
app.get('/README', function (req, res) {
  fs.readFile(__dirname + '/README.md', 'utf8', (err, data) => {
    if (err) 
      console.error(err)
    else {
      res.end(md.render(data))
    }
  })
})

// -------------------------------
// Get the note names
app.get('/allnotes', (req, res) => {
  console.log('GET /allNotes')
  
  const json = ch.allNotes
  const status = json.error ? 400 : 200
  res.status(status).json(json)
})

// -------------------------------
// Get all chords
app.get('/chords', (req, res) => {
  console.log('GET /chords')

  const json = ch.allChords
  const status = json.error ? 400 : 200
  res.status(status).json(json)
})

// -------------------------------
// Get a given chord
app.get('/chord/:note/:chord', (req, res) => {
  
  // Get parameters
  const note = req.params.note
  const chord = R.toLower(req.params.chord)
  const transpose  = Number(url.parse(req.url, true).query.transpose || 0)
  const inversion = Number(url.parse(req.url, true).query.inversion || 0)
  const opts = { transpose, inversion }
  
  // Call service
  console.log(`GET ${req.url}`)
  console.log(`Chord: ${note}_${chord}, transpose by ${transpose}, invert by ${inversion}`)

  const json = ch.getChord(note, chord, opts)
  const status = json.error ? 400 : 200
  res.status(status).json(json)
  
})

// ---------------------------------
// Handle a list of notes
app.get('/notes', (req, res) => {

  // Get arguments
  const tr  = Number(url.parse(req.url, true).query.transpose || 0)
  const notesStr = url.parse(req.url, true).query.list || ""
  const notes = R.split(',', notesStr)

  console.log(`GET ${req.url}`)
  console.log(`Transpose [${notes}] by ${tr} semitone(s)`)

  const json = ch.transposeNotes(tr, opts)
  const status = json.error ? 400 : 200
  res.status(status).json(json)
})


// ---------------------------------
// Get all available scales
app.get('/scales', (req, res) => {
  console.log('GET /scales')
  
  const json = ch.allScales
  const status = json.error ? 400 : 200
  res.status(status).json(json)
})

// ---------------------------------
// Return a requested scale
app.get('/scale/:note/:scale', (req, res) => {

  const note = req.params.note
  const scale = req.params.scale
  const tr  = Number(url.parse(req.url, true).query.transpose || 0)

  console.log(`GET ${req.url}`)
  console.log(`Scale: ${note} ${scale}`)

  const json = ch.getScale(note, scale, tr)
  const status = json.error ? 400 : 200
  res.status(status).json(json)
})


// -------------------------------
// Test query
app.get('/test', (req, res) => {
  const json = R.compose(
    R.map(ch.numToNote),
    R.map(ch.transpose(2)),
    R.map(ch.noteToNum)
  )(["C", "D", "E"])
  const status = json.error ? 400 : 200
  res.status(status).json(json)
})


// -------------------------------
// listen for requests :)
const port = 3000
const listener = app.listen(port, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

// The End
