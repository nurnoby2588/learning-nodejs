const handleCatchError = (error, req, res, next) => {
    console.error(error.message || error);

    if (res) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    } else {
        console.error("Response object is not available.");
    }
};

module.exports = handleCatchError;
