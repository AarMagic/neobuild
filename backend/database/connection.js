const mongoose = require('mongoose');

const connection = async() => {
    try {
        mongoose.connect("mongodb://localhost:27017/neobuild")
        console.log("Correctly connected to the DB")
    } catch (error) {
        console.error(error)
        throw new Error("Failed to connect to the database")
    }
}

module.exports = {
    connection
}