import useLogoutMutation from "@/hooks/global/logout/useLogoutMutation";

function OtherUserHome({ type }: { type: string }) {
  // logout mutations
  const { handleLogout } = useLogoutMutation();

  return (
    <div>
      <div>{type}</div>
      <div onClick={() => handleLogout()}>logout</div>
    </div>
  );
}

export default OtherUserHome;
