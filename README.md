# Chordal API

A simple musical API focusing on chords. For a list of the available chords, see the first API call below.


## API 

### List available chords

`GET /chords` 

Return the available chords names, their constituent semitones, and descriptions.

The current response is:
```
[{"name":"maj","notes":[0,4,7],"description":"major (C-E-G)"},{"name":"min","notes":[0,3,7],"description":"minor (C-E♭-G)"},{"name":"7","notes":[0,4,7,10],"description":"7th (C-E-G-B♭)"},{"name":"min7","notes":[0,3,7,10],"description":"minor 7th (C-E♭-G-B♭)"},{"name":"maj7","notes":[0,4,7,11],"description":"major 7th (C-E-G-B)"},{"name":"minmaj7","notes":[0,3,7,11],"description":"minor/major 7th (C-E♭-G-B)"},{"name":"dim","notes":[0,3,6],"description":"diminished (C-E♭-G♭)"},{"name":"aug","notes":[0,4,8],"description":"augmented (C-E-G♯)"},{"name":"dim7","notes":[0,3,6,9],"description":"diminished 7th (C-E♭-G♭-B♭♭)"},{"name":"aug7","notes":[0,4,8,10],"description":"augmented 7th (C-E-G♯-B♭)"},{"name":"hdim7","notes":[0,3,6,10],"description":"half-diminished 7th (C-E♭-G♭-B♭)"},{"name":"maj6","notes":[0,4,7,9],"description":"major 6th (C-E-G-A)"},{"name":"sus2","notes":[0,2,7],"description":"suspended 2nd (C-D-G)"},{"name":"sus4","notes":[0,5,7],"description":"suspended 4th (C-F-G)"},{"name":"maj9","notes":[0,4,7,11,14],"description":"major 9th (C-E-G-B-D)"},{"name":"min9","notes":[0,3,7,10,14],"description":"minor 9th (C-E♭-G-B♭-D)"}]
```

### Return chord notes

`GET /chord/<note>/<chord>`

Return the notes in the requested chord, including alternative note names (e.g. C♯ vs D♭).


#### Arguments

* `note`: the name of a note, e.g C, F#, Ab, E
* `chord`: a named chord, e.g. min, maj7, sus4

#### Examples

| Request | Response |
| ------- | -------- |
|`GET /chord/E/min` | `{"chord":"Emin","transpose":0,"notes":[["E","Fb"],["G"],["B","Cb"]]}`|
|`GET /chord/Gb/maj7` | `{"chord":"Gbmaj7","transpose":0,"notes":[["F#","Gb"],["A#","Bb"],["C#","Db"],["F","E#"]]}`|

#### Notes

* Double sharps and flats (e.g. Cx, Abb), and naturals are not handled.
* Unicode characters not handled (♯, 𝄪, ♭, 𝄫, ♮).

### Transpose a chord

`GET /chord/<note>/<chord>?transpose=<n>`

Transpose the notes in the requested chord up/down by `n`.

#### Examples

| Request | Response |
| ------- | -------- |
|`GET /chord/F/maj?transpose=-3` | `{"chord":"Fmaj","transpose":3,"notes":[["G#","Ab"],["C","B#"],["D#","Eb"]]}`|

----

Project [i:513761]
