/* 
    Calculate total sum of weight (chances)
    Get random number between 0 and total sum
    Subtract 1 from random number repeatedly
    Check if the Number is equal to any of the weights, map through horses and check (chances)
    Have something to catch it if it chooses a number below the lowest weight
    Return result object and horse object.
*/

export const HorseGameLogic = (horses, chosenHorse) => {
    const result = {}

    const totalWeightSum = 100
    const randomNum = Math.floor(Math.random() * totalWeightSum)

    for (let i = randomNum; i > 0; i--) {
        for (const horse of horses) {
            if (horse.chances === i) {
                result.horse = horse
                
                if (horse.id === chosenHorse.id) {
                    result.win = true
                } else {
                    result.win = false
                }

                return result;
            }
        }
    }

    result.horse = horses[1]

    if (horses[1].id === chosenHorse.id) {
        result.win = true
    } else {
        result.win = false
    }

    return result
}