const app = require('./app');
const prisma = require('./prisma/client');

const PORT = process.env.PORT || 4000;

async function main() {
  try {
    // Optionally test DB connection here if needed, but Prisma connects lazily
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
