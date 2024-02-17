import React from "react";
import Head from "next/head";
import Layout from "./../layout/layout";
import Link from "next/link";
import styles from "../styles/Forms.module.scss";
import backgroundImage from "./../public/images/bg-login.png";
import Image from "next/image";
import { MdVisibility } from "react-icons/md";
import { BsGithub } from "react-icons/md";
import { HiOutlineLockClosed } from "react-icons/hi";
import { useState, useRef, useEffect } from "react";
import { loginUserAsync } from "./../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { icons } from "react-icons/lib";
import { HttpStatusCode } from "axios";

export default function Login() {
  const router = useRouter();
  const userRef = useRef();
  const errorRef = useRef();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const currentState = useSelector((state) => state.users);
  useEffect(() => {
    // handle state changes here
    if (
      currentState &&
      currentState.addUserResponse &&
      currentState.addUserResponse.status == 200 &&
      currentState.addUserResponse.userData.role == "MENTEE"
    ) {
      router.push("/menteeWall");
    } else if (
      currentState &&
      currentState.addUserResponse &&
      currentState.addUserResponse.status == 200 &&
      currentState.addUserResponse.userData.role == "MENTOR"
    ) {
      router.push("/mentorWall");
    } else if (
      currentState &&
      currentState.errorCode &&
      currentState.errorCode == 403
    ) {
      alert("Invalid Credentials");
    }
  }, [currentState]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (user) {
      dispatch(
        loginUserAsync({
          ...user,
        })
      );
    }
  };
  // console.log("The currentState is" + JSON.stringify(currentState))
  // console.log("The status from currentState is" + currentState.addTokens.status)

  // if (currentState.addTokens.status == 200 && currentState.addTokens.userData.role == "MENTOR") {
  //     router.push('/')
  // }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  };

  return (
    <>
      <Layout>
        <Head>
          <title>Login</title>
        </Head>
        <section className="mx-auto flex w-3/4 flex-col gap-3">
          <div className="title">
            <h1
              className="text-white-800 font-Helvetica pt-4 pb-2 text-3xl font-bold"
              style={{ color: "#000000" }}
            >
              Member Login
            </h1>
            <div className="pt-1 pb-4" style={{ color: "#000000" }}>
              <p>Hey, Enter your details to get sign in</p>
              <p>to your account</p>
            </div>
            {/* <p className="w-3/4 mx-auto text-gray-400">Ipsum lorem</p> */}
          </div>
          {/* Login Form */}
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-6 bg-transparent"
          >
            <div className={styles.input_group}>
              <input
                type="email"
                name="email"
                value={user.email}
                placeholder="Email"
                className={styles.input_text}
                required
                onChange={handleChange}
              />
            </div>
            <div className={styles.input_group}>
              <input
                type={`${show ? "text" : "password"}`}
                name="password"
                value={user.password}
                placeholder="Password"
                className={styles.input_text}
                required
                onChange={handleChange}
              />
              <div className="align-center h-100 flex justify-center pr-3">
                <MdVisibility
                  className="h-10 w-10 justify-center pt-4 text-gray-400"
                  onClick={() => setShow(!show)}
                />
              </div>
              {/* <MdVisibility className="text-black-600 text-2xl group-hover:text-white" /> */}
              {/* <Image
              width="60"
              height="5"
              src={"/assets/showPass3.png"}
              alt="Show Password"
              onClick={() => setShow(!show)}
            ></Image> */}
              {/* <FontAwesomeIcon icon="fal fa-eye" />
               */}
              {/* <FontAwesomeIcon icon="fas fa-eye" /> */}
            </div>
            <p className="text-left" style={{ color: "#000000" }}>
              {" "}
              Having trouble signing in?
            </p>

            {/* Login Button */}
            <div className="input-button">
              <button
                type="submit"
                className={styles.button}
                style={{ color: "black", background: "#F6CA90" }}
              >
                Login
              </button>
            </div>

            <div className="input-button">
              <button
                type="button"
                className={styles.button_custom}
                style={{ color: "black" }}
              >
                <Image
                  src={"/assets/google.svg"}
                  className="items-center"
                  width="20"
                  height="20"
                ></Image>
                Sign in with Google
              </button>
            </div>

            <div className="input-button">
              <button
                type="button"
                className={styles.button_custom}
                style={{ color: "black" }}
              >
                {/* <Image
                src={"/assets/GitHub-Mark-Light-32px.png"}
                className="items-center"
                width="20"
                height="20"
              ></Image> */}
                Sign in with GitHub
              </button>
            </div>
          </form>

          {/* Register */}
          <p className="text-gray-40 text-center" style={{ color: "black" }}>
            Don't have an account yet?{" "}
            <Link legacyBehavior href={"/register"}>
              <a
                className="font-bold font-bold text-pink-700"
                style={{ color: "#000000" }}
              >
                Sign Up
              </a>
            </Link>
          </p>
        </section>
      </Layout>
    </>
  );
}
