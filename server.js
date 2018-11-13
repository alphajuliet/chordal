// server.js
// andrewj 2018-11-13


// Imports
const fs = require('fs'),
      express = require('express'),
      app = express(),
      url = require('url'),
      md = require('markdown-it')(),
      ch = require('./chords.js')

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/README', function (req, res) {
  fs.readFile(__dirname + '/README.md', 'utf8', (err, data) => {
    if (err) 
      console.error(err)
    else {
      console.log(data)
      res.end(md.render(data))
    }
  })
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