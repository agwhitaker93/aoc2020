const fs = require('fs')

const aoc1 = fs.readFileSync('./resources/aoc1.txt').toString()
const entries = aoc1.split('\n')

let expected = [];

for (let entryIdxAsStringWTF in entries) {
    let entryIdx = parseInt(entryIdxAsStringWTF)
    const entry = parseInt(entries[entryIdx])
    if (!entry) continue
    const rest = entries.slice(entryIdx+1)
    for (let secondIdxAsStringWTF in rest) {
        const secondIdx = parseInt(secondIdxAsStringWTF)
        const second = rest[secondIdxAsStringWTF]
        const secondNum = parseInt(second)
        if (!secondNum) continue;

        const rest2 = rest.slice()

        for (let third of rest2) {
            const thirdNum = parseInt(third)

            if (!third) continue;
            if (entry + secondNum + thirdNum === 2020) {
                expected = [entry, secondNum, thirdNum]
                break;
            }
        }
    }
}

console.log(expected)
console.log(expected.reduce((accum, curr) => {
    return accum * curr
}))
