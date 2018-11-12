// chords.js
// Define all the chord stuff
// andrewj 2018-11-12

const R = require('ramda')

// Base chromatic scale in sharps
const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

// Database of chords
// @@TODO Add more chords
const chords = {
    "maj": [0, 4, 7],
    "min": [0, 3, 7],
    "7": [0, 4, 7, 10],
    "min7": [0, 3, 7, 10],
    "maj7": [0, 4, 7, 11]
}



// The End