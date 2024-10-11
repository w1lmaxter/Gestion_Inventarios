import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

const GestionProveedores = () => {
  const [proveedoresList, setProveedoresList] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    contacto: "",
    telefono: "",
    direccion: "",
    ide: null, // Cambiado a null por claridad
  });
  const [editar, setEditar] = useState(false);

  // Obtener proveedores desde el backend
  const obtenerProveedores = () => {
    Axios.get("http://localhost:3001/proveedores")
      .then((response) => setProveedoresList(response.data))
      .catch((error) => console.error("Error al obtener proveedores:", error));
  };

  useEffect(() => {
    obtenerProveedores();
  }, []);

  const update = async () => {
    if (formData.ide !== null) { // Verifica que ide tenga un valor
      try {
        await Axios.put("http://localhost:3001/proveedor/update", formData);
        obtenerProveedores(); // Actualizar la lista de proveedores
        limpiarCampos();
        Swal.fire("Actualización exitosa!", "Proveedor actualizado con éxito", "success");
      } catch (error) {
        console.error("Error al actualizar proveedor:", error);
        Swal.fire("Error", "No se pudo actualizar el proveedor", "error");
      }
    } else {
      Swal.fire("Error", "No se puede actualizar un proveedor sin un ID válido", "error");
    }
  };

  const add = () => {
    Axios.post("http://localhost:3001/proveedor/create", formData)
      .then(() => {
        obtenerProveedores();
        limpiarCampos();
        Swal.fire("Registro exitoso!", "El proveedor fue registrado con éxito", "success");
      })
      .catch((error) => console.error("Error al registrar proveedor:", error));
  };

  // Función para eliminar un proveedor con confirmación
  const deleteProveedor = (proveedor) => {
    Swal.fire({
      title: "Confirmar eliminación?",
      html: `<i>¿Realmente desea eliminar a <strong>${proveedor.nombre}</strong>?</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/proveedor/delete/${proveedor.id_proveedor}`)
          .then(() => {
            obtenerProveedores(); // Actualizar la lista de proveedores
            Swal.fire(`${proveedor.nombre} fue eliminado`, '', 'success');
          })
          .catch((error) => {
            console.error("Error al eliminar proveedor:", error);
            Swal.fire("Error", "No se pudo eliminar el proveedor", "error");
          });
      }
    });
  };

  // Función para limpiar campos del formulario
  const limpiarCampos = () => {
    setFormData({ nombre: "", contacto: "", telefono: "", direccion: "", ide: null }); // Cambié ide a null
    setEditar(false);
  };

  // Cuando configures el proveedor a editar, asegúrate de pasar el id_proveedor:
  const editarProveedor = (val) => {
    setEditar(true);
    setFormData({ ...val, ide: val.id_proveedor }); // Cambié ide a id_proveedor
  };

  return (
    <div>
      <div className="card text-center mt-4">
        <div className="card-header">GESTIÓN DE PROVEEDORES</div>
        <div className="card-body">
          {/* Formulario para añadir/editar proveedores */}
          <div className="input-group mb-3">
            <span className="input-group-text">Nombre</span>
            <input
              type="text"
              onChange={(event) => setFormData({ ...formData, nombre: event.target.value })}
              className="form-control"
              value={formData.nombre}
              placeholder="Ingrese el nombre del proveedor"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Contacto</span>
            <input
              type="text"
              onChange={(event) => setFormData({ ...formData, contacto: event.target.value })}
              className="form-control"
              value={formData.contacto}
              placeholder="Ingrese el contacto del proveedor"
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
          {proveedoresList.map((val) => (
            <tr key={val.id_proveedor}>
              <th>{val.id_proveedor}</th>
              <td>{val.nombre}</td>
              <td>{val.contacto}</td>
              <td>{val.telefono}</td>
              <td>{val.direccion}</td>
              <td>
                <div className="btn-group" role="group">
                  <button type="button" onClick={() => editarProveedor(val)} className="btn btn-info">Editar</button>
                  <button type="button" onClick={() => deleteProveedor(val)} className="btn btn-danger">Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionProveedores;
