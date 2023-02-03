export const HorseDisplay = ({horse, showHorse}) => {
    if (showHorse) {
        return (
            <>
                <h3>{horse.name}</h3>
                <div>
                    <div>{horse.breed}</div>
                    <div>
                        <div>Chance: {horse.chances}%</div>
                        <div>Betting odds: {horse.odds}</div>
                    </div>
                </div>
            </>
        )
    } else {
        return ""
    }
}