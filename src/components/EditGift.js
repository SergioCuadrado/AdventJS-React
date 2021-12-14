import { useState, useEffect } from "react";
import "../public/styles/components/CreateGift.css";

const EditGift = (props) => {
  const [cantidad, setCantidad] = useState(1);
  const [destinatario, setDestinatario] = useState("");
  const [regalo, setRegalo] = useState("");
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    setRegalo(props.modificarRegalo.producto);
    setCantidad(props.modificarRegalo.cantidad);
    setDestinatario(props.modificarRegalo.destinatario);
    setImagen(props.modificarRegalo.imagen);
  }, []);

  // Lo que el usuario esta escribiendo en el input
  const valorRegalo = (e) => {
    setRegalo(e.target.value);
  };

  const valorDestinatario = (e) => {
    setDestinatario(e.target.value);
  };

  const valorImagen = (e) => {
    setImagen(e.target.value);
  };

  const valorCantidad = (e) => {
    setCantidad(e.target.value);
  };

  // Añadir el regalo que ha puesto en el input
  const editarRegalo = (e) => {
    e.preventDefault();
    // Validando si el usuario no ha dejado el input vacio
    /* if (regalo.length > 0) {
      // props.añadirRegalo({ producto: regalo, destinatario, cantidad, imagen });
      // Reiniciando los inputs
      setRegalo("");
      setImagen("");
      setDestinatario("");
      setCantidad(1);
      
    } */
    props.editarRegalo({ producto: regalo, destinatario, cantidad, imagen });
  };

  return (
    <form className="App_inputs" onSubmit={(e) => editarRegalo(e)}>
      <input
        className="App_inputs-regalos"
        placeholder="Añade tus regalos"
        type="text"
        autoFocus
        onChange={(e) => valorRegalo(e)}
        value={regalo}
      />
      <input
        className="App_inputs-destinatario"
        placeholder="Destinatario"
        type="text"
        onChange={(e) => valorDestinatario(e)}
        value={destinatario}
      />
      <input
        className="App_inputs-imagen"
        type="text"
        placeholder="http://image"
        onChange={(e) => valorImagen(e)}
        value={imagen}
      />
      <input
        className="App_inputs-cantidad"
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => valorCantidad(e)}
        min={1}
      />
      <button type="submit">Editar</button>
    </form>
  );
};

export default EditGift;
