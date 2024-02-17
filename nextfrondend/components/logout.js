import Link from "next/link";
import { MdLogout } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import { userLogoutAsync } from "../redux/userSlice";
 
export default function Logout() {
  const router = useRouter();
  const currentState = useSelector((state) => (state.users));
  const dispatch = useDispatch();

  const onSubmit = async(event) => {
    event.preventDefault();
    const accessToken = currentState.addUserResponse.accessToken;
    console.log('accessToken: ', accessToken);
    dispatch(
      userLogoutAsync({accessToken})
    ).then(() => {
      router.push('/login');
    });
  }

  return (
    <div className="my-4">
      <div className="border-white-300 group m-auto flex w-full cursor-pointer items-center justify-start gap-4 rounded-md p-3 shadow-xl hover:bg-[#FF5722]">
        <MdLogout className="text-white-600 text-2xl group-hover:text-white" />
        <h3 className="text-white-800 text-base font-semibold group-hover:text-white">
          <button onClick={onSubmit}>Logout</button>
        </h3>
      </div>
    </div>
  );
}
