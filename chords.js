// chords.js
// Define all the chord stuff
// andrewj 2018-11-12

const R = require('ramda')

// Vocabulary of note names
const all_notes = [
  ["C", "B#"], 
  ["C#", "Db"], 
  ["D"], 
  ["D#", "Eb"], 
  ["E", "Fb"], 
  ["F", "E#"], 
  ["F#", "Gb"], 
  ["G"], 
  ["G#", "Ab"], 
  ["A"], 
  ["A#", "Bb"], 
  ["B", "Cb"]
]

// Database of chords
// @@TODO Add more chords
const chords = {
    "maj":     [0, 4, 7],        // major
    "min":     [0, 3, 7],        // minor
    "7":       [0, 4, 7, 10],    // 7th
    "min7":    [0, 3, 7, 10],    // minor 7th
    "maj7":    [0, 4, 7, 11],    // major 7th
    "minmaj7": [0, 3, 7, 11],    // minor/major 7th
    "dim":     [0, 3, 6],        // diminished
    "aug":     [0, 4, 8],        // augmented
    "dim7":    [0, 3, 6, 9],     // diminished 7th
    "aug7":    [0, 4, 8, 10],    // augmented 7th
    "maj6":    [0, 4, 7, 9],     // major 6th
    "sus2":    [0, 2, 7],        // suspended 2nd
    "sus4":    [0, 5, 7],        // suspended 4th
}

const chord_names = () => R.keys(chords)


exports = {
   chord_names 
}

// The End