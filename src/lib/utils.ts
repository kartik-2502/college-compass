export function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L/yr`;
  }
  return `₹${amount.toLocaleString("en-IN")}/yr`;
}

export function formatPackage(lpa: number): string {
  if (lpa >= 100) {
    return `₹${(lpa / 100).toFixed(1)} Cr`;
  }
  return `₹${lpa.toFixed(1)} LPA`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function parseRecruiters(json: string): string[] {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function buildPageUrl(
  basePath: string,
  params: Record<string, string | number | undefined | null>,
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  }
  const query = search.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export const COLLEGE_TYPES = ["IIT", "NIT", "IIIT", "Private", "Government", "Central University", "Research Institute"] as const;

export const SORT_OPTIONS = [
  { value: "rating", label: "Highest Rated" },
  { value: "fees_asc", label: "Fees: Low to High" },
  { value: "fees_desc", label: "Fees: High to Low" },
  { value: "name", label: "Name (A-Z)" },
] as const;
