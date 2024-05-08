export interface TaskResponse {
  status: string;
  message: string;
  data: Task[];
}

export interface Task {
  taskId: string;
  name: string;
  startDate: string;
  endDate: string;
  projectName: string;
  priority: string;
  file: string;
  description: string;
}

export const TasksValue: Task = {
  taskId: "",
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  projectName: "",
  priority: "",
  file: "",
};

export interface UserResponse {
  status: string;
  message: string;
  data: User[];
}

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const UserValue: User = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
};
