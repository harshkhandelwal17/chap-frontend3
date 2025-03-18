// import React from "react";
// import { Avatar, Stack, Typography } from "@mui/material";
// import {
//   Face as FaceIcon,
//   AlternateEmail as UserNameIcon,
//   CalendarMonth as CalendarIcon,
// } from "@mui/icons-material";
// import moment from "moment";
// import { transformImage } from "../../lib/features";

// const Profile = ({ user }) => {
//   return (
//     <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
//       <Avatar
//         src={transformImage(user?.avatar?.url)}
//         sx={{
//           width: 200,
//           height: 200,
//           objectFit: "contain",
//           marginBottom: "1rem",
//           border: "5px solid white",
//         }}
//       />
//       <ProfileCard heading={"Bio"} text={user?.bio} />
//       <ProfileCard
//         heading={"Username"}
//         text={user?.username}
//         Icon={<UserNameIcon />}
//       />
//       <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
//       <ProfileCard
//         heading={"Joined"}
//         text={moment(user?.createdAt).fromNow()}
//         Icon={<CalendarIcon />}
//       />
//     </Stack>
//   );
// };

// const ProfileCard = ({ text, Icon, heading }) => (
//   <Stack
//     direction={"row"}
//     alignItems={"center"}
//     spacing={"1rem"}
//     color={"white"}
//     textAlign={"center"}
//   >
//     {Icon && Icon}

//     <Stack>
//       <Typography variant="body1">{text}</Typography>
//       <Typography color={"gray"} variant="caption">
//         {heading}
//       </Typography>
//     </Stack>
//   </Stack>
// );

// export default Profile;
import React from "react";
import { Avatar, Stack, Typography, Box, Paper } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";

const Profile = ({ user }) => {
  return (
    <Stack spacing={3} alignItems="center" sx={{ py: 4 }}>
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 150,
          height: 150,
          objectFit: "cover",
          border: "4px solid #fff",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      />
      <Typography variant="h5" fontWeight="bold" color="white">
        {user?.name}
      </Typography>
      <Typography variant="body1" color="gray">
        {user?.bio || "No bio available"}
      </Typography>

      <Stack spacing={2} width="100%" maxWidth={400}>
        <ProfileCard heading="Username" text={user?.username} Icon={<UserNameIcon />} />
        <ProfileCard heading="Joined" text={moment(user?.createdAt).fromNow()} Icon={<CalendarIcon />} />
      </Stack>
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Paper
    elevation={3}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      p: 2,
      borderRadius: 2,
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      color: "#fff",
      boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
    }}
  >
    <Box sx={{ color: "lightgray" }}>{Icon}</Box>
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography variant="caption" color="gray">
        {heading}
      </Typography>
    </Stack>
  </Paper>
);

export default Profile;
