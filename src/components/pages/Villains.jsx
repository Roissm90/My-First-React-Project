import { useEffect, useState } from "react";
import CharactersButton from "../CharactersButton"; // Cambiado el nombre del archivo importado
import '../../styles/_characters.scss';

function Protagonist() {
    const [personajes, setPersonajes] = useState([]);
    const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
    const [personajesFiltrados, setPersonajesFiltrados] = useState([]);

    useEffect(() => {
        fetch('https://node-db-ff.vercel.app/villanosFF')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPersonajes(data);
                setPersonajesFiltrados(data);
            });
    }, []);
    /*
    let personajesFiltrados = personajes;

    if (juegoSeleccionado !== null) {
        personajesFiltrados = personajes.filter((personaje) => personaje.juego === juegoSeleccionado);
    } else {
        personajesFiltrados = personajes;
    }*/
    
    const filtrarPersonajes = () => {
    if (juegoSeleccionado !== null) {
      const personajesFiltrados = personajes.filter((personaje) => personaje.juego === juegoSeleccionado);
      setPersonajesFiltrados(personajesFiltrados);
    } else {
      // Si no hay juego seleccionado, mostrar todos los personajes
      setPersonajesFiltrados(personajes);
    }
  };
    

    return (
        <section className="container-personajes">
            <CharactersButton setJuegoSeleccionado={setJuegoSeleccionado} />
            <div>
                {personajesFiltrados.map((personaje) => (
                    <ul className="container__personaje" key={personaje._id}>
                        <li>{personaje.name}</li>
                        <li><img src={personaje.picture} alt="imagen del personaje" /></li>
                        <div>
                            <li>Edad: {personaje.age}</li>
                            <li>Ataque: {personaje.turbo}</li>
                            <li>{personaje.info}</li>
                        </div>
                    </ul>
                ))}
            </div>
        </section>
    );
}

export default Protagonist;