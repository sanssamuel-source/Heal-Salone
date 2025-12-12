const prisma = require('../prisma/client');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getAnalytics = async (req, res, next) => {
  try {
    // 1. Total Counts
    const userCount = await prisma.user.count();
    const reportCount = await prisma.healthReport.count();
    const chatCount = await prisma.chatLog.count();

    // 2. Reports by Month (Simple aggregation)
    // Note: Prisma doesn't support advanced date grouping easily across all DBs without raw queries,
    // so we'll fetch recent reports and aggregate in JS for MVP, or use groupBy if supported.
    // For MVP, let's just do recent activity stats.

    // 3. User Roles distribution
    const usersByRole = await prisma.user.groupBy({
      by: ['role'],
      _count: {
        role: true,
      },
    });

    // 4. Recent Reports with User details
    const recentReports = await prisma.healthReport.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    res.json({
      summary: {
        userCount,
        reportCount,
        chatCount,
      },
      distribution: {
        usersByRole,
      },
      recentActivity: recentReports
    });
  } catch (error) {
    next(error);
  }
};
