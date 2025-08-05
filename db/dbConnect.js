const mongoose = require('mongoose');
const handleCatchError = require('../Error/handleCatchError');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
            .then(() => {
                console.log("Database connected successfully");
            })
            .catch((error) => {
                console.error("Database connection failed:", error.message);
                handleCatchError(error, null, null, null);
            });
    } catch (error) {
        // console.error("Error during database connection:", error.message);
        handleCatchError(error, null, null, null);
    }
};

module.exports = dbConnect;
