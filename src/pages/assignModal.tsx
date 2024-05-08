import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { UserResponse } from "./taskInterface";
import { axiosConfig } from "@/config/configuration";

const AssignModal = ({
  onClose,
  taskId,
}: {
  onClose: () => void;
  taskId: string;
}) => {
  const [allUsers, setAllusers] = useState<UserResponse>();
  const [userId, setUserId] = useState("");

  console.log("userId");
  console.log(userId);
  console.log(taskId);

  const fecthAllUser = () => {
    const url = "http://localhost:8080/api/auth/all/customers";
    axios
      .get(url, axiosConfig)
      .then((response: AxiosResponse<any>) => {
        setAllusers(response.data);
      })
      .catch((error: any) => {
        console.error("Error: ", error);
      });
  };

  const assignTask = () => {
    const url = `http://localhost:8080/api/task/assign-task/${taskId}/${userId}`;
    const parameters = {};
    axios
      .post(url, parameters, axiosConfig)
      .then((response: AxiosResponse<any>) => {
        alert("Task Assigned successfully...");
        window.location.reload();
      })
      .catch((error: any) => {
        console.error("Error: ", error);
      });
  };

  useEffect(() => {
    fecthAllUser();
  }, []);

  useEffect(() => {
    assignTask();
  }, [userId]);
  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-1/2 flex flex-col">
        <div className="bg-white">
          <div className="mb-2 flex justify-between text-white h-12 p-5 w-full bg-gray-900 items-center">
            <h4 className="text-center mx-auto">Add new Task</h4>
            <button onClick={onClose}>X</button>
          </div>
          <div className="px-8 py-8 w-full">
            <table className="w-full">
              <thead className="bg-blue-50 p-8 text-left">
                <tr className="">
                  <th className="px-3 py-2">#</th>
                  <th className="px-3 py-2">Firstname</th>
                  <th className="px-3 py-2">Lastname</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {allUsers?.data.map((items, index) => (
                  <tr className="whitespace-nowrap border">
                    <td className="px-3 py-1">
                      <span>{index + 1}</span>
                    </td>
                    <td className="px-3 py-1">
                      <span>{items.firstName}</span>
                    </td>
                    <td className="px-3 py-1">
                      <span>{items.lastName}</span>
                    </td>
                    <td className="px-3 py-1">
                      <span>{items.email}</span>
                    </td>
                    <td className="px-3 py-1 text-center">
                      <button
                        onClick={() => {
                          setUserId(items.userId);
                        }}
                        className="bg-gray-900 text-white text-sm rounded-md px-4 py-1"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AssignModal;
