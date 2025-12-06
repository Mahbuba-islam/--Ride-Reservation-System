import { Request, Response } from "express";
import {  bookingServices } from "./booking.service";




// create booking

const createbooking = async(req:Request, res:Response) => {

try{
 const result = await bookingServices.createbooking(req.body)
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



// get booking

const getbookings = async (req:Request, res:Response) => {
    try{
        const result = await bookingServices.getbookings()


         if(result.rows.length === 0){
       res.status(200).json({
            success:true,
            message:"No booking found",
            data:result.rows
        })
     }

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
   console.log(result.rows[0]);
   if(result.rows.length === 0){
    res.status(404).json({
            success:false,
            message:"booking not find"
        })
   }
    res.status(200).json({
        success:true,
        message:"booking updated successfully",
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