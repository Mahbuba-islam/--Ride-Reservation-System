import { NextFunction,  Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../../configs";

const auth = (...roles:string[]) => {
    return async(req:Request, res:Response, next:NextFunction) => {
      try{
         const authHeaders = req.headers.authorization;
       
        if(!authHeaders){
            return res.status(401).json({
                message:"you are not allowed!"
            })
        }


         const token = authHeaders?.split(" ")[1]

        const decoded = jwt.verify(token as string, config.jwtSecret as string) as JwtPayload
        req.user = decoded;

        if(roles.length  && !roles.includes(decoded.role as string)){
            return res.status(403).json({
                error: "unauthorized!!"
            })
        }
        next()
      }
      catch(err:any){
      res.status(401).json({
        success:false,
        message:err.message
      })
      }
   
    }
}

export default auth;