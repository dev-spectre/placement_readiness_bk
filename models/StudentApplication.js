const mongoose = require("mongoose");

const studentApplicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  studentId: { type: String, required: true },
  registerNumber: { type: String, required: true },
  studentName: { type: String, default: "" },
  companyId: { type: String, required: true },
  companyName: { type: String, default: "" },
  appliedAt: { type: String, default: () => new Date().toISOString() },
  status: { type: String, default: "Applied" }
}, {
  timestamps: true
});

module.exports = mongoose.model("StudentApplication", studentApplicationSchema);
