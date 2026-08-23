const Dataset = require("../models/Dataset");

exports.getDatasets = async (req, res) => {
  try {
    const list = await Dataset.find({}).sort({ createdAt: -1 });
    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.uploadDataset = async (req, res) => {
  try {
    const body = req.body;
    const id = body.id || `data_${Date.now()}`;
    const dataset = await Dataset.create({
      ...body,
      id
    });
    return res.status(201).json(dataset);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
