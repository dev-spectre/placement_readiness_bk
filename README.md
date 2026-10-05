# Placement Readiness Backend

Backend API for the Placement Readiness Analyzer — a platform to help students prepare for campus placements.

## Overview

A Node.js/Express backend that manages student profiles, faculty accounts, company data, and placement readiness scoring. Features authentication, email notifications, and a scoring algorithm to assess student readiness.

## Features

- **Authentication** — JWT-based auth for students and faculty
- **Student management** — profiles, skills, and readiness tracking
- **Faculty portal** — manage students, companies, and placements
- **Company management** — track recruiting companies and requirements
- **Readiness scoring** — algorithm to calculate placement readiness
- **Email notifications** — via Nodemailer and SendGrid
- **Database seeding** — populate with test data

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT (jsonwebtoken)
- **Email:** Nodemailer, SendGrid

## Getting Started

```bash
npm install
cp .env.example .env
npm run seed    # Optional: seed database
npm start
```

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/placement_readiness
JWT_SECRET=your_secret
SENDGRID_API_KEY=your_key
```

## Project Structure

```
├── server.js                  # Entry point
├── app.js                     # Express app setup
├── config/
│   └── database.js            # MongoDB connection
├── controllers/
│   ├── authController.js
│   ├── studentController.js
│   └── ...
├── models/
│   ├── Student.js
│   ├── Faculty.js
│   └── Company.js
├── utils/
│   ├── scoreCalculator.js
│   ├── generateToken.js
│   ├── nodemailerEmail.js
│   └── sendgridEmail.js
├── seed.js                    # Database seeder
├── test.js                    # Test script
└── resetFacultyPassword.js    # Password reset utility
```

## License

MIT
