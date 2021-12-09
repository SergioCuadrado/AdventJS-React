import { useState } from "react";
import "../public/styles/components/CreateGift.css";

const CreateGift = (props) => {
  const [cantidad, setCantidad] = useState(1);
  const [regalo, setRegalo] = useState("");

  // Lo que el usuario esta escribiendo en el input
  const valorRegalo = (e) => {
    setRegalo(e.target.value);
  };

  const valorCantidad = (e) => {
    setCantidad(e.target.value);
  };

  // Añadir el regalo que ha puesto en el input
  const incluirRegalo = (e) => {
    e.preventDefault();
    // Validando si el usuario no ha dejado el input vacio
    if (regalo.length > 0) {
      props.añadirRegalo({ producto: regalo, cantidad });
      // Reiniciando los inputs
      setRegalo("");
      setCantidad(1);
    }
  };

  return (
    <form className="App_inputs" onSubmit={(e) => incluirRegalo(e)}>
      <input
        className="App_inputs-regalos"
        placeholder="Añade tus regalos"
        type="text"
        autoFocus
        onChange={(e) => valorRegalo(e)}
        value={regalo}
      />
      <input
        className="App_inputs-cantidad"
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => valorCantidad(e)}
        min={1}
        max={50}
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default CreateGift;
