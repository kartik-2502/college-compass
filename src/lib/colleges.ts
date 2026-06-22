import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import type { CollegeSearchParams } from "@/lib/validations";

function getOrderBy(sort: CollegeSearchParams["sort"]): Prisma.CollegeOrderByWithRelationInput {
  switch (sort) {
    case "fees_asc":
      return { feesPerYear: "asc" };
    case "fees_desc":
      return { feesPerYear: "desc" };
    case "name":
      return { name: "asc" };
    case "rating":
    default:
      return { rating: "desc" };
  }
}

export async function searchColleges(params: CollegeSearchParams) {
  const { q, state, type, minFees, maxFees, minRating, sort, page, limit } = params;
  const skip = (page - 1) * limit;

  const where: Prisma.CollegeWhereInput = {
    AND: [
      q
        ? {
            OR: [
              { name: { contains: q } },
              { city: { contains: q } },
              { state: { contains: q } },
            ],
          }
        : {},
      state ? { state } : {},
      type ? { type } : {},
      minFees !== undefined ? { feesPerYear: { gte: minFees } } : {},
      maxFees !== undefined ? { feesPerYear: { lte: maxFees } } : {},
      minRating !== undefined ? { rating: { gte: minRating } } : {},
    ],
  };

  const [colleges, total, states, types] = await Promise.all([
    prisma.college.findMany({
      where,
      orderBy: getOrderBy(sort),
      skip,
      take: limit,
      select: {
        id: true,
        slug: true,
        name: true,
        city: true,
        state: true,
        type: true,
        feesPerYear: true,
        rating: true,
        placements: {
          orderBy: { year: "desc" },
          take: 1,
          select: {
            avgPackage: true,
            placementRate: true,
          },
        },
      },
    }),
    prisma.college.count({ where }),
    prisma.college.findMany({
      distinct: ["state"],
      select: { state: true },
      orderBy: { state: "asc" },
    }),
    prisma.college.findMany({
      distinct: ["type"],
      select: { type: true },
      orderBy: { type: "asc" },
    }),
  ]);

  return {
    colleges,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    },
    filters: {
      states: states.map((s) => s.state),
      types: types.map((t) => t.type),
    },
  };
}

export async function getCollegeBySlug(slug: string) {
  return prisma.college.findUnique({
    where: { slug },
    include: {
      courses: { orderBy: { name: "asc" } },
      placements: { orderBy: { year: "desc" } },
      reviews: { orderBy: { createdAt: "desc" } },
    },
  });
}

export async function getCollegeSuggestions(query: string, limit = 6) {
  const q = query.trim();
  if (!q) return [];

  return prisma.college.findMany({
    where: {
      OR: [
        { name: { contains: q } },
        { city: { contains: q } },
        { state: { contains: q } },
        { type: { contains: q } },
      ],
    },
    orderBy: [{ rating: "desc" }, { name: "asc" }],
    take: limit,
    select: {
      id: true,
      slug: true,
      name: true,
      city: true,
      state: true,
      type: true,
      rating: true,
    },
  });
}

export async function getCollegesByIds(ids: string[]) {
  const colleges = await prisma.college.findMany({
    where: { id: { in: ids } },
    include: {
      placements: { orderBy: { year: "desc" }, take: 1 },
      courses: { take: 5, orderBy: { name: "asc" } },
      reviews: { take: 3, orderBy: { createdAt: "desc" } },
    },
  });

  return ids
    .map((id) => colleges.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);
}

export async function getSavedColleges(userId: string) {
  return prisma.savedCollege.findMany({
    where: { userId },
    include: {
      college: {
        select: {
          id: true,
          slug: true,
          name: true,
          city: true,
          state: true,
          type: true,
          feesPerYear: true,
          rating: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getSavedComparisons(userId: string) {
  const comparisons = await prisma.savedComparison.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const allIds = [...new Set(comparisons.flatMap((c) => JSON.parse(c.collegeIds) as string[]))];
  const colleges = await prisma.college.findMany({
    where: { id: { in: allIds } },
    select: { id: true, slug: true, name: true },
  });

  return comparisons.map((comparison) => ({
    ...comparison,
    colleges: (JSON.parse(comparison.collegeIds) as string[])
      .map((id) => colleges.find((c) => c.id === id))
      .filter(Boolean),
  }));
}
