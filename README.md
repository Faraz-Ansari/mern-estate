# CrestaView

Welcome to **CrestaView**, a real estate application built with the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to browse, list, and manage properties efficiently with a seamless user experience.

Check it out here: https://mern-estate-to9o.onrender.com/

## Table of Contents

-   [Features](#features)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Run the application](#run-the-application)
-   [Contributing](#contributing)

## Features

-   **Property Listings:** Browse, search, and filter properties based on various criteria.
-   **User Authentication:** Secure authentication using JWT for login and registration.
-   **Property Management:** Agents can add, update, or delete property listings.
-   **Responsive Design:** Mobile-friendly interface for a seamless experience on any device.

## Prerequisites

Make sure you have the following installed on your machine:

-   Node.js (v14 or later)
-   MongoDB (local or cloud instance)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Faraz-Ansari/mern-estate.git
    cd mern-estate
    ```

2. Install dependencies for both client and server:

    ```bash
    npm install

    cd client
    npm install
    ```

3. Create a `.env` file in the `api` directory and add the following:

    ```
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Create a `env` file in the `client` directory and add the following:

    ```
    VITE_FIREBASE_API_KEY=your_google_firebase_api_key
    ```

## Run the application

1. Start the backend server:

    ```bash
    npm start
    ```

2. Start the frontend server:

    ```bash
    cd client
    npm start
    ```

3. Open your browser and navigate to `http://localhost:5173`.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code adheres to the project's coding standards.
