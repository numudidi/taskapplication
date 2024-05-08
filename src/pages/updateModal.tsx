import { useState } from "react";
import { Task } from "./taskInterface";
import { format } from "date-fns";
import axios, { AxiosResponse } from "axios";
import { axiosConfig } from "@/config/configuration";
import CustomSelectStyle from "./styles/selectcss";
import Select from "react-dropdown-select";

const UpdateTaskModal = ({
  onClose,
  singleTask,
}: {
  onClose: () => void;
  singleTask: Task;
}) => {
  const options = [
    { value: "1", label: "Project 1" },
    { value: "2", label: "Project 2" },
    { value: "3", label: "Project 3" },
  ];
  const [taskName, setTaskName] = useState<string>(singleTask.name);
  const [description, setDescription] = useState<string>(
    singleTask.description
  );
  const [date, setDate] = useState<string>(singleTask.startDate);
  const [endDate, setEndDate] = useState<string>(singleTask.endDate);
  const [projectName, setProjectName] = useState<string>(
    singleTask.projectName
  );
  const [priority, setPriority] = useState<string>(singleTask.priority);
  const [file, setFile] = useState<string>(singleTask.file);

  const updateTask = () => {
    const url = "http://localhost:8080/api/task/update";
    const parameters = {
      taskId: singleTask.taskId,
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
        alert("Task updated successfully...");
        window.location.reload();
      })
      .catch((error: any) => {
        console.error("Error: ", error);
      });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // Using optional chaining here
    if (selectedFile) {
      setFile(selectedFile.name);
    }
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
                  value={taskName}
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
                    value={format(date, "yyyy-MM-dd")}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-semibold">End date</label>
                  <input
                    type="date"
                    placeholder="date"
                    className="bg-[#F6F6F6] px-4 py-2 rounded-md w-full"
                    value={format(endDate, "yyyy-MM-dd")}
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
                    onChange={(values) => setProjectName(values[0].value)}
                    placeholder="Select project"
                    options={options}
                    className="py-2 bg-[#F6F6F6] rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold">Description</label>
                <textarea
                  className="bg-[#F6F6F6] rounded-md px-4 py-2"
                  placeholder="Add description"
                  rows={3}
                  value={description}
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
                  onClick={() => updateTask()}
                >
                  Update Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateTaskModal;
