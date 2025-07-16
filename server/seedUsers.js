const mongoose = require("mongoose");
const User = require("./models/User");

// Replace this with your own connection string if needed
const MONGO_URI =  "mongodb+srv://ashishsaini9389:qvEA4TDAtchzKJRU@cluster0.pfxbqje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const seedUsers = [
  { name: "Rahul" },
  { name: "Kamal" },
  { name: "Sanak" },
  { name: "Ankit" },
  { name: "Neha" },
  { name: "Sumit" },
  { name: "Pooja" },
  { name: "Rani" },
  { name: "Aman" },
  { name: "Simran" },
];

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    await User.deleteMany(); // Clear existing
    await User.insertMany(seedUsers);
    console.log("✅ Seeded 10 users successfully.");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Failed to seed users:", err);
  });
