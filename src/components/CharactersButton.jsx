import '../styles/_buttons.scss';
import refreshImg from '../images/refresh.png';
import { useContext } from 'react';
import { TitlesContext } from './context/titlesContext';

function CharactersButton({ setJuegoSeleccionado, filtrarPersonajes }) {
    const { titlesList } = useContext(TitlesContext);
    
    const handleClick = (juego) => {
        setJuegoSeleccionado(juego);
        filtrarPersonajes(juego);
    };


    return (
        <div className="container-buttons">
            {titlesList.map((title) => (
                <button key={title._id} className='select-btn' onClick={() => handleClick(title.nombre)}>
                {title.nombre.replace('Final Fantasy ', '')}
                </button>
            ))}
            <button className="select-btn" onClick={() => handleClick(null)}>
                <img src={refreshImg} alt="Refresh" />
            </button>
        </div>
    );
}

export default CharactersButton;
