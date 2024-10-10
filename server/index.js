const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "Proposito2028+",
   database: "empleados_crud"
});


app.post("/create", (req, res) => {
   const { nombre, edad, pais, cargo, annios } = req.body;

   db.query(
     'INSERT INTO empleados (nombre, edad, pais, cargo, annios) VALUES (?,?,?,?,?)',
     [nombre, edad, pais, cargo, annios],
     (err, result) => {
        if (err) {
           console.log(err);
           res.status(500).send("Error al registrar el empleado.");
        } else {
           res.send(result);
        }
     }
   );
});

// Obtener empleados
app.get("/empleados", (req, res) => {
   db.query('SELECT * FROM empleados', (err, result) => {
        if (err) {
             console.log(err);
             res.status(500).send("Error al obtener empleados.");
        } else {
             res.send(result);
        }
     });
});

// Actualizar empleado
app.put("/update", (req, res) => {
   const { id, nombre, edad, pais, cargo, annios } = req.body;

   db.query(
      'UPDATE empleados SET nombre = ?, edad = ?, pais = ?, cargo = ?, annios = ? WHERE id = ?',
      [nombre, edad, pais, cargo, annios, id],
      (err, result) => {
         if (err) {
            console.log("Error en la consulta SQL:", err);
            res.status(500).send("Error al actualizar empleado.");
         } else {
            res.send(result);
         }
      }
   );
});

// Eliminar empleado
app.delete("/delete/:id", (req, res) => {
   const id = req.params.id;

   db.query(
      'DELETE FROM empleados WHERE id = ?',
      [id],
      (err, result) => {
         if (err) {
            console.log("Error al eliminar empleado:", err);
            res.status(500).send("Error al eliminar empleado.");
         } else {
            res.send(result);
         }
      }
   );
});

// Rutas para proveedores

// Obtener proveedores
app.get("/proveedores", (req, res) => {
   db.query('SELECT * FROM proveedores', (err, result) => {
      if (err) {
         console.log(err);
         res.status(500).send("Error al obtener proveedores.");
      } else {
         res.send(result);
      }
   });
});

// Agregar un proveedor
app.post("/proveedor/create", (req, res) => {
   const { nombre, contacto, telefono, direccion } = req.body;

   db.query(
     'INSERT INTO proveedores (nombre, contacto, telefono, direccion) VALUES (?, ?, ?, ?)',
     [nombre, contacto, telefono, direccion],
     (err, result) => {
       if (err) {
         console.log("Error al agregar proveedor:", err);
         res.status(500).send("Error al agregar proveedor.");
       } else {
         res.send(result);
       }
     }
   );
});

// Actualizar un proveedor
app.put("/proveedor/update", (req, res) => {
   const id_proveedor = req.body.id_proveedor; // Cambia 'ide' a 'id_proveedor'
   const { nombre, contacto, telefono, direccion } = req.body;

   // Verifica que el ID no sea nulo
   if (id_proveedor == null) {
     return res.status(400).send("El ID no puede ser nulo.");
   }

   db.query(
     'UPDATE proveedores SET nombre = ?, contacto = ?, telefono = ?, direccion = ? WHERE id_proveedor = ?', 
     [nombre, contacto, telefono, direccion, id_proveedor],
     (err, result) => {
       if (err) {
         console.log("Error en la consulta SQL:", err);
         res.status(500).send("Error al actualizar proveedor.");
       } else {
         res.send(result);
       }
     }
   );
});

// Eliminar un proveedor
app.delete("/proveedor/delete/:id", (req, res) => {
   const id = req.params.id;

   db.query(
     'DELETE FROM proveedores WHERE id_proveedor = ?', // Cambié 'id' a 'id_proveedor'
     [id],
     (err, result) => {
       if (err) {
         console.log("Error al eliminar proveedor:", err);
         res.status(500).send("Error al eliminar proveedor.");
       } else {
         res.send(result);
       }
     }
   );
});

// Rutas para clientes

app.get("/clientes", (req, res) => {
   db.query('SELECT * FROM clientes', (err, result) => {
      if (err) {
         console.log(err);
         res.status(500).send("Error al obtener clientes.");
      } else {
         res.send(result);
      }
   });
});

// Agregar un cliente
app.post("/cliente/create", (req, res) => {
   const { nombre, contacto, telefono, direccion } = req.body;

   db.query(
     'INSERT INTO clientes (nombre, contacto, telefono, direccion) VALUES (?, ?, ?, ?)',
     [nombre, contacto, telefono, direccion],
     (err, result) => {
       if (err) {
         console.log("Error al agregar cliente:", err);
         res.status(500).send("Error al agregar cliente.");
       } else {
         res.send(result);
       }
     }
   );
});

