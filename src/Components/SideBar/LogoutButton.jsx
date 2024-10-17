import { BiLogOut } from "react-icons/bi";
import useLogout from "../../Hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto flex justify-center">
      {!loading ? (
        <div className="flex flex-col gap-4 items-center sm:gap-6">
          <button
            type="submit"
            className="btn btn-circle bg-sky-500 text-white"
          >
            <BiLogOut
              className="w-5 h-5 sm:w-6 sm:h-6 outline-none"
              onClick={logout}
            />
          </button>
        </div>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
