import '../styles/_login.scss';
import ShowPasswordImg from '../images/show-password.png';
import LoadingImage from '../images/square-enix-logo.png';
import { useState } from 'react';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const passwordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return(
        <form action="" className="container-login">
            <div className='container__logo'>
                <img src={LoadingImage} alt="imagen de carga"/>
            </div>
            <label htmlFor="loginUser">
                <input type="text" placeholder="Email" id="loginUser" required/>
            </label>
            <label htmlFor="passwordUser">
                <input type={showPassword ? 'text' : 'password'} placeholder="Contraseña" id='passwordUser' required/>
                <button className='container__img-show' onClick={passwordVisibility}><img src={ShowPasswordImg} alt="" /></button>
            </label>
            <button type="submit">Conectarse</button>
        </form>
    )
}
export default Login;