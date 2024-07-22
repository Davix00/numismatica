import  { getConnection, sql } from "../database/connection.js"

export const getEmisores = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM emisor");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);    
  }
}

export const getEmisor = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("id", id )
    .query("SELECT * FROM emisor WHERE idEmisor = @id");
    
    if(result.rowsAffected[0] === 0) {
      res.status(404).json({message: "Emisor no encontrado"})
    } else {
      res.status(200).json(result.recordset[0]);
    }  
    
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const createEmisor = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const pool = await getConnection();
    const result = await pool.request()
      .input("nombre", sql.VarChar, nombre)
      .input("descripcion", sql.Text, descripcion)
    .query("INSERT INTO emisor (nombre, descripcion) VALUES (@nombre, @descripcion); SELECT SCOPE_IDENTITY() AS id;")
    res.status(201).json({
      message: "success",
      id: result.recordset[0].id,
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const updateEmisor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const pool = await getConnection();
    await pool.request()
      .input("id", id ) 
      .input("nombre", sql.VarChar, nombre)
      .input("descripcion", sql.Text, descripcion)
    .query("UPDATE emisor SET nombre = @nombre, descripcion = @descripcion WHERE idEmisor = @id;")
    res.status(200).json({
      message: "success",
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const deleteEmisor = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("id", id)
    .query("DELETE FROM emisor WHERE idEmisor = @id");

    if(result.rowsAffected[0] === 0){
      res.status(404).json({ message: "Emisor no encontrado." })
    } else {
      res.status(200).json({
        message: "Emisor eliminado",
      })
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
