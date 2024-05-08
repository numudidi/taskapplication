import Link from "next/link";
import { User } from "./taskInterface";
import { useState } from "react";
import { fi } from "date-fns/locale/fi";
import axios, { AxiosResponse } from "axios";
import { axiosConfig } from "@/config/configuration";

const ProfileView = ({
  onClose,
  singleUser,
}: {
  onClose: () => void;
  singleUser: User | undefined;
}) => {
  const [firstName, setFirstName] = useState<string>(
    singleUser ? singleUser.firstName : ""
  );
  const [lastName, setLastName] = useState<string>(
    singleUser ? singleUser.lastName : ""
  );
  const [email, setEmail] = useState<string>(
    singleUser ? singleUser.email : ""
  );

  const updateUser = () => {
    const url = "http://localhost:8080/api/auth/update";
    const parameters = {
      userId: singleUser?.userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    axios
      .post(url, parameters, axiosConfig)
      .then((response: AxiosResponse<any>) => {
        alert("user updated successfully...");
        window.location.reload();
      })
      .catch((error: any) => {
        console.error("Error: ", error);
      });
  };

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-1/2 flex flex-col">
        <div className="bg-white">
          <div className="mb-2 flex justify-between text-white h-12 p-5 w-full bg-gray-900 items-center">
            <h4 className="text-center mx-auto font-bold">Profile</h4>
            <button onClick={onClose}>X</button>
          </div>
          <div className="px-8 py-8 w-full">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold">First name</label>
                <input
                  value={firstName}
                  type="text"
                  placeholder="type first name"
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-[#F6F6F6] px-4 py-2 rounded-md w-full"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold">Last name</label>
                <input
                  value={lastName}
                  type="text"
                  placeholder="type last name"
                  className="bg-[#F6F6F6] px-4 py-2 rounded-md w-full"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold">Email</label>
                <input
                  value={email}
                  type="text"
                  placeholder="type email"
                  className="bg-[#F6F6F6] px-4 py-2 rounded-md w-full"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-gray-900 text-white px-4 py-2 rounded-md"
                  onClick={() => updateUser()}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileView;
