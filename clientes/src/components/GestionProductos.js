import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

const GestionProductos = () => {
  const [productosList, setProductosList] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    costo: "",
    precio_venta: "",
    cantidad: "",
    ide: null,
  });
  const [editar, setEditar] = useState(false);

  // Obtener productos desde el backend
  const obtenerProductos = () => {
    Axios.get("http://localhost:3001/productos")
      .then((response) => setProductosList(response.data))
      .catch((error) => console.error("Error al obtener productos:", error));
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const update = async () => {
    if (formData.ide !== null) {
      try {
        await Axios.put("http://localhost:3001/producto/update", formData);
        obtenerProductos(); // Actualizar la lista de productos
        limpiarCampos();
        Swal.fire("Actualización exitosa!", "Producto actualizado con éxito", "success");
      } catch (error) {
        console.error("Error al actualizar producto:", error);
        Swal.fire("Error", "No se pudo actualizar el producto", "error");
      }
    } else {
      Swal.fire("Error", "No se puede actualizar un producto sin un ID válido", "error");
    }
  };

  const add = () => {
    Axios.post("http://localhost:3001/producto/create", formData)
      .then(() => {
        obtenerProductos();
        limpiarCampos();
        Swal.fire("Registro exitoso!", "El producto fue registrado con éxito", "success");
      })
      .catch((error) => console.error("Error al registrar producto:", error));
  };

  const deleteProducto = (producto) => {
    Swal.fire({
      title: "Confirmar eliminación?",
      html: `<i>¿Realmente desea eliminar el producto <strong>${producto.nombre}</strong>?</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/producto/delete/${producto.id_producto}`)
          .then(() => {
            obtenerProductos(); // Actualizar la lista de productos
            Swal.fire(`${producto.nombre} fue eliminado`, '', 'success');
          })
          .catch((error) => {
            console.error("Error al eliminar producto:", error);
            Swal.fire("Error", "No se pudo eliminar el producto", "error");
          });
      }
    });
  };

  const limpiarCampos = () => {
    setFormData({ nombre: "", costo: "", precio_venta: "", cantidad: "", ide: null });
    setEditar(false);
  };

  const editarProducto = (val) => {
    setEditar(true);
    setFormData({ ...val, ide: val.id_producto });
  };

  return (
    <div>
      <div className="card text-center mt-4">
        <div className="card-header">GESTIÓN DE PRODUCTOS</div>
        <div className="card-body">
          {/* Formulario para añadir/editar productos */}
          <div className="input-group mb-3">
            <span className="input-group-text">Nombre</span>
            <input
              type="text"
              onChange={(event) => setFormData({ ...formData, nombre: event.target.value })}
              className="form-control"
              value={formData.nombre}
              placeholder="Ingrese el nombre del producto"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Costo</span>
            <input
              type="number"
              onChange={(event) => setFormData({ ...formData, costo: event.target.value })}
              className="form-control"
              value={formData.costo}
              placeholder="Ingrese el costo"
              step="0.01"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Precio de Venta</span>
            <input
              type="number"
              onChange={(event) => setFormData({ ...formData, precio_venta: event.target.value })}
              className="form-control"
              value={formData.precio_venta}
              placeholder="Ingrese el precio de venta"
              step="0.01"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Cantidad</span>
            <input
              type="number"
              onChange={(event) => setFormData({ ...formData, cantidad: event.target.value })}
              className="form-control"
              value={formData.cantidad}
              placeholder="Ingrese la cantidad"
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
            <th>Costo</th>
            <th>Precio de Venta</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosList.map((val) => (
            <tr key={val.id_producto}>
              <th>{val.id_producto}</th>
              <td>{val.nombre}</td>
              <td>{val.costo}</td>
              <td>{val.precio_venta}</td>
              <td>{val.cantidad}</td>
              <td>
                <div className="btn-group" role="group">
                  <button type="button" onClick={() => editarProducto(val)} className="btn btn-info">Editar</button>
                  <button type="button" onClick={() => deleteProducto(val)} className="btn btn-danger">Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionProductos;
