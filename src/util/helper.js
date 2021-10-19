export const withOrdSuffix = number => {
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