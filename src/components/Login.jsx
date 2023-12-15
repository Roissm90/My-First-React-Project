import '../styles/_login.scss';
import ShowPasswordImg from '../images/show-password.png';
import LoadingImage from '../images/square-enix-logo.png';
import { useContext, useState } from 'react';
import { UserContext } from './context/userContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    //const para funcionalidad del boton de enseñar contraseña
    const [showPassword, setShowPassword] = useState(false);
    const passwordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    //const para reclamar contexto de users
    const { userList, setAuthenticatedUser } = useContext(UserContext);
    console.log(userList);
    //const para funcionalidad de comprobar usuarios
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emailInput: '',
        passwordInput: ''
    });

    const handleInput = (event) => {
        const id = event.target.id;
        const value = event.target.value;

        setFormData({
            ...formData, // si en este caso el id del que se cambia existe se cambia, si no existe crea uno
            [id]: value, //coge el dato que referencia el 'id' y lo sustituye con el valor de 'value'
        })
    }

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
            console.log('Usuario encontrado.');
        }
    };

    return(
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
            <button type="submit" onClick={validateUser}>Conectarse</button>
        </form>
    )
}
export default Login;