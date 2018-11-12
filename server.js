// server.js
// andrewj 2018-11-13

const express = require('express')
const ch = require('./chords.js')

const app = express()

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.get('/chords', (req, res) => {
  console.log('GET /chords')
  res.json(ch.chords)
})


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

// The End