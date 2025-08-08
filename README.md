# School Management API

This repository contains a simple Node.js + Express API to manage schools and list them by proximity to a user location.


# 📚 School Management API

A Node.js + Express.js + MySQL API to manage schools — allowing users to **add** new schools and **list** them sorted by proximity to a given location.

---

## 🚀 Features
- **Add School** – Save school details (name, address, latitude, longitude) to MySQL.
- **List Schools** – Retrieve schools sorted by geographical distance from the given coordinates.
- **Validation** – Ensures proper data format and value ranges.
- **Distance Calculation** – Uses the Haversine formula in SQL.

---

## 📦 Technologies
- **Node.js**
- **Express.js**
- **MySQL** (with `mysql2/promise`)
- **express-validator**
- **dotenv**

---

## 🗄 Database Setup

1. **Create Database**
```sql
CREATE DATABASE school_db;



## Testing the API
Base URL: https://api.example.com
Sandbox URL: https://sandbox.api.example.com

Example request:
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://sandbox.api.example.com/users

