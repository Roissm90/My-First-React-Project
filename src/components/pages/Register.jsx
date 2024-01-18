import "../../styles/_login.scss";
import ShowPasswordImg from "../../images/show-password.png";
import LoadingImage from "../../images/square-enix-logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { API } from '../axios/api'

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);
  const passwordVisibility = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleInput = (event) => {
    const id = event.target.id;
    const value = event.target.value;

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const registerUser = async(event) => {
    event.preventDefault();
    try {
      const result = await API.post('usersff/register', formData);
      //console.log(result);
      navigate('/');
    } catch (error){
      setShowError(true);
      console.error(error);
    }
    
  }

  return (
    <form action="" className="container-login" onSubmit={registerUser}>
      <div className="container__logo">
        <img src={LoadingImage} alt="imagen de carga" />
      </div>
      <label htmlFor="email">
        <input
          type="text"
          placeholder="Email"
          id="email"
          name="email"
          required
          onChange={handleInput}
        />
      </label>
      <label htmlFor="passwordInput">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          id="password"
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
      <input type="submit" value="Conectarse" />
      <Link to="/login">Ya tengo cuenta</Link>
    </form>
  );
};

export default Register;