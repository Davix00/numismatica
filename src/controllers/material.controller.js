import  { getConnection, sql } from "../database/connection.js"

export const getMateriales = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM materiales");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);    
  }
}

export const getMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("id", id )
    .query("SELECT * FROM material WHERE idMaterial = @id");
    
    if(result.rowsAffected[0] === 0) {
      res.status(404).json({message: "Material no encontrado"})
    } else {
      res.status(200).json(result.recordset[0]);
    }  
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const createMaterial = async (req, res) => {
  try {
    const { nombre } = req.body;

    const pool = await getConnection();
    const result = await pool.request()
      .input("nombre", sql.VarChar, nombre)
    .query("INSERT INTO material (nombre) VALUES (@nombre); SELECT SCOPE_IDENTITY() AS id;")
    res.status(200).json({
      message: "success",
      id: result.recordset[0].id,
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const updateMaterial = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const { nombre } = req.body;
    const pool = await getConnection();
    await pool.request()
      .input("id", id ) 
      .input("nombre", sql.VarChar, nombre)
    .query("UPDATE material SET nombre = @nombre WHERE idMaterial = @id;")
    res.status(200).json({
      message: "success",
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("id", id)
    .query("DELETE FROM material WHERE idMaterial = @id");

    if(result.rowsAffected[0] === 0){
      res.status(404).json({ message: "Material no encontrado." })
    } else {
      res.status(200).json({
        message: "Material eliminado",
      })
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
