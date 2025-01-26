import { prisma } from "@/lib/prisma"; 

export const userCreate = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
}: {
  email: string;
  first_name?: string;
  last_name?: string;
  profile_image_url?: string;
  user_id: string;
}) => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        first_name,
        last_name,
        profile_image_url,
        user_id, 
      },
    });

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
