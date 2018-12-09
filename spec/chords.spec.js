// chords.spec.js
// andrewj 2018-11-15

// Imports
const ch = require('../chords.js'),
      R = require('ramda')

// ---------------------------------
describe("Sanity check", () => {
  it("must be true", () => {
    const a = true;
    expect(a).toBe(true);
  })
})

// ---------------------------------
describe("Lookup functions", () => {
  it("converts a note to a number", () => {
    expect(ch.noteToNum('C')).toBe(0)
    expect(ch.noteToNum('G')).toBe(7)
    expect(ch.noteToNum('X')).toBeNull()
  })

  it("converts a number to notes", () => {
    expect(ch.numToNote(2)).toEqual(["D"])
  })
})

// ---------------------------------
describe("Get chord info", () => {
  it("returns a chord", () => {
    const c = ch.getChord("C", "min", 0)
    expect(R.prop('chord', c)).toEqual("C_min")
    expect(R.prop('transpose', c)).toEqual(0)
    expect(R.prop('inversion', c)).toEqual(0)
    expect(R.length(R.prop('notes', c))).toEqual(3)
  })
})

// ---------------------------------
describe("Rotates a list", () => {
  it("to the left", () => {
    expect(ch.rotateLeft(1, [1, 2, 3])).toEqual([2, 3, 1])
    expect(ch.rotateLeft(2, [1, 2, 3, 4])).toEqual([3, 4, 1, 2])
    expect(ch.rotateLeft(0, [1, 2, 3])).toEqual([1, 2, 3])
    expect(ch.rotateLeft(4, [1, 2, 3, 4])).toEqual([1, 2, 3, 4])
    expect(ch.rotateLeft(5, [1, 2, 3, 4])).toEqual([2, 3, 4, 1])
  })
})

// ---------------------------------
describe("Transpose a list of notes", () => {
  it("transposes", () => {
    expect(R.prop("notes", ch.transposeNotes(2, ["C", "D", "E"]))).
      toEqual(["D","E","F#"])
    expect(R.prop("notes", ch.transposeNotes(2, ["c#", "d", "e"]))).
      toEqual(["D#","E","F#"])
  })
})

// ---------------------------------

// The End
