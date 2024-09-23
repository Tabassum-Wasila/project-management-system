import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP} from "@/constants.jsx";
import { Head } from "@inertiajs/react";
import InfoItem from "@/Components/InfoItem";
import TasksTable from "../Task/TasksTable";
export default function Show({ auth, user, tasks, queryParams = null }){

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {`User "${user.name}"`}
                </h2>
            }
        >
            <Head title={`User "${user.name}"`} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div>
                            <img src={user.image_path} alt="" className="w-full h-64 object-cover"/>
                        </div>
                        <div className="px-6 py-2 text-gray-900 dark:text-gray-100 overflow-auto">
                            <section className="mb-4">
                                <div className="grid gap-2 grid-cols-2 mt-2">
                                    <div>
                                        <InfoItem label="User ID">{user.id}</InfoItem>
                                        <InfoItem label="User Name">{user.name}</InfoItem>
                                        <InfoItem label="User Status">
                                            <span className={"text-gray-100 font-semibold px-2 py-1 mt-1 rounded " + USER_STATUS_CLASS_MAP[user.status]}>
                                                    {USER_STATUS_TEXT_MAP[user.status]}
                                            </span>
                                        </InfoItem>
                                        <InfoItem label="Created By">{user.createdBy.name}</InfoItem>
                                    </div>
                                    <div>
                                        <InfoItem label="Due Date">{user.due_date}</InfoItem>
                                        <InfoItem label="Create Date">{user.created_at}</InfoItem>
                                        <InfoItem label="Updated By">{user.updatedBy.name}</InfoItem>
                                    </div>
                                </div>
                                <InfoItem label="User Description">{user.description}</InfoItem>
                            </section>
                        </div>
                        <TasksTable tasks={tasks} queryParams={queryParams} hideUserColumn = {true}/>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}