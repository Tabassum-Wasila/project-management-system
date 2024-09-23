import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { TASK_PRIORITY_TEXT_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({auth, projects, users}){
    const {data, setData, post, processing, errors, reset} = useForm({
        image: '',
        name: '',
        status: '',
        description: '',
        due_date: ''
    })
    
    const onSubmit = (e) => {
        e.preventDefault();

        post(route('task.store'));
    }

    return (
        <AuthenticatedLayout
        user={auth.user}
            header={
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create new Task
                </h2>
            </div>
            }
        >
            <Head title="Task" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
                            <form onSubmit={onSubmit}>
                                <div>
                                    <InputLabel 
                                    htmlFor="task_image_path" 
                                        value="Task Image"
                                    />
                                    <TextInput
                                        id="task_image_path"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={e => setData('image', e.target.files[0])}
                                    />
                                    <InputError message={errors.image} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel 
                                    htmlFor="task_name" 
                                        value="Task Name"
                                    />
                                    <TextInput
                                        id="task_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={e => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel 
                                    htmlFor="task_description" 
                                        value="Task Description"
                                    />
                                    <TextAreaInput
                                        id="task_description"
                                        type="text"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"                                        
                                        onChange={e => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel 
                                    htmlFor="task_due_date" 
                                        value="Task Deadline"
                                    />
                                    <TextInput
                                        id="task_due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"                                        
                                        onChange={e => setData('due_date', e.target.value)}
                                    />
                                    <InputError message={errors.due_date} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel 
                                    htmlFor="task_status" 
                                        value="Task Status"
                                    />
                                    <SelectInput
                                        id="task_status"
                                        name="status"
                                        value={data.status}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('status', e.target.value)}
                                    >
                                        <option key="" value="">Select Status</option>
                                        { Object.keys(TASK_STATUS_TEXT_MAP).map(key => (
                                            <option key={key} value={key}>{TASK_STATUS_TEXT_MAP[key]}</option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.status} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel 
                                    htmlFor="task_priority" 
                                        value="Task Priority"
                                    />
                                    <SelectInput
                                        id="task_priority"
                                        name="priority"
                                        value={data.priority}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('priority', e.target.value)}
                                    >
                                        <option key="" value="">Select Priority</option>
                                        { Object.keys(TASK_PRIORITY_TEXT_MAP).map(key => (
                                            <option key={key} value={key}>{TASK_PRIORITY_TEXT_MAP[key]}</option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.priority} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel 
                                    htmlFor="task_project_id" 
                                        value="Project"
                                    />
                                    <SelectInput
                                        id="task_project_id"
                                        name="project_id"
                                        value={data.project_id}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('project_id', e.target.value)}
                                    >
                                        <option key="" value="">Select Project</option>
                                        { 
                                            projects.data.map((project) => (
                                                <option key={project.id} value={project.id}>{project.name}</option>
                                            ))
                                        }
                                    </SelectInput>
                                    <InputError message={errors.project_id} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel 
                                    htmlFor="task_assigned_user" 
                                        value="Assigned User"
                                    />
                                    <SelectInput
                                        id="task_assigned_user"
                                        name="assigned_user_id"
                                        value={data.assigned_user_id}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('assigned_user_id', e.target.value)}
                                    >
                                        <option key="" value="">Select User</option>
                                        { 
                                            users.data.map((user) => (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            ))
                                        }
                                    </SelectInput>
                                    <InputError message={errors.priority} className="mt-2"/>
                                </div>
                                <div className="mt-4 text-right items-center">
                                    <Link
                                        href={route('task.index')}
                                        className="dark:bg-gray-100 bg-gray-800 py-1.5 px-3 text-gray-100 dark:text-gray-800 
                                                    rounded shadow transition-all hover:bg-gray-500 mr-2 text-sm"
                                    >
                                        Cancel
                                    </Link>
                                    <button className="bg:emerald-500 py-1 px-3 text-white rounded shadow transition-all bg-emerald-600 hover:bg-emerald-800">
                                        Submit
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}