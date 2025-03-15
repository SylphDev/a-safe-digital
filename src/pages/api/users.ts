import { NextApiRequest, NextApiResponse } from "next";
import { users } from "src/data/mockUser";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = "0", limit = "10" } = req.query;

  const pageNumber = parseInt(page as string, 10) + 1;
  const limitNumber = parseInt(limit as string, 10);

  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;

  const paginatedUsers = users.slice(startIndex, endIndex);

  res.status(200).json({
    users: paginatedUsers,
    total: users.length,
    page: pageNumber,
    totalPages: Math.ceil(users.length / limitNumber),
  });
}