import { Request, Response } from "express";
import {  authServices} from "./auth.service";



 // sign up 
const signup = async(req:Request, res:Response) => {
try{
 const registerResult = await authServices.signup(req.body)
 const {password, ...rest} =registerResult.rows[0]
res.status(201).json({
    success:true,
    message:"User registered successfully",
    data: rest
 })
 

}
catch(err:any){
    res.status(500).json({
        success:false,
        message:err.message
    })
}
}







const signin = async(req:Request, res:Response) => {
    const {email, password} = req.body
    
    try{
     const result = await authServices.signin(email, password )
     const {password:userPassword, ...rest} = result.user
     res.status(200).json({
        success:true,
        message:"Login successful",
        data:{
            token:result.token,
            user:rest
        }
        
     })
     
    
    }
    catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
    }


   export const authControler = {
    signup,
    signin
    }