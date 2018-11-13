// chords.js
// Define all the chord stuff
// andrewj 2018-11-12

// Imports
const R = require('ramda'),
      Maybe = require('folktale/maybe')

// Type aliases:
// type Note = String
// type Chord = { String, [Note], String }

// ---------------------------------
// Vocabulary of note names
// scale: [[Note]]
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
// chords :: [Chord]
const all_chords = [
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
// noteLookup :: Note -> Integer
const noteToNum = (noteName) => {
  return R.findIndex(R.contains(noteName))(scale)
}

const numToNote = (n) =>
  R.nth(n, scale)

// Map a list of integers to note names
// chordToNotes :: [Integer] -> [Note]
const chordToNotes = (lst) => {
  R.map(n => R.nth(n, scale), lst) 
}


// ---------------------------------
// Transpose a note by n
const transpose = R.curry(
  (n, root) => R.modulo(root + n, 12))

// Transpose a note
// transpose :: Integer -> Note -> [Note]
const transposeNote = R.curry(
  (n, note) => R.compose(numToNote, transpose(n), noteToNum)(note))


// Look up the chord numbers from the name
// chordLookup :: [Chord] -> String -> [Integer]
const chordLookup = R.curry(
  (chordList, chordName) => R.compose(R.prop('notes'), 
                                      R.find(R.propEq('name', chordName)))(chordList))


// ---------------------------------
// Get a chord, with optional transpose
// getChord :: Note -> Chord -> { String, Integer, [Note] }
const getChord = (rootNote, chord, tr = 0) => {
  
  // 1. Convert chord to list of notes
  // 2. Transpose to the new root note
  // 3. Transpose by the given parameter
  // 4. Convert to note names
  
  const notes = R.compose( 
    R.map(numToNote),
    R.map(transpose(tr)),
    R.map(transpose(noteToNum(rootNote))),
    chordLookup(all_chords))
  (chord)
  
  return { 
    "chord": `${rootNote}${chord}`, 
    "transpose": tr,
    "notes": notes
  }
}

// ---------------------------------
module.exports = Object.freeze({ 
  scale, 
  all_chords, 
  getChord
})

// The End