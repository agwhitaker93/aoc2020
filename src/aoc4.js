'use strict'

const fs = require('fs')

const aoc4 = (requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']) => {
  const fileContents = fs.readFileSync('./resources/aoc4.txt').toString()
  const splitContents = fileContents.split('\r\n')

  const discretePassports = splitContents.reduce((accum, curr) => {
    if (curr) { // we have a value
      accum[0] = `${accum[0]} ${curr}`
    } else { // or we don't
      accum.unshift('')
    }
    return accum
  }, [''])
  if (!discretePassports[0]) discretePassports.shift()

  const validPassports = discretePassports.filter(passport => {
    const fields = passport.split(' ')
    const fieldsAsObj = fields.reduce((accum, curr) => {
      const [key, val] = curr.split(':')
      if (key) accum[key] = val
      return accum
    }, {})

    return requiredFields.reduce((accum, curr) => {
      if (fieldsAsObj[curr]) return accum + 1
      return accum
    }, 0) === requiredFields.length
  })

  return validPassports
}

module.exports.aoc4 = aoc4
module.exports.aoc4p2 = () => {
  const previouslyValidPassports = aoc4()

  const validators = {
    byr: (byr) => {
      return byr >= 1920 && byr <= 2002
    },
    iyr: (iyr) => {
      return iyr >= 2010 && iyr <= 2020
    },
    eyr: (eyr) => {
      return eyr >= 2020 && eyr <= 2030
    },
    hgt: (hgt) => {
      if (hgt.indexOf('cm') !== -1) {
        const parsedHgt = parseInt(hgt)
        return parsedHgt >= 150 && parsedHgt <= 193
      }
      if (hgt.indexOf('in') !== -1) {
        const parsedHgt = parseInt(hgt)
        return parsedHgt >= 59 && parsedHgt <= 76
      }
      return false
    },
    hcl: (hcl) => {
      const matched = hcl.match(/#[0-9a-f]{6}/)
      return matched && matched.length
    },
    ecl: (ecl) => {
      const expected = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
      return expected.indexOf(ecl) !== -1
    },
    pid: (pid) => {
      return pid.length === 9
    }
  }

  const newlyValidPassports = previouslyValidPassports.filter((passport, idx) => {
    const fields = passport.split(' ')
    const passportObj = fields.reduce((accum, curr) => {
      const [key, val] = curr.split(':')
      if (key) accum[key] = val
      return accum
    }, {})

    const passportKeys = Object.keys(passportObj)
    let validFields = 0

    for (const passKey of passportKeys) {
      if (!validators[passKey]) continue
      const passVal = passportObj[passKey]
      validFields += validators[passKey](passVal)
    }

    return validFields === Object.keys(validators).length
  })

  console.log(newlyValidPassports.length)
}
