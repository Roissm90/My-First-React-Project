import '../../styles/_login.scss';
import ShowPasswordImg from '../../images/show-password.png';
import LoadingImage from '../../images/square-enix-logo.png';
import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { userList, setAuthenticatedUser } = useContext(UserContext);
    //console.log(userList);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emailInput: '',
        passwordInput: ''
    });

    const [showError, setShowError] = useState(false);

    const handleInput = (event) => {
        const id = event.target.id;
        const value = event.target.value;

        setFormData({
            ...formData,
            [id]: value,
        });
    }

    const passwordVisibility = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    const validateUser = (event) => {
        event.preventDefault();

        const foundUser = userList.find(
            (user) => user.email === formData.emailInput && user.password === formData.passwordInput
        );

        if (foundUser) {
            console.log('Usuario encontrado.');
            setAuthenticatedUser(foundUser);
            navigate('/areapersonal');
        } else {
            setShowError(true); // Mostrar mensaje de error
            console.log('Usuario no encontrado.');
        }
    };

    return (
        <form action="" className="container-login" >
            <div className='container__logo'>
                <img src={LoadingImage} alt="imagen de carga"/>
            </div>
            <label htmlFor="emailInput">
                <input type="text" placeholder="Email" id="emailInput" name="email" required onChange={handleInput}/>
            </label>
            <label htmlFor="passwordInput">
                <input type={showPassword ? 'text' : 'password'} placeholder="Contraseña" id='passwordInput' name="password" required onChange={handleInput}/>
                <button className='container__img-show' onClick={passwordVisibility}><img src={ShowPasswordImg} alt="" /></button>
            </label>
            <p className={showError ? "error-message" : "hidden"}>Usuario o contraseña incorrectos</p>
            <button type="submit" onClick={validateUser}>Conectarse</button>
            <Link to="/registro">No tengo cuenta</Link>
        </form>
    )
}

export default Login;
// $2b$10$IW/5WlGjC0nQH5u0cvbR4e8mkjDi7MTlYDQi7doqjiA58FZSRyA6e