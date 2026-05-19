"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createTaskApi, updateTaskApi } from "../services/taskService";
import { createProjectApi, updateProjectApi } from "../services/projectService";
import { Project } from "../types/projects";
import { Task } from "../types/task";
import { projectSchema, taskSchema } from "../utils/validationSchema";

interface Props {
    open: boolean;
    onClose: () => void;
    mode: "CREATE" | "EDIT";
    entity: "TASK" | "PROJECT";

    task?: Task | null;
    project?: Project | null;

    refreshTasks?: () => void;
    refreshProjects?: () => void;

    projects?: Project[];
}

const CreateModal = ({
    open,
    onClose,
    mode,
    entity,
    task,
    project,
    refreshTasks,
    refreshProjects,
    projects = []
}: Props) => {

    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const [taskData, setTaskData] = useState({
        title: "",
        assigned_user: "",
        due_date: "",
        priority: "",
        status: "",
        project_id: ""
    });

    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        status: "",
        budget: "",
        deadline: ""
    });

    useEffect(() => {
        if (!open) return;

        setErrors({});

        if (entity === "TASK") {
            if (mode === "EDIT" && task) {
                setTaskData({
                    title: task.title || "",
                    assigned_user: task.assigned_user || "",
                    due_date: task.due_date || "",
                    priority: task.priority || "",
                    status: task.status || "",
                    project_id: String(task.project_id || "")
                });
            }

            if (mode === "CREATE") {
                setTaskData({
                    title: "",
                    assigned_user: "",
                    due_date: "",
                    priority: "",
                    status: "",
                    project_id: ""
                });
            }
        }

        if (entity === "PROJECT") {
            if (mode === "EDIT" && project) {
                setProjectData({
                    title: project.title || "",
                    description: project.description || "",
                    status: project.status || "",
                    budget: String(project.budget || ""),
                    deadline: project.deadline || ""
                });
            }

            if (mode === "CREATE") {
                setProjectData({
                    title: "",
                    description: "",
                    status: "",
                    budget: "",
                    deadline: ""
                });
            }
        }
    }, [open, mode, entity, task, project]);

    const handleTaskChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {

        const { name, value } = e.target;

        setTaskData((prev) => ({
            ...prev,
            [name]: value
        }));

        setErrors((prev: any) => ({
            ...prev,
            [name]: ""
        }));
    };

    const handleProjectChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {

        const { name, value } = e.target;

        setProjectData((prev) => ({
            ...prev,
            [name]: value
        }));

        setErrors((prev: any) => ({
            ...prev,
            [name]: ""
        }));
    };

    const validate = () => {
        try {

            if (entity === "TASK") {
                taskSchema.parse(taskData);
            }

            if (entity === "PROJECT") {
                projectSchema.parse(projectData);
            }

            setErrors({});
            return true;

        } catch (error: any) {

            const fieldErrors: any = {};

            error.issues.forEach((err: any) => {
                fieldErrors[err.path[0]] = err.message;
            });

            setErrors(fieldErrors);
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setSubmitting(true);

        try {

            if (entity === "TASK") {

                const payload = {
                    ...taskData,
                    project_id: Number(taskData.project_id)
                };

                if (mode === "CREATE") {
                    await createTaskApi(payload);
                    toast.success("Task created successfully");
                } else if (task) {
                    await updateTaskApi(task.id, payload);
                    toast.success("Task updated successfully");
                }

                refreshTasks?.();
            }

            if (entity === "PROJECT") {

                const payload = {
                    ...projectData,
                    budget: Number(projectData.budget)
                };

                if (mode === "CREATE") {
                    await createProjectApi(payload);
                    toast.success("Project created successfully");
                } else if (project) {
                    await updateProjectApi(project.id, payload);
                    toast.success("Project updated successfully");
                }

                refreshProjects?.();
            }

            onClose();

        } catch (error: any) {

            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );

        } finally {
            setSubmitting(false);
        }
    };

    if (!open) return null;

    const ErrorText = ({ msg }: { msg?: string }) =>
        msg ? (
            <div className="text-red-500 text-xs mt-1">
                {msg}
            </div>
        ) : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl max-h-[90vh] overflow-y-auto">

                <div className="flex items-center justify-between border-b p-5">

                    <h2 className="text-xl font-semibold">
                        {mode === "CREATE"
                            ? `Create ${entity}`
                            : `Edit ${entity}`}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-black"
                    >
                        ×
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-5"
                >

                    {entity === "TASK" ? (
                        <>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                                <div className="w-full sm:w-40 text-sm">
                                    Title :
                                </div>

                                <div className="flex-1">
                                    <input
                                        name="title"
                                        value={taskData.title}
                                        onChange={handleTaskChange}
                                        className="w-full border p-3 rounded-xl"
                                    />

                                    <ErrorText msg={errors.title} />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                                <div className="w-full sm:w-40 text-sm">
                                    Assigned :
                                </div>

                                <div className="flex-1">
                                    <input
                                        name="assigned_user"
                                        value={taskData.assigned_user}
                                        onChange={handleTaskChange}
                                        className="w-full border p-3 rounded-xl"
                                    />

                                    <ErrorText msg={errors.assigned_user} />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                                <div className="w-full sm:w-40 text-sm">
                                    Due Date :
                                </div>

                                <div className="flex-1">
                                    <input
                                        type="date"
                                        name="due_date"
                                        value={taskData.due_date}
                                        onChange={handleTaskChange}
                                        className="w-full border p-3 rounded-xl"
                                    />

                                    <ErrorText msg={errors.due_date} />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                                <div className="w-full sm:w-40 text-sm">
                                    Priority :
                                </div>

                                <div className="flex-1">
                                    <select
                                        name="priority"
                                        value={taskData.priority}
                                        onChange={handleTaskChange}
                                        className="w-full border p-3 rounded-xl"
                                    >
                                        <option value="">Select</option>
                                        <option value="LOW">LOW</option>
                                        <option value="MEDIUM">MEDIUM</option>
                                        <option value="HIGH">HIGH</option>
                                    </select>

                                    <ErrorText msg={errors.priority} />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                                <div className="w-full sm:w-40 text-sm">
                                    Status :
                                </div>

                                <div className="flex-1">
                                    <select
                                        name="status"
                                        value={taskData.status}
                                        onChange={handleTaskChange}
                                        className="w-full border p-3 rounded-xl"
                                    >
                                        <option value="">Select</option>
                                        <option value="PENDING">PENDING</option>
                                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                                        <option value="COMPLETED">COMPLETED</option>
                                    </select>

                                    <ErrorText msg={errors.status} />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                                <div className="w-full sm:w-40 text-sm">
                                    Project :
                                </div>

                                <div className="flex-1">
                                    <select
                                        name="project_id"
                                        value={taskData.project_id}
                                        onChange={handleTaskChange}
                                        className="w-full border p-3 rounded-xl"
                                    >
                                        <option value="">
                                            Select Project
                                        </option>

                                        {projects?.map((p) => (
                                            <option
                                                key={p.id}
                                                value={p.id}
                                            >
                                                {p.title}
                                            </option>
                                        ))}
                                    </select>

                                    <ErrorText msg={errors.project_id} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                                <div className="w-full sm:w-40 text-sm">
                                    Title :
                                </div>

                                <div className="flex-1">
                                    <input
                                        name="title"
                                        value={projectData.title}
                                        onChange={handleProjectChange}
                                        className="w-full border p-3 rounded-xl"
                                    />

                                    <ErrorText msg={errors.title} />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                                <div className="w-full sm:w-40 text-sm">
                                    Description :
                                </div>

                                <div className="flex-1">
                                    <input
                                        name="description"
                                        value={projectData.description}
                                        onChange={handleProjectChange}
                                        className="w-full border p-3 rounded-xl"
                                    />

                                    <ErrorText msg={errors.description} />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                                <div className="w-full sm:w-40 text-sm">
                                    Status :
                                </div>

                                <div className="flex-1">
                                    <select
                                        name="status"
                                        value={projectData.status}
                                        onChange={handleProjectChange}
                                        className="w-full border p-3 rounded-xl"
                                    >
                                        <option value="">Select</option>
                                        <option value="PENDING">PENDING</option>
                                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                                        <option value="COMPLETED">COMPLETED</option>
                                    </select>

                                    <ErrorText msg={errors.status} />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                                <div className="w-full sm:w-40 text-sm">
                                    Budget :
                                </div>

                                <div className="flex-1">
                                    <input
                                        name="budget"
                                        value={projectData.budget}
                                        onChange={handleProjectChange}
                                        className="w-full border p-3 rounded-xl"
                                    />

                                    <ErrorText msg={errors.budget} />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                                <div className="w-full sm:w-40 text-sm">
                                    Deadline :
                                </div>

                                <div className="flex-1">
                                    <input
                                        type="date"
                                        name="deadline"
                                        value={projectData.deadline}
                                        onChange={handleProjectChange}
                                        className="w-full border p-3 rounded-xl"
                                    />

                                    <ErrorText msg={errors.deadline} />
                                </div>
                            </div>
                        </>
                    )}

                    <button
                        disabled={submitting}
                        className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                    >
                        {submitting
                            ? "Saving..."
                            : mode === "CREATE"
                                ? "Create"
                                : "Update"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreateModal;