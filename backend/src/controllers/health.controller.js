const prisma = require('../prisma/client');
const { z } = require('zod');

// Schema validation - photoUrl is optional coming from body, but if file is uploaded we use that
const reportSchema = z.object({
  symptoms: z.string().min(1),
  mood: z.string().optional(),
});

exports.createReport = async (req, res, next) => {
  try {
    // Check if file is uploaded
    const photoUrl = req.file ? req.file.path : null;
    
    const { symptoms, mood } = reportSchema.parse(req.body);

    const report = await prisma.healthReport.create({
      data: {
        userId: req.user.id,
        symptoms,
        mood,
        photoUrl: photoUrl, // Use Cloudinary URL
      },
    });
    res.status(201).json(report);
  } catch (error) {
    next(error);
  }
};

exports.getReports = async (req, res, next) => {
  try {
    const reports = await prisma.healthReport.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(reports);
  } catch (error) {
    next(error);
  }
};

exports.getReportById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const report = await prisma.healthReport.findFirst({
      where: { id, userId: req.user.id },
    });
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    next(error);
  }
};
