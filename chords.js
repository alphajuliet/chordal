// chords.js
// Define all the chord stuff
// andrewj 2018-11-12

const R = require('ramda')

// ---------------------------------
// Vocabulary of note names

const notes = [
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

// ---------------------------------
// Database of chords
// See https://en.wikipedia.org/wiki/Chord_names_and_symbols_(popular_music)
// @@TODO Add alternative chord names

const chords = {
    "maj":     [0, 4, 7],         // major (C-E-G)
    "min":     [0, 3, 7],         // minor (C-E♭-G)
    "7":       [0, 4, 7, 10],     // 7th (C-E-G-B♭)
    "min7":    [0, 3, 7, 10],     // minor 7th (C-E♭-G-B♭)
    "maj7":    [0, 4, 7, 11],     // major 7th (C-E-G-B)
    "minmaj7": [0, 3, 7, 11],     // minor/major 7th (C-E♭-G-B)
    "dim":     [0, 3, 6],         // diminished (C-E♭-G♭)
    "aug":     [0, 4, 8],         // augmented (C-E-G♯)
    "dim7":    [0, 3, 6, 9],      // diminished 7th (C-E♭-G♭-Bbb)
    "aug7":    [0, 4, 8, 10],     // augmented 7th (C-E-G♯-B♭)
    "hdim7":   [0, 3, 6, 10],     // half-diminished 7th (C-E♭-G♭-B♭)
    "maj6":    [0, 4, 7, 9],      // major 6th (C-E-G-A)
    "sus2":    [0, 2, 7],         // suspended 2nd (C-D-G)
    "sus4":    [0, 5, 7],         // suspended 4th (C-F-G)
    "maj9":    [0, 4, 7, 11, 14], // major 9th (C-E-G-B-D)
    "min9":    [0, 3, 7, 10, 14]  // minor 9th (C-E♭-G-B♭-D)
}

const chord_names = () => R.keys(chords)


// ---------------------------------

exports = {
  notes: notes,
  chords: chords
}

// The End