// Actualizar un cliente
app.put("/cliente/update", (req, res) => {
   const id_cliente = req.body.id_cliente;
   const { nombre, contacto, telefono, direccion } = req.body;

   // Verifica que el ID no sea nulo
   if (id_cliente == null) {
     return res.status(400).send("El ID no puede ser nulo.");
   }

   db.query(
     'UPDATE clientes SET nombre = ?, contacto = ?, telefono = ?, direccion = ? WHERE id_cliente = ?', 
     [nombre, contacto, telefono, direccion, id_cliente],
     (err, result) => {
       if (err) {
         console.log("Error en la consulta SQL:", err);
         res.status(500).send("Error al actualizar cliente.");
       } else {
         res.send(result);
       }
     }
   );
});

// Eliminar un cliente
app.delete("/cliente/delete/:id", (req, res) => {
   const id = req.params.id;

   db.query(
     'DELETE FROM clientes WHERE id_cliente = ?',
     [id],
     (err, result) => {
       if (err) {
         console.log("Error al eliminar cliente:", err);
         res.status(500).send("Error al eliminar cliente.");
       } else {
         res.send(result);
       }
     }
   );
});

// Obtener productos
app.get("/productos", (req, res) => {
  db.query('SELECT * FROM productos', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener productos.");
    } else {
      res.send(result);
    }
  });
});

// Agregar un producto
app.post("/producto/create", (req, res) => {
  const { nombre, costo, precio_venta, cantidad } = req.body;

  db.query(
    'INSERT INTO productos (nombre, costo, precio_venta, cantidad) VALUES (?, ?, ?, ?)',
    [nombre, costo, precio_venta, cantidad],
    (err, result) => {
      if (err) {
        console.log("Error al agregar producto:", err);
        res.status(500).send("Error al agregar producto.");
      } else {
        res.send(result);
      }
    }
  );
});

// Actualizar un producto
app.put("/producto/update", (req, res) => {
  const id_producto = req.body.ide;
  const { nombre, costo, precio_venta, cantidad } = req.body;

  // Verifica que el ID no sea nulo
  if (id_producto == null) {
    return res.status(400).send("El ID no puede ser nulo.");
  }

  db.query(
    'UPDATE productos SET nombre = ?, costo = ?, precio_venta = ?, cantidad = ? WHERE id_producto = ?', 
    [nombre, costo, precio_venta, cantidad, id_producto],
    (err, result) => {
      if (err) {
        console.log("Error en la consulta SQL:", err);
        res.status(500).send("Error al actualizar producto.");
      } else {
        res.send(result);
      }
    }
  );
});

// Eliminar un producto
app.delete("/producto/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM productos WHERE id_producto = ?',
    [id],
    (err, result) => {
      if (err) {
        console.log("Error al eliminar producto:", err);
        res.status(500).send("Error al eliminar producto.");
      } else {
        res.send(result);
      }
    }
  );
});



// Obtener detalles de orden de compra
app.get("/detalle_orden_compra", (req, res) => {
   db.query('SELECT * FROM detalle_orden_compra', (err, result) => {
      if (err) {
         console.log(err);
// Obtener clientes
         res.status(500).send("Error al obtener los detalles de la orden de compra.");
      } else {
         res.send(result);
      }
   });
});


app.put("/detalle_orden_compra/update", (req, res) => {
   const id_detalle_compra = req.body.id_detalle_compra;
   const { id_orden_compra, id_producto, cantidad } = req.body;

   // Verifica que el ID no sea nulo
   if (id_detalle_compra == null) {
     return res.status(400).send("El ID no puede ser nulo.");
   }

   db.query(
     'UPDATE detalle_orden_compra SET id_orden_compra = ?, id_producto = ?, cantidad = ? WHERE id_detalle_compra = ?', 
     [id_orden_compra, id_producto, cantidad, id_detalle_compra],
     (err, result) => {
       if (err) {
         console.log("Error al actualizar detalle de orden de compra:", err);
         res.status(500).send("Error al actualizar detalle de orden de compra.");
       } else {
         res.send(result);
       }
     }
   );
});

app.delete("/detalle_orden_compra/delete/:id", (req, res) => {
   const id = req.params.id;

   db.query(
     'DELETE FROM detalle_orden_compra WHERE id_detalle_compra = ?',
     [id],
     (err, result) => {
       if (err) {
         console.log("Error al eliminar detalle de orden de compra:", err);
         res.status(500).send("Error al eliminar detalle de orden de compra.");
       } else {
         res.send(result);
       }
     }
   );
});

// Obtener todos los detalles de orden de venta
app.get("/detalle_orden_venta", (req, res) => {
  db.query('SELECT * FROM detalle_orden_venta', (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send("Error al obtener los detalles de la orden de venta.");
     } else {
        res.send(result);
     }
  });
});

