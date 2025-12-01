const dotenv = require("dotenv");
// Load environment variables from `config.env` (project uses `config.env`)
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const app = require("./app");



async function connectDB() {
    try {
        // Mongoose 6+ sets sensible defaults; avoid deprecated/unsupported options
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");    
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }   
}

app.listen(process.env.PORT || 3000, async () => {
    const port = process.env.PORT;
    console.log(`Server is running on port ${port}`);
    await connectDB();
});
