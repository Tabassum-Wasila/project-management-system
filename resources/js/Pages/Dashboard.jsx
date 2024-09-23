import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TasksTable from './Task/TasksTable';

export default function Dashboard({ auth, queryParams = null,
        myPendingTasks, 
        totalPendingTasks, 
        myInProgressTasks, 
        totalInProgressTasks, 
        myCompletedTasks, 
        totalCompletedTasks,
        myTasks,
        hideColumns = []
    }) 
{

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-amber-500 text-xl font-semibold'>
                                Pending Tasks
                            </h3>
                            <p className='text-lg mt-2'> {myPendingTasks} / {totalPendingTasks}</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-blue-500 text-xl font-semibold'>
                                In Progress Tasks
                            </h3>
                            <p className='text-lg mt-2'> {myInProgressTasks} / {totalInProgressTasks}</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-green-500 text-xl font-semibold'>
                                Completed Tasks
                            </h3>
                            <p className='text-lg mt-2'> {myCompletedTasks} / {totalCompletedTasks}</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-2">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                         {myTasks.meta.total > 0 && (
                                <div>
                                    <h2 className='font-semibold text-xl px-6 mt-2'>My Active Tasks</h2>
                                    <TasksTable tasks={myTasks} queryParams={queryParams} hideColumns={hideColumns}/>
                                </div>
                            )}
                            {console.log(myTasks.meta.total)}
                            {!myTasks.meta.total && (
                                <h2 className='text-center p-6'>You Have No Active Tasks.</h2>
                            )}
                        </div>
                    </div>
                </div>
        </AuthenticatedLayout>
    );
}
