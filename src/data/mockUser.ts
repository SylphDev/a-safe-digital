export type UserData = {
  id: number;
  name: string;
  email: string;
  age: number;
  country: string;
  premium: boolean;
};

export const users: UserData[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  age: Math.floor(Math.random() * 60) + 18,
  country: ["USA", "Canada", "UK", "Germany", "France"][
    Math.floor(Math.random() * 5)
  ],
  premium: Math.random() < 0.5,
}));