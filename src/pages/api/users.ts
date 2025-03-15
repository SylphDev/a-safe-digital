import { NextApiRequest, NextApiResponse } from "next";
import { users } from "src/data/mockUser";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = "0", limit = "10", search = "", premium } = req.query;
  const pageNumber = parseInt(page as string, 10) + 1;
  const limitNumber = parseInt(limit as string, 10);
  const premiumFilter = premium === "true" ? true : premium === "false" ? false : null;
  const searchQuery = (search as string).toLowerCase();
  let filteredUsers = users;
  if (searchQuery) {
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery)
    );
  }
  if (premiumFilter !== null) {
    filteredUsers = filteredUsers.filter((user) => user.premium === premiumFilter);
  }
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / limitNumber);
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  res.status(200).json({
    users: paginatedUsers,
    total: totalUsers,
    page: pageNumber,
    totalPages,
  });
}