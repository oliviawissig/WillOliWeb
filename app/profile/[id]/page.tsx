import React from "react";
import ProfileData from "./ProfileData";

const UserProfilePage = ({ params }: { params: { id: string } }) => {
  return <ProfileData id={params.id}/>;
};

export default UserProfilePage;
