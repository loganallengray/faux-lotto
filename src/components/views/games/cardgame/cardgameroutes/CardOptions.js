export const CardOptions = ({handleHit, handleStay}) => {
    return (
        <form id="card-button-container">
            <button 
                id="hit-button"
                class="card-button"
                onClick={(event) => { handleHit(event) }}>Hit</button>
            <button 
                id="stay-button"
                class="card-button"
                onClick={(event) => { handleStay(event) }}>Stay</button>
        </form>
    )
}