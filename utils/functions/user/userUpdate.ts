import { prisma } from "@/lib/prisma"; 

export const userUpdate = async ({
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
    const updatedUser = await prisma.user.update({
      where: { user_id }, // Matching the Clerk user ID
      data: {
        email,
        first_name,
        last_name,
        profile_image_url,
      },
    });

    return updatedUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
