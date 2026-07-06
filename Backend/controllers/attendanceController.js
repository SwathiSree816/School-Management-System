const Attendance = require("../models/attendanceModel");

// Mark attendance
const markAttendance = async (req, res) => {
  try {
    const { date, class: className, records } = req.body;
    
    let attendance = await Attendance.findOne({ date, class: className });
    
    if (attendance) {
      attendance.records = records;
      await attendance.save();
    } else {
      attendance = await Attendance.create({
        date,
        class: className,
        records
      });
    }
    
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// View attendance by class and date
const viewAttendance = async (req, res) => {
  try {
    const { date, class: className } = req.query;
    
    let query = {};
    if (date) query.date = new Date(date);
    if (className) query.class = className;

    const attendances = await Attendance.find(query);
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { markAttendance, viewAttendance };
