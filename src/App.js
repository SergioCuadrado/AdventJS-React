import { useState, useEffect } from "react";
import CreateGift from "./components/CreateGift";
import "./public/styles/App.css";

const App = () => {
  const [regalos, setRegalos] = useState([]);
  const regalosLocalStorage = JSON.parse(localStorage.getItem("regalos"));

  useEffect(() => {
    if (regalosLocalStorage.length > 0) {
      setRegalos(regalosLocalStorage);
    }
  }, []);

  const añadirRegalo = (regalo) => {
    const existe = regalos.filter(
      (item) => item.producto.toLowerCase() === regalo.producto.toLowerCase()
    );

    // Validando si el regalo no existe
    if (existe.length === 0) {
      setRegalos([...regalos, regalo]);
      localStorage.setItem("regalos", JSON.stringify([...regalos, regalo]));
    }
  };

  // Eliminar el regalo que quiera el usuario
  const eliminarRegalo = (idx) => {
    setRegalos(regalos.filter((item, key) => key !== idx));

    regalosLocalStorage.splice(idx, 1);
    localStorage.setItem("regalos", JSON.stringify(regalosLocalStorage));
  };

  // Eliminar todos los regalos de golpe
  const borrarTodo = () => {
    setRegalos([]);
    localStorage.setItem("regalos", JSON.stringify([]));
  };

  return (
    <section className="App">
      <div className="App_regalos">
        <h1>Regalos:</h1>

        <CreateGift añadirRegalo={añadirRegalo} />

        <ul className="App_listaRegalos">
          {regalos.length > 0 ? (
            regalos.map((regalo, idx) => (
              <div className="App_listaRegalos-div" key={idx}>
                <li>
                  🎁 <img src={regalo.imagen} alt={regalo.producto} />{" "}
                  {regalo.cantidad}x {regalo.producto}
                </li>
                <button onClick={() => eliminarRegalo(idx)}>❌</button>
              </div>
            ))
          ) : (
            <p>Añade algún regalo 😢</p>
          )}
        </ul>

        {regalos.length > 0 && (
          <button
            className="App_listaRegalos-buttonEliminarTodo"
            onClick={borrarTodo}
          >
            Borrar todo
          </button>
        )}
      </div>
    </section>
  );
};

export default App;
