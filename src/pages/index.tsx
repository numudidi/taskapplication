"use client";

import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import { error } from "console";

const Home = () => {
  const [toggleLogin, setToggleLogin] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [regEmail, setRegEmail] = useState<string>("");
  const [regPassword, setRegPassword] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const handleLogin = () => {
    const loginurl = "http://localhost:8080/api/auth/login";
    const loginParameter = {
      email: userEmail,
      password: userPassword,
    };
    axios
      .post(loginurl, loginParameter)
      .then((response: AxiosResponse<any>) => {
        Cookies.set("taskapp", response.data.accessToken);
        window.location.replace("/taskPage");
      })
      .catch((error: any) => {
        console.error("Error: ", error);
      });
  };

  const handleRegister = () => {
    const url = "http://localhost:8080/api/auth/signup";
    const parameter = {
      firstName: firstName,
      lastName: lastName,
      email: regEmail,
      password: regPassword,
    };
    axios
      .post(url, parameter)
      .then((response: AxiosResponse<any>) => {
        alert("Account registered successfully...");
      })
      .catch((error: any) => {
        console.error("Error: ", error);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="absolute top-1/2 -translate-y-1/2 w-2/5">
        {toggleLogin ? (
          <fieldset className={`border rounded-lg p-8`}>
            <div className="pt-4 pb-8">
              <h3 className="font-bold text-xl">Project Management App</h3>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold">Username</label>
                <input
                  type="text"
                  placeholder="type username or email"
                  className="bg-[#F6F6F6] px-4 py-2 rounded-md w-full"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold">Password</label>
                <input
                  type="password"
                  placeholder="Type password"
                  className="bg-[#F6F6F6] px-4 py-2 rounded-md w-full"
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-gray-900 text-white px-4 py-2 rounded-md"
                  onClick={() => handleLogin()}
                >
                  Sign in
                </button>
                <Link
                  href={""}
                  className="text-gray-900 underline"
                  onClick={() => {
                    setToggleLogin(!toggleLogin);
                  }}
                >
                  New account
                </Link>
              </div>
            </div>
          </fieldset>
        ) : (
          <fieldset className="border rounded-lg p-8">
            <div className="pt-4 pb-8">
              <h3 className="font-bold text-xl">Project Management Account</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold">First name</label>
                <input
                  type="text"
                  placeholder="type first name"
                  className="bg-[#F6F6F6] px-4 py-2 rounded-md w-full"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold">Last name</label>
                <input
                  type="text"
                  placeholder="type last name"
                  className="bg-[#F6F6F6] px-4 py-2 rounded-md w-full"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold">Email</label>
                <input
                  type="text"
                  placeholder="type email"
                  className="bg-[#F6F6F6] px-4 py-2 rounded-md w-full"
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold">Password</label>
                <input
                  type="password"
                  placeholder="Type password"
                  className="bg-[#F6F6F6] px-4 py-2 rounded-md w-full"
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between col-span-full">
                <button
                  className="bg-gray-900 text-white px-4 py-2 rounded-md"
                  onClick={() => handleRegister()}
                >
                  Sign Up
                </button>
                <Link
                  href={""}
                  className="text-gray-900 underline"
                  onClick={() => {
                    setToggleLogin(!toggleLogin);
                  }}
                >
                  Back
                </Link>
              </div>
            </div>
          </fieldset>
        )}
      </div>
    </main>
  );
};
export default Home;
