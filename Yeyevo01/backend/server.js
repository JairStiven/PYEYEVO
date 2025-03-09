
const express = require ('express');
const cors = require ('cors');
const mysql = require ('mysql2'); 
const bodyParser = require ('body-parser'); 
const productRoutes = require('./routes/products');

const app = express();
const PORT = 3000;

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
}); 

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1001324449',
  database: 'yeyevo'
});

db.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para registrar un usuario y cliente
app.post('/register', (req, res) => {
  const { cliente, usuario } = req.body;

  if (!cliente || !usuario || !cliente.doc || !usuario.usuario || !usuario.contraseña) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  db.beginTransaction((error) => {
    if (error) {
      return res.status(500).json({ error: 'Error al iniciar la transacción' });
    }

    const clienteQuery = `
      INSERT INTO cliente (doc, nombres, apellidos, correo, telefono, direccion) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const clienteValues = [
      cliente.doc,
      cliente.nombres,
      cliente.apellidos,
      cliente.correo,
      cliente.telefono,
      cliente.direccion
    ];
 
    db.query(clienteQuery, clienteValues, (clienteError) => {
      if (clienteError) {
        return db.rollback(() =>
          res.status(500).json({ error: 'Error al registrar cliente', details: clienteError.message })
        );
      }

      const usuarioQuery = `
        INSERT INTO usuario (usuario, contraseña, cliente_id) 
        VALUES (?, SHA2(?, 256), ?)
      `;
      const usuarioValues = [usuario.usuario, usuario.contraseña, cliente.doc];

      db.query(usuarioQuery, usuarioValues, (usuarioError) => {
        if (usuarioError) {
          return db.rollback(() =>
            res.status(500).json({ error: 'Error al registrar usuario', details: usuarioError.message })
          );
        }

        db.commit((commitError) => {
          if (commitError) {
            return db.rollback(() =>
              res.status(500).json({ error: 'Error al confirmar la transacción' })
            );
          }

          res.status(201).json({ message: 'Registro exitoso' });
        });
      });
    });
  });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { usuario, contraseña } = req.body;


  console.log("Datos recibidos en el servidor:", req.body);

  if (!usuario || !contraseña) {
      return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
  }

  const query = `SELECT u.usuario, r.rol
        FROM usuario u
        LEFT JOIN empleado e ON u.empleado_id = e.doc
        LEFT JOIN rol r ON e.id_rol = r.id
        WHERE u.usuario = ? AND u.contraseña = SHA2(?, 256)`;
  const values = [usuario, contraseña];

  db.query(query, values, (error, results) => {
      if (error) {
          console.error('Error al consultar la base de datos:', error);
          return res.status(500).json({ error: 'Error en el servidor' });
      }

      if (results.length > 0) {
        const user = results[0];
        if (user.rol === 'Administrador') {
            return res.json({ success: true, redirect: '/homeAdmin' });
        }
        else {
            return res.json({ success: true, redirect: '/catalogoUser' });
        }
    } else {
        return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    } 
  });
});


// Ruta para obtener productos desde la tabla productoscli
app.get('/api/productos', (req, res) => {
  const query = 'SELECT * FROM productoscli';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los productos:', err.message);
      return res.status(500).json({ error: 'Error al obtener los productos' });
    }

    res.json(results);
  });
});



// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

// ------------------------- APIS ------------------------- //
//GET GENERAL EMPLEADOS
app.get('/api/consulta/empleado', (req, res) => {
  const query = `select * from empleado`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros")
      }
  })
});

//GET FILTROS EMPLEADOS
app.get('/api/consulta/empleado/:documento', (req, res) => {
  const {documento} = req.params;
  const query = `select * from empleado where doc =${documento}`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros")
      }
  })
});


//POST EMPLEADOS
app.post('/api/agregar/empleado', (req, res) => {
  const {documento, nombre, apellido, cargo, sueldo, correo, telefono, direccion} = req.body;
  const query = `INSERT INTO empleado (doc, nombres, apellidos, cargo, sueldo, correo, telefono, direccion) 
  values(${documento},'${nombre}','${apellido}','${cargo}',${sueldo},'${correo}','${telefono}','${direccion}')`; 
  console.log(query);
  db.query(query, (error) => {
  if(error) {
    res.json('Error al agregar empleado');
   }
  else {
       res.json('Se agregó correctamente el empleado');
       }
  })    
});

//PUT EMPLEADOS
app.put('/api/editar/empleado/:documento', (req, res) => {
  const {documento} = req.params; 
  const {nombre, apellido, cargo, sueldo, correo, telefono, direccion} = req.body; 
  const query = `UPDATE empleado SET nombres = '${nombre}', apellidos = '${apellido}', cargo = '${cargo}',
  sueldo = ${sueldo}, correo = '${correo}', telefono = '${telefono}', direccion = '${direccion}'
  WHERE doc = ${documento}`;
  db.query(query, (error,) => {
      if (error) {
          res.json('Error al actualizar el empleado');
      }
       else {
          res.json('Empleado actualizado con éxito');
      }
  });
});

//DELETE EMPLEADOS
app.delete('/api/eliminar/empleado/:documento', (req, res) => {
  const {documento} = req.params;
  const query = `DELETE FROM empleado WHERE doc = ${documento}`;
  db.query(query, (error) => {
      if (error) {
          res.json('Error al eliminar el empleado');
      }
       else {
          res.json('Empleado eliminado con éxito');
      }
  });
});

//GET GENERAL CATEGORIA
app.get('/api/consulta/categoria', (req, res) => {
  const query = `select * from categoria`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros")
      }
  })
});

//GET FILTROS CATEGORIA
app.get('/api/consulta/categoria/:id', (req, res) => {
  const {id} = req.params;
  const query = `select * from categoria where id ='${id}'`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros")
      }
  })
});


//POST CATEGORIA
app.post('/api/agregar/categoria', (req, res) => {
  const {id, nombre} = req.body;
  const query = `INSERT INTO categoria (id, nombre) 
  values(${id},'${nombre}')`; 
  console.log(query);
  db.query(query, (error) => {
  if(error) {
    res.json('Error al agregar la categoria');
   }
  else {
       res.json('Se agregó correctamente la categoria');
       }
  })    
});

//PUT CATEGORIA
app.put('/api/editar/categoria/:id', (req, res) => {
  const {id} = req.params; 
  const {nombre} = req.body; 
  const query = `UPDATE categoria SET nombres = '${nombre}'
  WHERE id = ${id}`;
  db.query(query, (error,) => {
      if (error) {
          res.json('Error al actualizar la categoria');
      }
       else {
          res.json('Categoria actualizada con éxito');
      }
  });
});

//DELETE CATEGORIA
app.delete('/api/eliminar/categoria/:id', (req, res) => {
  const {id} = req.params;
  const query = `DELETE FROM empleado WHERE id = ${id}`;
  db.query(query, (error) => {
      if (error) {
          res.json('Error al eliminar la categoria');
      }
       else {
          res.json('Categoria eliminada con éxito');
      }
  });
});

//GET GENERAL CLIENTE
app.get('/api/consulta/cliente', (req, res) => {
  const query = `select * from cliente`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros")
      }
  })
});

//GET FILTROS CLIENTE
app.get('/api/consulta/cliente/:documento', (req, res) => {
  const {documento} = req.params;
  const query = `select * from cliente where doc ='${documento}'`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros")
      }
  })
});


//POST CLIENTE
app.post('/api/agregar/cliente', (req, res) => {
  const {documento, nombre, apellido, correo, telefono, direccion} = req.body;
  const query = `INSERT INTO cliente (doc, nombres, apellidos, correo, telefono, direccion) 
  values(${documento},'${nombre}','${apellido}','${correo}','${telefono}','${direccion}')`; 
  console.log(query);
  db.query(query, (error) => {
  if(error) {
    res.json('Error al agregar cliente');
   }
  else {
       res.json('Se agregó correctamente el cliente');
       }
  })    
});

//PUT CLIENTE
app.put('/api/editar/cliente/:documento', (req, res) => {
  const {documento} = req.params; 
  const {nombre, apellido, correo, telefono, direccion} = req.body; 
  const query = `UPDATE cliente SET nombres = '${nombre}', apellidos = '${apellido}',
  correo = '${correo}', telefono = '${telefono}', direccion = '${direccion}'
  WHERE doc = ${documento}`;
  db.query(query, (error,) => {
      if (error) {
          res.json('Error al actualizar el cliente');
      }
       else {
          res.json('Cliente actualizado con éxito');
      }
  });
});

//DELETE CLIENTE
app.delete('/api/eliminar/cliente/:documento', (req, res) => {
  const {documento} = req.params;
  const query = `DELETE FROM cliente WHERE doc = ${documento}`;
  db.query(query, (error) => {
      if (error) {
          res.json('Error al eliminar cliente');
      }
       else {
          res.json('Cliente eliminado con éxito');
      }
  });
});

//GET GENERAL DETALLE_FACTURA
app.get('/api/consulta/defact', (req, res) => {
  const query = `select * from detalle_factura`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros")
      }
  })
});

//GET FILTROS DETALLE_FACTURA
app.get('/api/consulta/defact/:id', (req, res) => {
  const {id} = req.params;
  const query = `select * from detalle_factura where id ='${id}'`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros")
      }
  })
});

//POST DETALLE_FACTURA
app.post('/api/agregar/defact', (req, res) => {
  const {id, num_factura, cantidad, valor_venta, cod_prod} = req.body;
  const query = `INSERT INTO defact (id, num_factura, cantidad, valor_venta, cod_prod) 
  values(${id},${num_factura},${cantidad},${valor_venta},${cod_prod})`; 
  console.log(query);
  db.query(query, (error) => {
  if(error) {
    res.json('Error al agregar detalle de la factura');
   }
  else {
       res.json('Se agregó correctamente el detalle de la factura');
       }
  })    
});

//PUT DETALLE_FACTURA
app.put('/api/editar/defact/:id', (req, res) => {
  const {id} = req.params; 
  const {num_factura, cantidad, valor_venta, cod_prod} = req.body; 
  const query = `UPDATE detalle_factura SET num_factura = ${num_factura}, cantidad = ${cantidad},
  valor_venta = ${valor_venta}, cod_prod = ${cod_prod}
  WHERE id = ${id}`;
  db.query(query, (error,) => {
      if (error) {
          res.json('Error al actualizar detalle de factura');
      }
       else {
          res.json('Detalle de factura actualizada con éxito');
      }
  });
});

//DELETE DETALLE_FACTURA
app.delete('/api/eliminar/defact/:id', (req, res) => {
  const {id} = req.params;
  const query = `DELETE FROM detalle_factura WHERE id = ${id}`;
  db.query(query, (error) => {
      if (error) {
          res.json('Error al eliminar detalle de factura');
      }
       else {
          res.json('Detalle de factura eliminada con éxito');
      }
  });
});

//GET GENERAL FACTURA
app.get('/api/consulta/factura', (req, res) => {
  const query = `select * from factura`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros")
      }
  })
});

//GET FILTROS FACTURA
app.get('/api/consulta/factura/:id', (req, res) => {
  const {id} = req.params;
  const query = `select * from factura where num_factura ='${id}'`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros")
      }
  })
});

//POST FACTURA
app.post('/api/agregar/factura', (req, res) => {
  const {num_factura, fecha, cod_p, doc_emp, doc_cli} = req.body;
  const query = `INSERT INTO factura (num_factura, fecha, cod_p, doc_emp, doc_cli) 
  values(${num_factura},'${fecha}',${cod_p},${doc_emp}, ${doc_cli})`; 
  console.log(query);
  db.query(query, (error) => {
  if(error) {
    res.json('Error al agregar factura');
   }
  else {
       res.json('Se agregó correctamente la factura');
       }
  })    
});

//PUT FACTURA
app.put('/api/editar/factura/:id', (req, res) => {
  const {id} = req.params; 
  const {fecha, cod_p, doc_emp, doc_cli} = req.body; 
  const query = `UPDATE factura SET fecha = '${fecha}', cod_p = ${cod_p},
  doc_emp = ${doc_emp}, doc_cli = ${doc_cli}
  WHERE num_factura = ${id}`;
  db.query(query, (error,) => {
      if (error) {
          res.json('Error al actualizar factura');
      }
       else {
          res.json('Factura actualizada con éxito');
      }
  });
});

//DELETE FACTURA
app.delete('/api/eliminar/factura/:id', (req, res) => {
  const {id} = req.params;
  const query = `DELETE FROM factura WHERE num_factura = ${id}`;
  db.query(query, (error) => {
      if (error) {
          res.json('Error al eliminar detalle de factura');
      }
       else {
          res.json('Detalle de factura eliminada con éxito');
      }
  });
});

//GET GENERAL FORMA_PAGO
app.get('/api/consulta/fpago', (req, res) => {
  const query = `select * from forma_pago`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros")
      }
  })
});

//GET FILTROS FORMA_PAGO
app.get('/api/consulta/fpago/:id', (req, res) => {
  const {id} = req.params;
  const query = `select * from forma_pago where codi =${id}`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros")
      }
  })
});

//POST FORMA_PAGO
app.post('/api/agregar/fpago', (req, res) => {
  const {id, desc_p} = req.body;
  const query = `INSERT INTO forma_pago (codi, desc_p) 
  values(${id},'${desc_p}')`; 
  console.log(query);
  db.query(query, (error) => {
  if(error) {
    res.json('Error al agregar forma de pago');
   }
  else {
       res.json('Se agregó correctamente forma de pago');
       }
  })    
});

//PUT FORMA_PAGO
app.put('/api/editar/fpago/:id', (req, res) => {
  const {id} = req.params; 
  const {desc_p} = req.body; 
  const query = `UPDATE forma_pago SET desc_p = '${desc_p}'
  WHERE codi = ${id}`;
  db.query(query, (error,) => {
      if (error) {
          res.json('Error al actualizar forma de pago');
      }
       else {
          res.json('Forma de pago actualizada con éxito');
      }
  });
});

//DELETE FORMA_PAGO
app.delete('/api/eliminar/fpago/:id', (req, res) => {
  const {id} = req.params;
  const query = `DELETE FROM forma_pago WHERE codi = ${id}`;
  db.query(query, (error) => {
      if (error) {
          res.json('Error al eliminar forma de pago');
      }
       else {
          res.json('Forma de pago eliminada con éxito');
      }
  });
});

//GET GENERAL PRODUCTOS
app.get('/api/consulta/productos', (req, res) => {
  const query = `select * from productos`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros")
      }
  })
});

//GET FILTROS PRODUCTOS
app.get('/api/consulta/productos/:id', (req, res) => {
  const {id} = req.params;
  const query = `select * from productos where id =${id}`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros")
      }
  })
});

//POST PRODUCTOS
app.post('/api/agregar/productos', (req, res) => {
  const {id, nombre, valor_uni, cantidad_prod, id_cate} = req.body;
  const query = `INSERT INTO productos (id, nombre, valor_uni, cantidad_prod, id_cate) 
  values(${id},'${nombre}',${valor_uni},${cantidad_prod},${id_cate})`; 
  console.log(query);
  db.query(query, (error) => {
  if(error) {
    res.json('Error al agregar productos');
   }
  else {
       res.json('Se agregó correctamente el producto');
       }
  })    
});

//PUT PRODUCTOS
app.put('/api/editar/productos/:id', (req, res) => {
  const {id} = req.params; 
  const {nombre, valor_uni, cantidad_prod, id_cate} = req.body; 
  const query = `UPDATE productos SET nombre = ${nombre}, valor_uni = ${valor_uni},
  cantidad_prod = ${cantidad_prod}, id_cate = ${id_cate}
  WHERE id = ${id}`;
  db.query(query, (error,) => {
      if (error) {
          res.json('Error al actualizar producto');
      }
       else {
          res.json('Producto actualizado con éxito');
      }
  });
});

//DELETE PRODUCTOS
app.delete('/api/eliminar/productos/:id', (req, res) => {
  const {id} = req.params;
  const query = `DELETE FROM productos WHERE id = ${id}`;
  db.query(query, (error) => {
      if (error) {
          res.json('Error al eliminar producto');
      }
       else {
          res.json('Producto eliminado con éxito');
      }
  });
});

//GET GENERAL PRODUCTOS CLIENTE
app.get('/api/consulta/productoscli', (req, res) => {
  const query = `select * from productoscli`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros")
      }
  })
});

//GET FILTROS PRODUCTOS CLIENTE
app.get('/api/consulta/productoscli/:id', (req, res) => {
  const {id} = req.params;
  const query = `select * from productoscli where id ='${id}'`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros")
      }
  })
});

//POST PRODUCTOS CLIENTE
app.post('/api/agregar/productoscli', (req, res) => {
  const {id, nombre, precio, imagen_url, stock} = req.body;
  const query = `INSERT INTO productoscli (id, nombre, precio, imagen_url, stock) 
  values(${id},'${nombre}','${precio}','${imagen_url}',${stock})`; 
  console.log(query);
  db.query(query, (error) => {
  if(error) {
    res.json('Error al agregar productos del cliente');
   }
  else {
       res.json('Se agregó correctamente productos del cliente');
       }
  })    
});

//PUT PRODUCTOS CLIENTE
app.put('/api/editar/productoscli/:id', (req, res) => {
  const {id} = req.params; 
  const {nombre, precio, imagen_url, stock} = req.body; 
  const query = `UPDATE productoscli SET nombre = '${nombre}', precio = ${precio},
  imagen_url = '${imagen_url}', stock = ${stock}
  WHERE id = ${id}`;
  db.query(query, (error,) => {
      if (error) {
          res.json('Error al actualizar productos del cliente');
      }
       else {
          res.json('Productos del cliente actualizado con éxito');
      }
  });
});

//DELETE PRODUCTOS CLIENTE
app.delete('/api/eliminar/productoscli/:id', (req, res) => {
  const {id} = req.params;
  const query = `DELETE FROM productoscli WHERE id = ${id}`;
  db.query(query, (error) => {
      if (error) {
          res.json('Error al eliminar productos del cliente');
      }
       else {
          res.json('Productos del cliente eliminada con éxito');
      }
  });
});

//GET GENERAL USUARIOS
app.get('/api/consulta/usuarios', (req, res) => {
  const query = `select * from usuario`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros") 
      }
  })
});

//GET FILTROS USUARIOS
app.get('/api/consulta/usuarios/:id', (req, res) => {
  const {id} = req.params;
  const query = `select * from usuario where id ='${id}'`;
  db.query(query, (error, resultado) => {
      if (error) return console.error(error.message);
      if(resultado.length > 0) {
          res.json(resultado)
      } else {
          res.json("No hay registros")
      }
  })
});


//POST USUARIOS
app.post('/api/agregar/usuarios', (req, res) => {
  const {id, usuario, contraseña, empleado_id, cliente_id} = req.body;
  const query = `INSERT INTO usuario (id, usuario, contraseña, empleado_id, cliente_id) 
  values(${id},'${usuario}','${contraseña}',${empleado_id},${cliente_id})`; 
  console.log(query);
  db.query(query, (error) => {
  if(error) {
    res.json('Error al agregar usuario');
   }
  else {
       res.json('Se agregó correctamente el usuario');
       }
  })    
});

//PUT USUARIOS
app.put('/api/editar/usuarios/:id', (req, res) => {
  const {id} = req.params; 
  const {usuario, contraseña, empleado_id, cliente_id} = req.body; 
  const query = `UPDATE usuario SET usuario = '${usuario}', contraseña = '${contraseña}',
  empleado_id = ${empleado_id}, cliente_id = ${cliente_id}
  WHERE id = ${id}`;
  db.query(query, (error,) => {
      if (error) {
          res.json('Error al actualizar el usuario');
      }
       else {
          res.json('Usuario actualizado con éxito');
      }
  });
});

//DELETE USUARIOS
app.delete('/api/eliminar/cliente/:documento', (req, res) => {
  const {id} = req.params;
  const query = `DELETE FROM usuario WHERE id = ${id}`;
  db.query(query, (error) => {
      if (error) {
          res.json('Error al eliminar usuario');
      }
       else {
          res.json('Usuario eliminado con éxito');
      }
  });
});