import type React from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../hooks/useAppRedux"
import { deleteTask, toggleTaskStatus } from "../store/taskSlice"

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const task = useAppSelector((state) => state.tasks.tasks.find((t) => t.id === id))

  if (!task) {
    return <div>Task not found</div>
  }

  const handleDelete = () => {
    dispatch(deleteTask(task.id))
    navigate("/")
  }

  const handleToggleStatus = () => {
    dispatch(toggleTaskStatus(task.id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
        <p className="text-gray-600 mb-4">{task.description}</p>
        <p className="text-sm text-gray-500 mb-2">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        <p className="mb-4">
          Status:
          <span
            className={`ml-2 inline-block px-2 py-1 rounded-full text-xs ${
              task.status === "Completed"
                ? "bg-green-200 text-green-800"
                : task.status === "In Progress"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-red-200 text-red-800"
            }`}
          >
            {task.status}
          </span>
        </p>
        <div className="flex space-x-4">
          <Link to={`/edit/${task.id}`} className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
            Edit
          </Link>
          <button
            onClick={handleToggleStatus}
            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
          >
            Toggle Status
          </button>
          <button onClick={handleDelete} className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetails

