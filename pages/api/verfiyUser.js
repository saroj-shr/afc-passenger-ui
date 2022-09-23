import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log(req.body);
  const updateUser = await prisma.user.update({
    where: {
      email: req.body.email,
    },
    data: {
      verifiedUser: true,
    },
  });
  res.status(200).json({ name: "John Doe" });
}
