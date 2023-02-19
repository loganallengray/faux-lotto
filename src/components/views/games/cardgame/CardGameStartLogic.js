export const CardGameStartLogic = (gameProps, setGameProps, gameProgress) => {
    const shuffleDeck = () => {
        const copy = gameProps
        const deck = gameProps.deck

        for (let i = 0; i < deck.length; i++) {
            let j = Math.floor(Math.random() * deck.length)
            let temp = deck[i]
            deck[i] = deck[j]
            deck[j] = temp
        }

        copy.deck = deck
        setGameProps(copy)
    }

    const checkAce = (card) => {
        if (card.ace === true) {
            return 1
        } else {
            return 0
        }
    }
        
    const startGame = () => {
        if (gameProps.deck.length < 13) {
            fetch(`http://localhost:8088/cards`)
            .then((res) => res.json())
            .then((data) => {
                const copy = gameProps
                copy.deck = data
                setGameProps(copy)
            })
            .then(() => shuffleDeck())
        } else {
            shuffleDeck()
        }

        let copy = gameProps
        let deck = gameProps.deck

        let dealerSum = 0
        let dealerAceCount = 0
        let dealerDeck = []
        let hidden = deck.pop()

        let playerSum = 0
        let playerAceCount = 0
        let playerDeck = []

        dealerSum += hidden.value
        dealerAceCount += checkAce(hidden)

        let dealerCard = deck.pop()

        dealerSum += dealerCard.value
        dealerAceCount += checkAce(dealerCard)
        dealerDeck.push(dealerCard)

        for (let i = 0; i < 2; i++) {
            let playerCard = deck.pop()

            playerSum += playerCard.value
            playerAceCount += checkAce(playerCard)
            playerDeck.push(playerCard)
        }

        copy.dealerSum = dealerSum
        copy.dealerAceCount = dealerAceCount
        copy.dealerDeck = dealerDeck
        copy.hidden = hidden
        
        copy.playerSum = playerSum
        copy.playerAceCount = playerAceCount
        copy.playerDeck = playerDeck

        setGameProps(copy)
    }

    startGame()
}