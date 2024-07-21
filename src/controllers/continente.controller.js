import  { getConnection, sql } from "../database/connection.js"

export const getContientes = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM continentes");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);    
  }
}

export const getContinente = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("id", id )
    .query("SELECT * FROM continente WHERE idContinente = @id");
    
    if(result.rowsAffected[0] === 0) {
      res.status(404).json({message: "Continente no encontrado"})
    } else {
      res.status(200).json(result.recordset[0]);
    }  
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const createAcabado = async (req, res) => {
  try {
    const { nombre } = req.body;

    const pool = await getConnection();
    const result = await pool.request()
      .input("nombre", sql.VarChar, nombre)
    .query("INSERT INTO continente (nombre) VALUES (@nombre); SELECT SCOPE_IDENTITY() AS id;")
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
    console.log(req.body);
    const { id } = req.params;
    const { nombre } = req.body;
    const pool = await getConnection();
    await pool.request()
      .input("id", id ) 
      .input("nombre", sql.VarChar, nombre)
    .query("UPDATE continente SET nombre = @nombre WHERE idContinente = @id;")
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
    .query("DELETE FROM continente WHERE idContinente = @id");

    if(result.rowsAffected[0] === 0){
      res.status(404).json({ message: "Continente no encontrado." })
    } else {
      res.status(200).json({
        message: "Continente eliminado",
      })
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
