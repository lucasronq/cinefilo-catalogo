import { useEffect, useState } from "react";
import NavBar from "../../components/nav";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

export default function SeriesForm() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const id = search.substring(4);
  const [form, setForm] = useState({
    name: "",
    rated: "",
    description: "",
    genre: "",
  });
  const [seasons, setSeasons] = useState([]);
  const [file, setFile] = useState();

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_SERVIDOR_DW3}/series/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setForm({
            name: res.data.name,
            rated: res.data.rated,
            description: res.data.description,
            genre: res.data.genre,
          });
          setSeasons(res.data.seasons);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    formData.append("seasons", JSON.stringify(seasons));
    if (file) {
      formData.append("file", file);
    }
    formData.append("created_by", localStorage.getItem("userId"));
    if (id) {
      axios
        .patch(`${process.env.REACT_APP_SERVIDOR_DW3}/series/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          navigate("/series");
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_SERVIDOR_DW3}/series`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          navigate("/series");
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_SERVIDOR_DW3}/series/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        navigate("/series");
      });
  };

  return (
    <>
      <NavBar />
      <div class="cadastroiner-cad">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header text-center">
                Cadastro de Filme ou Série
              </div>
              <div class="card-body">
                <form>
                  <div class="form-group">
                    <label for="titulo">Título:</label>
                    <input
                      onChange={handleChange}
                      type="text"
                      class="form-control"
                      id="titulo"
                      required
                      name="name"
                      value={form.name}
                    />
                  </div>
                  <div class="form-group">
                    <label for="descricao">Descrição:</label>
                    <textarea
                      onChange={handleChange}
                      class="form-control"
                      id="descricao"
                      rows="3"
                      required
                      name="description"
                      value={form.description}
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="genero">Gênero:</label>
                    <input
                      onChange={handleChange}
                      type="text"
                      class="form-control"
                      id="genero"
                      required
                      name="genre"
                      value={form.genre}
                    />
                  </div>
                  <div class="form-group">
                    <label for="nota">Nota:</label>
                    <input
                      onChange={handleChange}
                      type="number"
                      class="form-control"
                      id="nota"
                      min="0"
                      max="10"
                      step="0.1"
                      required
                      name="rated"
                      value={form.rated}
                    />
                  </div>
                  <div class="form-group">
                    <label for="nota">Temporadas:</label>
                    <button class="btn btn-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        setSeasons([...seasons, { number_of_episodes: "" }]);
                      }}
                    >
                      Adicionar
                    </button>
                    {seasons.map((season, i) => (
                      <div>
                        <input
                          type="number"
                          class="form-control"
                          id="nota"
                          min="0"
                          max="10"
                          step="0.1"
                          required
                          value={season.number_of_episodes}
                          onChange={(e) => {
                            const seasonCopy = seasons;
                            seasonCopy[i] = {
                              number_of_episodes: e.target.value,
                            };
                            setSeasons([...seasonCopy]);
                          }}
                        />
                        <button class="btn btn-warning"
                          onClick={(e) => {
                            e.preventDefault();
                            setSeasons([
                              ...seasons.filter((s, idx) => idx !== i),
                            ]);
                          }}
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                  <div class="custom-file form-group">
                    <label for="formFile" class="form-label">
                      Seleccionar Imagem:
                    </label>
                    <input
                      type="file"
                      class="form-control"
                      id="formFile"
                      lang="es"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setFile(e.target.files[0]);
                        }
                      }}
                    />
                  </div>          
                  {id && (
                    <button
                      class="btn btn-warning btn-block"
                      onClick={handleDelete}
                    >
                      Excluir
                    </button>
                  )}
                  <button
                    class="btn btn-secondary btn-block"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/series");
                    }}
                  >
                    Voltar
                  </button>
                  <button
                    class="btn btn-danger btn-block"
                    onClick={handleSave}
                  >
                    Salvar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
