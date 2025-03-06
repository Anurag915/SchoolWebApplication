# School Web Application

## Overview
The **School Web Application** is a Node.js-based API that allows users to add and list schools based on their geographic location. This application is designed to help users find nearby schools efficiently.

## Features
- Add new schools with their name, address, and location (latitude & longitude).
- List all schools sorted by proximity to the user's provided latitude and longitude.
- Uses **Aiven** for remote MySQL database hosting.

## Technologies Used
- **Node.js** with Express.js
- **MySQL** (Hosted on **Aiven**)
- **Render.com** for API Deployment

## API Endpoints
### 1. Add Schools
**Endpoint:** `POST https://schoolwebapplication.onrender.com/api/addSchools`

**Request Body (JSON):**
```json
{
    "name": "Springfield High",
    "address": "123 Elm Street, Springfield",
    "latitude": 40.7128,
    "longitude": -74.0060
}
```

**Response (JSON):**
```json
{
    "message": "School added successfully!",
    "schoolId": 2
}
```

### 2. List Schools by Proximity
**Endpoint:** `GET https://schoolwebapplication.onrender.com/api/listSchools?latitude=40.730610&longitude=-73.935242`

**Response (JSON):**
```json
[
    {
        "id": 2,
        "name": "Springfield High",
        "address": "123 Elm Street, Springfield",
        "latitude": 40.7128,
        "longitude": -74.006
    },
    {
        "id": 4,
        "name": "Harmony Academy",
        "address": "789 Oak St, Chicago, IL",
        "latitude": 41.8781,
        "longitude": -87.6298
    }
]
```

## Installation & Setup
### Prerequisites
- **Node.js** (v16 or later)
- **MySQL Database** (Remote Database hosted on **Aiven**)
- **Render.com** for Deployment (optional)

### Steps to Run Locally
1. **Clone the Repository**
   ```sh
   git clone https://github.com/yourusername/school-web-application.git
   cd school-web-application
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Set Up Environment Variables**
   Create a `.env` file and add:
   ```env
   DB_HOST=<your-aiven-mysql-host>
   DB_PORT=3306
   DB_USER=<your-db-username>
   DB_PASSWORD=<your-db-password>
   DB_NAME=<your-database-name>
   ```
4. **Run the Server**
   ```sh
   node server.js
   ```
5. **Access the API** at `http://localhost:3000`

## Database Configuration
This application uses **Aiven** for remote MySQL database hosting. Ensure you have:
- A valid **Aiven MySQL instance**
- Correct **credentials** configured in the `.env` file
- Proper **firewall and network settings** to allow connections

## API Documentation
For detailed API documentation, visit: [Postman Documentation](https://documenter.getpostman.com/view/35201032/2sAYdmk7zw)

## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

**Email:** [anuragprajapati02005@gmail.com](mailto:anuragprajapati02005@gmail.com)

## License
This project is open-source and available under the MIT License.