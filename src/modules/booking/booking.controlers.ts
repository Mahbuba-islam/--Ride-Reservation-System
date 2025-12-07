import { Request, Response } from "express";
import {  bookingServices } from "./booking.service";
import { Jwt, JwtPayload } from "jsonwebtoken";




// create booking

const createbooking = async(req:Request, res:Response) => {

try{
 const result = await bookingServices.createbooking(req.body)
const vehicle =  result.vehicleData.rows[0]
res.status(201).json({
    success:true,
    message:"Data inserted successfully",
    data: 
    result.bookingResult.rows[0],
      vehicle
    
})
 

}
catch(err:any){
    res.status(500).json({
        success:false,
        message:err.message
    })
}
}



// get booking

const getbookings = async (req:Request, res:Response) => {
    try{
        const result = await bookingServices.getbookings()
        
        console.log(result);

        const user = req.user as JwtPayload
        console.log(user);

        if(user.role === 'customer'){
           const customerResult = result.find(r => r.customer_id == user.id)
           console.log(customerResult);
             const {customer, ...rest} = customerResult
          return  res.status(200).json({
            success:true,
            message:"booking retrieved successfully",
           data: rest
        })
            // console.log(user.id);
        }

         if(result.length === 0){
         return res.status(400).json({
            success:true,
            message:"No booking found",
            data: result
        })
     }

       res.status(200).json({
            success:true,
            message:"booking retrieved successfully",
            data: result
        })
    }
    catch(err:any){
        res.status(500).json({
            success:false,
            message:"booking not find"
        })
    }
}


// get Singlebooking

const getSinglebooking = async (req:Request, res:Response) => {
    try{
        const result = await bookingServices.getSinglebooking(req.params.bookingId!)
        res.status(200).json({
            success:true,
            message:"booking retrieved successfully",
            data: result.rows
        })
    }
    catch(err:any){
        res.status(500).json({
            success:false,
            message:"booking not find"
        })
    }
}



//update booking

const updatebooking = async (req:Request, res:Response) => {
 const id = req.params.bookingId
 
 
 try{
    const result = await bookingServices.updatebooking(id!, req.body)
   console.log(result);
   const user = req.user as JwtPayload
   if(user.role === 'customer'){
    const {vehicle , ...rest} = result
    return  res.status(200).json({
        success:true,
        message:"booking updated successfully",
        data: rest,
       
    })
   }


    res.status(200).json({
        success:true,
        message:"booking updated successfully",
        data: result,
       
    })
 }
 catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}




// delete booking

const deletebooking = async(req:Request, res:Response) => {
    const id = req.params.bookingId

    try{
      const result = await bookingServices.deletebooking(id!)
   
     if(result.rowCount === 0){
          res.status(404).json({
            success:false,
            message:"booking not find"
        })
     }
      res.status(200).json({
        success:true,
        message:"booking deleted successfully",
        
      })
    }

    catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


export const bookingControlers = {
createbooking,
getbookings,
getSinglebooking,
 updatebooking,
 deletebooking
}