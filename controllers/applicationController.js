const StudentApplication = require("../models/StudentApplication");

exports.getApplications = async (req, res) => {
  try {
    const list = await StudentApplication.find({}).sort({ createdAt: -1 });
    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createApplication = async (req, res) => {
  try {
    const body = req.body;
    const id = body.id || `app_${Date.now()}_${Math.floor(Math.random()*1000)}`;
    const app = await StudentApplication.create({
      ...body,
      id
    });
    return res.status(201).json(app);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const app = await StudentApplication.findOneAndUpdate({ id }, { status }, { new: true });
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });
    return res.status(200).json(app);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
