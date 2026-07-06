const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema(
  {
    date: { type: Date, required: true },
    class: { type: String, required: true },
    records: [
      {
        studentName: { type: String, required: true },
        status: { type: String, enum: ["Present", "Absent", "Late"], required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
