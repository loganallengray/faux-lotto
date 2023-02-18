export const CardGameStay = (gameProps, setGameProps) => {
    const copy = {...gameProps}

    const checkAce = (card) => {
        if (card.ace === true) {
            return 1
        } else {
            return 0
        }
    }

    while (copy.dealerSum < copy.playerSum) {
        const pulledDealerCard = copy.deck.pop()

        copy.dealerSum += pulledDealerCard.value
        copy.dealerAceCount += checkAce(pulledDealerCard)
        copy.dealerDeck.push(pulledDealerCard)
    }

    if (copy.dealerSum > 21 && copy.dealerAceCount > 0) {
        copy.dealerAceCount -= 1;
        copy.dealerSum -= 10;   
    }

    return copy
}