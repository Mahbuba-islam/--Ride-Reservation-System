import { pool } from "../../configs/db"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import config from "../../configs"


// create user
const signup = async (payload: Record<string, unknown> ) => {
    const {name, email , password, phone, role} = payload;

    const hasedPassword = await bcrypt.hash(password as string, 10)

    const result = await pool.query(` INSERT INTO users(name, email, password, phone, role ) 
        VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, email, hasedPassword, phone, role])

        return result;
}






const signin = async (email:string, password:string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])
  if(result.rows.length === 0){
   return {
    success: false,
      message: "User with this email not found"

   } 
  }
  const user = result.rows[0]
  const matched =await bcrypt.compare(password, user.password)

  if(!matched){
    return {
        success: false,
      message: "Incorrect password"

    }
  }

  
  const token = jwt.sign({id:user.id,name:user.name, email:user.email, role:user.role}, config.jwtSecret as string , {
   expiresIn:"7d"
  })
  return {token, user}
}


export const authServices = {
  signup,
  signin
}