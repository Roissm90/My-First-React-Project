import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/_detailGame.scss';
import RightArrow from '../../images/right-arrow.png'
import LeftArrow from '../../images/left-arrow.png'

function DetailGame({ videojuegos }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const findVideojuego = videojuegos.find((videojuego) => videojuego._id === id);

    const [protagonistIndex, setProtagonistIndex] = useState(0);
    const [villainIndex, setVillainIndex] = useState(0);

    const handleProtagonistNext = () => {
        setProtagonistIndex((prevIndex) =>
            prevIndex < findVideojuego.personajes.length - 1 ? prevIndex + 1 : 0
        );
    };

    const handleProtagonistPrev = () => {
        setProtagonistIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : findVideojuego.personajes.length - 1
        );
    };

    const handleVillainNext = () => {
        setVillainIndex((prevIndex) =>
            prevIndex < findVideojuego.villanos.length - 1 ? prevIndex + 1 : 0
        );
    };

    const handleVillainPrev = () => {
        setVillainIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : findVideojuego.villanos.length - 1
        );
    };

    useEffect(() => {
        if (!findVideojuego) {
            navigate(-1);
        }
    }, [findVideojuego, navigate]);

    if (findVideojuego) {
        return (
            <section className='container-videogame'>
                <div className='container__info-img'>
                    <img src={findVideojuego.picture} alt="logotipo de videojuego"/>
                    <p>{findVideojuego.sinopsis}</p>
                </div>
                <div className='container__characters'>
                    <ul className='list-protagonist'>
                        {findVideojuego.personajes.map((protagonist, index) => (
                            <li
                                className={`list__protagonist-item ${index === protagonistIndex ? 'active' : ''}`}
                                key={protagonist._id}
                            >
                                <p>{protagonist.name}</p>
                                <div>
                                    <img src={protagonist.picture} alt="imagen de protagonista" />
                                </div>
                            </li>
                        ))}
                        <button className="button-left" onClick={handleProtagonistPrev}><img src={LeftArrow} alt="" /></button>
                        <button className="button-right" onClick={handleProtagonistNext}><img src={RightArrow} alt="" /></button>
                    </ul>

                    <ul className='list-villain'>
                        {findVideojuego.villanos.map((villain, index) => (
                            <li
                                className={`list__villain-item ${index === villainIndex ? 'active' : ''}`}
                                key={villain._id}
                            >
                                <p>{villain.name}</p>
                                <div>
                                    <img src={villain.picture} alt="imagen de villano" />
                                </div>
                            </li>
                        ))}
                        <button className="button-left" onClick={handleVillainPrev}><img src={LeftArrow} alt="" /></button>
                        <button className="button-right" onClick={handleVillainNext}><img src={RightArrow} alt="" /></button>
                    </ul>
                </div>
            </section>
        );
    } else {
        return null;
    } 
}   

export default DetailGame;
