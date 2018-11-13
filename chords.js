// chords.js
// Define all the chord stuff
// andrewj 2018-11-12

const R = require('ramda')

// ---------------------------------
// Vocabulary of note names

const scale = [
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

const chords = [
	{ name: "maj",     notes: [0, 4, 7], 				 description: "major (C-E-G)" },
	{ name: "min",     notes: [0, 3, 7],         description: "minor (C-E♭-G)" },
	{ name: "7",       notes: [0, 4, 7, 10],     description: "7th (C-E-G-B♭)" },
	{ name: "min7",    notes: [0, 3, 7, 10],     description: "minor 7th (C-E♭-G-B♭)" },
	{ name: "maj7",    notes: [0, 4, 7, 11],     description: "major 7th (C-E-G-B)" },
	{ name: "minmaj7", notes: [0, 3, 7, 11],     description: "minor/major 7th (C-E♭-G-B)" },
	{ name: "dim",     notes: [0, 3, 6],         description: "diminished (C-E♭-G♭)" },
	{ name: "aug",     notes: [0, 4, 8],         description: "augmented (C-E-G♯)" },
	{ name: "dim7",    notes: [0, 3, 6, 9],      description: "diminished 7th (C-E♭-G♭-B♭♭)" },
	{ name: "aug7",    notes: [0, 4, 8, 10],     description: "augmented 7th (C-E-G♯-B♭)" },
	{ name: "hdim7",   notes: [0, 3, 6, 10],     description: "half-diminished 7th (C-E♭-G♭-B♭)" },
	{ name: "maj6",    notes: [0, 4, 7, 9],      description: "major 6th (C-E-G-A)" },
	{ name: "sus2",    notes: [0, 2, 7],         description: "suspended 2nd (C-D-G)" },
	{ name: "sus4",    notes: [0, 5, 7],         description: "suspended 4th (C-F-G)" },
	{ name: "maj9",    notes: [0, 4, 7, 11, 14], description: "major 9th (C-E-G-B-D)" },
	{ name: "min9",    notes: [0, 3, 7, 10, 14], description: "minor 9th (C-E♭-G-B♭-D)" },
]

// ---------------------------------
// Look up the note number from the name
// noteLookup :: String -> Integer
const noteLookup = (noteName) => {
  const f = (x) => R.find(R.contains(noteName, R.prop("notes", x)), scale)
  return f(noteName)
}

// Map a list of integers to note names
const chordToNotes = (lst) => {
  R.map(n => R.nth(n, scale), lst) 
}

// ---------------------------------
// Get a chord

const getChord = (note, chord) => {
  const match = R.find(R.propEq('name', chord), chords)
  const n = R.map(elt => R.nth(elt, scale), R.prop('notes', match))
  
  return { 
    "chord": `${note}${chord}`, 
    "notes": n 
  }
}


// ---------------------------------
module.exports = Object.freeze({ scale, chords, getChord, noteLookup })

// The End