import useLogoutMutation from "@/hooks/global/logout/useLogoutMutation";

const AdminHome = () => {

  const { handleLogout } = useLogoutMutation();

  return (
    <div>
      <div>Admin</div>
      <div onClick={() => handleLogout()}>logout</div>
    </div>
  );
}

export default AdminHome;
