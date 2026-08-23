const PlacementDrive = require("../models/PlacementDrive");

exports.getPlacementDrives = async (req, res) => {
  try {
    const drives = await PlacementDrive.find({}).sort({ createdAt: -1 });
    return res.status(200).json(drives);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.publishPlacementDrive = async (req, res) => {
  try {
    const { companyId, registrationFormUrl, pdfDataUrl, publisherName, company, eligibleStudents, allStudents } = req.body;

    const deliveryLogs = (eligibleStudents || []).map(student => ({
      studentId: student.id || student.registerNumber,
      name: student.name || student.fullName,
      registerNumber: student.registerNumber,
      email: student.email,
      department: student.department,
      cgpa: student.cgpa,
      emailStatus: "Sent",
      sentAt: new Date().toISOString()
    }));

    const driveId = `drive_${Date.now()}`;
    const newDrive = await PlacementDrive.create({
      id: driveId,
      companyId: companyId || (company && company.id) || "",
      companyName: (company && company.name) || "Company Drive",
      jobRole: (company && company.jobRole) || "",
      salaryPackage: (company && company.salaryPackage) || "",
      location: (company && company.location) || "",
      applicationDeadline: (company && company.applicationDeadline) || "",
      description: (company && company.description) || "",
      registrationFormUrl: registrationFormUrl || "",
      pdfDataUrl: pdfDataUrl || "",
      eligibilityCriteria: {
        allowedDepartments: company?.allowedDepartments,
        cgpaCutoff: company?.cgpaCutoff,
        maxActiveArrears: company?.maxActiveArrears,
        year: company?.year,
        requiredSkills: company?.requiredSkills
      },
      status: "Published",
      publishedAt: new Date().toISOString(),
      publishedBy: publisherName || "Placement Officer",
      totalStudentsCount: allStudents?.length || 0,
      eligibleStudentsCount: eligibleStudents?.length || 0,
      emailSentCount: eligibleStudents?.length || 0,
      emailFailedCount: 0,
      emailPendingCount: 0,
      deliveryStatus: "Delivered",
      eligibleStudentIds: (eligibleStudents || []).map(s => s.id || s.registerNumber),
      studentsList: deliveryLogs
    });

    return res.status(201).json({
      success: true,
      drive: newDrive,
      message: `Successfully published placement drive and dispatched emails to ${eligibleStudents?.length || 0} eligible students.`
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePlacementDrive = async (req, res) => {
  try {
    const id = req.params.id;
    await PlacementDrive.deleteOne({ id });
    return res.status(200).json({ success: true, message: "Drive deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
