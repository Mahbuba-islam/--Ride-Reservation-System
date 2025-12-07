

# 🚗 RIDE RESERVATION SYSTEM
A Node.js + PostgreSQL backend for managing vehicle rentals, bookings, and user accounts.  
This system ensures **business rules** like automatic booking status updates and vehicle availability tracking.

---

## 🌐 Live Link
https://ride-reservation-system.vercel.app/
---

## ✨ Features

- **User Management**
  - Create, update, and delete users
  - Role-based restrictions (`admin` vs `customer`)
  - Prevent deletion of users with active bookings

- **Booking Management**
  - Create bookings with price calculation
  - Restrict actions:
    - Customers cannot mark bookings as `returned`
    - Admins cannot mark bookings as `canceled`
  - Auto-update booking status to `returned` when `rent_end_date` has passed
  - Vehicle availability updated accordingly (`booked` / `available`)

- **Vehicle Management**
  - Add and manage vehicles
  - Vehicle availability status updates automatically:
    - `booked` when a booking is created
    - `available` when booking is canceled or returned
  - Prevent double-booking

---

## 🛠️ Technology Stack
- Node.js + TypeScript  
- Express.js (web framework)  
- PostgreSQL (database)  
- bcrypt (password hashing)  
- jsonwebtoken (JWT authentication)  
- Vercel (deployment)

---

## ⚙️ Setup & Usage Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Mahbuba-islam/--Ride-Reservation-System.git
cd ride-reservation-system
```

### 2. Install Dependencies
```bash
npm install
```



### 4. Run Database Migrations
Make sure PostgreSQL is running, then create tables for:
- `users`
- `vehicles`
- `bookings`

### 5. Start the Development Server
```bash
npm run dev
```


## 🚀 Deployment
This project is deployed on **Vercel**.  
Production URL:  
```
https://ride-reservation-system.vercel.app/
```

---


