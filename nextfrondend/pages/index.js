import Head from "next/head";
import Image from "next/image";
import logo from "./../public/images/support-team.png";
import styles from "../styles/Home.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(./images/landingPage.png)`,
        backgroundSize: "cover",
      }}
    >
      <Head>
        <title>MentorHub</title>
        <meta name="keywords" content="web development, programming" />
      </Head>
      <div>
        <main className={styles.main}>
          <Image
            className="-mt-3.5"
            src={logo}
            alt="Picture of the author"
            width={750}
            height={750}
          />
          <h1 className="font-[Liberation Mono] py-4 text-center text-5xl font-bold">
            Welcome to MentorHub
          </h1>
          <div className="input-button">
            <button
              type="submit"
              className={styles.button}
              style={{ width: "20rem", color: "black", background: "#F6CA90" }}
            >
              <Link href="/login">Get Started</Link>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
