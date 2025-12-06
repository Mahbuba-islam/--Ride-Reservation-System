import { pool } from "../../configs/db"


// create booking
const createbooking = async (payload: Record<string, unknown> ) => {
    const {vehicle_name, type , registration_number, daily_rent_price, availability_status} = payload;
   const result = await pool.query(` INSERT INTO bookings(vehicle_name, type , registration_number, daily_rent_price, availability_status) 
        VALUES($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type , registration_number, daily_rent_price, availability_status])

        return result;
}




// get bookings
const getbookings = async () => {
    const result = await pool.query(`SELECT * FROM bookings`);
   return result;
}


//get single booking
const getSinglebooking = async (id:string) => {
    const result = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
   return result;
}


//update booking

const updatebooking = async (id:string , payload: Record<string, unknown>) => {
     const {vehicle_name, type , registration_number, daily_rent_price, availability_status} = payload;
    const result = await pool.query(`UPDATE bookings SET vehicle_name=$1, type=$2, registration_number=$3, 
        daily_rent_price=$4 , availability_status=$5 where id = $6 RETURNING *`, 
        [vehicle_name, type , registration_number, daily_rent_price, availability_status, id])
        return result;
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