import  { getConnection, sql } from "../database/connection.js"

export const getUsusarios = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM usuario");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);    
  }
}

export const getUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("id", id )
    .query("SELECT * FROM tipo WHERE idUsuario = @id");
    
    if(result.rowsAffected[0] === 0) {
      res.status(404).json({message: "Tipo no encontrado"})
    } else {
      res.status(200).json(result.recordset[0]);
    }  
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const createUsurio = async (req, res) => {
  try {
    const { nombre, apellido, correo, contra } = req.body;

    const pool = await getConnection();
    const result = await pool.request()
      .input("nombre", sql.VarChar, nombre)
      .input("apellido", sql.VarChar, apellido)
      .input("correo", sql.VarChar, correo)
      .input("contra", sql.VarChar, contra)
    .query("INSERT INTO usuario (nombre, apellido, correo, contra) VALUES (@nombre), @apellido, @correo, @contra; SELECT SCOPE_IDENTITY() AS id;")
    res.status(200).json({
      message: "success",
      id: result.recordset[0].id,
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, correo, contra } = req.body;
    const pool = await getConnection();
    await pool.request()
      .input("id", id ) 
      .input("nombre", sql.VarChar, nombre)
      .input("apellido", sql.VarChar, nombre)
      .input("correo", sql.VarChar, nombre)
      .input("contra", sql.VarChar, nombre)
    .query("UPDATE usuario SET nombre = @nombre, apellido = @apellido, correo = @correo, contra = @contra WHERE idUsuario = @id;")
    res.status(200).json({
      message: "success",
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("id", id)
    .query("DELETE FROM usuario WHERE idUsuario = @id");

    if(result.rowsAffected[0] === 0){
      res.status(404).json({ message: "Usuario no encontrado." })
    } else {
      res.status(200).json({
        message: "Usuario eliminado",
      })
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
