import { Request, Response } from "express";
import {  bookingServices } from "./booking.service";
import {  JwtPayload } from "jsonwebtoken";


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





//update booking

const updatebooking = async (req:Request, res:Response) => {
 const id = req.params.bookingId
 const user = req.user as JwtPayload
 
 
 try{
    const result = await bookingServices.updatebooking(id!, user, req.body)
   console.log(result);
  return  res.status(200).json({
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





export const bookingControlers = {
createbooking,
getbookings,
updatebooking,
}