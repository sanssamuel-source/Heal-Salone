const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);

  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@healsalone.com' },
    update: {},
    create: {
      email: 'admin@healsalone.com',
      name: 'Admin User',
      password,
      role: 'ADMIN',
    },
  });

  // Create User
  const user = await prisma.user.upsert({
    where: { email: 'user@healsalone.com' },
    update: {},
    create: {
      email: 'user@healsalone.com',
      name: 'Demo User',
      password,
      role: 'USER',
    },
  });

  console.log({ admin, user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
