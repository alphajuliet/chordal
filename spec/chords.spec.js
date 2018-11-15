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
  })
})

// The End
