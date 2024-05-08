import { axiosConfig } from "@/config/configuration";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import Select from "react-dropdown-select";
import CustomSelectStyle from "./styles/selectcss";

const AddTaskModal = ({ onClose }: { onClose: () => void }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [file, setFile] = useState<string>("");

  const options = [
    { value: "1", label: "Project 1" },
    { value: "2", label: "Project 2" },
    { value: "3", label: "Project 3" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile.name);
    }
  };

  const addTask = () => {
    const url = "http://localhost:8080/api/task/record";
    const parameters = {
      name: taskName,
      startDate: date,
      endDate: endDate,
      description: description,
      projectName: projectName,
      priority: priority,
      file: file,
    };
    axios
      .post(url, parameters, axiosConfig)
      .then((response: AxiosResponse<any>) => {
        alert("Task created successfully...");
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
            <h4 className="text-center mx-auto">Add new Task</h4>
            <button onClick={onClose}>X</button>
          </div>
          <div className="px-8 py-8 w-full">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold">Task name</label>
                <input
                  type="text"
                  placeholder="type Task name"
                  className="bg-[#F6F6F6] px-4 py-2 rounded-md w-full"
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-semibold">Start date</label>
                  <input
                    type="date"
                    placeholder="date"
                    className="bg-[#F6F6F6] px-4 py-2 rounded-md w-full"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-semibold">End date</label>
                  <input
                    type="date"
                    placeholder="date"
                    className="bg-[#F6F6F6] px-4 py-2 rounded-md w-full"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold">Projects</label>
                <div className="relative">
                  <CustomSelectStyle />
                  <Select
                    values={[]}
                    onChange={(values) => setProjectName(values[0].label)}
                    placeholder="Select project"
                    options={options}
                    className="py-2 bg-[#F6F6F6] rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold">Description</label>
                <textarea
                  className={`bg-[#F6F6F6] rounded-md px-4 py-2`}
                  placeholder="Add description"
                  rows={3}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold">Priority</label>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="radio"
                      value={"Low"}
                      checked={priority === "Low"}
                      onChange={(e) => setPriority(e.target.value)}
                    />
                    <label>Low</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="radio"
                      value={"Normal"}
                      checked={priority === "Normal"}
                      onChange={(e) => setPriority(e.target.value)}
                    />
                    <label>Normal</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="radio"
                      value={"High"}
                      checked={priority === "High"}
                      onChange={(e) => setPriority(e.target.value)}
                    />
                    <label>High</label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold">Attach file</label>
                <input type="file" onChange={handleFileChange} />
              </div>

              <div className="mt-2">
                <button
                  className="bg-gray-900 text-white rounded-md px-4 py-3"
                  onClick={() => addTask()}
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddTaskModal;
