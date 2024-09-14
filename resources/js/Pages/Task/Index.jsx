import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head} from "@inertiajs/react";
import TasksTable from "./TasksTable";
export default function Index({ auth, tasks, queryParams = null }){

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tasks</h2>}
        >
            <Head title="Tasks" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <TasksTable tasks={tasks} queryParams={queryParams}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}