import React from "react";
import { Box, Image, Avatar, Spinner } from "@chakra-ui/react";
import { getAvatarPathById } from "@/avatars/avatarsList";

interface ProfilePictureProps {
  avatarLoading: boolean;
  avatarId?: number;
}

const ProfilePicture: React.FC<ProfilePictureProps> = React.memo(({ avatarLoading, avatarId }) => {
  return (
    <Box
      boxSize={130}
      borderRadius="full"
      overflow="hidden"
      bg="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {avatarLoading ? (
        <Spinner size="xl" />
      ) : avatarId !== undefined ? (
        <Image src={getAvatarPathById(avatarId)} boxSize={110} />
      ) : (
        <Avatar size="2xl" />
      )}
    </Box>
  );
});

ProfilePicture.displayName = "ProfilePicture";

export default ProfilePicture;
