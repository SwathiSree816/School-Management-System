const Parent = require("../models/parentModel");
const User = require("../models/userModel");


const getParents = async (req, res) => {
  try {
    const parents = await User.find(
      { role: "parent" },
      "username email phone"
    );

    res.json(parents);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const addParent = async (req, res) => {
  try {
    const { userId, studentName, relation } = req.body;

    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role !== "parent") {
      return res.status(400).json({
        message: "Selected user is not a parent",
      });
    }

    
    const parentExists = await Parent.findOne({ user: userId });

    if (parentExists) {
      return res.status(400).json({
        message: "Parent profile already exists",
      });
    }

    const parent = await Parent.create({
      user: userId,
      studentName,
      relation,
    });

    res.status(201).json(parent);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


const getParentById = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id).populate(
      "user",
      "username email phone"
    );

    if (!parent) {
      return res.status(404).json({
        message: "Parent not found",
      });
    }

    res.json(parent);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const updateParent = async (req, res) => {
  try {
    const { studentName, relation } = req.body;

    const parent = await Parent.findById(req.params.id);

    if (!parent) {
      return res.status(404).json({
        message: "Parent not found",
      });
    }

    parent.studentName = studentName || parent.studentName;
    parent.relation = relation || parent.relation;

    const updatedParent = await parent.save();

    res.json(updatedParent);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const deleteParent = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);

    if (!parent) {
      return res.status(404).json({
        message: "Parent not found",
      });
    }

    await Parent.findByIdAndDelete(req.params.id);

    res.json({
      message: "Parent deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalParents = await Parent.countDocuments({});

    res.json({
      totalParents,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getParents,
  addParent,
  getParentById,
  updateParent,
  deleteParent,
  getDashboardStats,
};