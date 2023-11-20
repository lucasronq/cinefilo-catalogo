import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <nav class="navbar navbar-expand-lg navbar-dark">
      <Link
        class="navbar-brand"
        to={{
          pathname: "/series",
        }}
      >
        Catálogo de Filmes e Séries
      </Link>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <Link
            to={{
              pathname: "/series/add",
            }}
            class="nav-link card-tab"
          >
            Cadastrar Filme
          </Link>
        </li>
        <li class="nav-item">
          <button
            class="nav-link logout-tab"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
