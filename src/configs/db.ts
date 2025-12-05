import {Pool} from "pg";
import config from ".";


const pool = new Pool({
    connectionString : `${config.connection_str}`
})


const initDB = async() => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL CHECK(email = LOWER(email)),
        password VARCHAR(20) NOT NULL CHECK(LENGTH(password) >= 6),
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(20) CHECK (role IN ('admin', 'customer'))
        )
        `)

        await pool.query(`
             CREATE TABLE IF NOT EXISTS Vehicles(
              id SERIAL PRIMARY KEY,
              vehicle_name VARCHAR(100) NOT NULL,
              type VARCHAR(20) CHECK (type IN('car', 'bike', 'van', 'SUV' )),
              registration_number VARCHAR(100) UNIQUE NOT NULL,
              daily_rent_price DECIMAL(10,2) NOT NULL CHECK(daily_rent_price > 0),
              availability_status VARCHAR(40) CHECK (availability_status IN ('available', 'booked'))



             )
            `)

            await pool.query(`
                CREATE TABLE IF NOT EXISTS Bookings(
                id SERIAL PRIMARY KEY,
                customer_id	INT REFERENCES Users(id) ON DELETE CASCADE,
                vehicle_id INT REFERENCES Vehicles(id) ON DELETE CASCADE,
                rent_start_date DATE NOT NULL,
                rent_end_date DATE NOT NULL ,
                total_price DECIMAL(10,2) NOT NULL CHECK ( total_price > 0 ),
                status VARCHAR(20) CHECK ( status IN ('active', 'cancelled', 'returned') ),
                CHECK (rent_end_date > rent_start_date)

                )
                `)
}






export default initDB;



