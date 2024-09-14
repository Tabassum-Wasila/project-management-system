import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import ColumnHeading from "@/Components/ColumnHeading";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";
import {Link, router } from "@inertiajs/react";


export default function TasksTable({tasks, queryParams = null, hideProjectColumn = false}){
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('task.index'), queryParams);
    }

    const onKeyPress = (name, e) => {
        if (e.key != 'Enter') return;

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
        if (name === queryParams.sort_field){
            if (queryParams.sort_direction == 'asc')
                queryParams.sort_direction = 'desc';
            else
                queryParams.sort_direction = 'asc';
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('task.index'), queryParams);
    }
    
    return (
        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        <ColumnHeading name='id' queryParams={queryParams} sortChanged={sortChanged}>ID</ColumnHeading>
                        <th className="px-3 py-3">Image</th>
                        <ColumnHeading name='name' queryParams={queryParams} sortChanged={sortChanged}>Name</ColumnHeading>
                        <ColumnHeading name='status' queryParams={queryParams} sortChanged={sortChanged}>Status</ColumnHeading>
                        {!hideProjectColumn &&
                            <th className="px-3 py-3" name='project'>Project</th>
                        }
                        <ColumnHeading name='created_at' queryParams={queryParams} sortChanged={sortChanged}>Create Date</ColumnHeading>
                        <ColumnHeading  name='due_date' queryParams={queryParams} sortChanged={sortChanged}>Due Date</ColumnHeading>
                        <ColumnHeading name='created_by' queryParams={queryParams} sortChanged={sortChanged}>Created By</ColumnHeading>
                        <th className="px-3 py-3">Actions</th>
                    </tr>
                </thead>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3">
                            <TextInput 
                                placeholder="Task Name"
                                defaultValue={queryParams.name}  
                                onBlur={(e)=> searchFieldChanged("name", e.target.value)}
                                onKeyPress={(e) => onKeyPress("name", e)}/>
                        </th>
                        <th className="px-3 py-3">
                            <SelectInput
                                defaultValue={queryParams.status} 
                                onChange={(e)=> searchFieldChanged("status", e.target.value)}>  
                                <option key="" value="">Select Status</option>
                                { Object.keys(TASK_STATUS_TEXT_MAP).map(key => (
                                    <option key={key} value={key}>{TASK_STATUS_TEXT_MAP[key]}</option>
                                ))}
                            </SelectInput>
                        </th>
                        {!hideProjectColumn &&
                            <th className="px-3 py-3"></th>
                        }
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th>
                        <th className="px-3 py-3"></th> 
                    </tr>
                </thead>
                <tbody>
                    {tasks.data.map((task) => (
                        <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-3 py-2">{task.id}</td>
                            <td className="px-3 py-2">
                                <img className="w-25 h-20 bg-gradient-to-r from-gray-900 to-gray-700" src={task.image_path} alt="No Image"></img>
                            </td>
                            <td className="px-3 py-2">{task.name}</td>
                            <td className="px-3 py-2"> 
                                    <span className={"text-gray-100 font-semibold px-2 py-1 rounded " + TASK_STATUS_CLASS_MAP[task.status]}
                                    >
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                            </td>
                            {!hideProjectColumn &&
                                <td className="px-3 py-2">{task.project.name}</td>
                            }
                            <td className="px-3 py-2">{task.created_at}</td>
                            <td className="px-3 py-2">{task.due_date}</td>
                            <td className="px-3 py-2">{task.createdBy.name}</td>
                            <td className="px-3 py-2">
                            <Link href={route("task.edit", task.id)}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                >
                                    Edit
                                </Link>
                                <Link href={route("task.destroy", task.id)}
                                className="font-medium text-red-600 dark:red-blue-500 hover:underline mx-1"
                                >
                                    Delete
                                </Link>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination links={tasks.meta.links}></Pagination>
        </div>
    )
}