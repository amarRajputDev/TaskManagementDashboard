import type React from "react"
import { useParams } from "react-router-dom"
import TaskForm from "../components/TaskForm"
import { useAppSelector } from "../hooks/useAppRedux"

const AddEditTask: React.FC = () => {
  const { id } = useParams<{ id?: string }>()
  const task = useAppSelector((state) => state.tasks.tasks.find((t) => t.id === id))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{id ? "Edit Task" : "Add New Task"}</h1>
      <TaskForm task={task} />
    </div>
  )
}

export default AddEditTask

