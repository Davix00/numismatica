import  { getConnection, sql } from "../database/connection.js"

export const getAcabados = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM acabado");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);    
  }
}

export const getAcabado = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("id", id )
    .query("SELECT * FROM acabado WHERE idAcabado = @id");
    
    if(result.rowsAffected[0] === 0) {
      res.status(404).json({message: "Acabado no encontrado"})
    } else {
      res.status(200).json(result.recordset[0]);
    }  
    
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const createAcabado = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const pool = await getConnection();
    const result = await pool.request()
      .input("nombre", sql.VarChar, nombre)
      .input("descripcion", sql.Text, descripcion)
    .query("INSERT INTO acabado (nombre, descripcion) VALUES (@nombre, @descripcion); SELECT SCOPE_IDENTITY() AS id;")
    res.status(200).json({
      message: "success",
      id: result.recordset[0].id,
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const updateAcabado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const pool = await getConnection();
    await pool.request()
      .input("id", id ) 
      .input("nombre", sql.VarChar, nombre)
      .input("descripcion", sql.Text, descripcion)
    .query("UPDATE acabado SET nombre = @nombre, descripcion = @descripcion WHERE idAcabado = @id;")
    res.status(200).json({
      message: "success",
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const deleteAcabado = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("id", id)
    .query("DELETE FROM acabado WHERE idAcabado = @id");

    if(result.rowsAffected[0] === 0){
      res.status(404).json({ message: "Acabado no encontrado." })
    } else {
      res.status(200).json({
        message: "Acabado eliminado",
      })
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
