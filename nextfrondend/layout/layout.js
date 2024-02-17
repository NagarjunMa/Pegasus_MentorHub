import Image from "next/image";
import backgroundImage from "./../public/images/bg-login.png";

export default function Layout({ children }) {
  return (
    <div
      className="flex h-screen bg-[#F5F2EC]"
      style={{
        backgroundImage: `url(./images/loginPage.png)`,
        backgroundSize: "cover",
      }}
    >
      <div className="h-5/7 m-auto grid w-1/3 rounded-md bg-[#ffffff] lg:grid-cols-1">
        {/* <div className="right flex flex-col justify-evenly">
                    <Image width = "460" height="500" src={'/assets/mentorship.png'} alt="" />
                </div> */}
        <div className="right flex flex-col justify-evenly ">
          <div className="py-10 text-center">{children}</div>
        </div>
      </div>
    </div>
  );
}
