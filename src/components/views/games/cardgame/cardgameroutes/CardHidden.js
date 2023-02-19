export const CardHidden = ({gameProps, gameProgress}) => {
    if (gameProgress === 3) {
        return (
            <img src={`cards/${gameProps.hidden.name}.png`} />
        )
    } else {
        return (
            <img src="cards/BACK.png" />
        )
    }
}