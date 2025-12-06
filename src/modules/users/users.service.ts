import { pool } from "../../configs/db"





// get users
const getUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`);
   return result;
}


//update user

const updateUser = async (name:string, email:string , password:string, phone:number, id:string) => {
    const result = await pool.query(`UPDATE users SET name=$1, email=$2, password=$3, 
        phone=$4 where id = $5 RETURNING *`, [name, email, password, phone, id])
        return result;
}


const deleteUser = async(id:string)=>{
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id])
    return result;
}

export const services = {
     getUsers,
    updateUser,
    deleteUser
}