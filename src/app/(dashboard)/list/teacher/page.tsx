import SearchTable from "@/components/SearchTable"

import Image from "next/image";
import  TableList from "@/components/TableList"
import { role } from "@/lib/data";

import {teachersData} from  "@/lib/data";

import Link from "next/link";
import Pagination from "@/components/Pagination";

import FormModal from "@/components/FormModal";

const TeacherListPage = () => {

    const columns =[
        {
           header :"Info",
           accessor:"info"
        },
        {
             header :"Teacher ID",
           accessor:"teacherId",
           className:"hidden md:table-cell"


        },
        {
            header: "Subject",
            accessor:"subject",
            className:"hidden md:table-cell"

    },{
          header: "Classes",
            accessor:"classes",
            className:"hidden md:table-cell"

    },{
          header: "Phone",
            accessor:"phone",
            className:"hidden md:table-cell"

    },{
          header: "Address",
            accessor:"address",
            className:"hidden md:table-cell"

    },{
         header: "Action",
            accessor:"action"
           
    }

    ]

    type Teacher={
        id:number,
        teacherId:number,
        name:string,
        email?:string,
        photo:string,
        phone:string,
        subjects:string [],
        classes:string [],
        address:string,
        

    }

    const renderRow =(item :Teacher) =>(
        <tr key={item.id} className="py-4 even:bg-slate-100 hover:bg-lamaPurple hover:cursor-pointer">
            <td className=" flex items-center gap-4 py-1">
                 <Image src={item.photo} alt="photo"  className=" hidden w-8 h-8 md:flex rounded-full" width={14} height={14} />

                 <div className="flex flex-col " >
                    <p className="font-semibold text-sm ">{item.name}</p>
                    <p className="text-xs">{item.email}</p>

                 </div>
            </td>
            <td className="hidden md:table-cell text-sm">{item.teacherId}</td>
            <td className="hidden md:table-cell text-sm">{item.subjects.join(",")}</td>
            <td className="hidden md:table-cell text-sm">{item.classes.join(",")}</td>
            <td className="hidden md:table-cell text-sm">{item.phone}</td>
            <td className="hidden md:table-cell text-sm">{item.address}</td>
            <td>{
               ( role=="admin") && (
                <div className="flex items-center gap-2">
                    <Link href={`/list/teacher/${item.id}`}>
                    <button className="rounded-full w-7 h-7 bg-lamaSky flex items-center justify-between p-2">
                        <Image className="
                        " src="/update.png" alt="view" width={18} height={18}/>
                    </button>
                    </Link>
                      <button className="rounded-full w-7 h-7  bg-lamaPurple flex items-center justify-between p-2 ">
                        <Image src="/delete.png" alt="delete"width={18} height={18}/>
                    </button>

                </div>
               )
                }</td>

        </tr>
)




  return (
    <div className='bg-white m-4 p-4'>
        {/* top */}
        <div className="flex items-center justify-between">
            <h1 className="font-semibold text-sm hidden md:flex">All Teachers</h1>
            <div className=" flex flex-col md:flex-row items-center gap-2">
                <SearchTable />

                <div className="flex items-center gap-2">
                    <button className="bg-lamaYellow p-2 rounded-full flex items-center justify-between">
                        <Image src="/filter.png" alt="logo" width={14} height={14} />

                    </button>
                     <button className="bg-lamaYellow p-2 rounded-full flex items-center justify-between">
                        <Image src="/sort.png" alt="logo" width={14} height={14} />

                    </button>
                   
                   <FormModal table="teacher" type="create" />
                
                  

                </div>

            </div>
        </div>
         {/* table */}
         <TableList columns={columns} renderRow={renderRow}  data={teachersData}/>
         {/* bottom */}
         
         <Pagination />
    </div>
  )
}

export default TeacherListPage