import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import ColumnHeading from "@/Components/ColumnHeading";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP} from "@/constants.jsx";
import {Link, router } from "@inertiajs/react";


export default function TasksTable({tasks, queryParams = null, hideColumns = [], success}){
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route(window.location.href), queryParams);
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
        router.get(window.location.href, queryParams);
    }

    const deleteTask = (task) => {
        if(!window.confirm('Are you sure you want to delete this task?'))
            return;
        router.delete(route('task.destroy', task.id));
    }

    
    return (
      <>
        {success && (
            <div className="bg-emerald-500 py-2 px-4 rounded text-white mb-4">
                {success}
            </div>
        )}
        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        {!hideColumns.includes('id') &&
                            <ColumnHeading name='id' queryParams={queryParams} sortChanged={sortChanged}>ID</ColumnHeading>
                        }
                        {!hideColumns.includes('image') &&
                            <th className="px-3 py-3">
                                Image
                            </th>
                        }
                        {!hideColumns.includes('name') &&
                            <ColumnHeading name='name' queryParams={queryParams} sortChanged={sortChanged}>Name</ColumnHeading>
                        }
                        {!hideColumns.includes('status') &&    
                            <ColumnHeading name='status' queryParams={queryParams} sortChanged={sortChanged}>Status</ColumnHeading>
                        }
                        {!hideColumns.includes('project') &&
                            <th className="px-3 py-3" name='project'>Project</th>
                        }
                        {!hideColumns.includes('created_at') &&    
                            <ColumnHeading name='created_at' queryParams={queryParams} sortChanged={sortChanged}>Create Date</ColumnHeading>
                        }
                        {!hideColumns.includes('due_date') &&    
                            <ColumnHeading  name='due_date' queryParams={queryParams} sortChanged={sortChanged}>Due Date</ColumnHeading>
                        }
                        {!hideColumns.includes('priority') &&    
                            <ColumnHeading name='priority' queryParams={queryParams} sortChanged={sortChanged}>Priority</ColumnHeading>
                        }                        
                        {!hideColumns.includes('created_by') &&    
                            <ColumnHeading name='created_by' queryParams={queryParams} sortChanged={sortChanged}>Created By</ColumnHeading>
                        }
                        <th className="px-3 py-3">Actions</th>
                    </tr>
                </thead>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        {!hideColumns.includes('id') &&
                            <th className="px-3 py-3"></th>
                        }
                        {!hideColumns.includes('image') &&
                            <th className="px-3 py-3"></th>
                        }
                        {!hideColumns.includes('name') &&   
                            <th className="px-3 py-3">
                                <TextInput 
                                    placeholder="Task Name"
                                    defaultValue={queryParams.name}  
                                    onBlur={(e)=> searchFieldChanged("name", e.target.value)}
                                    onKeyPress={(e) => onKeyPress("name", e)}/>
                            </th>
                        }
                        {!hideColumns.includes('status') &&
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
                        }
                        {!hideColumns.includes('project') &&
                            <th className="px-3 py-3"></th>
                        }   
                        {!hideColumns.includes('created_at') &&
                            <th className="px-3 py-3"></th>
                        }
                        {!hideColumns.includes('due_date') &&
                            <th className="px-3 py-3"></th>
                        }
                        {!hideColumns.includes('priority') &&    
                            <th className="px-3 py-3"></th>
                        }
                        {!hideColumns.includes('created_by') &&
                            <th className="px-3 py-3"></th>
                        }
                        <th className="px-3 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.data.map((task) => (
                        <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            {!hideColumns.includes('id') &&    
                                <td className="px-3 py-2">{task.id}</td>
                            }
                            {!hideColumns.includes('image') &&
                                <td className="px-3 py-2">
                                    <img className="w-20 h-20 bg-gradient-to-r from-gray-900 to-gray-700" src={task.image_path} alt="No Image"></img>
                                </td>
                            }
                            {!hideColumns.includes('name') &&
                                <td className="px-3 py-2 hover:underline dark:text-gray-100 text-gray-800">
                                    <Link href={route('task.show', task.id)}>
                                        {task.name}
                                    </Link>
                                </td>
                            }
                            {!hideColumns.includes('status') &&
                                <td className="px-3 py-2"> 
                                    <span className={"text-gray-100 text-nowrap font-semibold px-2 py-1 rounded " 
                                        + TASK_STATUS_CLASS_MAP[task.status]}
                                    >
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                            }
                            {!hideColumns.includes('project') &&
                                <td className="px-3 py-2 hover:underline dark:text-gray-100 text-gray-800">
                                    <Link href={route('project.show', task.project.id)}>
                                        {task.project.name}
                                    </Link>
                                </td>
                            }
                            {!hideColumns.includes('created_at') &&
                                <td className="px-3 py-2">{task.created_at}</td>
                            }
                            {!hideColumns.includes('due_date') &&
                                <td className="px-3 py-2">{task.due_date}</td>
                            }
                            {!hideColumns.includes('priority') &&
                                <td className="px-3 py-2"> 
                                    <span className={"text-gray-100 text-nowrap font-semibold px-2 py-1 rounded " 
                                        + TASK_PRIORITY_CLASS_MAP[task.priority]}
                                    >
                                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                    </span>
                                </td>
                            }
                            {!hideColumns.includes('created_by') &&
                                <td className="px-3 py-2">{task.createdBy.name}</td>
                            }
                            <td className="px-3 py-2 text-nowrap">
                                <Link href={route("task.edit", task.id)}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                >
                                    Edit
                                </Link>
                                <button onClick={(e) => deleteTask(task)}
                                className="font-medium text-red-600 dark:red-blue-500 hover:underline mx-1"
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination links={tasks.meta.links}></Pagination>
        </div>
      </>
    )
}