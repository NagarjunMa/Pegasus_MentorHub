import React from "react";
import { ChakraProvider, Button, ButtonGroup } from "@chakra-ui/react";
import Head from "next/head";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Forms.module.scss";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsGithub } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import axios from "./api/axios";
import { addUserSignUpAsync } from "./../redux/userSlice";
import { useRouter } from "next/router";

export default function Register() {
  const [error, setError] = useState(null);
  const cancelRef = React.useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  const [show, setShow] = useState({ password: false });
  const [user, setUser] = useState({});
  const currentState = useSelector((state) => state.users);

  useEffect(() => {
    // handle state changes here
    if (
      currentState &&
      currentState.addUserResponse &&
      currentState.addUserResponse.status == 201
    ) {
      router.push("/profile");
    } else if (
      currentState &&
      currentState.errorCode &&
      currentState.errorCode == 409
    ) {
      // setError(currentState.errorCode);

      alert("The email already exists!!!");
    }
  }, [currentState]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    console.log("The user obj is " + JSON.stringify(user));
    if (user) {
      dispatch(
        addUserSignUpAsync({
          ...user,
        })
      );
    }
  };

  return (
    <>
      <Layout>
        <Head>
          <title>Register</title>
        </Head>
        <section className="mx-auto flex w-3/4 flex-col gap-5">
          <div className="title">
            <h1
              className="text-white-800 font-Helvetica pt-4 pb-2 text-3xl font-bold"
              style={{ color: "#000000" }}
            >
              User Register
            </h1>
            <div className="pt-1 pb-4" style={{ color: "#000000" }}>
              <p>Hey, Get started by providing us</p>
              <p>with few information</p>
            </div>
          </div>
          {/* Login Form */}

          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4 bg-transparent"
          >
            <div className={styles.input_group}>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                placeholder="Your First Name"
                className={styles.input_text}
                required
                onChange={handleChange}
              />
              {/* <UserIcon className="h-20 w-7 text-blue-500"/> */}
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                placeholder="Your Last Name"
                className={styles.input_text}
                required
                onChange={handleChange}
              />
              {/* <UserIcon className="h-20 w-7 text-blue-500"/> */}
            </div>
            <div className={styles.input_group}>
              {/* <input type="text" name="role" placeholder="Role (Mentor/Mentee)" className={styles.input_text}/> */}
              <select
                className={styles.input_select}
                name="role"
                value={user.role}
                placeholder="Role (Mentor/Mentee)"
                required
                onChange={handleChange}
              >
                <option value="" disabled selected hidden>
                  Select any one of the below
                </option>
                <option value="MENTOR">Mentor</option>
                <option value="MENTEE">Mentee</option>
              </select>
            </div>
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
                type={`${show.password ? "text" : "password"}`}
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
                  onClick={() => setShow({ ...show, password: !show.password })}
                />
              </div>
            </div>

            {/* Login Button */}
            <div className="input-button">
              <button
                type="submit"
                onClick={(event) => {
                  onSubmit(event);
                }}
                className={styles.button}
                style={{ color: "black", background: "#F6CA90" }}
              >
                Register
              </button>
            </div>
          </form>

          {/* Register */}
          <p className="text-black-900 text-center" style={{ color: "black" }}>
            Already an user ?{" "}
            <Link legacyBehavior href={"/login"}>
              <a
                className="font-bold text-pink-700"
                style={{ color: "#F6CA90" }}
              >
                Login Page{" "}
              </a>
            </Link>
          </p>
        </section>
      </Layout>
    </>
  );
}
