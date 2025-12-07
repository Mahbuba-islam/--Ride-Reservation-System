import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.service";




// create Vehicles

const createVehicles = async(req:Request, res:Response) => {

try{
 const result = await vehiclesServices.createVehicles(req.body)
res.status(201).json({
    success:true,
    message:"Vehicle created successfully",
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



// get Vehicles

const getVehicles = async (req:Request, res:Response) => {
    try{
        const result = await vehiclesServices.getVehicles()


         if(result.rows.length === 0){
       res.status(200).json({
            success:true,
            message:"No vehicles found",
            data:result.rows
        })
     }

  res.status(200).json({
            success:true,
            message:"Vehicles retrieved successfully",
            data: result.rows
        })
    }
    catch(err:any){
        res.status(500).json({
            success:false,
            message:"Vehicles not find"
        })
    }
}


// get SingleVehicles

const getSingleVehicles = async (req:Request, res:Response) => {
    try{
        const result = await vehiclesServices.getSingleVehicles(req.params.vehicleId!)
        res.status(200).json({
            success:true,
            message:"Vehicle retrieved successfully",
            data: result.rows
        })
    }
    catch(err:any){
        res.status(500).json({
            success:false,
            message:"Vehicle not find"
        })
    }
}



//update Vehicles

const updateVehicles = async (req:Request, res:Response) => {
 const id = req.params.vehicleId
 
 
 try{
    const result = await vehiclesServices.updateVehicles(id!, req.body)
   console.log(result.rows[0]);
   if(result.rows.length === 0){
    res.status(404).json({
            success:false,
            message:"Vehicles not find"
        })
   }
    res.status(200).json({
        success:true,
        message:"Vehicles updated successfully",
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




// delete Vehicles

const deleteVehicles = async(req:Request, res:Response) => {
    const id = req.params.vehicleId

    try{
      const result = await vehiclesServices.deleteVehicles(id!)
   
     if(result.rowCount === 0){
          res.status(404).json({
            success:false,
            message:"Vehicles not find"
        })
     }
      res.status(200).json({
        success:true,
        message:"Vehicles deleted successfully",
        
      })
    }

    catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


export const vehiclesControlers = {
createVehicles,
getVehicles,
getSingleVehicles,
 updateVehicles,
 deleteVehicles
}