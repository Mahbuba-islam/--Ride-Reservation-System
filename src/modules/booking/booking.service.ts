import { pool } from "../../configs/db"
import { authServices } from "../auth/auth.service";
import auth from "../middleware/authMid";


// create booking
const createbooking = async (payload: Record<string, unknown> ) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date} = payload;
    const vehicleData = await pool.query(`SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id=$1`, [vehicle_id])
    const startDate = new Date(rent_start_date as number)
    const endDate = new Date(rent_end_date as number)
    const days = Math.ceil((endDate.getTime()- startDate.getTime()) / (1000 * 60 * 60 * 24));
    const total_price = days * vehicleData.rows[0].daily_rent_price;


     const bookingResult = await pool.query(` INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) 
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, 'active'])
   
        return {
            bookingResult,
            vehicleData
        }


     }

 


// get bookings
const getbookings = async () => {
    const bookingResult = await pool.query(`SELECT * FROM bookings`);
     const customerResult = await pool.query(`SELECT id, name, email, role FROM users`)
    const vehiclesResult = await pool.query(`SELECT id , vehicle_name, registration_number FROM vehicles`)
    
  const result = bookingResult.rows.map(bookingRow => {
    const customerRows = customerResult.rows.find(customerRow => customerRow.id == bookingRow.customer_id)
    const vehicleRows = vehiclesResult.rows.find(vehicleRow => vehicleRow.id == bookingRow.vehicle_id)
    const {id:customerId, ...customer} = customerRows
    console.log(customer.role);
    const {id:vehicle_id, ...vehicle} = vehicleRows
   
    const result =  {...bookingRow, customer, vehicle}
    return result
  })
 
   
return result

}


//get single booking
const getSinglebooking = async (id:string) => {
    const result = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
   return result;
}


//update booking

const updatebooking = async (id:string , payload: Record<string, unknown>) => {
     const {status} = payload

     const bookingQuery = await pool.query(`UPDATE bookings SET status = $1 where id = $2 RETURNING *`, [status, id] )
     const availabilityStatus = "available"
     const vehicleAviableStatus = await pool.query(`UPDATE vehicles SET availability_status = $1 RETURNING availability_status`, [availabilityStatus])
     const vehicle = vehicleAviableStatus.rows[0]
    
    //  console.log('Adf',vehicleAviableStatus);
    //     [vehicle_name, type , registration_number, daily_rent_price, availability_status, id])
    //  const {vehicle_name, type , registration_number, daily_rent_price, availability_status, status} = payload;
    // const result = await pool.query(`UPDATE bookings SET vehicle_name=$1, type=$2, registration_number=$3, 
    //     daily_rent_price=$4 , availability_status=$5 where id = $6 RETURNING *`, 
    //     [vehicle_name, type , registration_number, daily_rent_price, availability_status, id])
     const result =  {...bookingQuery.rows[0], vehicle}
    //   console.log('2',{vehicle});
     return result
}


const deletebooking = async(id:string)=>{
    const result = await pool.query(`DELETE FROM bookings WHERE id = $1`, [id])
    return result;
}

export const bookingServices = {
    createbooking,
     getbookings,
     getSinglebooking,
    updatebooking,
    deletebooking
}