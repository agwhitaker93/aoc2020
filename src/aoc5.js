'use strict'

const fs = require('fs')

const aoc5 = (rows = 128, cols = 8) => {
  const fileContents = fs.readFileSync('./resources/aoc5.txt').toString()
  const splitContents = fileContents.split('\r\n')
  splitContents.pop()

  const seatIds = splitContents.map((direction) => {
    const rowDirs = direction.split('')
    const colDirs = rowDirs.splice('7')
    const row = rowDirs.reduce((accum, curr) => {
      if (!Array.isArray(accum)) return accum
      let [min, max] = accum
      switch (curr) {
        case 'F':
          max = Math.floor(((max - min) / 2) + min)
          break
        case 'B':
          min = Math.ceil(((max - min) / 2) + min)
          break
      }
      return (min === max) ? min : [min, max]
    }, [0, rows - 1])

    const col = colDirs.reduce((accum, curr) => {
      if (!Array.isArray(accum)) return accum
      let [min, max] = accum
      switch (curr) {
        case 'L':
          max = Math.floor(((max - min) / 2) + min)
          break
        case 'R':
          min = Math.ceil(((max - min) / 2) + min)
          break
      }
      return (min === max) ? min : [min, max]
    }, [0, cols - 1])

    return (row * 8) + col
  })

  function greaterThan (one, two) {
    return one > two ? one : two
  }

  console.log(seatIds.reduce(greaterThan))
  return seatIds
}

module.exports.aoc5 = aoc5
module.exports.aoc5p2 = () => {
  const sortedSeatIds = aoc5()
  sortedSeatIds.sort((a, b) => a - b)
  const possibleSeatIds = sortedSeatIds.filter((seatId, idx) => { // check if our current (seatId - 1) === (prevSeatId + 1), if it does we want that seatId
    if (idx === 0) return false
    const prevSeatId = sortedSeatIds[idx - 1]
    return (seatId - 1) === (prevSeatId + 1)
  }).map((filteredSeatId) => filteredSeatId - 1) // filteredSeatId is the seat with ID greater than the missing seat, -1 from it to get the missing seat ID
  console.log(possibleSeatIds) // only got one seat ID back and that was the corret one, lucky me :D
}
