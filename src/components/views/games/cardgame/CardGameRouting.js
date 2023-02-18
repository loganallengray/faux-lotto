import { CardBet } from "./cardgameroutes/CardBet"
import { CardHands } from "./cardgameroutes/CardHands"
import { CardOptions } from "./cardgameroutes/CardOptions"
import { CardResult } from "./cardgameroutes/CardResult"

export const CardGameRouting = ({gameProgress, player, userChoices, setUserChoices, gameProps, result, handleStart, handleHit, handleStay}) => {
    if (gameProgress === 1) {
        return (
            <CardBet 
                player={player} 
                userChoices={userChoices} 
                setUserChoices={setUserChoices} 
                handleStart={handleStart} />
        )
    } else if (gameProgress === 2) {
        return (
            <>
                <CardHands gameProps={gameProps} />
                <CardOptions handleHit={handleHit} handleStay={handleStay} />
            </>
        )
    } else {
        return (
            <>
                <CardHands gameProps={gameProps} />
                <CardResult result={result} />
                <CardBet 
                        player={player} 
                        userChoices={userChoices} 
                        setUserChoices={setUserChoices} 
                        handleStart={handleStart} />
            </>
        )
    }
}