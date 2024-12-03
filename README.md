# ![NestJS Logo](https://nestjs.com/img/logo-small.svg) Project Name: Learning Platform


## Overview

This is a Learning Platform built with **NestJS**, **TypeScript**, and **PostgreSQL**. It allows users to sign up, manage subscriptions, enroll in courses, view lessons, and interact via a chat powered by Gemini. The platform integrates with the **Mercado Pago** API to handle payments, and referral codes are also implemented to provide discounts.

## Features

- **User Authentication & Authorization** with JWT and Auth0.
- **Role-Based Access Control** (Admin, Teacher, Student).
- **Course Management**: Create, update, and delete courses and lessons.
- **Subscription Management**: Multiple subscription plans (e.g., Basic, Premium, Pro).
- **Referral Program**: Users can redeem referral codes for discounts.
- **Chat System**: Integrated chat powered by Gemini.
- **Payment Integration**: Webhooks to handle payments via Mercado Pago API.

## Technologies Used

- **NestJS**: A progressive Node.js framework.
- **TypeORM**: Object-Relational Mapping (ORM) for database management.
- **PostgreSQL**: Relational database for storing application data.
- **Auth0**: For authentication and user management.
- **Mercado Pago API**: Payment gateway for processing transactions.
- **Gemini**: AI-powered chat integration.

## Prerequisites

Ensure the following are installed:
- **Node.js** (version 16 or higher)
- **TypeScript** (Global installation)
- **PostgreSQL** (for database setup)

You will also need an Auth0 account for authentication, and a Mercado Pago account for payment integration.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/learning-platform.git

2. Navigate to the project directory:
   ```bash
   cd learning-platform

3. Install dependencies:
   ```bash
   npm install

4. Configure environment variables:

   Create a .env file in the root of the project with the following content:
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your-database-user
   DATABASE_PASSWORD=your-database-password
   DATABASE_NAME=learning_platform

   AUTH0_SECRET=your-auth0-secret
   AUTH0_BASE_URL=your-auth0-base-url
   AUTH0_CLIENT_ID=your-auth0-client-id
   AUTH0_ISSUER_BASE_URL=your-auth0-issuer-base-url

   MERCADO_PAGO_ACCESS_TOKEN=your-mercado-pago-access-token
   GEMINI_API_KEY=your-gemini-api-key



## Running the Application
1. Start PostgreSQL: Ensure that PostgreSQL is running and the database is set up.

2. Run the application:
   ```bash
   npm start

3. The app will be available at http://localhost:3000.

# API Documentation

## Authentication

- **Login**: `POST /auth/login`
- **Register**: `POST /auth/register`

## Courses

- **Get all courses**: `GET /courses`
- **Get course by ID**: `GET /courses/:id`
- **Create course**: `POST /courses`
- **Update course**: `PUT /courses/:id`
- **Delete course**: `DELETE /courses/:id`

## Lessons

- **Get all lessons**: `GET /lessons`
- **Get lessons by course ID**: `GET /lessons/by-course/:id`
- **Create lesson**: `POST /lessons`
- **Update lesson**: `PUT /lessons/:id`
- **Delete lesson**: `DELETE /lessons/:id`

## Subscription Management

- **Get all subscriptions**: `GET /subscriptions`
- **Create subscription**: `POST /subscriptions`
- **Update subscription**: `PUT /subscriptions/:id`
- **Delete subscription**: `DELETE /subscriptions/:id`

## Membership & Payment

- **Create membership**: `POST /memberships`
- **Get all memberships**: `GET /memberships`
- **Create payment**: `POST /payments`
- **Get all payments**: `GET /payments`

## Referral Codes

- **Create referral codes**: `POST /referral-codes/create`
- **Redeem referral code**: `POST /referral-codes/redeem/:id`
- **Get all referral codes**: `GET /referral-codes`
- **Get referral code by ID**: `GET /referral-codes/:id`
- **Update referral code**: `PATCH /referral-codes/:id`
- **Delete referral code**: `DELETE /referral-codes/:id`

## Chat System (Gemini)

The platform integrates a chat system powered by **Gemini** for user interaction. You can send messages and receive responses from the bot.

- **Send message**: `POST /chat/send`
- **Receive response**: `GET /chat/response`

## Payment Integration (Mercado Pago)

The platform uses the **Mercado Pago API** for processing payments. You need to configure the API credentials in your environment file (`MERCADO_PAGO_ACCESS_TOKEN`).

- **Webhook**: The system listens to webhooks to update the payment status and membership status after successful payment.

# Contributing

We welcome contributions! If you'd like to improve the project, please follow these steps:

1. **Fork the repository**  
2. **Create your feature branch**:  
   ```bash
   git checkout -b feature/new-feature
3. **Commit your changes**:  
   ```bash
   git commit -am 'Add new feature'
4. **Push to the branch**:  
   ```bash
   git push origin feature/new-feature
5. **Create a new Pull Request on GitHub.** 


# License
This project is licensed under the MIT License. See the LICENSE file for details.

## Additional Notes

### Swagger Documentation
The API is documented using Swagger. After the application starts, you can access the API documentation at: http://localhost:3000/docs

### Error Handling
The API returns standard HTTP error codes with descriptive error messages.

### Authors
* **Your Name** - Your GitHub