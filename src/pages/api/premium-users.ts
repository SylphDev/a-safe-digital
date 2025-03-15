import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "src/data/mockUser";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const userCounts = users.reduce(
    (acc, user) => {
      if (user.premium) {
        acc.premium += 1;
      } else {
        acc.free += 1;
      }
      return acc;
    },
    { premium: 0, free: 0 }
  );

  res.status(200).json(userCounts);
}