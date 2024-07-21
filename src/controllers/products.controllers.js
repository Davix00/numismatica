import  { getConnection, sql } from "../database/connection.js"

export const getProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM producto");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);    
  }
}

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("id", id )
    .query("SELECT * FROM producto WHERE idProducto = @id");
    
    if(result.rowsAffected[0] === 0) {
      res.status(404).json({message: "Producto no encontrado"})
    } else {
      res.status(200).json(result.recordset[0]);
    }  
    
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const createProduct = async (req, res) => {
  try {
    const { valor, nombre, fechaEmision, precio, cantidad, medidas, detalles, pureza, idTiempo, idAcabado, idPais, idEmisor, idMaterial, idTipo } = req.body;

    const pool = await getConnection();
    const result = await pool.request()
      .input("valor", sql.VarChar, valor) 
      .input("nombre", sql.VarChar, nombre) 
      .input("fechaEmision", sql.VarChar, fechaEmision) 
      .input("precio", sql.Decimal, precio)
      .input("cantidad", sql.Int, cantidad)
      .input("medidas", sql.VarChar, medidas) 
      .input("detalles", sql.Text, detalles)
      .input("pureza", sql.Float, pureza)
      .input("idTiempo", sql.Int, idTiempo)
      .input("idAcabado", sql.Int, idAcabado)
      .input("idPais", sql.Int, idPais) 
      .input("idEmisor", sql.Int, idEmisor)
      .input("idMaterial", sql.Int, idMaterial)
      .input("idTipo", sql.Int, idTipo)
    .query("INSERT INTO producto (valor, nombre, fechaEmision, precio, cantidad, medidas, detalles, pureza, idTiempo, idAcabado, idPais, idEmisor, idMaterial, idTipo) VALUES (@valor, @nombre, @fechaEmision, @precio, @cantidad, @medidas, @detalles, @pureza, @idTiempo, @idAcabado, @idPais, @idEmisor, @idMaterial, @idTipo); SELECT SCOPE_IDENTITY() AS id;")
    res.status(200).json({
      message: "success",
      id: result.recordset[0].id,
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const updateProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const { valor, nombre, fechaEmision, precio, cantidad, medidas, detalles, pureza, idTiempo, idAcabado, idPais, idEmisor, idMaterial, idTipo } = req.body;
    const pool = await getConnection();
    await pool.request()
      .input("id", id ) 
      .input("valor", sql.VarChar, valor) 
      .input("nombre", sql.VarChar, nombre) 
      .input("fechaEmision", sql.VarChar, fechaEmision) 
      .input("precio", sql.Decimal, precio)
      .input("cantidad", sql.Int, cantidad)
      .input("medidas", sql.VarChar, medidas) 
      .input("detalles", sql.Text, detalles)
      .input("pureza", sql.Float, pureza)
      .input("idTiempo", sql.Int, idTiempo)
      .input("idAcabado", sql.Int, idAcabado)
      .input("idPais", sql.Int, idPais) 
      .input("idEmisor", sql.Int, idEmisor)
      .input("idMaterial", sql.Int, idMaterial)
      .input("idTipo", sql.Int, idTipo)
    .query("UPDATE producto SET valor = @valor , nombre = @nombre, fechaEmision = @fechaEmision, precio = @precio, cantidad = @cantidad, medidas = @medidas, detalles = @detalles, pureza = @pureza, idTiempo = @idTiempo, idAcabado = @idAcabado, idPais = @idPais, idEmisor = @idEmisor, idMaterial = @idMaterial, idTipo = @idTipo WHERE idProducto = @id;")
    res.status(200).json({
      message: "success",
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("id", id)
    .query("DELETE FROM producto WHERE idProducto = @id");

    if(result.rowsAffected[0] === 0){
      res.status(404).json({ message: "Producto no encontrado." })
    } else {
      res.status(200).json({
        message: "Producto eliminado",
      })
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