// Actualizar un detalle de orden de venta
app.put("/detalle_orden_venta/update", (req, res) => {
  const id_detalle_venta = req.body.ide; // Cambiado a 'ide' para que coincida con el nombre en el frontend
  const { id_orden_venta, id_producto, cantidad } = req.body;

  // Verifica que el ID no sea nulo
  if (id_detalle_venta == null) {
    return res.status(400).send("El ID no puede ser nulo.");
  }

  db.query(
    'UPDATE detalle_orden_venta SET id_orden_venta = ?, id_producto = ?, cantidad = ? WHERE id_detalle_venta = ?', 
    [id_orden_venta, id_producto, cantidad, id_detalle_venta],
    (err, result) => {
      if (err) {
        console.log("Error al actualizar detalle de orden de venta:", err);
        res.status(500).send("Error al actualizar detalle de orden de venta.");
      } else {
        res.send(result);
      }
    }
  );
});

// Obtener órdenes de compra
app.get("/ordenes_compra", (req, res) => {
  db.query('SELECT * FROM ordenes_compra', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener órdenes de compra.");
    } else {
      res.send(result);
    }
  });
});

// Agregar una orden de compra
app.post("/orden_compra/create", (req, res) => {
  const { fecha_inicio, fecha_final, estado, id_proveedor } = req.body;

  db.query(
    'INSERT INTO ordenes_compra (fecha_inicio, fecha_final, estado, id_proveedor) VALUES (?, ?, ?, ?)',
    [fecha_inicio, fecha_final, estado, id_proveedor],
    (err, result) => {
      if (err) {
        console.log("Error al agregar orden de compra:", err);
        res.status(500).send("Error al agregar orden de compra.");
      } else {
        res.send(result);
      }
    }
  );
});

// Actualizar una orden de compra
app.put("/orden_compra/update", (req, res) => {
  const id_orden_compra = req.body.ide;
  const { fecha_inicio, fecha_final, estado, id_proveedor } = req.body;

  // Verifica que el ID no sea nulo
  if (id_orden_compra == null) {
    return res.status(400).send("El ID no puede ser nulo.");
  }

  db.query(
    'UPDATE ordenes_compra SET fecha_inicio = ?, fecha_final = ?, estado = ?, id_proveedor = ? WHERE id_orden_compra = ?', 
    [fecha_inicio, fecha_final, estado, id_proveedor, id_orden_compra],
    (err, result) => {
      if (err) {
        console.log("Error en la consulta SQL:", err);
        res.status(500).send("Error al actualizar orden de compra.");
      } else {
        res.send(result);
      }
    }
  );
});

// Eliminar una orden de compra
app.delete("/orden_compra/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM ordenes_compra WHERE id_orden_compra = ?',
    [id],
    (err, result) => {
      if (err) {
        console.log("Error al eliminar orden de compra:", err);
        res.status(500).send("Error al eliminar orden de compra.");
      } else {
        res.send(result);
      }
    }
  );
});

// Obtener órdenes de venta
app.get("/ordenes_venta", (req, res) => {
  db.query('SELECT * FROM ordenes_venta', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al obtener órdenes de venta.");
    } else {
      res.send(result);
    }
  });
});

// Agregar una orden de venta
app.post("/orden_venta/create", (req, res) => {
  const { fecha_inicio, fecha_final, estado, id_cliente } = req.body;

  db.query(
    'INSERT INTO ordenes_venta (fecha_inicio, fecha_final, estado, id_cliente) VALUES (?, ?, ?, ?)',
    [fecha_inicio, fecha_final, estado, id_cliente],
    (err, result) => {
      if (err) {
        console.log("Error al agregar orden de venta:", err);
        res.status(500).send("Error al agregar orden de venta.");
      } else {
        res.send(result);
      }
    }
  );
});

// Actualizar una orden de venta
app.put("/orden_venta/update", (req, res) => {
  const id_orden_venta = req.body.ide;
  const { fecha_inicio, fecha_final, estado, id_cliente } = req.body;

  // Verifica que el ID no sea nulo
  if (id_orden_venta == null) {
    return res.status(400).send("El ID no puede ser nulo.");
  }

  db.query(
    'UPDATE ordenes_venta SET fecha_inicio = ?, fecha_final = ?, estado = ?, id_cliente = ? WHERE id_orden_venta = ?', 
    [fecha_inicio, fecha_final, estado, id_cliente, id_orden_venta],
    (err, result) => {
      if (err) {
        console.log("Error en la consulta SQL:", err);
        res.status(500).send("Error al actualizar orden de venta.");
      } else {
        res.send(result);
      }
    }
  );
});

// Eliminar una orden de venta
app.delete("/orden_venta/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM ordenes_venta WHERE id_orden_venta = ?',
    [id],
    (err, result) => {
      if (err) {
        console.log("Error al eliminar orden de venta:", err);
        res.status(500).send("Error al eliminar orden de venta.");
      } else {
        res.send(result);
      }
    }
  );
});


app.listen(3001, () => {
   console.log("Servidor corriendo en el puerto 3001");
});
