import prisma from "../libs/prismadb";

interface UserParams {
  userId?: string;
}

export default async function getUserById(params: UserParams) {
  try {
    const { userId } = params;
    
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    
    if (!user) return null;
    
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}