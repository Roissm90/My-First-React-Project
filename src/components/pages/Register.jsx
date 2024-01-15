import "../../styles/_login.scss";
import ShowPasswordImg from "../../images/show-password.png";
import LoadingImage from "../../images/square-enix-logo.png";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const {userList} = useContext(UserContext);
    console.log(userList);

    const passwordVisibility = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
      };
    
    const [registerForm, setRegisterForm] = useState({
        emailInput: "",
        passwordInput: "",
    });

    const handleInput = (event) => {
        const id = event.target.id;
        const value = event.target.value;
    
        setRegisterForm({
          ...registerForm,
          [id]: value,
        });
        console.log(registerForm);
    };

    const registerUser = async (event) => {
        event.preventDefault();
        const foundUser = userList.find((user) => user.email === registerForm.emailInput);
        if (foundUser) {
            setShowError(true);
        } else {
            try {
                // Aquí puedes realizar la lógica de registro
                const response = await axios.post("https://node-db-ff.vercel.app/usersFF/register", registerForm);
    
                // Verificar el estado de la respuesta y tomar acciones adecuadas
                if (response.status === 201) {
                    navigate("/areapersonal");
                } 
            } catch (error) {
                console.error("Error al registrar usuario", error);
                // Manejar el error, mostrar mensaje de error, etc.
            }
        }
        
    };

  return (
    <form action="" className="container-login">
      <div className="container__logo">
        <img src={LoadingImage} alt="imagen de carga" />
      </div>
      <label htmlFor="emailInput">
        <input
          type="text"
          placeholder="Email"
          id="emailInput"
          name="email"
          required
          onChange={handleInput}
        />
      </label>
      <label htmlFor="passwordInput">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          id="passwordInput"
          name="password"
          required
          onChange={handleInput}
        />
        <button className="container__img-show" onClick={passwordVisibility}>
          <img src={ShowPasswordImg} alt="" />
        </button>
      </label>
      <p className={showError ? "error-message" : "hidden"}>
        Este usuario ya existe
      </p>
      <button type="submit" onClick={registerUser}>
        Regístrate
      </button>
      <Link to="/login">Ya tengo cuenta</Link>
    </form>
  );
};

export default Register;
