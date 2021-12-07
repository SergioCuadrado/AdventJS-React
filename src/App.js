import { useState } from "react";
import "./public/styles/App.css";

const App = () => {
  const [value, setValue] = useState("");
  const [regalos, setRegalos] = useState([]);

  const ValorRegalo = (e) => {
    setValue(e.target.value);
  };

  const incluirRegalo = (e) => {
    e.preventDefault();
    const existe = regalos.filter((item) => item === value);
    if (value.length > 0 && existe.length === 0) {
      setRegalos([...regalos, value]);
    }
  };

  const eliminarRegalo = (idx) => {
    setRegalos(regalos.filter((item, key) => key !== idx));
  };

  const borrarTodo = () => {
    setRegalos([]);
  };

  return (
    <section className="App">
      <div className="App_regalos">
        <h1>Regalos:</h1>

        <div className="App_inputs">
          <input
            placeholder="Añade tus regalos"
            type="text"
            autoFocus
            onChange={(e) => ValorRegalo(e)}
          />
          <button onClick={(e) => incluirRegalo(e)}>Agregar</button>
        </div>

        <ul className="App_listaRegalos">
          {regalos.length > 0 ? (
            regalos.map((regalo, idx) => (
              <div className="App_listaRegalos-div" key={idx}>
                <li>🎁 {regalo}</li>
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
