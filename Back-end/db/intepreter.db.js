const {pool} = require('../config/dbconfig');

const createIntepreterDb=async({userID,cert_url,hourly_rate,langs})=>{
  try {
  console.log(langs);
      const intepreter= await pool.query(
        `INSERT INTO intepreter(cert_url,hourly_rate,userID)
        VALUES($1,$2,$3) 
        returning cert_url,hourly_rate,userID,ID `,[cert_url,hourly_rate,userID]);
      const myintepreter=intepreter.rows[0];
      languages=langs;
      if(languages)
          languages.forEach(async (lanuageid) => {
            const intepretLangs= await pool.query(`INSERT INTO intepreter_lang(intepreterID,langID) VALUES($1,$2)`,[myintepreter.ID,lanuageid])
          });
 

      return myintepreter;

  } catch (error) {
    throw error;
  }
};
const updateIntepreterDb = async ({name,lastname,id,hourly_rate,img_url}) => {
   try {
    
    const { rows: user } = await pool.query(
      `UPDATE users set name = $1,image_url = $2,lastname = $3
        where ID = $4 returning name, email, lastname, ID`,
      [name, img_url, lastname, id]
    );
    const myuser=user[0];

    const {rows:intepreter} = await pool.query(
        `UPDATE intepreter set cert_url=$1, hourly_rate=$2, active_status=$3 WHERE userID=$4 `,
    [cert_url,hourly_rate,active_status, myuser.ID]);

    return {myuser,intepreter:intepreter[0]}
   } catch (error) {
     throw error;
   }

};
const deleteInteprterDb = async (id) => {
  try {
        const { rows: user } = await pool.query(
          "DELETE FROM users where ID = $1 returning *",
          [id]
        );
        const {rows:intepreter} = await pool.query(
            `DELETE FROM intepreter WHERE userID=$1 `,
        [user[0].ID]);

      return user[0];
  } catch (error) {
    throw error;
  }

};
const getAllIntepretersDb=async () => {
  try {
    const { rows: intepreters } = await pool.query(
      `select * FROM users, intepreter
        WHERE users.id = intepreter.userid
        ORDER BY (CASE WHEN intepreter.online_status THEN 1 END) ASC`
    );
    
    return intepreters;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};
const getIntepreterDb=async(id)=>{
  const {rows:intepreter} =await pool.query("select id from intepreter where userid=$1",[id]);
  
  return intepreter[0].id;
}
const setOnilineDb=async (status,id) => {
  try {
    const { rows: intepreter } = await pool.query(`update intepreter set online_status = $1 WHERE userID = $2 returning online_status`,[status,id]);
    
    return intepreter[0];
  } catch (error) {
    console.log(error);
    throw error; 
  }
};
module.exports={
  deleteInteprterDb,
  updateIntepreterDb,
  getAllIntepretersDb,
  createIntepreterDb,
  getIntepreterDb,
  setOnilineDb
}