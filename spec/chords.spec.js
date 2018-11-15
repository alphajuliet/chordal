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
    expect(R.prop('chord', c)).toEqual("Cmin")
    expect(R.prop('transpose', c)).toEqual(0)
    expect(R.length(R.prop('notes', c))).toEqual(3)
  })
})

// The End
