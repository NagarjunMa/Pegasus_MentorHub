import LayoutSelection from "../layout/LayoutSelection.js";
import Head from "next/head";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Input, Button } from "antd";
import styles from "../styles/Home.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  getMentorSuggestionsAsync,
  patchMentorsFollowedAsync,
  getMentorsByFilterAsync,
} from "./../redux/userSlice";
const { Search } = Input;
import { useRouter } from "next/router";
import Select from "react-select";
import Layout from "../layout/layout";
import { MdSync } from "react-icons/md";

export default function Interest({ posts }) {
  const router = useRouter();
  const [subscribe, setSubscribe] = useState([]);
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.users);
  const [flag, setFlag] = useState(false);
  const [filter, setFilter] = useState("");
  const [interest, setInterest] = useState("");
  const [rat, setRat] = useState(0);
  const [search, setSearch] = useState({});

  const subscribeBtnOperation = (mentorId) => {
    setSubscribe((prevElements) => [...prevElements, mentorId]);
  };

  useEffect(() => {
    console.log("currentState in selection page: ", currentState);
    dispatch(getMentorSuggestionsAsync({ currentState })).then(() => {});
  }, [dispatch]);

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  const handleNext = () => {
    console.log("subscribe: ", subscribe);
    console.log(
      "currentState in selection page before dispatching next: ",
      currentState
    );
    dispatch(
      patchMentorsFollowedAsync({
        mentorIds: subscribe,
        accessToken: currentState.addUserResponse.accessToken,
      })
    ).then(() => {
      console.log(
        "currentState in selection page after dispatching next:: ",
        currentState
      );
      router.push("/menteeWall");
    });
  };

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   if (value != '' || value != 0 || value != null) {
  //     setSearch((values) => ({ ...values, [name]: value }));
  //   }
  // }

  const onSearch = async (event) => {
    event.preventDefault();
    console.log("Submit clicked");
    const params = {};
    if (filter) {
      params.name = filter;
    }
    if (interest) {
      params.interest = interest;
    }
    if (rat) {
      params.rating = rat;
    }
    dispatch(
      getMentorsByFilterAsync({
        params: params,
        accessToken: currentState.addUserResponse.accessToken,
      })
    ).then(() => {
      setFlag(true);
    });

    // event.preventDefault();
    // if(post){

    // }
  };

  const options = [
    {
      label: "--Select--",
      value: "",
    },
    {
      label: "Software Development",
      value: "Software Development",
    },
    {
      label: "Front-end Development",
      value: "Front-end Development",
    },
    {
      label: "Back-end Development",
      value: "Back-end Development",
    },
    {
      label: "Full stack Development",
      value: "Full stack Development",
    },
    {
      label: "Network",
      value: "Network",
    },
    {
      label: "Embedded Systems",
      value: "Embedded Systems",
    },
    {
      label: "Data Analytics",
      value: "Data Analytics",
    },
    {
      label: "Engineering Management",
      value: "Engineering Management",
    },
    {
      label: "Cyber Security",
      value: "Cyber Security",
    },
  ];

  const ratings = [
    {
      label: "--Select--",
      value: 0,
    },
    {
      label: "Ratings > 1",
      value: 1,
    },
    {
      label: "Ratings > 2",
      value: 2,
    },
    {
      label: "Ratings > 3",
      value: 3,
    },
    {
      label: "Ratings > 4",
      value: 4,
    },
    {
      label: "Ratings 5",
      value: 5,
    },
  ];

  return (
    <LayoutSelection>
      <Head>
        <title>Selection Page</title>
      </Head>
      <main className="container mx-auto py-20 px-8">
        <div className="title">
          <h1 className="text-white-800 mb-5 py-2 text-center text-4xl font-bold">
            Mentor Selection
          </h1>
          {/* <p className="w-3/4 mx-auto text-gray-400">Ipsum lorem</p> */}
        </div>
        <div className="align-center mb-4 flex flex-row justify-center">
          <Input
            className="align-center mx-auto flex justify-center"
            placeholder="Search Mentors"
            name="name"
            // value={search.name}
            onChange={(e) => setFilter(e.target.value)}
            // onChange={handleChange}
            size="large"
            style={{
              width: 400,
            }}
          ></Input>
          <Select
            className="align-left mx-auto w-60 text-black"
            classNamePrefix="select"
            defaultValue={options[0]}
            isDisabled={isDisabled}
            isLoading={isLoading}
            isClearable={isClearable}
            onChange={(e) => {
              const target = e;
              if (target) {
                setInterest(target.value);
              }
            }}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name="Interests"
            options={options}
          />
          <Select
            className="ml-12 w-60 text-black"
            classNamePrefix="select"
            defaultValue={"Select Ratings"}
            isDisabled={isDisabled}
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            onChange={(e) => {
              const target = e;
              if (target) {
                setRat(target.value);
              }
            }}
            name="Ratings"
            options={ratings}
          />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={onSearch}
          icon={<SearchOutlined />}
          className="align-center mx-auto mb-10 flex justify-center"
        >
          Search
        </Button>
        {flag ? (
          <div className="grid grid-cols-3 gap-4">
            {currentState.addUserResponse &&
              currentState.addUserResponse.filteredMentors &&
              currentState.addUserResponse.filteredMentors.map((mentor) => (
                <div
                  className=" rounded-lg bg-[#F5F2EC] text-black shadow-xl"
                  key={mentor._id}
                  id={mentor._id}
                >
                  <img
                    className="mx-auto mt-4 w-3/12 rounded-t-lg object-scale-down"
                    src={mentor.profilePic}
                    alt=""
                  />
                  <div className="p-3 text-center">
                    <h3 className="text-l text-white-700 mb-3 justify-center font-bold">
                      {`${mentor.firstName} ${mentor.lastName}`}
                    </h3>
                    <p className="text-white-600 text-base font-normal">
                      {mentor.about}
                    </p>

                    <button
                      className={styles.button}
                      style={{ color: "black" }}
                      onClick={() => {
                        setFlag(false);
                        const element = document.getElementById(mentor._id);
                        element.style.display = "none";
                        return subscribeBtnOperation(mentor._id);
                      }}
                    >
                      Follow
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {currentState.addUserResponse &&
              currentState.addUserResponse.allMentorData &&
              currentState.addUserResponse.allMentorData.map((mentor) => (
                <div
                  className=" rounded-lg bg-[#F5F2EC] text-black shadow-xl"
                  key={mentor._id}
                  id={mentor._id}
                >
                  <img
                    className="mx-auto mt-4 w-3/12 rounded-t-lg object-scale-down"
                    src={mentor.profilePic}
                    alt=""
                  />
                  <div className="p-3 text-center">
                    <h3 className="text-l text-white-700 mb-3 justify-center font-bold">
                      {`${mentor.firstName} ${mentor.lastName}`}
                    </h3>
                    <p className="text-white-600 text-base font-normal">
                      {mentor.about}
                    </p>

                    <button
                      className={styles.button}
                      style={{ color: "black" }}
                      onClick={() => {
                        setFlag(false);
                        const element = document.getElementById(mentor._id);
                        element.style.display = "none";
                        return subscribeBtnOperation(mentor._id);
                      }}
                    >
                      Follow
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
        <button className={styles.button} onClick={handleNext}>
          {/* <Link href="/menteeWall">Next</Link> */}
          Next
        </button>
      </main>
    </LayoutSelection>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    `https:\\jsonplaceholder.typicode.com/posts?_limit=6`
  );
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};
