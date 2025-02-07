import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  status: "Pending" | "In Progress" | "Completed"
}

interface TaskState {
  tasks: Task[]
}

const initialState: TaskState = {
  tasks: [],
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
      }
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload)
      if (task) {
        task.status = task.status === "Completed" ? "Pending" : "Completed"
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
  },
})

export const { addTask, updateTask, toggleTaskStatus, deleteTask } = taskSlice.actions
export default taskSlice.reducer

