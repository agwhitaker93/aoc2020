'use strict'

const fs = require('fs')

module.exports.aoc2 = () => {
  const fileContents = fs.readFileSync('./resources/aoc2.txt').toString()
  const splitContents = fileContents.split('\r\n')
  const validPasswords = splitContents.filter(content => {
    if (!content) return false

    const [validation, password] = content.split(':')
    const [minMax, char] = validation.split(' ')
    let [min, max] = minMax.split('-')
    min = parseInt(min)
    max = parseInt(max)

    const matchedChars = password.split('').reduce((accum, curr) => {
      if (curr === char) return accum + 1
      return accum
    }, 0)

    return matchedChars >= min && matchedChars <= max
  })

  console.log('no. of valid passwords: ', validPasswords.length)
}

module.exports.aoc2p2 = () => {
  const fileContents = fs.readFileSync('./resources/aoc2.txt').toString()
  const splitContents = fileContents.split('\r\n')
  const validPasswords = splitContents.filter(content => {
    if (!content) return false

    const [validation, password] = content.split(': ')
    const [firstSecond, char] = validation.split(' ')
    let [first, second] = firstSecond.split('-')
    first = parseInt(first)
    second = parseInt(second)

    const splitPass = password.split('')
    const firstCharMatch = splitPass[first - 1] === char
    const secondCharMatch = splitPass[second - 1] === char

    return (firstCharMatch + secondCharMatch) === 1
  })

  console.log('no. of valid passwords: ', validPasswords.length)
}
