import { pool } from "../../configs/db"


// create booking
const createbooking = async (payload: Record<string, unknown> ) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date} = payload;

    const vehicleData = await pool.query(`SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id=$1`, [vehicle_id])
    console.log('vehicle data:', vehicleData.rows[0].daily_rent_price);
    const startDate = new Date(rent_start_date as number)

    const endDate = new Date(rent_end_date as number)

    const days = Math.ceil((endDate.getTime()- startDate.getTime()) / (1000 * 60 * 60 * 24));

    const total_price = days * vehicleData.rows[0].daily_rent_price;

    const bookingResult = await pool.query(` INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) 
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, 'active'])
   
    console.log(bookingResult.rowCount);
      
    // update behicle status
    
    if(bookingResult.rowCount === 1){
       const result = await pool.query(`UPDATE vehicles SET availability_status=$1 where id = $2 RETURNING *`, 
        ["booked", vehicle_id])
       
    }
        return {
            bookingResult,
            vehicleData
        }


     }

 


// get bookings
const getbookings = async () => {
    const bookingResult = await pool.query(`SELECT * FROM bookings`);
    
   // check rent end date
   for (const booking of bookingResult.rows) {
    const endDate = new Date(booking.rent_end_date);
    const now = new Date();

    if (booking.status === "active" && endDate < now) {
      await pool.query(
        `UPDATE bookings SET status = 'returned' WHERE id = $1`,
        [booking.id]
      );
      booking.status = "returned"; 
    }
  }

     // customer data
    const customerResult = await pool.query(`SELECT id, name, email, role FROM users`)
    
    // vehicle data
    const vehiclesResult = await pool.query(`SELECT id , vehicle_name, registration_number FROM vehicles`)
    
    const result = bookingResult.rows.map(bookingRow => {
    const customerRows = customerResult.rows.find(customerRow => customerRow.id == bookingRow.customer_id)
    const vehicleRows = vehiclesResult.rows.find(vehicleRow => vehicleRow.id == bookingRow.vehicle_id)
    const {id:customerId, ...customer} = customerRows
   
    const {id:vehicle_id, ...vehicle} = vehicleRows
   
    const result =  {...bookingRow, customer, vehicle}
    return result
  })
 
   
return result

}

//update booking

const updatebooking = async (id:string , user:any, payload: Record<string, unknown>) => {
     const {status} = payload

      // Restriction checks
  if (user.role === "customer" && status === "returned") {
    throw new Error("Customers cannot mark booking as returned");
  }

  if (user.role === "admin" && status === "cancelled") {
    throw new Error("Admins cannot cancel bookings");
  }

 const bookingQuery = await pool.query(`UPDATE bookings SET status = $1 where id = $2 RETURNING *`, [status, id] )

   console.log(bookingQuery);

   const bookingStatus = bookingQuery.rows[0].status
    
   if( bookingStatus === 'returned'){
    const vehicleStatus = await pool.query(`UPDATE vehicles SET availability_status = $1 WHERE id = $2 RETURNING *`, ['available', bookingQuery.rows[0].vehicle_id])
    console.log('vehicle-status', vehicleStatus.rows[0].availability_status);
     const vehicle = {
    "availability_status" : vehicleStatus.rows[0].availability_status 
    }
    const result =  {...bookingQuery.rows[0], vehicle }
   return result
  
   }

  const result =  {...bookingQuery.rows[0]}
   return result
}


export const bookingServices = {
    createbooking,
     getbookings,
     updatebooking,
    
}