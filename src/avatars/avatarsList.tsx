export type Avatar = {
    id: number;
    path: string;
};

export const avatars: Avatar[] = [
    { id: 1, path: "/images/avatar-alien.png" },
    { id: 2, path: "/images/avatar-cowboy.png" },
    { id: 3, path: "/images/avatar-dolphin.png" },
    { id: 4, path: "/images/avatar-dino.png" },
];

export const getAvatarPathById = (id: number): string | undefined => {
    const avatar = avatars.find((avatar) => avatar.id === id);
    return avatar ? avatar.path : undefined;
  };