const calculate = (
    intercept = 0, // Intercept
    coEfficient = 0, // Co-Efficient (Slope)
    inputFeature,
) => {
    return Number(intercept + (coEfficient * inputFeature))
}

export const buildModel = (
    inputFeatureDataSet = [], // Array of Input Features (i.e. Subject Credits)
    outputFeatureDataSet = [], // Array of Input Features (i.e. Scored Marks)
    intercept = 0, // Intercept
    coEfficient = 0, // Co-Efficient (Slope)
    learningRate = 0.0001, // Learning Rate
    iterations = 1000 // Number of Iterations
) => {
    let error = [] // Array to calculate cost for each iteration
    let errorCost,
        costIntercept,
        costCoEfficient,
        prediction,
        partialWrtIntercept,
        partialWrtCoEfficient

    for (let itr = 0; itr < iterations.length; itr++) {
        errorCost = 0
        costIntercept = 0
        costCoEfficient = 0

        for (let i = 0; i < inputFeatureDataSet.length; i++) {
            prediction = calculate(intercept, coEfficient, inputFeatureDataSet[ i ])
            errorCost = errorCost + Math.pow(outputFeatureDataSet[ i ] - prediction, 2)

            for (let j = 0; j < inputFeatureDataSet.length; j++) {
                partialWrtIntercept = -2 * (outputFeatureDataSet[ j ] - calculate(intercept, coEfficient, inputFeatureDataSet[ j ])) // Partial Derivative w.r.t. intercept
                partialWrtCoEfficient = (-2 * inputFeatureDataSet[ j ]) * (outputFeatureDataSet[ j ] - calculate(intercept, coEfficient, inputFeatureDataSet[ j ])) // Partial Derivative w.r.t. coEfficient

                costIntercept += partialWrtIntercept
                costCoEfficient += partialWrtCoEfficient
            }

            intercept = intercept - (learningRate * costIntercept)
            coEfficient = coEfficient - (learningRate * costCoEfficient)
        }
        error.push(errorCost)
    }

    return {
        intercept,
        coEfficient,
    }
}