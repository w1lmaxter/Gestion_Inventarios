import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

const GestionClientes = () => {
  const [clientesList, setClientesList] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    contacto: "",
    telefono: "",
    direccion: "",
    ide: null, // Cambiado a null por claridad
  });
  const [editar, setEditar] = useState(false);

  // Obtener clientes desde el backend
  const obtenerClientes = () => {
    Axios.get("http://localhost:3001/clientes")
      .then((response) => setClientesList(response.data))
      .catch((error) => console.error("Error al obtener clientes:", error));
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  const update = async () => {
    if (formData.ide !== null) { // Verifica que ide tenga un valor
      try {
        await Axios.put("http://localhost:3001/cliente/update", formData);
        obtenerClientes(); // Actualizar la lista de clientes
        limpiarCampos();
        Swal.fire("Actualización exitosa!", "Cliente actualizado con éxito", "success");
      } catch (error) {
        console.error("Error al actualizar cliente:", error);
        Swal.fire("Error", "No se pudo actualizar el cliente", "error");
      }
    } else {
      Swal.fire("Error", "No se puede actualizar un cliente sin un ID válido", "error");
    }
  };

  const add = () => {
    Axios.post("http://localhost:3001/cliente/create", formData)
      .then(() => {
        obtenerClientes();
        limpiarCampos();
        Swal.fire("Registro exitoso!", "El cliente fue registrado con éxito", "success");
      })
      .catch((error) => console.error("Error al registrar cliente:", error));
  };

  // Función para eliminar un cliente con confirmación
  const deleteCliente = (cliente) => {
    Swal.fire({
      title: "Confirmar eliminación?",
      html: `<i>¿Realmente desea eliminar a <strong>${cliente.nombre}</strong>?</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/cliente/delete/${cliente.id_cliente}`)
          .then(() => {
            obtenerClientes(); // Actualizar la lista de clientes
            Swal.fire(`${cliente.nombre} fue eliminado`, '', 'success');
          })
          .catch((error) => {
            console.error("Error al eliminar cliente:", error);
            Swal.fire("Error", "No se pudo eliminar el cliente", "error");
          });
      }
    });
  };

  // Función para limpiar campos del formulario
  const limpiarCampos = () => {
    setFormData({ nombre: "", contacto: "", telefono: "", direccion: "", ide: null }); // Cambié ide a null
    setEditar(false);
  };

  const editarCliente = (val) => {
    setEditar(true);
    setFormData({ ...val, ide: val.id_cliente }); // Cambié ide a id_cliente
  };

  return (
    <div>
      <div className="card text-center mt-4">
        <div className="card-header">GESTIÓN DE CLIENTES</div>
        <div className="card-body">
          {/* Formulario para añadir/editar clientes */}
          <div className="input-group mb-3">
            <span className="input-group-text">Nombre</span>
            <input
              type="text"
              onChange={(event) => setFormData({ ...formData, nombre: event.target.value })}
              className="form-control"
              value={formData.nombre}
              placeholder="Ingrese el nombre del cliente"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Contacto</span>
            <input
              type="text"
              onChange={(event) => setFormData({ ...formData, contacto: event.target.value })}
              className="form-control"
              value={formData.contacto}
              placeholder="Ingrese el contacto del cliente"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Teléfono</span>
            <input
              type="text"
              onChange={(event) => setFormData({ ...formData, telefono: event.target.value })}
              className="form-control"
              value={formData.telefono}
              placeholder="Ingrese el teléfono"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Dirección</span>
            <input
              type="text"
              onChange={(event) => setFormData({ ...formData, direccion: event.target.value })}
              className="form-control"
              value={formData.direccion}
              placeholder="Ingrese la dirección"
            />
          </div>
        </div>
        <div className="card-footer text-muted">
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={update}>Actualizar</button>
              <button className="btn btn-info m-2" onClick={limpiarCampos}>Cancelar</button>
            </div>
          ) : (
            <button className="btn btn-primary btn-lg" onClick={add}>Registrar</button>
          )}
        </div>
      </div>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesList.map((val) => (
            <tr key={val.id_cliente}>
              <th>{val.id_cliente}</th>
              <td>{val.nombre}</td>
              <td>{val.contacto}</td>
              <td>{val.telefono}</td>
              <td>{val.direccion}</td>
              <td>
                <div className="btn-group" role="group">
                  <button type="button" onClick={() => editarCliente(val)} className="btn btn-info">Editar</button>
                  <button type="button" onClick={() => deleteCliente(val)} className="btn btn-danger">Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionClientes;
