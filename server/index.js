// Importo el módulo express para crear la aplicación web
const express = require("express");

// Creo una instancia de la aplicación usando express
const app = express();

// Importo el módulo mysql para conectarme a una base de datos MySQL
const mysql = require("mysql");

// Importo el módulo cors, que permite habilitar solicitudes entre diferentes dominios (CORS)
const cors = require("cors");

// Habilito el uso de CORS en la aplicación, permitiendo que otros dominios puedan hacer peticiones a este servidor
app.use(cors());

// Habilito el manejo de datos en formato JSON en las solicitudes que recibe la aplicación
app.use(express.json());

// Configuro la conexión a la base de datos MySQL con los parámetros necesarios para conectarse a una base de datos local
const db = mysql.createConnection({
   host: "localhost",    // Dirección del servidor de la base de datos (en este caso, la base de datos está en el mismo servidor)
   user: "root",         // Usuario con el que me conecto a MySQL
   password: "Proposito2028+", // Contraseña del usuario de MySQL
   database: "empleados_crud"  // Nombre de la base de datos a la que me conecto
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

// Obtener todos los proveedores
app.get("/proveedores", (req, res) => {
  // Hago una consulta a la base de datos para obtener todos los proveedores
  // 'req' representa la solicitud del cliente, aunque en este caso no necesito extraer nada de ella
  // 'res' es el objeto que uso para enviar la respuesta al cliente
  db.query('SELECT * FROM proveedores', (err, result) => {
     if (err) {
        // Si ocurre un error, lo registro en la consola y envío una respuesta con el estado 500 (error del servidor)
        console.log(err);
        res.status(500).send("Error al obtener proveedores.");
     } else {
        // Si todo sale bien, envío los resultados obtenidos de la base de datos al cliente
        res.send(result);
     }
  });
});

// Agregar un proveedor
app.post("/proveedor/create", (req, res) => {
  // Extraigo los datos del nuevo proveedor desde el cuerpo de la solicitud usando 'req.body'
  const { nombre, contacto, telefono, direccion } = req.body;

  // Hago una consulta SQL para insertar los nuevos datos del proveedor en la base de datos
  db.query(
    'INSERT INTO proveedores (nombre, contacto, telefono, direccion) VALUES (?, ?, ?, ?)', // Inserto los valores en la tabla proveedores
    [nombre, contacto, telefono, direccion], // Paso los valores del proveedor a la consulta
    (err, result) => {
      if (err) {
        // Si ocurre un error al agregar el proveedor, lo registro en la consola y envío una respuesta de error con el estado 500
        console.log("Error al agregar proveedor:", err);
        res.status(500).send("Error al agregar proveedor.");
      } else {
        // Si todo va bien, envío el resultado de la operación al cliente, indicando que el proveedor fue agregado
        res.send(result);
      }
    }
  );
});

// Actualizar un proveedor
app.put("/proveedor/update", (req, res) => {
  // Obtengo el ID del proveedor que quiero actualizar y los nuevos datos a través del cuerpo de la solicitud
  const id_proveedor = req.body.id_proveedor; 
  const { nombre, contacto, telefono, direccion } = req.body;

  // Verifico que el ID del proveedor no sea nulo, ya que necesito este dato para hacer la actualización
  if (id_proveedor == null) {
    return res.status(400).send("El ID no puede ser nulo."); // Si no hay ID, envío un mensaje de error con el estado 400 (solicitud incorrecta)
  }

  // Hago una consulta SQL para actualizar los datos del proveedor en la base de datos
  db.query(
    'UPDATE proveedores SET nombre = ?, contacto = ?, telefono = ?, direccion = ? WHERE id_proveedor = ?', // Actualizo los campos del proveedor
    [nombre, contacto, telefono, direccion, id_proveedor], // Paso los nuevos valores y el ID del proveedor a la consulta
    (err, result) => {
      if (err) {
        // Si hay un error al ejecutar la consulta, lo registro en la consola y envío una respuesta de error con el estado 500
        console.log("Error en la consulta SQL:", err);
        res.status(500).send("Error al actualizar proveedor.");
      } else {
        // Si la actualización es exitosa, envío el resultado de la operación al cliente
        res.send(result);
      }
    }
  );
});

// Eliminar un proveedor
app.delete("/proveedor/delete/:id", (req, res) => {
  // Obtengo el ID del proveedor que quiero eliminar desde los parámetros de la URL usando 'req.params'
  const id = req.params.id;

  // Hago una consulta SQL para eliminar el proveedor con el ID especificado de la base de datos
  db.query(
    'DELETE FROM proveedores WHERE id_proveedor = ?', // Utilizo el campo id_proveedor para eliminar el proveedor correcto
    [id], // Paso el ID del proveedor a la consulta
    (err, result) => {
      if (err) {
        // Si ocurre un error al eliminar el proveedor, lo registro en la consola y envío una respuesta de error con el estado 500
        console.log("Error al eliminar proveedor:", err);
        res.status(500).send("Error al eliminar proveedor.");
      } else {
        // Si la eliminación es exitosa, envío el resultado de la operación al cliente, confirmando la eliminación
        res.send(result);
      }
    }
  );
});


// Obtener todos los clientes
app.get("/clientes", (req, res) => {
  // Hago una consulta a la base de datos para obtener todos los clientes
  db.query('SELECT * FROM clientes', (err, result) => {
     if (err) {
        // Si ocurre un error, lo registro y respondo con un error 500
        console.log(err);
        res.status(500).send("Error al obtener clientes.");
     } else {
        // Si todo va bien, envío los resultados de la base de datos al cliente
        res.send(result);
     }
  });
});

// Agregar un cliente
app.post("/cliente/create", (req, res) => {
  // Extraigo los datos del nuevo cliente del cuerpo de la solicitud
  const { nombre, contacto, telefono, direccion } = req.body;

  // Hago una consulta SQL para insertar los datos del cliente en la base de datos
  db.query(
    'INSERT INTO clientes (nombre, contacto, telefono, direccion) VALUES (?, ?, ?, ?)',
    [nombre, contacto, telefono, direccion], // Paso los datos recibidos a la consulta
    (err, result) => {
      if (err) {
        // Si hay un error, lo registro en la consola y envío una respuesta con el estado 500
        console.log("Error al agregar cliente:", err);
        res.status(500).send("Error al agregar cliente.");
      } else {
        // Si todo es correcto, envío el resultado de la operación al cliente
        res.send(result);
      }
    }
  );
});

// Actualizar un cliente
app.put("/cliente/update", (req, res) => {
  // Obtengo el ID del cliente y los nuevos datos desde el cuerpo de la solicitud
  const id_cliente = req.body.id_cliente;
  const { nombre, contacto, telefono, direccion } = req.body;

  // Verifico que el ID del cliente no sea nulo
  if (id_cliente == null) {
    return res.status(400).send("El ID no puede ser nulo."); // Si no hay ID, envío un mensaje de error con el estado 400
  }

  // Hago una consulta SQL para actualizar los datos del cliente en la base de datos
  db.query(
    'UPDATE clientes SET nombre = ?, contacto = ?, telefono = ?, direccion = ? WHERE id_cliente = ?', 
    [nombre, contacto, telefono, direccion, id_cliente], // Paso los nuevos valores y el ID a la consulta
    (err, result) => {
      if (err) {
        // Si hay un error en la consulta, lo registro y envío un mensaje de error con el estado 500
        console.log("Error en la consulta SQL:", err);
        res.status(500).send("Error al actualizar cliente.");
      } else {
        // Si la actualización es exitosa, envío el resultado al cliente
        res.send(result);
      }
    }
  );
});

// Eliminar un cliente
app.delete("/cliente/delete/:id", (req, res) => {
  // Obtengo el ID del cliente a eliminar desde los parámetros de la URL
  const id = req.params.id;

  // Realizo una consulta SQL para eliminar el cliente con el ID especificado
  db.query(
    'DELETE FROM clientes WHERE id_cliente = ?', // Utilizo el campo correcto para eliminar
    [id], // Paso el ID del cliente a la consulta
    (err, result) => {
      if (err) {
        // Si ocurre un error, lo registro y envío una respuesta de error con el estado 500
        console.log("Error al eliminar cliente:", err);
        res.status(500).send("Error al eliminar cliente.");
      } else {
        // Si la eliminación es exitosa, envío el resultado al cliente
        res.send(result);
      }
    }
  );
});

// Obtener todos los productos
app.get("/productos", (req, res) => {
 // Hago una consulta a la base de datos para obtener todos los productos
 db.query('SELECT * FROM productos', (err, result) => {
   if (err) {
     // Si ocurre un error, lo registro y envío una respuesta de error con el estado 500
     console.log(err);
     res.status(500).send("Error al obtener productos.");
   } else {
     // Si todo va bien, envío los resultados de la base de datos al cliente
     res.send(result);
   }
 });
});

// Agregar un producto
app.post("/producto/create", (req, res) => {
 // Extraigo los datos del nuevo producto del cuerpo de la solicitud
 const { nombre, costo, precio_venta, cantidad } = req.body;

 // Hago una consulta SQL para insertar los datos del producto en la base de datos
 db.query(
   'INSERT INTO productos (nombre, costo, precio_venta, cantidad) VALUES (?, ?, ?, ?)', 
   [nombre, costo, precio_venta, cantidad], // Paso los datos del producto a la consulta
   (err, result) => {
     if (err) {
       // Si hay un error, lo registro en la consola y envío una respuesta con el estado 500
       console.log("Error al agregar producto:", err);
       res.status(500).send("Error al agregar producto.");
     } else {
       // Si todo va bien, envío el resultado de la operación al cliente
       res.send(result);
     }
   }
 );
});

// Actualizar un producto
app.put("/producto/update", (req, res) => {
 // Obtengo el ID del producto y los nuevos datos desde el cuerpo de la solicitud
 const id_producto = req.body.id_producto;
 const { nombre, costo, precio_venta, cantidad } = req.body;

 // Verifico que el ID del producto no sea nulo
 if (id_producto == null) {
   return res.status(400).send("El ID no puede ser nulo."); // Si no hay ID, envío un mensaje de error con el estado 400
 }

 // Hago una consulta SQL para actualizar los datos del producto en la base de datos
 db.query(
   'UPDATE productos SET nombre = ?, costo = ?, precio_venta = ?, cantidad = ? WHERE id_producto = ?', 
   [nombre, costo, precio_venta, cantidad, id_producto], // Paso los nuevos valores y el ID a la consulta
   (err, result) => {
     if (err) {
       // Si hay un error en la consulta, lo registro y envío un mensaje de error con el estado 500
       console.log("Error en la consulta SQL:", err);
       res.status(500).send("Error al actualizar producto.");
     } else {
       // Si la actualización es exitosa, envío el resultado al cliente
       res.send(result);
     }
   }
 );
});

// Eliminar un producto
app.delete("/producto/delete/:id", (req, res) => {
 // Obtengo el ID del producto a eliminar desde los parámetros de la URL
 const id = req.params.id;

 // Realizo una consulta SQL para eliminar el producto con el ID especificado
 db.query(
   'DELETE FROM productos WHERE id_producto = ?', // Utilizo el campo correcto para eliminar
   [id], // Paso el ID del producto a la consulta
   (err, result) => {
     if (err) {
       // Si ocurre un error, lo registro y envío una respuesta de error con el estado 500
       console.log("Error al eliminar producto:", err);
       res.status(500).send("Error al eliminar producto.");
     } else {
       // Si la eliminación es exitosa, envío el resultado al cliente
       res.send(result);
     }
   }
 );
});

// Obtener detalles de orden de compra
app.get("/detalle_orden_compra", (req, res) => {
  // Aquí hago la consulta SQL para obtener todos los detalles de las órdenes de compra
  db.query('SELECT * FROM detalle_orden_compra', (err, result) => {
     if (err) {
        console.log(err);
        // Si hay un error, devuelvo un estado 500 indicando que no se pudieron obtener los detalles
        res.status(500).send("Error al obtener los detalles de la orden de compra.");
     } else {
        // Si no hay errores, devuelvo los resultados obtenidos
        res.send(result);
     }
  });
});

// Actualizar un detalle de orden de compra
app.put("/detalle_orden_compra/update", (req, res) => {
  const id_detalle_compra = req.body.id_detalle_compra;
  const { id_orden_compra, id_producto, cantidad } = req.body;

  // Verifico que el ID del detalle de compra no sea nulo antes de actualizar
  if (id_detalle_compra == null) {
    return res.status(400).send("El ID no puede ser nulo.");
  }

  // Hago la consulta SQL para actualizar los detalles de la orden de compra
  db.query(
    'UPDATE detalle_orden_compra SET id_orden_compra = ?, id_producto = ?, cantidad = ? WHERE id_detalle_compra = ?', 
    [id_orden_compra, id_producto, cantidad, id_detalle_compra],
    (err, result) => {
      if (err) {
        console.log("Error al actualizar detalle de orden de compra:", err);
        // Si hay error, devuelvo un estado 500 indicando el problema
        res.status(500).send("Error al actualizar detalle de orden de compra.");
      } else {
        // Si se actualiza correctamente, devuelvo los resultados
        res.send(result);
      }
    }
  );
});

// Eliminar un detalle de orden de compra
app.delete("/detalle_orden_compra/delete/:id", (req, res) => {
  const id = req.params.id;

  // Hago la consulta SQL para eliminar el detalle de la orden de compra basado en el ID
  db.query(
    'DELETE FROM detalle_orden_compra WHERE id_detalle_compra = ?',
    [id],
    (err, result) => {
      if (err) {
        console.log("Error al eliminar detalle de orden de compra:", err);
        // Si hay error, devuelvo un estado 500
        res.status(500).send("Error al eliminar detalle de orden de compra.");
      } else {
        // Si se elimina correctamente, devuelvo los resultados
        res.send(result);
      }
    }
  );
});

// Obtener detalles de orden de venta
app.get("/detalle_orden_venta", (req, res) => {
 // Aquí obtengo todos los detalles de las órdenes de venta desde la base de datos
 db.query('SELECT * FROM detalle_orden_venta', (err, result) => {
    if (err) {
       console.log(err);
       // Si hay un error, devuelvo un estado 500
       res.status(500).send("Error al obtener los detalles de la orden de venta.");
    } else {
       // Si no hay errores, devuelvo los resultados obtenidos
       res.send(result);
    }
 });
});

// Actualizar un detalle de orden de venta
app.put("/detalle_orden_venta/update", (req, res) => {
 const id_detalle_venta = req.body.ide; // Cambié a 'ide' para que coincida con el frontend
 const { id_orden_venta, id_producto, cantidad } = req.body;

 // Verifico que el ID no sea nulo antes de actualizar
 if (id_detalle_venta == null) {
   return res.status(400).send("El ID no puede ser nulo.");
 }

 // Hago la consulta SQL para actualizar los detalles de la orden de venta
 db.query(
   'UPDATE detalle_orden_venta SET id_orden_venta = ?, id_producto = ?, cantidad = ? WHERE id_detalle_venta = ?', 
   [id_orden_venta, id_producto, cantidad, id_detalle_venta],
   (err, result) => {
     if (err) {
       console.log("Error al actualizar detalle de orden de venta:", err);
       // Si hay error, devuelvo un estado 500
       res.status(500).send("Error al actualizar detalle de orden de venta.");
     } else {
       // Si se actualiza correctamente, devuelvo los resultados
       res.send(result);
     }
   }
 );
});

// Obtener órdenes de compra
app.get("/ordenes_compra", (req, res) => {
 // Aquí hago la consulta SQL para obtener todas las órdenes de compra
 db.query('SELECT * FROM ordenes_compra', (err, result) => {
   if (err) {
     console.log(err);
     // Si hay error, devuelvo un estado 500
     res.status(500).send("Error al obtener órdenes de compra.");
   } else {
     // Si no hay errores, devuelvo los resultados obtenidos
     res.send(result);
   }
 });
});

// Agregar una orden de compra
app.post("/orden_compra/create", (req, res) => {
 const { fecha_inicio, fecha_final, estado, id_proveedor } = req.body;

 // Inserto una nueva orden de compra en la base de datos
 db.query(
   'INSERT INTO ordenes_compra (fecha_inicio, fecha_final, estado, id_proveedor) VALUES (?, ?, ?, ?)',
   [fecha_inicio, fecha_final, estado, id_proveedor],
   (err, result) => {
     if (err) {
       console.log("Error al agregar orden de compra:", err);
       // Si hay error, devuelvo un estado 500
       res.status(500).send("Error al agregar orden de compra.");
     } else {
       // Si se agrega correctamente, devuelvo los resultados
       res.send(result);
     }
   }
 );
});

// Actualizar una orden de compra
app.put("/orden_compra/update", (req, res) => {
 const id_orden_compra = req.body.ide;
 const { fecha_inicio, fecha_final, estado, id_proveedor } = req.body;

 // Verifico que el ID no sea nulo antes de actualizar
 if (id_orden_compra == null) {
   return res.status(400).send("El ID no puede ser nulo.");
 }

 // Hago la consulta SQL para actualizar la orden de compra
 db.query(
   'UPDATE ordenes_compra SET fecha_inicio = ?, fecha_final = ?, estado = ?, id_proveedor = ? WHERE id_orden_compra = ?', 
   [fecha_inicio, fecha_final, estado, id_proveedor, id_orden_compra],
   (err, result) => {
     if (err) {
       console.log("Error en la consulta SQL:", err);
       // Si hay error, devuelvo un estado 500
       res.status(500).send("Error al actualizar orden de compra.");
     } else {
       // Si se actualiza correctamente, devuelvo los resultados
       res.send(result);
     }
   }
 );
});

// Eliminar una orden de compra
app.delete("/orden_compra/delete/:id", (req, res) => {
 const id = req.params.id;

 // Hago la consulta SQL para eliminar una orden de compra basada en el ID
 db.query(
   'DELETE FROM ordenes_compra WHERE id_orden_compra = ?',
   [id],
   (err, result) => {
     if (err) {
       console.log("Error al eliminar orden de compra:", err);
       // Si hay error, devuelvo un estado 500
       res.status(500).send("Error al eliminar orden de compra.");
     } else {
       // Si se elimina correctamente, devuelvo los resultados
       res.send(result);
     }
   }
 );
});

// Obtener órdenes de venta
app.get("/ordenes_venta", (req, res) => {
 // Aquí hago la consulta SQL para obtener todas las órdenes de venta
 db.query('SELECT * FROM ordenes_venta', (err, result) => {
   if (err) {
     console.log(err);
     // Si hay error, devuelvo un estado 500
     res.status(500).send("Error al obtener órdenes de venta.");
   } else {
     // Si no hay errores, devuelvo los resultados obtenidos
     res.send(result);
   }
 });
});

// Agregar una orden de venta
app.post("/orden_venta/create", (req, res) => {
 const { fecha_inicio, fecha_final, estado, id_cliente } = req.body;

 // Inserto una nueva orden de venta en la base de datos
 db.query(
   'INSERT INTO ordenes_venta (fecha_inicio, fecha_final, estado, id_cliente) VALUES (?, ?, ?, ?)',
   [fecha_inicio, fecha_final, estado, id_cliente],
   (err, result) => {
     if (err) {
       console.log("Error al agregar orden de venta:", err);
       // Si hay error, devuelvo un estado 500
       res.status(500).send("Error al agregar orden de venta.");
     } else {
       // Si se agrega correctamente, devuelvo los resultados
       res.send(result);
     }
   }
 );
});

// Actualizar una orden de venta
app.put("/orden_venta/update", (req, res) => {
 const id_orden_venta = req.body.ide;
 const { fecha_inicio, fecha_final, estado, id_cliente } = req.body;

 // Verifico que el ID no sea nulo antes de actualizar
 if (id_orden_venta == null) {
   return res.status(400).send("El ID no puede ser nulo.");
 }

 // Hago la consulta SQL para actualizar la orden de venta
 db.query(
   'UPDATE ordenes_venta SET fecha_inicio = ?, fecha_final = ?, estado = ?, id_cliente = ? WHERE id_orden_venta = ?', 
   [fecha_inicio, fecha_final, estado, id_cliente, id_orden_venta],
   (err, result) => {
     if (err) {
       console.log("Error en la consulta SQL:", err);
       // Si hay error, devuelvo un estado 500
       res.status(500).send("Error al actualizar orden de venta.");
     } else {
       // Si se actualiza correctamente, devuelvo los resultados
       res.send(result);
     }
   }
 );
});

// Eliminar una orden de venta
app.delete("/orden_venta/delete/:id", (req, res) => {
 const id = req.params.id;

 // Hago la consulta SQL para eliminar una orden de venta basada en el ID
 db.query(
   'DELETE FROM ordenes_venta WHERE id_orden_venta = ?',
   [id],
   (err, result) => {
     if (err) {
       console.log("Error al eliminar orden de venta:", err);
       // Si hay error, devuelvo un estado 500
       res.status(500).send("Error al eliminar orden de venta.");
     } else {
       // Si se elimina correctamente, devuelvo los resultados
       res.send(result);
     }
   }
 );
});





app.listen(3001, () => {
   console.log("Servidor corriendo en el puerto 3001");
});
