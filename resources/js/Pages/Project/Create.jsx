import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({auth}){
    const {data, setData, post, processing, errors, reset} = useForm({
        image: '',
        name: '',
        status: '',
        description: '',
        due_date: ''
    })
    
    const onSubmit = (e) => {
        e.preventDefault();

        post(route('project.store'));
    }

    return (
        <AuthenticatedLayout
        user={auth.user}
            header={
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create new Project
                </h2>
            </div>
            }
        >
            <Head title="Project" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
                            <form onSubmit={onSubmit}>
                                <div>
                                    <InputLabel 
                                    htmlFor="project_image_path" 
                                        value="Project Image"
                                    />
                                    <TextInput
                                        id="project_image_path"
                                        type="file"
                                        name="image"
                                        value={data.image}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('image', e.target.value)}
                                    />
                                    <InputError message={errors.image} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel 
                                    htmlFor="project_name" 
                                        value="Project Name"
                                    />
                                    <TextInput
                                        id="project_name"
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
                                    htmlFor="project_description" 
                                        value="Project Description"
                                    />
                                    <TextAreaInput
                                        id="project_description"
                                        type="text"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"                                        onChange={e => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel 
                                    htmlFor="project_due_date" 
                                        value="Project Deadline"
                                    />
                                    <TextInput
                                        id="project_due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"                                        onChange={e => setData('due_date', e.target.value)}
                                    />
                                    <InputError message={errors.due_date} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel 
                                    htmlFor="project_due_date" 
                                        value="Project Deadline"
                                    />
                                    <SelectInput
                                        id="project_status"
                                        name="status"
                                        value={data.status}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('status', e.target.value)}
                                    >
                                        <option key="" value="">Select Status</option>
                                        { Object.keys(PROJECT_STATUS_TEXT_MAP).map(key => (
                                            <option key={key} value={key}>{PROJECT_STATUS_TEXT_MAP[key]}</option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.status} className="mt-2"/>
                                </div>
                                <div className="mt-4 text-right items-center">
                                    <Link
                                        href={route('project.index')}
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