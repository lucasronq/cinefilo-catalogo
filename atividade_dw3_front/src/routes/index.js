import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
export default function Layout() {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [moveForm, setMoveForm] = useState(false);

  const handleChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    const resp = await axios.post(
      `${process.env.REACT_APP_SERVIDOR_DW3}/auth/login`,
      {
        email: registerForm.email,
        password: registerForm.password,
      }
    );
    localStorage.setItem("token", resp.data.access_token);
    localStorage.setItem("userId", resp.data.userId);
    navigate("/series");
  };

  const register = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_SERVIDOR_DW3}/auth/register`, {
        email: registerForm.email,
        password: registerForm.password,
        name: registerForm.name,
      })
      .then(() => {
        setMoveForm(false);
        setRegisterForm({ name: "", email: "", password: "" });
      });
  };

  return (
    <main>
      <div class="login-cadastroiner" id="login-cadastroiner">
        <div class="form-cadastroiner">
          {!moveForm ? (
            <form class="form form-login">
              <h2 class="form-title">Bem Vindo!</h2>
              <p class="form-text">utilize sua cadastro</p>
              <div class="form-input-cadastroiner">
                <input
                  onChange={handleChange}
                  type="email"
                  class="form-input"
                  placeholder="Email"
                  name="email"
                  value={registerForm.email}
                />
                <input
                  onChange={handleChange}
                  type="password"
                  class="form-input"
                  placeholder="Senha"
                  name="password"
                  value={registerForm.password}
                />
              </div>
              <button class="form-button" onClick={login}>
                Logar
              </button>
              <p class="mobile-text">
                Não tem cadastro?
                <button
                  id="open-register-mobile"
                  onClick={(e) => {
                    e.preventDefault();
                    setMoveForm(true);
                    setRegisterForm({ name: "", email: "", password: "" });
                  }}
                >
                  Registre-se
                </button>
              </p>
            </form>
          ) : (
            <form
              class="form form-register"
              style={{ transform: "translateX(100%)" }}
            >
              <h2 class="form-title">Criar Conta</h2>
              <p class="form-text">cadastre seu email</p>
              <div class="form-input-cadastroiner">
                <input
                  onChange={handleChange}
                  type="text"
                  class="form-input"
                  placeholder="Nome"
                  name="name"
                  value={registerForm.name}
                />
                <input
                  onChange={handleChange}
                  type="email"
                  class="form-input"
                  placeholder="Email"
                  name="email"
                  value={registerForm.email}
                />
                <input
                  onChange={handleChange}
                  type="password"
                  class="form-input"
                  placeholder="Senha"
                  name="password"
                  value={registerForm.password}
                />
              </div>
              <button class="form-button" value="register" onClick={register}>
                Cadastrar
              </button>
              <p class="mobile-text">              
                Já tem cadastro?
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setMoveForm(false);
                    setRegisterForm({ name: "", email: "", password: "" });
                  }}
                >
                  Login
                </button>
              </p>
            </form>
          )}
        </div>
        <div
          class="overlay-cadastroiner"
          style={
            moveForm
              ? {
                  transform: "translateX(0%)",
                }
              : {
                  transform: "translateX(100%)",
                }
          }
        >
          {moveForm ? (
            <div class="overlay">
              <h2 class="form-title form-title-light">Já tem cadastro?</h2>
              <p class="form-text">
                Para entrar na nossa plataforma faça login com suas informações
              </p>
              <button
                class="form-button form-button-light"
                id="open-login"
                value="Login"
                onClick={(e) => {
                  e.preventDefault();
                  setMoveForm(false);
                  setRegisterForm({ name: "", email: "", password: "" });
                }}
              >
                Entrar
              </button>
            </div>
          ) : (
            <div class="overlay">
              <h2 class="form-title form-title-light">Olá Cinéfilo!</h2>
              <p class="form-text">
                Cadastre-se e comece a usar a nossa plataforma de catálogo
              </p>
              <button
                class="form-button form-button-light"
                id="open-register"
                onClick={(e) => {
                  e.preventDefault();
                  setMoveForm(true);
                  setRegisterForm({ name: "", email: "", password: "" });
                }}
              >
                Cadastrar
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
