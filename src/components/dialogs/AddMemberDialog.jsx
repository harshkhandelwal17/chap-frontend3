// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   Skeleton,
//   Stack,
//   Typography,
// } from "@mui/material";
// import React, { useState } from "react";
// import { sampleUsers } from "../../constants/sampleData";
// import UserItem from "../shared/UserItem";
// import {
//   useAddGroupMembersMutation,
//   useAvailableFriendsQuery,
// } from "../../redux/api/api";
// import { useAsyncMutation, useErrors } from "../../hooks/hook";
// import { useDispatch, useSelector } from "react-redux";
// import { setIsAddMember } from "../../redux/reducers/misc";
// const AddMemberDialog = ({ chatId }) => {
//   const dispatch = useDispatch();

//   const { isAddMember } = useSelector((state) => state.misc);

//   const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

//   const [addMembers, isLoadingAddMembers] = useAsyncMutation(
//     useAddGroupMembersMutation
//   );

//   const [selectedMembers, setSelectedMembers] = useState([]);

//   const selectMemberHandler = (id) => {
//     setSelectedMembers((prev) =>
//       prev.includes(id)
//         ? prev.filter((currElement) => currElement !== id)
//         : [...prev, id]
//     );
//   };

//   const closeHandler = () => {
//     dispatch(setIsAddMember(false));
//   };
//   const addMemberSubmitHandler = () => {
//     addMembers("Adding Members...", { members: selectedMembers, chatId });
//     closeHandler();
//   };

//   useErrors([{ isError, error }]);
//   return (
//     <Dialog open={isAddMember} onClose={closeHandler}>
//       <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
//         <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

//         <Stack spacing={"1rem"}>
//           {isLoading ? (
//             <Skeleton />
//           ) : data?.friends?.length > 0 ? (
//             data?.friends?.map((i) => (
//               <UserItem
//                 key={i._id}
//                 user={i}
//                 handler={selectMemberHandler}
//                 isAdded={selectedMembers.includes(i._id)}
//               />
//             ))
//           ) : (
//             <Typography textAlign={"center"}>No Friends</Typography>
//           )}
//         </Stack>

//         <Stack
//           direction={"row"}
//           alignItems={"center"}
//           justifyContent={"space-evenly"}
//         >
//           <Button color="error" onClick={closeHandler}>
//             Cancel
//           </Button>
//           <Button
//             onClick={addMemberSubmitHandler}
//             variant="contained"
//             disabled={isLoadingAddMembers}
//           >
//             Submit Changes
//           </Button>
//         </Stack>
//       </Stack>
//     </Dialog>
//   );
// };

// export default AddMemberDialog;
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserItem from "../shared/UserItem";
import {
  useAddGroupMembersMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsAddMember } from "../../redux/reducers/misc";

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);
  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);
  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  const addMemberSubmitHandler = () => {
    addMembers("Adding Members...", { members: selectedMembers, chatId });
    closeHandler();
  };

  useErrors([{ isError, error }]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler} fullWidth maxWidth="xs">
      <Stack p={3} spacing={3}>
        <DialogTitle textAlign="center" sx={{ fontWeight: 600 }}>
          Add Members
        </DialogTitle>

        <Divider />

        <Stack spacing={2} sx={{ maxHeight: "300px", overflowY: "auto" }}>
          {isLoading ? (
            <Skeleton variant="rectangular" height={40} />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign="center" color="text.secondary">
              No Friends Available
            </Typography>
          )}
        </Stack>

        <Divider />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            color="error"
            variant="outlined"
            onClick={closeHandler}
            sx={{ width: "45%" }}
          >
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMembers}
            sx={{ width: "45%" }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;