import upperCase from 'lodash/upperCase'

export const withOrdSuffix = (number = 0) => {
    const ordinalRules = new Intl.PluralRules("en", { type: "ordinal" })
    const suffixes = {
        one: "st",
        two: "nd",
        few: "rd",
        other: "th",
    }
    return `${ number }${ suffixes[ ordinalRules.select(number) ] }`
}

export const Semesters = Array.from({ length: 8 }, (_, i) => i + 1)

export const roundToTwo = (number = 0) => +(Math.round(number + "e+2") + "e-2")

export const toCapital = string => String(string).split('').map(upperCase).join('')
export const formatString = string => String(string).replace(/\s+/g, " ").trim()

export const calculateSGPA = subjectsData => {
    let totalCredits = 0
    let totalCreditPoints = 0

    for (let i = 0; i < subjectsData.length; i++) {
        totalCredits += subjectsData[ i ].credits
        totalCreditPoints += (subjectsData[ i ].credits * (((subjectsData[ i ].scoredMarks / subjectsData[ i ].maxMarks) * 100) / 10))
    }

    return roundToTwo(totalCreditPoints / totalCredits)
}
