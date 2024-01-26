import { useEffect, useState } from "react";
import CharactersButton from "../CharactersButton"; // Cambiado el nombre del archivo importado
import '../../styles/_characters.scss';
import { API } from '../axios/api'; 
import { gsap } from "gsap";

function Protagonist() {
    const [personajes, setPersonajes] = useState([]);
    const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
    const [personajesFiltrados, setPersonajesFiltrados] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
          try {
            const result = await API.get('villanosff');
            setPersonajes(result.data);  // Ajuste para obtener result.data en lugar de solo result
            setPersonajesFiltrados(result.data)
            //console.log(result.data);
          } catch (error) {
            console.error("Error fetching data from API:", error);
          }
        };
    
        fetchApi();
    }, []);

    useEffect(() => {
      // Verificar si hay personajes filtrados para evitar laanimación antes de que se muestren los resultados
      if (personajesFiltrados.length > 0) {
          // Animación con GSAP para cada ul con clasecontainer__personaje
          gsap.to(".container__personaje", { opacity: 1, scale:1, duration: 1, ease: "power2.out", stagger: 0.2 });
      }
    }, [personajesFiltrados]);
    
    const filtrarPersonajes = (juegoSeleccionado) => {
        if (juegoSeleccionado !== null) {
            const personajesFiltrados = personajes.filter((personaje) => personaje.juego === juegoSeleccionado);
            setPersonajesFiltrados(personajesFiltrados);
        } else {
            setPersonajesFiltrados(personajes);
        }
    };
    

    return (
        <section className="container-personajes">
            <CharactersButton setJuegoSeleccionado={setJuegoSeleccionado} filtrarPersonajes={filtrarPersonajes}/>
            <div className="content__personaje">
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