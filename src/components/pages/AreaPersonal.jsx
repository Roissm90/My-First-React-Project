import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { PersonajesContext } from '../context/personajesContext';
import checkImg from '../../images/check.png';
import congratGif from '../../images/congratulations.gif';
import closeImg from '../../images/close-menu.png';
import '../../styles/_areaPersonal.scss';

function AreaPersonal({ videojuegos }) {
  const { authenticatedUser } = useContext(UserContext); //para poner el bienvenido
  const { personajesList } = useContext(PersonajesContext); //cojo contexto de personajes
  console.log(personajesList);

  //logica de personajes aleatorios y solo 8
  const [personajesAleatorios, setPersonajesAleatorios] = useState([]);

  const obtenerPersonajesAleatorios = (personajes, cantidad) => {
    const juegosUtilizados = [];
    const personajesAleatorios = [];

    while (personajesAleatorios.length < cantidad && personajes.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * personajes.length);
      const personaje = personajes[indiceAleatorio];

      if (!juegosUtilizados.includes(personaje.juego)) {
        personajesAleatorios.push(personaje);
        juegosUtilizados.push(personaje.juego);
      }
    }
    return personajesAleatorios;
  };

  useEffect(() => {
    if (personajesList.length > 0) {
      const personajes = obtenerPersonajesAleatorios(personajesList, 8);
      setPersonajesAleatorios(personajes);
    }
  }, [personajesList]);

  //logica para comparar los elementos seleccionados
  const [selectedPersonaje, setSelectedPersonaje] = useState(null);
  const [selectedVideojuego, setSelectedVideojuego] = useState(null);
  const [count, setCount] = useState(0);

  const compararElementos = (elemento1, elemento2) => {
    const gameElemento1 = elemento1.getAttribute('data-game');
    const gameElemento2 = elemento2.getAttribute('data-game');

    if (gameElemento1 === gameElemento2) {
      elemento1.className = 'correct';
      elemento2.className = 'correct';
      setCount(count + 1);
      console.log(count);
    }
  };

  const handlePersonajeClick = (personaje, e) => {
    const elementoPersonaje = e.currentTarget;
    if (selectedVideojuego) {
      compararElementos(elementoPersonaje, selectedVideojuego);
      setSelectedPersonaje(null);
      setSelectedVideojuego(null);
    } else {
      setSelectedPersonaje(elementoPersonaje);
    }
  };

  const handleVideojuegoClick = (videojuego, e) => {
    const elementoVideojuego = e.currentTarget;
    if (selectedPersonaje) {
      compararElementos(selectedPersonaje, elementoVideojuego);
      setSelectedPersonaje(null);
      setSelectedVideojuego(null);
    } else {
      setSelectedVideojuego(elementoVideojuego);
    }
  };

  //logica para reiniciar el juego
  const [resetClasses, setResetClasses] = useState(false);

  const regenerarPersonajes = () => {
    if (personajesList.length > 0) {
      const personajes = obtenerPersonajesAleatorios(personajesList, 8);
      setPersonajesAleatorios(personajes);
    }
    setResetClasses(prevResetClasses => !prevResetClasses);
    setCount(0)
  };

  //logica para el pop-up
  const [showPopUp, setShowPopUp] = useState(false);

  const popUp = () => {
    if (count === 8) {
        setShowPopUp(true);
    }
  };

  const btnToClosePopUp = () => {
    setCount(0);
    setShowPopUp(false);
  };

  return (
    <section className={`container-my-area ${showPopUp ? 'overflow-hidden' : ''}`}>
        <h3>Bienvenido, {authenticatedUser.email}</h3>
    
        <div className='container-riddle' key={resetClasses}>
            <div className='container__list-characters'>
                <h4>Personajes:</h4>
                <ul className='list-characters'>
                    {personajesAleatorios.map((personaje) => (
                        <li key={personaje._id} data-game={personaje.juego} onClick={(e) => handlePersonajeClick(personaje, e)}>{personaje.name}<img src={checkImg} alt="check-image"/></li>
                    ))}
                </ul>
            </div>

            <div className='container__list-videogames'>
                <h4>Videojuegos:</h4>
                <ul className='list-videogames'>
                {videojuegos.map((videojuego) => (
                    <li key={videojuego._id} data-game={videojuego.nombre} onClick={(e) => handleVideojuegoClick(videojuego, e)} >{videojuego.nombre}
                    <img src={checkImg} alt="check-image"/></li>
                ))}
                </ul>
            </div>    
        </div>

        <button className='reset-button' onClick={regenerarPersonajes}>Reiniciar</button>

        <div className={`container__pop-up ${count === 8 ? 'visible' : ''}`}>
            <div>
                <img src={congratGif} alt="gif de enhorabuena" />
                <p>¡ENHORABUENA!</p>
            </div>
            <button onClick={btnToClosePopUp}><img src={closeImg} alt="" /></button>
        </div>
    </section>
  );
}

export default AreaPersonal;
