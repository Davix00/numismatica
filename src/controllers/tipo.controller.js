import  { getConnection, sql } from "../database/connection.js"

export const getTipos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM tipo");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);    
  }
}

export const getTipo = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("id", id )
    .query("SELECT * FROM tipo WHERE idTipo = @id");
    
    if(result.rowsAffected[0] === 0) {
      res.status(404).json({message: "Tipo no encontrado"})
    } else {
      res.status(200).json(result.recordset[0]);
    }  
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const createTipo = async (req, res) => {
  try {
    const { nombre } = req.body;

    const pool = await getConnection();
    const result = await pool.request()
      .input("nombre", sql.VarChar, nombre)
    .query("INSERT INTO tipo (nombre) VALUES (@nombre); SELECT SCOPE_IDENTITY() AS id;")
    res.status(201).json({
      message: "success",
      id: result.recordset[0].id,
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const updateTipo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const pool = await getConnection();
    await pool.request()
      .input("id", id ) 
      .input("nombre", sql.VarChar, nombre)
    .query("UPDATE tipo SET nombre = @nombre WHERE idTipo = @id;")
    res.status(200).json({
      message: "success",
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const deleteTipo = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("id", id)
    .query("DELETE FROM tipo WHERE idTipo = @id");

    if(result.rowsAffected[0] === 0){
      res.status(404).json({ message: "Tipo no encontrado." })
    } else {
      res.status(200).json({
        message: "Tipo eliminado",
      })
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
