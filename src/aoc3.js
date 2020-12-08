'use strict'

const fs = require('fs')

// 1 - 84
// 3 - 228
// 5 - 89
// 7 - 100
// 1,2 - 40
const aoc3 = (xInc = 3, yInc = 1) => {
  const fileContents = fs.readFileSync('./resources/aoc3.txt').toString()
  let splitContents = fileContents.split('\r\n')
  splitContents = splitContents.filter((content, idx) => {
    return (idx % yInc) === 0
  })

  const maxWidth = splitContents[0].length
  let xPos = 0

  const treesHit = splitContents.reduce((accum, curr) => {
    xPos = xPos % maxWidth

    if (curr[xPos] === '#') {
      xPos += xInc
      return accum + 1
    }

    xPos += xInc
    return accum
  }, 0)

  console.log(treesHit)
  return treesHit
}

module.exports.aoc3 = aoc3
module.exports.aoc3p2 = () => {
  const first = aoc3(1, 1)
  const second = aoc3(3, 1)
  const third = aoc3(5, 1)
  const fourth = aoc3(7, 1)
  const fifth = aoc3(1, 2)

  console.log(first * second * third * fourth * fifth)
}
