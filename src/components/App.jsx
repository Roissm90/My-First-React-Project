import { Route, Routes } from "react-router-dom";
import Menu from "./Menu";
import Footer from "./Footer";
import SectionApp from "./Home";
import DetailGame from "./DetailGame";
import Protagonist from "./Protagonist";
import Villains from "./Villains";
import Invocaciones from "./Invocaciones";
import Jobs from "./Jobs";
import Monstruos from "./Monstruos";
import AreaPersonal from "./AreaPersonal";
import AuthRoute from "./middleware/AuthRoute";
import { useEffect, useState } from "react";
import Login from "./Login";
import { UserProvider } from "./context/userContext";
import { PersonajesProvider } from "./context/personajesContext";


function App() {
    const [videojuegos, setVideojuegos] = useState([]);

    useEffect(() => {
        fetch('https://node-db-ff.vercel.app/videojuegosFF')
        .then((response) => response.json())
        .then((data) => {
            setVideojuegos(data);
        })
    }, [])

    return(
        <UserProvider>
            <PersonajesProvider>
                <div className="container-app">
                <Menu/>
                <Routes>
                    <Route path="/" element={<SectionApp videojuegos={videojuegos}/>}></Route>
                    <Route path="/detail/:name/:id" element={<DetailGame videojuegos={videojuegos}/>}/>
                    <Route path="/protagonistas" element={<Protagonist/>}></Route>
                    <Route path="/antagonistas" element={<Villains/>}></Route>
                    <Route path="/invocaciones" element={<Invocaciones/>}></Route>
                    <Route path="/monstruos" element={<Monstruos/>}></Route>
                    <Route path="/areapersonal" element={<AuthRoute element={<AreaPersonal videojuegos={videojuegos}/>}/>}></Route>
                    <Route path="/jobs" element={<Jobs/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                </Routes>
                <Footer/>
                </div>
            </PersonajesProvider>
        </UserProvider>
    )
}
export default App;