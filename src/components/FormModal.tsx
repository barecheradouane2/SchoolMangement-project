"use client"

import Image from "next/image";
import { useState } from "react";

import dynamic from "next/dynamic";

const FormModal = ({table,type,data,id}:{
    table:"teacher"  |"student" | "parent" | "subject" | "class" | "lesson" | "exam"
    | "assignment" | "result" | "attendance" | "event" | "annoucement"
    ;
    type:"create" | "update" | "delete";
    data?:any;
    id?:number
}) => {

    const size =type=== "create"? "w-8 h-8" :"w-7 h-7"
    const bgcolor= type === "create" ?" bg-lamaYellow " : type === "update" ? "bg-lamaSky" :
    "bg-lamaPurple";

    const [open,setopen]=useState(false);

    const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
        loading: () => <p>Loading...</p>,
      });

    const forms :  {
        [key:string]:(type:"create" | "update", data?:any)=>JSX.Element;
    } = {
        teacher :(type,data) => <TeacherForm type={type} data={data} />
      
    }

    const Form =()=>{
        return type ==="delete" && id ? (
            <form action="" className="p-4 flex flex-col gap-4">
                <span className="text-center">are you sure you want to delete  this {table} ?</span>
                <button className="bg-red-400 text-white py-2 px-2 rounded-md border-none">delete</button>

            </form>
        ) : type==="create" || type==="update" ? (
            
           forms[table](type,data) 
        ) : null;
    }

    


  return (
    <>
    <button onClick={()=>setopen(!open)} className={`${size} ${bgcolor} rounded-full flex items-center justify-between p-2 `}>
        
         <Image src={`/${type}.png`} alt={`${type}`} width={14} height={14} />
    </button>

    {open  && (
        <div className="h-screen w-screen flex justify-center items-center bg-black bg-opacity-60 z-40 absolute top-0 left-0"> 
         
         <div className="bg-white relative p-4 w-[90%] md:w-[70%] lg:w-[60%]  xl:w-[50%] 2xl:w-[40%] ">

            {/* <div className="flex justify-between items-center">
                <h3>{type}</h3>

                <button onClick={()=>setopen(false)} className="bg-lamaYellow p-2 rounded-full flex items-center justify-between">
                   
                    <Image src="/close.png" alt="logo" width={14} height={14} />
                </button>

            </div> */}

            <div className="absolute  top-0 right-0 p-4">
                  <button onClick={()=>setopen(false)} className="bg-lamaYellow p-2 rounded-full flex items-center justify-between">
                   
                    <Image src="/close.png" alt="logo" width={14} height={14} />
                </button>

            </div>

            <Form/>

         </div>

        </div>
    )}

    </>
  )
}

export default FormModal