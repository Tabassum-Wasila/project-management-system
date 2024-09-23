import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ColumnHeading from "@/Components/ColumnHeading";
import { Head, Link, router } from "@inertiajs/react";
export default function Index({ auth, users, queryParams = null, success }){
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('user.index'), queryParams);
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
        router.get(route('user.index'), queryParams);
    }

    const deleteUser = (user) => {
        if(!window.confirm('Are you sure you want to delete this user?'))
            return;
        router.delete(route('user.destroy', user.id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Users
                </h2>
                <Link
                    href={route('user.create')}  
                    className="bg:emerald-500 py-1 px-3 text-white rounded shadow transition-all bg-emerald-600">
                    Add new
                </Link>  
            </div>          
        }
        >
            <Head title="Users" />
            
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
                                        <ColumnHeading name='name' queryParams={queryParams} sortChanged={sortChanged}>Name</ColumnHeading>
                                        <ColumnHeading name='email' queryParams={queryParams} sortChanged={sortChanged}>Email</ColumnHeading>
                                        <ColumnHeading name='created_at' queryParams={queryParams} sortChanged={sortChanged}>Create Date</ColumnHeading>
                                        <th className="px-3 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            <TextInput 
                                                placeholder="User Name"
                                                defaultValue={queryParams.name}  
                                                onBlur={(e)=> searchFieldChanged("name", e.target.value)}
                                                onKeyPress={(e) => onKeyPress("name", e)}/>
                                        </th>
                                        <th className="px-3 py-3">
                                            <TextInput 
                                                placeholder="User Email"
                                                defaultValue={queryParams.email}  
                                                onBlur={(e)=> searchFieldChanged("email", e.target.value)}
                                                onKeyPress={(e) => onKeyPress("email", e)}/>

                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user) => (
                                        <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-2">{user.id}</td>
                                            <td className="px-3 py-2">{user.name}</td>
                                            <td className="px-3 py-2">{user.email}</td>
                                            <td className="px-3 py-2">{user.created_at}</td>
                                            <td className="px-3 py-2 text-nowrap">
                                                <Link href={route("user.edit", user.id)}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <button onClick={(e) => deleteUser(user)}
                                                className="font-medium text-red-600 dark:red-blue-500 hover:underline mx-1"
                                                >
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        <Pagination links={users.meta.links}></Pagination>
                    </div>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}