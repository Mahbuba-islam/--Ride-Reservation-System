# 🚗 RIDE RESERVATION SYSTEM
A Node.js + PostgreSQL backend for managing vehicle rentals, bookings, and user accounts.  
This system ensures **business rules** like automatic booking status updates and vehicle availability tracking.

---
## live link : https://ride-reservation-system.vercel.app/
## ✨ Features

- **User Management**
  - Create, update, and delete users
  - Role-based restrictions (`admin` vs `customer`)

- **Booking Management**
  - Create bookings with price calculation
  - Prevent deletion of users with active bookings
  - Restrict actions:
    - Customers cannot mark bookings as `returned`
    - Admins cannot mark bookings as `canceled`
  - Auto-update booking status to `returned` when `rent_end_date` has passed

- **Vehicle Management**
  - Vehicle availability status updates automatically:
    - `booked` when a booking is created
    - `available` when booking is canceled or returned
  - Prevent double-booking

---

🛠️  Technology Stack
Node.js + TypeScript
Express.js (web framework)
PostgreSQL (database)
bcrypt (password hashing)
jsonwebtoken (JWT authentication)




