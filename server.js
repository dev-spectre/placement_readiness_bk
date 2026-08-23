require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");
const seedDatabase = require("./seed");

const PORT = process.env.PORT || 5000;

console.log("PORT =", PORT);
console.log("MONGODB_URI =", process.env.MONGODB_URI ? "Loaded ✅" : "Missing ❌");
console.log("JWT_SECRET =", process.env.JWT_SECRET ? "Loaded ✅" : "Missing ❌");

connectDB().then(() => {
  seedDatabase();
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});