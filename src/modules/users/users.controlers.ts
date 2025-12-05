import { Request, Response } from "express";
import { services } from "./users.service";

const createUsers = async(req:Request, res:Response) => {
 const {name, email, password, phone} = req.body

try{
 const result = await services.createUsers(name, email, password, phone)

 res.status(201).json({
    success:true,
    message:"Data inserted successfully",
    data: result.rows[0]
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
 createUsers
}