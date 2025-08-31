

export const mapUserToDTO = (user: User): User=> {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image ?? null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    role: user.role,
    banned: user.banned ?? false,
    banReason: user.banReason ?? null,
    banExpires: user.banExpires ?? null,
    userName: user.userName ?? null,
  };
};
