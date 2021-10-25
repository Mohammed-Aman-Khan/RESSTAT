import isEqual from 'lodash/isEqual'
import inRange from 'lodash/inRange'
import upperCase from 'lodash/upperCase'

/**
 * This function adds an ordinal suffix to a number.
 * 
 * Example:
 * 
 * 1 -> 1st
 * 
 * 2 -> 2nd
 * 
 * @param {Number} number 
 * @returns The number with an ordinal suffix
 */
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

/**
 * This function returns an array of Semesters in the 4 year Engineering Course
 * 
 * @returns [1, ..., 8]
 */
export const Semesters = Array.from({ length: 8 }, (_, i) => i + 1)

/**
 * This function rounds a number to 2 decimal digits
 * @param {Number} number 
 * @returns The number rounded to 2 decimal digits
 */
export const roundToTwo = (number = 0) => +(Math.round(number + "e+2") + "e-2")

/**
 * This function converts a string to uppercase
 * @param {String} string 
 * @returns The string in uppercase
 */
export const toCapital = string => upperCase(String(string))

/**
 * This function removes extra spaces from the beginning, middle & the end of a string
 * @param {String} string 
 * @returns String without unwanted spaces
 */
export const formatString = string => String(string).replace(/\s+/g, " ").trim()

/**
 * This function calculates total marks scored in a semester
 * @param {*} subjectsData Subjects Data for one semester
 * @returns The total marks scored in the semester as a formatted string
 */
export const totalMarksScored = (subjectsData = []) => {
    if (isEqual(subjectsData, [])) return ''

    let scoredMarks = subjectsData.map(i => i.scoredMarks).reduce((prev, next) => prev + next, 0),
        maxMarks = subjectsData.map(i => i.maxMarks).reduce((prev, next) => prev + next, 0)
    return `${ scoredMarks } / ${ maxMarks }`
}

/**
 * This function caculates the overall percentage scored in a semester
 * @param {*} subjectsData Subjects Data for one semester
 * @returns The overall percentage scored in the semester
 */
export const percentage = (subjectsData = []) => {
    if (isEqual(subjectsData, [])) return ''

    let scoredMarks = subjectsData.map(i => i.scoredMarks).reduce((prev, next) => prev + next, 0),
        maxMarks = subjectsData.map(i => i.maxMarks).reduce((prev, next) => prev + next, 0)
    return roundToTwo((scoredMarks / maxMarks) * 100)
}

/**
 * This function calculates the Grade Points scored in a subject (based on VTU Regulations)
 * @param {Number} scoredMarks 
 * @param {Number} maxMarks 
 * @returns The Grade Points scored in the subject
 */
export const getGradePoints = (scoredMarks, maxMarks) => {
    let marks = (scoredMarks / maxMarks) * 100
    if (inRange(marks, 90, 100 + 1)) return 10
    else if (inRange(marks, 80, 90)) return 9
    else if (inRange(marks, 70, 80)) return 8
    else if (inRange(marks, 60, 70)) return 7
    else if (inRange(marks, 45, 60)) return 6
    else if (inRange(marks, 40, 45)) return 4
    else return 0
}


/**
 * This function calculates the SGPA scored in a semester
 * @param {*} subjectsData Subjects Data for one semester
 * @returns The SGPA scored in the semester
 */
export const calculateSGPA = (subjectsData = []) => {
    if (isEqual(subjectsData, [])) return ''

    let totalCredits = 0,
        totalCreditPoints = 0

    for (let i = 0; i < subjectsData.length; i++) {
        let { credits, scoredMarks, maxMarks } = subjectsData[ i ]
        totalCredits += credits
        totalCreditPoints += (credits * getGradePoints(scoredMarks, maxMarks))
    }

    return roundToTwo(totalCreditPoints / totalCredits)
}

/**
 * This function calculates the 
 * @param {*} results Subjects Data for all the semesters
 * @returns The current overall CGPA scored across all the semesters
 */
export const calculateCGPA = (results = []) => {
    if (isEqual(results, [])) return ''

    let totalCredits = 0,
        totalCreditPoints = 0

    for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < results[ i ].semResult.length; j++) {
            let { credits, scoredMarks, maxMarks } = results[ i ].semResult[ j ]
            totalCredits += credits
            totalCreditPoints += (credits * getGradePoints(scoredMarks, maxMarks))
        }
    }

    return roundToTwo(totalCreditPoints / totalCredits)
}