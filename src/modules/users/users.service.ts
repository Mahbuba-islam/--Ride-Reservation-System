import { pool } from "../../configs/db"


// get users
const getUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
}


//update user

const updateUser = async (name:string, email:string , phone:number, role:string, id:string) => {
    const result = await pool.query(`UPDATE users SET name=$1, email=$2, phone=$3, 
        role=$4 where id = $5 RETURNING *`, [name, email, phone, role, id])
        return result;
}


const deleteUser = async(id:string)=>{

    // check user booking status
    const bookingResult = await pool.query(
    `SELECT status FROM bookings WHERE customer_id = $1`,
    [id])

    console.log(bookingResult.rows[0]);
    const isActive = bookingResult.rows.some(
    (row) => row.status === "active"
  );
 
  if(isActive){
      throw new Error("User cannot be deleted because they have active bookings");

    }
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id])
    return result;
}

export const services = {
     getUsers,
    updateUser,
    deleteUser
}