import { useState, useEffect } from "react";
import CreateGift from "./components/CreateGift";
import Modal from "react-modal";

import "./public/styles/App.css";
import EditGift from "./components/EditGift";

const customStyles = {
  content: {
    top: "15%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const App = () => {
  const [regalos, setRegalos] = useState([]);
  const [modificarRegalo, setModificarRegalo] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);

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

  const editarRegalo = (regalo) => {
    let objIndex = regalos.findIndex(
      (obj) => obj.producto === modificarRegalo.producto
    );

    //Update object's name property.
    regalos[objIndex].producto = regalo.producto;
    regalos[objIndex].destinatario = regalo.destinatario;
    regalos[objIndex].imagen = regalo.imagen;
    regalos[objIndex].cantidad = regalo.cantidad;

    console.log(regalos);
    localStorage.setItem("regalos", JSON.stringify([...regalos]));
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

  const openModal = () => {
    setIsOpen(true);
  };

  const openModalEdit = (regalo, idx) => {
    setIsOpenEdit(true);
    setModificarRegalo(regalo);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeModalEdit = () => {
    setIsOpenEdit(false);
  };

  return (
    <section className="App">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Añadir regalo"
      >
        <CreateGift añadirRegalo={añadirRegalo} />
      </Modal>

      <Modal
        isOpen={modalIsOpenEdit}
        onRequestClose={closeModalEdit}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Editar regalo"
      >
        <EditGift
          modificarRegalo={modificarRegalo}
          editarRegalo={editarRegalo}
        />
      </Modal>

      <div className="App_regalos">
        <h1>Regalos:</h1>

        <button className="App_regalos-buttonModal" onClick={openModal}>
          Agregar regalo
        </button>

        <ul className="App_listaRegalos">
          {regalos.length > 0 ? (
            regalos.map((regalo, idx) => (
              <div className="App_listaRegalos-div" key={idx}>
                <li>
                  🎁 <img src={regalo.imagen} alt={regalo.producto} />{" "}
                  <p>
                    {regalo.cantidad}x {regalo.producto}
                    <span className="App_listaRegalos-destinatario">
                      {regalo.destinatario}
                    </span>
                  </p>
                </li>
                <div className="App_listaRegalos-botones">
                  <button onClick={() => openModalEdit(regalo, idx)}>E</button>
                  <button onClick={() => eliminarRegalo(idx)}>❌</button>
                </div>
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
