// chords.js
// Define all the chord stuff
// andrewj 2018-11-12

// Imports
const R = require('ramda'),
      Maybe = require('folktale/maybe')

// ---------------------------------
// Utilities

// rotateLeft :: Integer -> [a] -> [a]
const rotateLeft = R.curry((n, lst) => {
  const len = R.length(lst)
  const nmod = R.modulo(n, len)
  return R.concat(
    R.takeLast(len - nmod, lst), 
    R.take(nmod, lst))
})

// capitalise :: String -> String
const capitalise = R.compose(
  R.join(''),
  R.juxt([R.compose(R.toUpper, R.head), R.tail]))

// ---------------------------------
// Type aliases:
// type Note = String
// type Chord = { [String], [Note], String }

// ---------------------------------
// Vocabulary of note names
// allNotes: [[Note]]
const allNotes = [
  ["C"], 
  ["C#", "Db"], 
  ["D"], 
  ["D#", "Eb"], 
  ["E"], 
  ["F"], 
  ["F#", "Gb"], 
  ["G"], 
  ["G#", "Ab"], 
  ["A"], 
  ["A#", "Bb"], 
  ["B"]
]

// ---------------------------------
// Database of chords
// See https://en.wikipedia.org/wiki/Chord_names_and_symbols_(popular_music)
// chords :: [Chord]
const allChords = [
  { name: ["maj", "major"], notes: [0, 4, 7], description: "major (C-E-G)" },
  { name: ["min", "minor"], notes: [0, 3, 7], description: "minor (C-E♭-G)" },
  { name: ["7", "7th"], notes: [0, 4, 7, 10], description: "7th (C-E-G-B♭)" },
	{ name: ["min7", "min7th", "minor7", "minor7th"], notes: [0, 3, 7, 10], description: "minor 7th (C-E♭-G-B♭)" },
	{ name: ["maj7", "maj7th", "major7", "major7th"], notes: [0, 4, 7, 11], description: "major 7th (C-E-G-B)" },
	{ name: ["minmaj7"], notes: [0, 3, 7, 11], description: "minor/major 7th (C-E♭-G-B)" },
	{ name: ["dim", "diminished"], notes: [0, 3, 6], description: "diminished (C-E♭-G♭)" },
	{ name: ["aug", "augmented"], notes: [0, 4, 8], description: "augmented (C-E-G♯)" },
	{ name: ["dim7", "dim7th"], notes: [0, 3, 6, 9], description: "diminished 7th (C-E♭-G♭-B♭♭)" },
	{ name: ["dimmaj7"], notes: [0, 3, 6, 11], description: "diminished major 7th (C-E♭-G♭-B)" },
	{ name: ["aug7"], notes: [0, 4, 8, 10], description: "augmented 7th (C-E-G♯-B♭)" },
  { name: ["augmaj7"], notes: [0, 4, 8, 11], description: "augmented major 7th (C-E-G♯-B)" },
  { name: ["7b5"], notes: [0, 4, 6, 10], description: "seventh flat 5 (C-E-G♭-B♭)" },
	{ name: ["min7b5"], notes: [0, 3, 6, 10], description: "minor seventh flat 5 (C-E♭-G♭-B♭)" },
  { name: ["maj4"], notes: [0, 4, 5, 7], description: "major 4th (C-E-F-G)" },
  { name: ["min4"], notes: [0, 3, 5, 7], description: "minor 4th (C-E♭-F-G)" },
	{ name: ["maj6"], notes: [0, 4, 7, 9], description: "major 6th (C-E-G-A)" },
	{ name: ["min6"], notes: [0, 3, 7, 9], description: "minor 6th (C-E♭-G-A)" },
	{ name: ["sus2"], notes: [0, 2, 7], description: "suspended 2nd (C-D-G)" },
	{ name: ["sus4"], notes: [0, 5, 7], description: "suspended 4th (C-F-G)" },
	{ name: ["maj9", "maj9th"], notes: [0, 4, 7, 11, 14], description: "major 9th (C-E-G-B-D)" },
	{ name: ["min9", "min9th"], notes: [0, 3, 7, 10, 14], description: "minor 9th (C-E♭-G-B♭-D)" },
	{ name: ["minmaj9"], notes: [0, 3, 7, 11, 14], description: "minor/major 9th (C-E♭-G-B-D)" }
]

// ---------------------------------
// Conversions between note names (A-G) and numbers (0-11)

// noteToNum :: Note -> Integer
const noteToNum = (noteName) => {

  const pred = R.contains(capitalise(noteName))
  const res = R.findIndex(pred, allNotes)

  if (res < 0)
    return null
  else
    return res
}

// numToNote :: Integer -> [Note]
const numToNote = (n) => R.nth(n, allNotes)

// ---------------------------------
// Transpose a note by n
// transpose :: Integer -> Integer -> Integer
const transpose = R.curry((n, root) => 
  R.modulo(root + n, 12))

// ---------------------------------
// Select which note alternates to use based on the root note
// collapseNotes :: Note -> [[Notes]] -> [Notes]
const collapseNotes = R.curry((root, noteList) => {
  if (root.length == 2 && root.substring(1) == "b")
    return R.map(R.last, noteList)
  else
    return R.map(R.head, noteList)
})

// ---------------------------------
// Mapping functions over higher-level types

// Map over a list of note names
// mapNotes :: ([Integer] -> [Integer]) -> [Note] -> [[Note]]
const mapNotes = (fn) => 
  R.compose(
    R.map(numToNote),
    fn,
    R.map(noteToNum))


// Map over a chord
// mapChord :: ([Integer] -> [Integer]) -> Chord -> [[Note]]
const mapChord = (fn) =>
  R.compose(
    R.map(numToNote),
    fn,
    R.prop('notes'))


// ---------------------------------
// findChordByName :: [Chord] -> String -> Chord
const findChordByName = R.curry((chordList, chordName) => 
  R.find(x => R.contains(chordName, R.prop('name', x)))(chordList))

// ---------------------------------
// Get a chord, with optional transpose
// getChord :: Note -> Chord -> Integer -> Integer -> { String, Integer, Integer, [Note] }
const getChord = (rootNote, chord, tr = 0, inv = 0) => {
    
  // 1. Look up chord by name
  // 2. Get the note numbers
  // 3. Transpose to the new root note
  // 4. Transpose by tr
  // 5. Rotate left (inversion) by inv
  // 6. Map back to note names
  // 7. Collapse alternate notes to a single value
  
  try {
    const f = R.compose(
      rotateLeft(inv), 
      R.map(transpose(tr)), 
      R.map(transpose(noteToNum(rootNote))))

    const notes = R.compose(
      collapseNotes(rootNote),
      mapChord(f),
      findChordByName(allChords)
    )(chord)

    return { 
      "chord": `${rootNote}_${chord}`, 
      "transpose": tr,
      "inversion": inv,
      "notes": notes
    }
  }
  catch (err) {
    return { "error": `${err}` }
  }
}


// ---------------------------------
// Transpose a list of notes
// transposeNotes :: Integer -> [String] -> [[Notes]]
const transposeNotes = R.curry((n, notes) => {
  
  const x = R.compose(
    collapseNotes(R.head(notes)),
    mapNotes(R.map(transpose(n)))
  )(notes)

  return {
    "transpose": n,
    "notes": x
  }
})

// ---------------------------------
const test = (x) => {
  return {}
}


// ---------------------------------
module.exports = Object.freeze({ 
  allNotes, 
  allChords, 
  getChord,
  transposeNotes,

  // For unit testing
  test,
  rotateLeft,
  noteToNum,
  numToNote,
  transpose
})

// The End
