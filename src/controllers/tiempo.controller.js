import  { getConnection, sql } from "../database/connection.js"

export const getTiempos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM tiempo");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);    
  }
}

export const getTiempo = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("id", id )
    .query("SELECT * FROM tiempo WHERE idTiempo = @id");
    
    if(result.rowsAffected[0] === 0) {
      res.status(404).json({message: "Tiempo no encontrado"})
    } else {
      res.status(200).json(result.recordset[0]);
    }  
    
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const createTiempo = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const pool = await getConnection();
    const result = await pool.request()
      .input("nombre", sql.VarChar, nombre)
      .input("descripcion", sql.Text, descripcion)
    .query("INSERT INTO tiempo (nombre, descripcion) VALUES (@nombre, @descripcion); SELECT SCOPE_IDENTITY() AS id;")
    res.status(201).json({
      message: "success",
      id: result.recordset[0].id,
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const updateTiempo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const pool = await getConnection();
    await pool.request()
      .input("id", id ) 
      .input("nombre", sql.VarChar, nombre)
      .input("descripcion", sql.Text, descripcion)
    .query("UPDATE tiempo SET nombre = @nombre, descripcion = @descripcion WHERE idTiempo = @id;")
    res.status(200).json({
      message: "success",
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const deleteTiempo = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("id", id)
    .query("DELETE FROM tiempo WHERE idTiempo = @id");

    if(result.rowsAffected[0] === 0){
      res.status(404).json({ message: "Tiempo no encontrado." })
    } else {
      res.status(200).json({
        message: "Tiempo eliminado",
      })
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
