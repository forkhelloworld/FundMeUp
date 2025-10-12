import { PrismaClient } from "@prisma/client";
import { lessons as LESSONS } from "../src/constants/lessons.ts";
import ACHIEVEMENTS from "../src/constants/achievements.ts";

const prisma = new PrismaClient();

async function seedLessons() {
  for (const l of LESSONS) {
    await prisma.lesson.upsert({
      where: { slug: l.slug },
      update: { title: l.title },
      create: { slug: l.slug, title: l.title },
    });
  }
}

async function seedAchievements() {
  for (const a of ACHIEVEMENTS) {
    const key = a.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    await prisma.achievement.upsert({
      where: { key },
      update: {
        title: a.title,
        description: a.description,
        titleUk: a.titleUk,
        descriptionUk: a.descriptionUk,
      },
      create: {
        key,
        title: a.title,
        description: a.description,
        titleUk: a.titleUk,
        descriptionUk: a.descriptionUk,
      },
    });
  }
}

async function main() {
  await seedLessons();
  await seedAchievements();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
