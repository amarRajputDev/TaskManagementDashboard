import type React from "react"
import { useEffect, useState } from "react"
import TaskList from "../components/TaskList"
import { Link } from "react-router-dom"

const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "pending" | "In Progress" | "completed">("all")

   useEffect(() => {
    console.log(filter)
   }, [])
   

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Dashboard</h1>
        <Link to="/add" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
          Add New Task
        </Link>
      </div>
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | "pending" | "In Progress" | "completed")}
          className="block w-full md:w-auto rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending Tasks</option>
          <option value="In Progress">In Progress</option>
          <option value="completed">Completed Tasks</option>
        </select>
      </div>
      <TaskList filter={filter} />
    </div>
  )
}

export default Dashboard

