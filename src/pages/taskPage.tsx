import { useEffect, useId, useState } from "react";
import {
  Task,
  TaskResponse,
  TasksValue,
  User,
  UserResponse,
  UserValue,
} from "./taskInterface";
import axios, { AxiosResponse } from "axios";
import { axiosConfig } from "@/config/configuration";
import { useRouter } from "next/router";
import AddTaskModal from "./addModal";
import UpdateTaskModal from "./updateModal";
import { format } from "date-fns";
import AssignModal from "./assignModal";
import Image from "next/image";
import { UserIcon } from "@/assets/icons";
import ProfileView from "./profile";
import ResetPassword from "./resetPassord";

const TaskPage = () => {
  const [allTasks, setAllTasks] = useState<TaskResponse>();
  const [allUsers, setAllusers] = useState<UserResponse>();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssing, setShowAssing] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [singleTask, setSingleTask] = useState<Task>(TasksValue);
  const [taskId, setTaskId] = useState("");
  const [singleUser, setSingleUser] = useState<User>(UserValue);
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const fecthAllData = () => {
    const url = "http://localhost:8080/api/task/fetch/all";
    axios
      .get(url, axiosConfig)
      .then((response: AxiosResponse<any>) => {
        setAllTasks(response.data);
      })
      .catch((error: any) => {
        console.error("Error: ", error);
      });
  };

  const fetchById = (id: string) => {
    const urlById = `http://localhost:8080/api/task/get-task/${id}`;
    axios
      .get(urlById, axiosConfig)
      .then((response: AxiosResponse<any>) => {
        setSingleTask(response.data);
        console.log("response--: ", response.data);
      })
      .catch((error: any) => {
        console.error("Error: ", error);
      });
  };

  const fetchUserById = (userId: string) => {
    const urluserById = `http://localhost:8080/api/auth/get/${userId}`;
    axios
      .get(urluserById, axiosConfig)
      .then((response: AxiosResponse<any>) => {
        setSingleUser(response.data);
        console.log("response--: ", response.data);
      })
      .catch((error: any) => {
        console.error("Error: ", error);
      });
  };

  const deleteById = (id: string) => {
    const deleteUrl = `http://localhost:8080/api/task/delete/${id}`;
    axios
      .get(deleteUrl, axiosConfig)
      .then((response: AxiosResponse<any>) => {
        alert("Deleted successfully");
        window.location.reload();
      })
      .catch((error: any) => {
        console.error("Error: ", error);
      });
  };

  useEffect(() => {
    fecthAllData();
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    router.replace("/");
  };

  console.log(allTasks);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-3/4 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Project Management App</h3>
          <div className="flex items-center gap-5">
            <button
              onClick={() => {
                setShowProfileModal(true);
                setSingleUser(singleUser);
              }}
            >
              <Image src={UserIcon} alt={""} width={20} />
            </button>
            <button onClick={() => setShowReset(true)} className="">
              Reset
            </button>
            <button
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={logout}
            >
              Log out
            </button>
          </div>
        </div>
        <div className="border p-6 my-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="uppercase text-base font-semibold">Task view</h3>
            <button
              className="bg-gray-900 text-white rounded-md px-4 py-2"
              onClick={() => {
                setShowAddModal(true);
              }}
            >
              New Task
            </button>
          </div>
          <div className="p-2">
            <table className="w-full">
              <thead className="bg-gray-900 p-8 text-left">
                <tr className="">
                  <th className="px-3 py-2 text-white">#</th>
                  <th className="px-3 py-2 text-white">Name</th>
                  <th className="px-3 py-2 text-white">Start date</th>
                  <th className="px-3 py-2 text-white">End Date</th>
                  <th className="px-3 py-2 text-white">Project</th>
                  <th className="px-3 py-2 text-white">Priority</th>
                  <th className="px-3 py-2 text-white">Description</th>
                  <th className="px-3 py-2 text-white text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {allTasks?.data.map((items, index) => (
                  <tr className="whitespace-nowrap border" key={index}>
                    <td className="px-3 py-1">
                      <span>{index + 1}</span>
                    </td>
                    <td className="px-3 py-1 hover:text-cyan-400">
                      <span
                        onClick={() => {
                          setShowUpdateModal(true);
                          setSingleTask(items);
                        }}
                      >
                        {items.name}
                      </span>
                    </td>
                    <td className="px-3 py-1">
                      <span>{format(items.startDate, "yyyy-MM-dd")}</span>
                    </td>
                    <td className="px-3 py-1">
                      <span>{format(items.endDate, "yyyy-MM-dd")}</span>
                    </td>
                    <td className="px-3 py-1">
                      <span>{items.projectName}</span>
                    </td>
                    <td className="px-3 py-1 ">
                      <span>{items.priority}</span>
                    </td>
                    <td className="px-3 py-1">
                      <span>{items.description}</span>
                    </td>
                    <td className="px-3 py-1 flex justify-center">
                      <div className="flex items-center gap-2">
                        <button
                          className="bg-gray-900 text-white text-sm rounded-md px-4 py-1"
                          onClick={() => {
                            setShowAssing(true);
                            setTaskId(items.taskId);
                          }}
                        >
                          Assign
                        </button>
                        <button
                          className="bg-red-500 text-white text-sm rounded-md px-4 py-1"
                          onClick={() => deleteById(items.taskId)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showAddModal && <AddTaskModal onClose={() => setShowAddModal(false)} />}
      {showUpdateModal && (
        <UpdateTaskModal
          onClose={() => setShowUpdateModal(false)}
          singleTask={singleTask}
        />
      )}
      {showAssing && (
        <AssignModal onClose={() => setShowAssing(false)} taskId={taskId} />
      )}
      {showProfileModal && (
        <ProfileView
          onClose={() => setShowProfileModal(false)}
          singleUser={singleUser}
        />
      )}
      {showReset && <ResetPassword onClose={() => setShowReset(false)} />}
    </div>
  );
};
export default TaskPage;
