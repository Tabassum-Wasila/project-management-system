import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({auth}){
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    
    const onSubmit = (e) => {
        e.preventDefault();

        post(route('user.store'));
    }

    return (
        <AuthenticatedLayout
        user={auth.user}
            header={
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create new User
                </h2>
            </div>
            }
        >
            <Head title="User" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
                            <form onSubmit={onSubmit}>
                                
                                <div className="mt-4">
                                    <InputLabel 
                                    htmlFor="user_name" 
                                        value="User Name"
                                    />
                                    <TextInput
                                        id="user_name"
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
                                    htmlFor="user_email" 
                                        value="User Email"
                                    />
                                    <TextInput
                                        id="user_email"
                                        type="text"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel 
                                    htmlFor="user_password" 
                                        value="Password"
                                    />
                                    <TextInput
                                        id="user_password"
                                        type="password"
                                        name="password"
                                        className="mt-1 block w-full"
                                        onChange={e => setData('password', e.target.value)}
                                    />
                                    <InputError message={errors.password} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel 
                                    htmlFor="user_password_confirmation" 
                                        value="Confirm Password"
                                    />
                                    <TextInput
                                        id="user_password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        className="mt-1 block w-full"
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2"/>
                                </div>
                                
                                
                                <div className="mt-4 text-right items-center">
                                    <Link
                                        href={route('user.index')}
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