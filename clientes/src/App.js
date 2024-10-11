import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import React from "react";

import GestionProductos from "./components/GestionProductos";
import GestionClientes from "./components/GestionClientes";
import GestionOrdenesCompra from "./components/GestionOrdenesCompra"; 
import GestionOrdenesVenta from './components/GestionOrdenesVenta'; 
import TablaDetalleOrdenCompra from "./components/TablaDetalleOrdenCompra"; 
import TablaDetalleOrdenVenta from "./components/TablaDetalleOrdenVenta"; 
import GestiónProveedores from "./components/GestiónProveedores";
function App() {
  const [empleadoslist, setEmpleados] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    edad: 0,
    pais: "",
    cargo: "",
    annios: 0,
    id: 0,
  });
  const [editar, setEditar] = useState(false);

  
  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados")
      .then((response) => setEmpleados(response.data))
      .catch((error) => console.error("Error al obtener empleados:", error));
  };
  useEffect(() => {
    getEmpleados();
  }, []);

  const add = () => {
    Axios.post("http://localhost:3001/create", formData)
      .then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire('Registro exitoso!', `El empleado ${formData.nombre} fue registrado con éxito`, 'success');
      })
      .catch((error) => handleError(error));
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", formData)
      .then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire('Actualización exitosa', `El empleado ${formData.nombre} ha sido actualizado correctamente`, 'success');
      })
      .catch((error) => handleError(error));
  };

  const deleteEmpleado = (val) => {
    Swal.fire({
      title: "Confirmar eliminado?",
      html: `<i>Realmente desea eliminar a <strong>${val.nombre}</strong>?</i>`,
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getEmpleados();
          Swal.fire(`${val.nombre} fue eliminado`, '', 'success');
        }).catch((error) => handleError(error));
      }
    });
  };

  const limpiarCampos = () => {
    setFormData({
      nombre: "",
      edad: 0,
      pais: "",
      cargo: "",
      annios: 0,
      id: 0,
    });
    setEditar(false);
  };

  const editarEmpleado = (val) => {
    setEditar(true);
    setFormData(val);
  };

  const handleError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message === "Network Error" ? "Intente más tarde" : error.message
    });
  };

  return (
    <div className="container">   
      <h1>Gestión de Inventarios</h1>
      <GestiónProveedores /> {}
      <h1>Gestión de productos</h1>
      <GestionProductos />{}
      <h1>Gestión de Clientes</h1>
      <GestionClientes/>{}
      <h1>Gestión Ordenes compra</h1>
      <GestionOrdenesCompra /> {}
      <h1>Gestión Ordenes venta</h1>
      <GestionOrdenesVenta /> {}
      <h1>Gestión Detalle Orden Compra</h1>
      <TablaDetalleOrdenCompra /> {}
      <h1>Gestión Detalle Orden Venta</h1>
      <TablaDetalleOrdenVenta /> {}
      
      <h1>Gestión de empleado</h1>
      <div className="card text-center mt-4">
        <div className="card-header">GESTIÓN DE EMPLEADOS</div>
        <div className="card-body">
          {}
          <div className="input-group mb-3">
            <span className="input-group-text">Nombre</span>
            <input
              type="text"
              onChange={(event) => setFormData({ ...formData, nombre: event.target.value })}
              className="form-control"
              value={formData.nombre}
              placeholder="Ingrese un nombre"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Edad</span>
            <input
              type="number"
              onChange={(event) => setFormData({ ...formData, edad: event.target.value === '' ? 0 : Number(event.target.value) })}
              className="form-control"
              value={formData.edad === 0 ? '' : formData.edad}
              placeholder="Ingrese edad"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Pais</span>
            <input
              type="text"
              onChange={(event) => setFormData({ ...formData, pais: event.target.value })}
              className="form-control"
              value={formData.pais}
              placeholder="Ingrese el pais"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Cargo</span>
            <input
              type="text"
              onChange={(event) => setFormData({ ...formData, cargo: event.target.value })}
              className="form-control"
              value={formData.cargo}
              placeholder="Ingrese un cargo"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Años de experiencia</span>
            <input
              type="number"
              onChange={(event) => setFormData({ ...formData, annios: event.target.value === '' ? 0 : Number(event.target.value) })}
              className="form-control"
              value={formData.annios === 0 ? '' : formData.annios}
              placeholder="Ingrese los años"
            />
          </div>
        </div>
        <div className="card-footer text-muted">
          {editar ? (
            <div>
              <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
              <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
            </div>
          ) : (
            <button className='btn btn-primary btn-lg' onClick={add}>Registrar</button>
          )}
        </div>
      </div>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Pais</th>
            <th>Cargo</th>
            <th>Experiencia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadoslist.map((val) => (
            <tr key={val.id}>
              <th>{val.id}</th>
              <td>{val.nombre}</td>
              <td>{val.edad}</td>
              <td>{val.pais}</td>
              <td>{val.cargo}</td>
              <td>{val.annios}</td>
              <td>
                <div className="btn-group" role="group">
                  <button type="button" onClick={() => editarEmpleado(val)} className="btn btn-info">Editar</button>
                  <button type="button" onClick={() => deleteEmpleado(val)} className="btn btn-danger">Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
