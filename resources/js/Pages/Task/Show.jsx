import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP} from "@/constants.jsx";
import { Head, Link } from "@inertiajs/react";
import InfoItem from "@/Components/InfoItem";
export default function Show({ auth, task}){

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {`Task "${task.name}"`}
                </h2>
            }
        >
            <Head title={`Task "${task.name}"`} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div>
                            <img src={task.image_path} alt="" className="w-full h-64 object-cover"/>
                        </div>
                        <div className="px-6 py-2 text-gray-900 dark:text-gray-100 overflow-auto">
                            <section className="mb-4">
                                <div className="grid gap-2 grid-cols-2 mt-2">
                                    <div>
                                        <InfoItem label="Task ID">{task.id}</InfoItem>
                                        <InfoItem label="Task Name">{task.name}</InfoItem>
                                        <InfoItem label="Task Status">
                                            <span className={"text-gray-100 font-semibold px-2 py-1 mt-1 rounded " + TASK_STATUS_CLASS_MAP[task.status]}>
                                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                            </span>
                                        </InfoItem>
                                        <InfoItem label="Task Priority">
                                            <span className={"text-gray-100 font-semibold px-2 py-1 mt-1 rounded " + TASK_PRIORITY_CLASS_MAP[task.priority]}>
                                                    {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                            </span>
                                        </InfoItem>
                                        <InfoItem label="Created By">{task.createdBy.name}</InfoItem>
                                    </div>
                                    <div>

                                        <InfoItem label="Due Date">{task.due_date}</InfoItem>
                                        <InfoItem label="Create Date">{task.created_at}</InfoItem>
                                        <InfoItem label="Project" >
                                            <Link className="hover:underline dark:text-gray-100 text-gray-800" href={route('project.show', task.project.id)}
                                            >{task.project.name}
                                            </Link>
                                        </InfoItem>
                                        <InfoItem label="Updated By">{task.updatedBy.name}</InfoItem>
                                        <InfoItem label="Assigned User">{task.assignedUser.name}</InfoItem>

                                    </div>
                                </div>
                                {task.description && (
                                        <InfoItem label="Task Description">{task.description}</InfoItem>
                                    )
                                }
                            </section>
                        </div>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}