// import {ProfilePicture} from "./ProfilePicture";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import ProfilePicture from "./ProfilePicture";
import { Avatar } from "@mui/material";
import Select from "react-select";
import { MultiSelect } from "react-multi-select-component";
import { updateUserAsync } from "./../redux/userSlice";
import styles from "../styles/Forms.module.scss";
import { useRouter } from "next/router";

export default function About() {
  // const [user, setUser] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [interests, setInterests] = useState([]);
  const [bio, setBio] = useState("");
  const [interestFlag, setInterestFlag] = useState(false);
  const currentState = useSelector((state) => state.users);

  const options = [
    { label: "Software Development", value: "Software Development" },
    { label: "Front-end Development", value: "Front-end Development" },
    { label: "Back-end Development", value: "Back-end Development" },
    { label: "Full stack Development", value: "Full stack Development" },
    { label: "Network", value: "Network" },
    { label: "Embedded Systems", value: "Embedded Systems" },
    { label: "Data Analytics", value: "Data Analytics" },
    { label: "Engineering Management", value: "Engineering Management" },
    { label: "Cyber Security", value: "Cyber Security" },
  ];

  useEffect(() => {
    // handle state changes here
    console.log("currentState: ", currentState);
    if (currentState && currentState.addUserResponse) {
      setInterestFlag(true);
      setFirstName(currentState.addUserResponse.userData.firstName);
      setLastName(currentState.addUserResponse.userData.lastName);
    }
  }, [currentState]);

  const handleMultiSelectChange = (event) => {
    console.log("event.target.value: ", event.target.value);
    setInterests(event.target.value);
  };

  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("firstName: ", firstName);
  //   console.log("lastName: ", lastName);
  //   console.log("interests: ", interests);
  //   console.log("image: ", image);
  //   console.log("bio: ", bio);

  //   const intrestArray = interests.map((interest) => interest.value);

  //   let user = {
  //     firstName: firstName,
  //     lastName: lastName,
  //     interests: intrestArray,
  //     about: bio,
  //     profilePic: image,
  //   };
  //   if (user) {
  //     console.log("user: ", user);
  //     console.log("currentState: ", currentState);
  //     dispatch(
  //       updateUserAsync({
  //         data: user,
  //         accessToken: currentState.addUserResponse.accessToken,
  //       })
  //     );
  //   }
  //   router.push("/selection");
  // };

  // const handleChange = (event) => {
  // 	const name = event.target.name;
  // 	const value = event.target.value;
  // 	setUser(values => ({ ...values, [name]: value }))
  // }

  // const fileToDataUri = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       resolve(event.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   });

  // const handleClick = (e) => {

  //   let user = {
  //     firstName: firstName,
  //     lastName: lastName,
  //     interests: intrestArray,
  //     about: bio,
  //     profilePic: image,
  //   };
  //   if (user) {
  //     console.log("user: ", user);
  //     console.log("currentState: ", currentState);
  //     dispatch(
  //       updateUserAsync({
  //         data: user,
  //         accessToken: currentState.addUserResponse.accessToken,
  //       })
  //     );
  //   }
  //   router.push("/selection");
  // };

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;

  //   setUser((values) => ({ ...values, [name]: value }));
  // };

  // const handleClick = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.files[0];

  //   if (!value) {
  //     setImage("");
  //     return;
  //   }

  //   fileToDataUri(value).then((dataUri) => {
  //     setImage(dataUri);
  //   });
  // };

  const onSubmit = (event) => {
		event.preventDefault();
        // console.log('firstName: ', firstName);
        // console.log('lastName: ', lastName);
        // console.log('interests: ', interests);
        // console.log('image: ', image);
        // console.log('bio: ', bio);

        const intrestArray = interests.map((interest) => interest.value);

        let user = {
            firstName: firstName,
            lastName: lastName,
            interests: intrestArray,
            about: bio,
            profilePic: image
        }
		if (user) {
            // console.log('user: ', user);
            // console.log('currentState: ', currentState);
			dispatch(
				updateUserAsync({
                    data: user,
                    accessToken: currentState.addUserResponse.accessToken
				})
			);
		}
        router.push('/selection');

	};

    const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setUser(values => ({ ...values, [name]: value }))
	}

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
        resolve(event.target.result)
        };
        reader.readAsDataURL(file);
    })

    const handleClick = (e) => {
        const name = e.target.name;
        const value = e.target.files[0];

        if(!value) {
            setImage('');
            return;
        }
      
        fileToDataUri(value).then(dataUri => {setImage(dataUri)})
    };


  return (
    <div className="bg-black-800 p-10 text-lg text-black">
      <header className="flex w-full flex-wrap">
        <div className="w-50 align-center relative mx-auto flex  flex-col justify-center">
          <h1></h1>
          <div className="mt-4 text-center">
            <label htmlFor="profilePhoto">
              <input
                accept="image/*"
                id="profilePhoto"
                name="profilePicture"
                type="file"
                style={{ display: "none" }}
                onChange={handleClick}
              />
              <Avatar
                src={image}
                className="align-center mx-auto -mt-20 flex justify-center"
                sx={{ width: 200, height: 200, cursor: "pointer" }}
              />
            </label>
            <h5 className=" mt-2 text-xl font-medium leading-tight">{`${firstName} ${lastName}`}</h5>
            <p className=" text-base text-gray-500">
              Graduate Student at Northeastern University
            </p>
          </div>
          <form className="w-full max-w-lg">
            <div className=" mt-5 flex flex-row">
              <div className="w-full px-3 md:mb-0 md:w-1/2">
                <label
                  className="text-white-700 block text-lg font-bold uppercase tracking-wide"
                  htmlFor="grid-first-name"
                >
                  First Name
                </label>
                <input
                  className="mb-1 block w-full appearance-none rounded border  bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                  id="grid-first-name"
                  type="text"
                  name="firstName"
                  value={firstName}
                  // onChange={(event) => setTodo(event.target.value)}
                  onChange={(event) => setFirstName(event.target.value)}
                />
                {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
              </div>
              <div className="w-full px-3 md:w-1/2">
                <label
                  className="text-white-700 block text-lg font-bold uppercase tracking-wide"
                  htmlFor="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="grid-last-name"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="w-full px-3">
                <label
                  className="text-white-700 mb-2 block text-lg font-bold uppercase tracking-wide"
                  htmlFor="grid-about"
                >
                  About
                </label>
                <textarea
                  className=" block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  rows="5"
                  cols="40"
                  id="grid-about"
                  type="text"
                  name="About"
                  value={bio}
                  required
                  onChange={(event) => setBio(event.target.value)}
                ></textarea>
                {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3">
                <label
                  className="text-white-700 block text-lg font-bold uppercase tracking-wide"
                  htmlFor="grid-interests"
                >
                  Interests
                </label>
                <div className="relative">
                  {/* <select multiple className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-interests"
                                        name='Interests' 
                                        value={interests}
                                        required
                                        // onChange={(event) => setTodo(event.target.value)}
                                        // onChange={handleMultiSelectChange}
                                        >
                                        <option>Software Development</option>
                                        <option>Front-end Development</option>
                                        <option>Back-end Development</option>
                                        <option>Full stack Development</option>
                                        <option>Network</option>
                                        <option>Embedded Systems</option>
                                        <option>Data Analytics</option>
                                        <option>Engineering Management</option>
                                        <option>Cyber Security</option>
                                    </select> */}
                  <Select
                    options={options}
                    name={interests}
                    onChange={setInterests}
                    isMulti
                  />
                  {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div> */}
                  <div className="mt-5">
                    <button
                      onClick={onSubmit}
                      style={{ color: "black", background: "#F6CA90" }}
                      type="button"
                      className={styles.button}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
}
