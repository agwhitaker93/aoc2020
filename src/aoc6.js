'use strict'

const fs = require('fs')

const aoc6 = () => {
  const fileContents = fs.readFileSync('./resources/aoc6.txt').toString()
  const splitGroups = fileContents.split('\r\n\r\n')
  const answersPerGroup = splitGroups.map((group) => {
    const individualAnswers = group.split('\r\n')
    return individualAnswers.reduce((accum, curr) => {
      if (!curr) return accum
      let { people, answers } = accum
      people++ // we have another person we're counting for
      const splitAnswers = curr.split('')
      splitAnswers.forEach((splitAnswer) => {
        if (answers[splitAnswer] > 0) {
          answers[splitAnswer] = answers[splitAnswer] + 1
        } else {
          answers[splitAnswer] = 1
        }
      })
      return { people, answers }
    }, { people: 0, answers: {} })
  })

  const answersCount = answersPerGroup.reduce((accum, curr) => {
    return accum + Object.keys(curr.answers).length
  }, 0)

  console.log(answersCount)

  return answersPerGroup
}

module.exports.aoc6 = aoc6
module.exports.aoc6p2 = () => {
  const answersPerGroup = aoc6()

  const newAnswers = answersPerGroup.reduce((accum, cur) => {
    const { people, answers } = cur
    const validAnswers = Object.keys(answers).filter((answerChar) => {
      return people === answers[answerChar]
    })
    return [...accum, ...validAnswers]
  }, [])
  console.log(newAnswers.length)
}
