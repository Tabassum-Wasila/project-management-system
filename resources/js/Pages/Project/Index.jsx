import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ColumnHeading from "@/Components/ColumnHeading";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
export default function Index({ auth, projects, queryParams = null, success }){
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('project.index'), queryParams);
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
        router.get(route('project.index'), queryParams);
    }

    const deleteProject = (project) => {
        if(!window.confirm('Are you sure you want to delete this project?'))
            return;
        router.delete(route('project.destroy', project.id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Projects
                </h2>
                <Link
                    href={route('project.create')}  
                    className="bg:emerald-500 py-1 px-3 text-white rounded shadow transition-all bg-emerald-600">
                    Add new
                </Link>  
            </div>          
        }
        >
            <Head title="Projects" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success &&(
                        <div className="bg-emerald-500 py-2 px-4 rounded text-white mb-4">
                            {success}
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <ColumnHeading name='id' queryParams={queryParams} sortChanged={sortChanged}>ID</ColumnHeading>
                                        <th className="px-3 py-3">Image</th>
                                        <ColumnHeading name='name' queryParams={queryParams} sortChanged={sortChanged}>Name</ColumnHeading>
                                        <ColumnHeading name='status' queryParams={queryParams} sortChanged={sortChanged}>Status</ColumnHeading>
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
                                                placeholder="Project Name"
                                                defaultValue={queryParams.name}  
                                                onBlur={(e)=> searchFieldChanged("name", e.target.value)}
                                                onKeyPress={(e) => onKeyPress("name", e)}/>
                                        </th>
                                        <th className="px-3 py-3">
                                            <SelectInput
                                                defaultValue={queryParams.status} 
                                                onChange={(e)=> searchFieldChanged("status", e.target.value)}>  
                                                <option key="" value="">Select Status</option>
                                                { Object.keys(PROJECT_STATUS_TEXT_MAP).map(key => (
                                                    <option key={key} value={key}>{PROJECT_STATUS_TEXT_MAP[key]}</option>
                                                ))}
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map((project) => (
                                        <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-2">{project.id}</td>
                                            <td className="px-3 py-2">
                                                <img className="w-25 h-20 bg-gradient-to-r from-gray-900 to-gray-700" src={project.image_path} alt="No Image"></img>
                                            </td>
                                            <td className="px-3 py-2 hover:underline dark:text-gray-100 text-gray-800">
                                                <Link href={route('project.show', project.id)}>
                                                    {project.name}
                                                </Link>
                                            </td>
                                            <td className="px-3 py-2"> 
                                                    <span className={"text-gray-100 text-nowrap font-semibold px-2 py-1 rounded " + PROJECT_STATUS_CLASS_MAP[project.status]}
                                                    >
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                    </span>
                                            </td>
                                            <td className="px-3 py-2">{project.created_at}</td>
                                            <td className="px-3 py-2">{project.due_date}</td>
                                            <td className="px-3 py-2">{project.createdBy.name}</td>
                                            <td className="px-3 py-2 text-nowrap">
                                                <Link href={route("project.edit", project.id)}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <button onClick={(e) => deleteProject(project)}
                                                className="font-medium text-red-600 dark:red-blue-500 hover:underline mx-1"
                                                >
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        <Pagination links={projects.meta.links}></Pagination>
                    </div>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}