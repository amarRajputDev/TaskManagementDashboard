"use client"

import type React from "react"
import { useState } from "react"
import { useAppDispatch } from "../hooks/useAppRedux"
import { addTask, updateTask, type Task } from "../store/taskSlice"
import { useNavigate } from "react-router-dom"


interface TaskFormProps {
  task?: Task
}

const TaskForm: React.FC<TaskFormProps> = ({ task }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState(task?.title || "")
  const [description, setDescription] = useState(task?.description || "")
  const [dueDate, setDueDate] = useState("")
  const [status, setStatus] = useState<Task["status"]>(task?.status || "Pending")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (task) {
      dispatch(updateTask({ ...task, title, description, dueDate, status }))
    } else {
      dispatch(
        addTask({
          id: Date.now().toString(),
          title,
          description,
          dueDate,
          status,
        }),
      )
    }
    navigate("/")
  }

  return (
    <div className=" w-full p-5  flex justify-center h-screen  overflow-hidden">

    <form onSubmit={handleSubmit} className="space-y-4 hover:scale-105 duration-300 p-5 rounded-2xl shadow-2xl h-fit w-[95vw] md:w-[70vw] lg:w-[60%] ">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
         
        {/* <Calendar id="dueDate" value={dueDate} onChange={(e) => setDueDate(e?.target?.value!)} showIcon className="bg-white" /> */}
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
          className="mt-1 block w-full rounded-md border-gray-300 p-2 px-6 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        {task ? "Update Task" : "Add Task"}
      </button>
    </form>
    </div>
  )
}

export default TaskForm

