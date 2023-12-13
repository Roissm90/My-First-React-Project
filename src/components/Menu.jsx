import { Link } from "react-router-dom";
import BurgerMenu from "../images/burger-menu.png";
import CloseMenu from "../images/close-menu.png";
import '../styles/_menu.scss';
import { useState } from "react";

function Menu() {
    const [menuVisible, setMenuvisible] = useState(false);

    const handleTogleMenu = () => {
        setMenuvisible(!menuVisible)
    }
    return(
        <header className="container-nav-title">
            <h1><Link to="/">Final Fantasy</Link></h1>
            <ul className={menuVisible ? 'active' : ''}>
                <li onClick={handleTogleMenu}><Link to="/protagonistas">Protagonistas</Link></li>
                <li onClick={handleTogleMenu}><Link to="/antagonistas">Antagonistas</Link></li>
                <li onClick={handleTogleMenu}><Link to="/jobs">Job´s</Link></li>
                <li onClick={handleTogleMenu}><Link to="/invocaciones">Invocaciones</Link></li>
                <li onClick={handleTogleMenu}><Link to="/monstruos">Monstruos</Link></li>
                <div className="container-close_menu" onClick={handleTogleMenu}><img src={CloseMenu} alt="" /></div>
            </ul>
            <div className="container-burger_menu" onClick={handleTogleMenu}><img src={BurgerMenu} alt="" /></div>
        </header>
    )
}
export default Menu;