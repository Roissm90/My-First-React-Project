import { Route, Routes } from "react-router-dom";
import Menu from "./Menu";
import Footer from "./Footer";
import SectionApp from "./SectionApp";
import DetailGame from "./DetailGame";
import Protagonist from "./Protagonist";
import Villains from "./Villains";
import Invocaciones from "./Invocaciones";
import Jobs from "./Jobs";
import Monstruos from "./Monstruos";
import { useEffect, useState } from "react";

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
        <div className="container-app">
            <Menu/>
            <Routes>
                <Route path="/" element={<SectionApp videojuegos={videojuegos}/>}></Route>
                <Route path="/detail/:name/:id" element={<DetailGame videojuegos={videojuegos}/>}/>
                <Route path="/protagonistas" element={<Protagonist/>}></Route>
                <Route path="/antagonistas" element={<Villains/>}></Route>
                <Route path="/invocaciones" element={<Invocaciones/>}></Route>
                <Route path="/monstruos" element={<Monstruos/>}></Route>
                <Route path="/jobs" element={<Jobs/>}></Route>
            </Routes>
            <Footer/>
        </div>
    )
}
export default App;