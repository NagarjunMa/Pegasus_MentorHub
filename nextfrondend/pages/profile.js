import LayoutProfile from "./../layout/layout_profile.js";
import About from "./../components/About.js";
import Layout from "../layout/layout.js";

export default function Profile() {
  // const currentState = useSelector((state) => state);

  return (
    <LayoutProfile>
      <div className="title">
        <h1
          className="text-white-800 font-Helvetica pb-2 text-3xl font-bold"
          style={{ color: "#000000" }}
        >
          Profile Registration
        </h1>
        <div className="pt-1 pb-10" style={{ color: "#000000" }}>
          <p>Hey, Enter your details to set up</p>
          <p>to your account</p>
        </div>
        {/* <p className="w-3/4 mx-auto text-gray-400">Ipsum lorem</p> */}
      </div>
      <About />
    </LayoutProfile>
  );
}

// export default Profile
