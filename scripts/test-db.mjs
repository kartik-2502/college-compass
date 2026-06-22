import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
try {
  const count = await prisma.college.count();
  console.log("OK college count:", count);
} catch (e) {
  console.error("FAIL:", e.message);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
