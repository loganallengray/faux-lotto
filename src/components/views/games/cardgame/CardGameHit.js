export const CardGameHit = (gameProps, setGameProps) => {
    const copy = {...gameProps}

    const checkAce = (card) => {
        if (card.ace === true) {
            return 1
        } else {
            return 0
        }
    }

    const pulledPlayerCard = copy.deck.pop()

    copy.playerSum += pulledPlayerCard.value
    copy.playerAceCount += checkAce(pulledPlayerCard)
    copy.playerDeck.push(pulledPlayerCard)

    if (copy.dealerSum > 21 && copy.dealerAceCount > 0) {
        copy.dealerAceCount -= 1;
        copy.dealerSum -= 10;   
    }

    if (copy.playerSum > 21 && copy.playerAceCount > 0) {
        copy.playerAceCount -= 1;
        copy.playerSum -= 10;   
    }

    setGameProps({...copy})
}