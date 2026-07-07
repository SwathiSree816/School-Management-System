const Notice = require("../models/noticeModel");

const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find({});

    res.json(notices);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


const addNotice = async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;

    
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const notice = await Notice.create({
      title,
      description,
      createdBy,
    });

    res.status(201).json(notice);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    res.json(notice);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const updateNotice = async (req, res) => {
  try {
    const { title, description } = req.body;

    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    notice.title = title || notice.title;
    notice.description = description || notice.description;

    const updatedNotice = await notice.save();

    res.json(updatedNotice);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    await Notice.findByIdAndDelete(req.params.id);

    res.json({
      message: "Notice deleted successfully",
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
    const totalNotices = await Notice.countDocuments({});

    res.json({
      totalNotices,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getNotices,
  addNotice,
  getNoticeById,
  updateNotice,
  deleteNotice,
  getDashboardStats,
};