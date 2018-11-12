// chords.js
// Define all the chord stuff
// andrewj 2018-11-12

const R = require('ramda')

// Base chromatic scale in sharps
const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

// Database of chords
// @@TODO Add more chords
const chords = {
    "maj":    [0, 4, 7],        // major
    "min":    [0, 3, 7],        // minor
    "7":      [0, 4, 7, 10],    // 7th
    "min7":   [0, 3, 7, 10],    // minor 7th
    "maj7":   [0, 4, 7, 11],    // major 7th
    "sus2":   [0, 2, 7],        // suspended 2nd
    "sus4":   [0, 5, 7],        // suspended 4th
    "dim":    [0, 4, 6],        // diminished
    "aug":    [0, 4, 8]         // augmented
}

const chord_names = () => R.keys(chords)


exports = {
   chord_names 
}

// The End