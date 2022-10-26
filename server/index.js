// Express imports
const express = require("express");

const PORT = process.env.PORT || 5000;

// App creation
const app = express();

// Configuration

// Pre-routing middleware

// Routing

// Error handling

// app start
const startServer = async ( ) => {
    try {
        app.listen(PORT, () => console.log(`Listening in ${PORT}`))
    } catch (error) {
        console.log(`An error happened during server initialization: ${err}`);
    }
}

startServer();