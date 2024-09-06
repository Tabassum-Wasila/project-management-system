import { Link } from "@inertiajs/react";

export default function Pagination({links}) {
    return (
        <nav className="text-center mt-4">
            {links.map(link => (
                <Link 
                    preserveScroll
                    href={link.url}
                    key={link.label}
                    className={"px-3 " + 
                                (link.active? " bg-gray-200 dark:bg-gray-900 " : " ") + 
                                (link.url? "dark:hover:bg-gray-900 hover:bg-gray-200 " : "!text-gray-500 cursor-not-allowed ")} 
                    dangerouslySetInnerHTML={{__html: link.label}}>
                </Link>
            ))}
        </nav>
    )
}