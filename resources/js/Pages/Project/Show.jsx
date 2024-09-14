import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constants.jsx";
import { Head } from "@inertiajs/react";
import InfoItem from "@/Components/InfoItem";
import TasksTable from "../Task/TasksTable";
export default function Show({ auth, project, tasks, queryParams = null }){

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {`Project "${project.name}"`}
                </h2>
            }
        >
            <Head title={`Project "${project.name}"`} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div>
                            <img src={project.image_path} alt="" className="w-full h-64 object-cover"/>
                        </div>
                        <div className="px-6 py-2 text-gray-900 dark:text-gray-100 overflow-auto">
                            <section className="mb-4">
                                <div className="grid gap-2 grid-cols-2 mt-2">
                                    <div>
                                        <InfoItem label="Project ID">{project.id}</InfoItem>
                                        <InfoItem label="Project Name">{project.name}</InfoItem>
                                        <InfoItem label="Project Status">
                                            <span className={"text-gray-100 font-semibold px-2 py-1 mt-1 rounded " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                    {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                        </InfoItem>
                                        <InfoItem label="Created By">{project.createdBy.name}</InfoItem>
                                    </div>
                                    <div>
                                        <InfoItem label="Due Date">{project.due_date}</InfoItem>
                                        <InfoItem label="Created By">{project.created_at}</InfoItem>
                                        <InfoItem label="Updated By">{project.updatedBy.name}</InfoItem>
                                    </div>
                                </div>
                                <InfoItem label="Project Description">{project.description}</InfoItem>
                            </section>
                        </div>
                        <TasksTable tasks={tasks} queryParams={queryParams} hideProjectColumn = {true}/>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}