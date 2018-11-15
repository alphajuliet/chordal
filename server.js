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
// Get all chords
app.get('/chords', (req, res) => {
  console.log('GET /chords')

  const json = ch.all_chords
  const status = json.error ? 400 : 200
  res.status(status).json(json)
})

// -------------------------------
// Get a given chord
app.get('/chord/:note/:chord', (req, res) => {
  
  // Get parameters
  const note = req.params.note
  const chord = R.toLower(req.params.chord)
  const tr = Number(url.parse(req.url, true).query.transpose || 0)
  
  // Call service
  console.log(`GET ${req.url}`)
  console.log(`Chord: ${note}${chord}, transpose by ${tr}`)

  const json = ch.getChord(note, chord, tr)
  const status = json.error ? 400 : 200
  res.status(status).json(json)
  
})

// -------------------------------
// Test query
app.get('/test', (req, res) => {
  //const x = Number(req.params.x)
  
  //console.log(`Test: ${x}`)
  res.json(ch.test())
  // res.end("Test")
})


// -------------------------------
// listen for requests :)
const port = 3000
const listener = app.listen(port, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

// The End
