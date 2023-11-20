import { useCallback, useEffect, useState } from "react";
import NavBar from "../../components/nav";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Series() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVIDOR_DW3}/series`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setSeries([...res.data]);
      })
      .catch((err) => console.error(err));
  }, []);

  const returnSerie = useCallback((serie) => {
    return (
      <div class="col-md-12 mb-12">
        <div class="card">
          <img
            src={`${process.env.REACT_APP_SERVIDOR_DW3}/series/files/${serie.img}`}
            class="card-img-top"
            alt="Filme 1"
          />
          <div class="card-body">
            <h5 class="card-title">Titulo: {serie.name}</h5>
            <p class="card-text">Descrição: {serie.description}</p>
            <p class="card-text">Genero: {serie.genre}</p>
            <p class="card-text">Nota: {serie.rated}</p>
            <p class="card-text">Autor: {serie.created_by?.name}</p>
            
            <Link
              to={{
                pathname: "/series/add",
                search: `?id=${serie.id}`,
              }}
            >
              Alterar
            </Link>
          </div>
        </div>
      </div>
    );
  }, []);

  const returnSeries = useCallback(() => {
    const cardsPerRow = 3;
  
    const rows = [];
    for (let i = 0; i < series.length; i += cardsPerRow) {
      const rowSlice = series.slice(i, i + cardsPerRow);
      const row = (
        <div className="row" key={i / cardsPerRow} style={{ textAlign: 'center' }}>
          {rowSlice.map((serie, j) => (
            <div key={j} className="container-card" style={{ display: 'inline-block', margin: '5px', width: '30%' }}>
              {returnSerie(serie)}
            </div>
          ))}
        </div>
      );
      rows.push(row);
    }
  
    return <>{rows}</>;
  }, [returnSerie, series]);
  

  return (
    <>
      <NavBar />
      <div class="cadastroiner mt-5">
        {series.length === 0 ? <p>Nada registrado</p> : returnSeries()}
      </div>
    </>
  );
}
