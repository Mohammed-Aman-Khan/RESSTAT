import isEqual from 'lodash/isEqual'
import inRange from 'lodash/inRange'
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

export const toCapital = string => upperCase(String(string))
export const formatString = string => String(string).replace(/\s+/g, " ").trim()

export const totalMarksScored = (subjectsData = []) => {
    if (isEqual(subjectsData, [])) return ''

    let scoredMarks = [ ...subjectsData ].map(i => i.scoredMarks).reduce((prev, next) => prev + next, 0),
        maxMarks = [ ...subjectsData ].map(i => i.maxMarks).reduce((prev, next) => prev + next, 0)
    return `${ scoredMarks } / ${ maxMarks }`
}

export const percentage = (subjectsData = []) => {
    if (isEqual(subjectsData, [])) return ''

    let scoredMarks = [ ...subjectsData ].map(i => i.scoredMarks).reduce((prev, next) => prev + next, 0),
        maxMarks = [ ...subjectsData ].map(i => i.maxMarks).reduce((prev, next) => prev + next, 0)
    return roundToTwo((scoredMarks / maxMarks) * 100)
}

export const calculateSGPA = (subjectsData = []) => {
    if (isEqual(subjectsData, [])) return ''

    let totalCredits = 0,
        totalCreditPoints = 0

    let getGradePoints = (scoredMarks, maxMarks) => {
        let marks = (scoredMarks / maxMarks) * 100
        if (inRange(marks, 90, 100 + 1)) return 10
        else if (inRange(marks, 80, 90)) return 9
        else if (inRange(marks, 70, 80)) return 8
        else if (inRange(marks, 60, 70)) return 7
        else if (inRange(marks, 45, 60)) return 6
        else if (inRange(marks, 40, 45)) return 4
        else return 0
    }

    for (let i = 0; i < subjectsData.length; i++) {
        let { credits, scoredMarks, maxMarks } = subjectsData[ i ]
        totalCredits += credits
        totalCreditPoints += (credits * getGradePoints(scoredMarks, maxMarks))
    }

    return roundToTwo(totalCreditPoints / totalCredits)
}