# Chordal API

A musical API focusing on chords. 

**WORK IN PROGRESS**

## API 

### List available chords

`GET /chords` 

Return the available chords names, and alternatives.

### Return chord notes

`GET /chord/<note>/<chord>`

* `note`: the name of a note, e.g C, F#, Ab
* `chord`: a named chord, e.g. min, maj7, sus4

Examples

* `GET /chord/E/min`
* `GET /chord/Gb/maj7`

Notes

* Double sharps and flats (e.g. F##) , and naturals are not handled.
* Unicode characters not handled (♯, ♭, ♮) yet



Project [i:513761]
