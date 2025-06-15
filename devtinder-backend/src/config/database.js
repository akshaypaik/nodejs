const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(`mongodb+srv://immortalpai:${encodeURIComponent('Immortal@1995')}@learning.h1djkdw.mongodb.net/NamasteNodejs?retryWrites=true&w=majority&appName=Learning`)
}

module.exports = { connectDB };

