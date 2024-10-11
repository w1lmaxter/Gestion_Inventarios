import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Componente funcional que muestra los detalles de orden de compra
const TablaDetalleOrdenCompra = () => {
  const [detallesCompra, setDetallesCompra] = useState([]);
  const [formData, setFormData] = useState({
    id_orden_compra: "",
    id_producto: "",
    cantidad: "",
    ide: null, // Cambiado a null por claridad
  });
  const [editar, setEditar] = useState(false);

  // Funcion para obtener los detalles de orden de compra desde el backend
  const obtenerDetallesCompra = () => {
    axios.get("http://localhost:3001/detalle_orden_compra")
      .then((response) => setDetallesCompra(response.data))
      .catch((error) => console.error("Error al obtener detalles de orden de compra:", error));
  };

  useEffect(() => {
    obtenerDetallesCompra();
  }, []);

  // Función para actualizar un detalle de compra
  const update = async () => {
    if (formData.ide !== null) {
      try {
        await axios.put("http://localhost:3001/detalle_orden_compra/update", formData);
        obtenerDetallesCompra();
        limpiarCampos();
        Swal.fire("Actualización exitosa!", "Detalle actualizado con éxito", "success");
      } catch (error) {
        console.error("Error al actualizar detalle de compra:", error);
        Swal.fire("Error", "No se pudo actualizar el detalle", "error");
      }
    } else {
      Swal.fire("Error", "No se puede actualizar sin un ID válido", "error");
    }
  };

  // Función para eliminar un detalle de compra con confirmación
  const deleteDetalle = (detalle) => {
    Swal.fire({
      title: "Confirmar eliminación?",
      html: `<i>¿Realmente desea eliminar el detalle con ID <strong>${detalle.id_detalle_compra}</strong>?</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3001/detalle_orden_compra/delete/${detalle.id_detalle_compra}`)
          .then(() => {
            obtenerDetallesCompra();
            Swal.fire(`El detalle fue eliminado`, '', 'success');
          })
          .catch((error) => {
            console.error("Error al eliminar detalle de compra:", error);
            Swal.fire("Error", "No se pudo eliminar el detalle", "error");
          });
      }
    });
  };

  // Función para limpiar campos del formulario
  const limpiarCampos = () => {
    setFormData({ id_orden_compra: "", id_producto: "", cantidad: "", ide: null });
    setEditar(false);
  };

  const editarDetalle = (detalle) => {
    setEditar(true);
    setFormData({ ...detalle, ide: detalle.id_detalle_compra });
  };

  return (
    <div>
      <div className="card text-center mt-4">
        <div className="card-header">GESTIÓN DE DETALLES DE ORDEN DE COMPRA</div>
        <div className="card-body">
          {/* Formulario para editar detalles de orden de compra */}
          <div className="input-group mb-3">
            <span className="input-group-text">ID Orden Compra</span>
            <input
              type="text"
              onChange={(event) => setFormData({ ...formData, id_orden_compra: event.target.value })}
              className="form-control"
              value={formData.id_orden_compra}
              placeholder="Ingrese el ID de la orden de compra"
              disabled={!editar} // Desactiva el campo si no está en modo de edición
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">ID Producto</span>
            <input
              type="text"
              onChange={(event) => setFormData({ ...formData, id_producto: event.target.value })}
              className="form-control"
              value={formData.id_producto}
              placeholder="Ingrese el ID del producto"
              disabled={!editar} // Desactiva el campo si no está en modo de edición
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Cantidad</span>
            <input
              type="text"
              onChange={(event) => setFormData({ ...formData, cantidad: event.target.value })}
              className="form-control"
              value={formData.cantidad}
              placeholder="Ingrese la cantidad"
              disabled={!editar} // Desactiva el campo si no está en modo de edición
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
            <span>No hay detalles seleccionados para editar</span>
          )}
        </div>
      </div>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Orden Compra</th>
            <th>ID Producto</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detallesCompra.map((detalle) => (
            <tr key={detalle.id_detalle_compra}>
              <td>{detalle.id_detalle_compra}</td>
              <td>{detalle.id_orden_compra}</td>
              <td>{detalle.id_producto}</td>
              <td>{detalle.cantidad}</td>
              <td>
                <div className="btn-group" role="group">
                  <button type="button" onClick={() => editarDetalle(detalle)} className="btn btn-info">Editar</button>
                  <button type="button" onClick={() => deleteDetalle(detalle)} className="btn btn-danger">Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaDetalleOrdenCompra;
