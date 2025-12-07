import { Request, Response } from "express";
import { services } from "./users.service";
import { JwtPayload } from "jsonwebtoken";



// get users

const getUsers = async (req:Request, res:Response) => {
    try{
        const result = await services.getUsers()
         const safeUsers = result.rows.map(({password, ...safeUser})=> safeUser)
        const user = req.user as JwtPayload
       if(user.role === 'customer'){
       const safeUser =  safeUsers.find(safeUser => safeUser.id == user.id)
       return  res.status(200).json({
            success:true,
            message:"Users retrieved successfully",
            data: safeUser
        })
       }
      

      
        res.status(200).json({
            success:true,
            message:"Users retrieved successfully",
            data: safeUsers
        })
    }
    catch(err:any){
        res.status(500).json({
            success:false,
            message:"Users not find"
        })
    }
}



//update user

const updateUser = async (req:Request, res:Response) => {
 const id = req.params.userId
 console.log(id);
 const {name, email, phone, role} = req.body
 console.log(req.body);
 try{
    const result = await services.updateUser(name, email, phone, role , id!)
   console.log(result.rows[0]);
   const {password, ...safeUser} = result.rows[0]
   if(result.rows.length === 0){
    res.status(404).json({
            success:false,
            message:"Users not find"
        })
   }
    res.status(200).json({
        success:true,
        message:"user updated successfully",
        data: safeUser,
       
    })
 }
 catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}




// delete user

const deleteUser = async(req:Request, res:Response) => {
    const id = req.params.userId

    try{
      const result = await services.deleteUser(id!)
   
     if(result.rowCount === 0){
          res.status(404).json({
            success:false,
            message:"Users not find"
        })
     }
      res.status(200).json({
        success:true,
        message:"User deleted successfully",
        
      })
    }

    catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


export const controlers = {
getUsers,
 updateUser,
 deleteUser
}