import '../styles/_buttons.scss';

function CharactersButton({ setJuegoSeleccionado }) {
    const handleClick = (juego) => {
        setJuegoSeleccionado(juego);
    };

    return (
        <div className="container-buttons">
            <button className="select-btn" onClick={() => handleClick("Final Fantasy VII")}>VII</button>
            <button className="select-btn" onClick={() => handleClick("Final Fantasy VIII")}>VIII</button>
            <button className="select-btn" onClick={() => handleClick("Final Fantasy IX")}>IX</button>
            <button className="select-btn" onClick={() => handleClick("Final Fantasy X")}>X</button>
            <button className="select-btn" onClick={() => handleClick("Final Fantasy XII")}>XII</button>
            <button className="select-btn" onClick={() => handleClick("Final Fantasy XIII")}>XIII</button>
            <button className="select-btn" onClick={() => handleClick("Final Fantasy XV")}>XV</button>
            <button className="select-btn" onClick={() => handleClick("Final Fantasy XVI")}>XVI</button>
        </div>
    );
}

export default CharactersButton;
