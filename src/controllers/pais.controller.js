import  { getConnection, sql } from "../database/connection.js"

export const getPaises = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM pais");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);    
  }
}

export const getPais = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("id", id )
    .query("SELECT * FROM pais WHERE idPais = @id");
    
    if(result.rowsAffected[0] === 0) {
      res.status(404).json({message: "Pais no encontrado"})
    } else {
      res.status(200).json(result.recordset[0]);
    }  
    
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const createPais = async (req, res) => {
  try {
    const { nombre, idContinente } = req.body;

    const pool = await getConnection();
    const result = await pool.request()
      .input("nombre", sql.VarChar, nombre)
      .input("idContinente", sql.Int, idContinente)
    .query("INSERT INTO pais (nombre, idContinente) VALUES (@nombre, @idContinente); SELECT SCOPE_IDENTITY() AS id;")
    res.status(200).json({
      message: "success",
      id: result.recordset[0].id,
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const updatePais= async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const { nombre, idContinente } = req.body;
    const pool = await getConnection();
    await pool.request()
      .input("id", id ) 
      .input("nombre", sql.VarChar, nombre)
      .input("idContinente", sql.Int, idContinente)
    .query("UPDATE pais SET nombre = @nombre, idContinente = @idContinente WHERE idPais = @id;")
    res.status(200).json({
      message: "success",
    })
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const deletePais = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
      .input("id", id)
    .query("DELETE FROM pais WHERE idPais = @id");

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
