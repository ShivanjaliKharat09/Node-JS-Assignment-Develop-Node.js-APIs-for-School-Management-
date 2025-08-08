# School Management API

This repository contains a simple Node.js + Express API to manage schools and list them by proximity to a user location.

## Features
- Add a school (name, address, latitude, longitude)
- List schools sorted by distance from a given coordinate (latitude, longitude)

## Quickstart
1. Copy `.env.example` to `.env` and fill your DB credentials
2. Run `npm install`
3. Run the schema SQL in `schema.sql` to create the database/table
4. Start the server: `npm run dev` (requires nodemon) or `npm start`

## Endpoints
- `POST /addSchool` — body: `{ name, address, latitude, longitude }`
- `GET /listSchools?latitude=..&longitude=..` — returns schools sorted by distance (km)
