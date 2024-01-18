import { useContext, useState, useEffect } from 'react';
import { PersonajesContext } from '../context/personajesContext';
import checkImg from '../../images/check.png';
import congratGif from '../../images/congratulations.gif';
import closeImg from '../../images/close-menu.png';
import '../../styles/_areaPersonal.scss';
import { API } from '../axios/api';
import { useNavigate } from 'react-router-dom';

function AreaPersonal({ videojuegos }) {
  const navigate = useNavigate();
  const  [authenticatedUser, setAuthenticatedUser] = useState(); //para poner el bienvenido
  ////console.log(authenticatedUser);
  const { personajesList } = useContext(PersonajesContext); //cojo contexto de personajes

  //obtener el bienvenido
  const changeWelcome = async () => {
    const result = await API.get('usersff/checkSession');
    setAuthenticatedUser(result.data.email);
    ////console.log(result)
  }
  changeWelcome();
  //logica de personajes aleatorios y solo 8
  const [personajesAleatorios, setPersonajesAleatorios] = useState([]);

  const logOutUser = () => {
    //console.log(localStorage.getItem('token'));
    localStorage.removeItem('token');
    setAuthenticatedUser(null);  // Limpiar el estado
    navigate('/');
  }

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
      //console.log(count);
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

  useEffect(() => {
    const popUpTimeout = () => {
      if (count === 8) {
        setTimeout(() => {
          setShowPopUp(true);
        }, 500); // Mostrar el pop-up después de 1000 milisegundos (1 segundo)
      }
    }
    popUpTimeout(); // Llama a la función para configurar el timeout
  }, [count]);

  const btnToClosePopUp = () => {
    setCount(0);
    setShowPopUp(false);
    setResetClasses(prevResetClasses => !prevResetClasses);
    const personajes = obtenerPersonajesAleatorios(personajesList, 8);
    setPersonajesAleatorios(personajes);
  };

  //logica reemplazo dominios
  const dominios = ['@gmail.com', '@gmail.es', '@hotmail.com', '@hotmail.es', '@yahoo.com', '@yahoo.es', '@outlook.com', '@outlook.es'];

  function replaceDominios (email) {
    let newUser = email;
    dominios.forEach((dominio) => newUser = newUser.replace(dominio, ''))
    return newUser;
  } 

  const welcomeUser = authenticatedUser ? replaceDominios(authenticatedUser) : '';

  return (
    <section className={`container-my-area ${showPopUp ? 'overflow-hidden' : ''}`}>
        <h3>Bienvenido {welcomeUser}</h3>
        <input type="button" value="Cerrar Sesión" onClick={logOutUser}/>
    
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

        <div className={`container__pop-up ${showPopUp ? 'visible' : ''}`}>
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
