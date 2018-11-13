# Chordal API

A simple musical API focusing on chords. For a list of the available chords, see the first API call below.


## API 

### List available chords

`GET /chords` 

Return the available chords names, their constituent semitones, and descriptions.

### Return chord notes

`GET /chord/<note>/<chord>`

Return the notes in the requested chord, including alternative note names (e.g. C♯ vs D♭).


#### Arguments

* `note`: the name of a note, e.g C, F#, Ab, E
* `chord`: a named chord, e.g. min, maj7, sus4

#### Examples

* `GET /chord/E/min`
* `GET /chord/Gb/maj7` ⇒ `{"chord":"Gbmaj7","transpose":0,"notes":[["F#","Gb"],["A#","Bb"],["C#","Db"],["F","E#"]]}`

#### Notes

* Double sharps and flats (e.g. A♭♭) , and naturals are not handled
* Unicode characters not handled (♯, 𝄪, ♭, 𝄫, ♮)

### Transpose

`GET /chord/<note>/<chord>?transpose=<n>`

Transpose the notes in the requested chord up/down by `n`.

#### Examples

* `GET /chord/F/maj?transpose=-3`

----

Project [i:513761]
