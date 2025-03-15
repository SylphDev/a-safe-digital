import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "src/data/mockUser";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const countryCounts: Record<string, number> = users.reduce((acc, user) => {
    acc[user.country] = (acc[user.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  res.status(200).json(countryCounts);
}
