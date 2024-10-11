import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

const GestionOrdenesCompra = () => {
  const [ordenesList, setOrdenesList] = useState([]);
  const [formData, setFormData] = useState({
    fecha_inicio: "",
    fecha_final: "",
    estado: "pendiente", // Valor por defecto
    id_proveedor: "",
    ide: null,
  });
  const [editar, setEditar] = useState(false);

  // Obtener órdenes de compra desde el backend
  const obtenerOrdenes = () => {
    Axios.get("http://localhost:3001/ordenes_compra")
      .then((response) => setOrdenesList(response.data))
      .catch((error) => console.error("Error al obtener órdenes de compra:", error));
  };

  useEffect(() => {
    obtenerOrdenes();
  }, []);

  const update = async () => {
    if (formData.ide !== null) {
      try {
        await Axios.put("http://localhost:3001/orden_compra/update", formData);
        obtenerOrdenes(); // Actualizar la lista de órdenes de compra
        limpiarCampos();
        Swal.fire("Actualización exitosa!", "Orden de compra actualizada con éxito", "success");
      } catch (error) {
        console.error("Error al actualizar orden de compra:", error);
        Swal.fire("Error", "No se pudo actualizar la orden de compra", "error");
      }
    } else {
      Swal.fire("Error", "No se puede actualizar una orden de compra sin un ID válido", "error");
    }
  };

  const add = () => {
    Axios.post("http://localhost:3001/orden_compra/create", formData)
      .then(() => {
        obtenerOrdenes();
        limpiarCampos();
        Swal.fire("Registro exitoso!", "La orden de compra fue registrada con éxito", "success");
      })
      .catch((error) => console.error("Error al registrar orden de compra:", error));
  };

  const deleteOrden = (orden) => {
    Swal.fire({
      title: "Confirmar eliminación?",
      html: `<i>¿Realmente desea eliminar la orden de compra con ID <strong>${orden.id_orden_compra}</strong>?</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/orden_compra/delete/${orden.id_orden_compra}`)
          .then(() => {
            obtenerOrdenes(); // Actualizar la lista de órdenes de compra
            Swal.fire(`Orden de compra ID ${orden.id_orden_compra} fue eliminada`, '', 'success');
          })
          .catch((error) => {
            console.error("Error al eliminar orden de compra:", error);
            Swal.fire("Error", "No se pudo eliminar la orden de compra", "error");
          });
      }
    });
  };

  const limpiarCampos = () => {
    setFormData({ fecha_inicio: "", fecha_final: "", estado: "pendiente", id_proveedor: "", ide: null });
    setEditar(false);
  };

  const editarOrden = (val) => {
    setEditar(true);
    setFormData({ ...val, ide: val.id_orden_compra });
  };

  return (
    <div>
      <div className="card text-center mt-4">
        <div className="card-header">GESTIÓN DE ÓRDENES DE COMPRA</div>
        <div className="card-body">
          {/* Formulario para añadir/editar órdenes de compra */}
          <div className="input-group mb-3">
            <span className="input-group-text">Fecha Inicio</span>
            <input
              type="date"
              onChange={(event) => setFormData({ ...formData, fecha_inicio: event.target.value })}
              className="form-control"
              value={formData.fecha_inicio}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Fecha Final</span>
            <input
              type="date"
              onChange={(event) => setFormData({ ...formData, fecha_final: event.target.value })}
              className="form-control"
              value={formData.fecha_final}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Estado</span>
            <select
              onChange={(event) => setFormData({ ...formData, estado: event.target.value })}
              className="form-select"
              value={formData.estado}
            >
              <option value="pendiente">Pendiente</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">ID Proveedor</span>
            <input
              type="number"
              onChange={(event) => setFormData({ ...formData, id_proveedor: event.target.value })}
              className="form-control"
              value={formData.id_proveedor}
              placeholder="Ingrese el ID del proveedor"
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
            <th>Fecha Inicio</th>
            <th>Fecha Final</th>
            <th>Estado</th>
            <th>ID Proveedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenesList.map((val) => (
            <tr key={val.id_orden_compra}>
              <th>{val.id_orden_compra}</th>
              <td>{val.fecha_inicio}</td>
              <td>{val.fecha_final}</td>
              <td>{val.estado}</td>
              <td>{val.id_proveedor}</td>
              <td>
                <div className="btn-group" role="group">
                  <button type="button" onClick={() => editarOrden(val)} className="btn btn-info">Editar</button>
                  <button type="button" onClick={() => deleteOrden(val)} className="btn btn-danger">Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionOrdenesCompra;
