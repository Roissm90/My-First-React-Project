import { Route, Routes } from "react-router-dom";
import Menu from "./core/Menu";
import Footer from "./core/Footer";
import SectionApp from "./pages/Home";
import DetailGame from "./pages/DetailGame";
import Protagonist from "./pages/Protagonist";
import Villains from "./pages/Villains";
import Invocaciones from "./pages/Invocaciones";
import Jobs from "./pages/Jobs";
import Monstruos from "./pages/Monstruos";
import AreaPersonal from "./pages/AreaPersonal";
import AuthRoute from "./middleware/AuthRoute";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
                    <Route path="/registro" element={<Register/>}></Route>
                </Routes>
                <Footer/>
                </div>
            </PersonajesProvider>
        </UserProvider>
    )
}
export default App;