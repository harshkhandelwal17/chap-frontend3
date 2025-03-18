import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { transformImage } from "../../lib/features";

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
}) => {
  const { name, _id, avatar } = user;
  const navigate = useNavigate(); // Hook to navigate

  const openChatHandler = () => {
    navigate(`/chat/${_id}`); // Open chat when clicking on user
  };

  return (
    <ListItem
      button
      onClick={openChatHandler} // Clicking on the whole item opens chat
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        {/* Avatar Clicks should also open chat */}
        <Avatar
          src={transformImage(avatar)}
          sx={{ cursor: "pointer" }}
          onClick={openChatHandler}
        />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            cursor: "pointer",
          }}
          onClick={openChatHandler}
        >
          {name}
        </Typography>

        {/* Add/Remove Friend Button - Prevents opening chat */}
        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: isAdded ? "error.dark" : "primary.dark",
            },
          }}
          onClick={(e) => {
            e.stopPropagation(); // Prevents chat opening when clicking the button
            handler(_id);
          }}
          disabled={handlerIsLoading}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
