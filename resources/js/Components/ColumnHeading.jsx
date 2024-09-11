import {ChevronUpIcon, ChevronDownIcon} from '@heroicons/react/20/solid';

export default function ColumnHeading ({name, children, queryParams, sortChanged = () => {}}){
    
    return (
            <th onClick={(e)=>sortChanged(name)} className="px-3 py-3">
                <div className="flex items-center gap-3 cursor-pointer">
                    {children}
                    <div>
                        <ChevronUpIcon className={"w-4 " + (queryParams.sort_field == name 
                                        && queryParams.sort_direction == 'asc' ? 'text-white' : '')}/>
                        <ChevronDownIcon className={"w-4 -mt-2 "  + (queryParams.sort_field == name
                                        && queryParams.sort_direction == 'desc' ? 'text-white' : '')}/>
                    </div>
                </div>
            </th>
)};