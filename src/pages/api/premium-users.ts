import type { NextApiRequest, NextApiResponse } from "next";
import { users } from "src/data/mockUser";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  if (!users || users.length === 0) {
    res.status(404).json({ message: "No users found" });
    return;
  }
  try {
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
  } catch (error) {
    res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}
