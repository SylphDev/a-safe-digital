import { NextApiRequest, NextApiResponse } from "next";
import { users } from "src/data/mockUser";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const ageDistribution = users.reduce((acc: Record<number, number>, user) => {
    acc[user.age] = (acc[user.age] || 0) + 1;
    return acc;
  }, {});

  res.status(200).json(ageDistribution);
}
