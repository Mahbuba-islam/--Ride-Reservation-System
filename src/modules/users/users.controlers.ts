import { Request, Response } from "express";
import { services } from "./users.service";



// get users

const getUsers = async (req:Request, res:Response) => {
    try{
        const result = await services.getUsers()
        res.status(200).json({
            success:true,
            message:"Users retrieved successfully",
            data: result.rows
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
 const {name, email, password, phone} = req.body
 console.log(req.body);
 try{
    const result = await services.updateUser(name, email,password,phone,id!)
   console.log(result.rows[0]);
   if(result.rows.length === 0){
    res.status(404).json({
            success:false,
            message:"Users not find"
        })
   }
    res.status(200).json({
        success:true,
        message:"user updated successfully",
        data: result.rows[0],
       
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