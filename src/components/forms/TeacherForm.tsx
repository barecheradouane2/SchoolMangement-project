"use client"
import { z } from 'zod'; 
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../InputField';

import Image from "next/image"; 


const schema = z.object({
  username: z.string().min(3, { message: 'username must be at list 3' }
  ).max(9,{message: 'username must be at max 9'}),
  email:z.string().email({message: 'invalid email address!'}),
  password:z.string().min(8, { message: 'passwrod must be at list 8' }
  ),
  firstname:z.string().min(1, { message: 'firstname must be at list 1' }
  ),
  lastname:z.string().min(1, { message: 'lastname must be at list 1' }
  ),
   phone:z.string().min(1, { message: 'phone must be at list 1' }
  ), address:z.string().min(1, { message: 'address must be at list 1' }

  ),
   bloodType:z.string().min (1, { message: 'Blood is required' }),
  
  birthday:z.string().min(1, { message: 'birthday must be at list 1' }
  ),sex:z.enum(["male","female"],{ message: 'sex is required' }),
  img:z.instanceof(File,{ message: 'Image is required' })
  
});

type Inputs = z.infer<typeof schema>;


const TeacherForm = ({type,data}:{
    type:"create" | "update";
    data?:any
}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  


  return (
    <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit((d) => console.log(d))}>
      <h1 className='text-xl font-semibold'>create new Teacher</h1>
      <span className='text-gray-400 text-xs font-medium'>Authentification</span>
      <div className='flex gap-4 flex-col md:flex-row  justify-between flex-wrap'> 

        <InputField label="username" name="username"  defaultValue={data?.username} register={register}
        error={errors?.username}
        />

        <InputField label="email" name="email" defaultValue={data?.email} register={register}
        error={errors?.email}
        />

        <InputField label="Password" name="password" defaultValue={data?.password} register={register}
        error={errors?.password}
        />
         
        
        
      </div>
      <span className='text-gray-400 text-xs font-medium'>Personal Information</span>

       <div className='flex gap-4 flex-col md:flex-row  justify-between flex-wrap'> 
        
        <InputField label="Firstname" name="firstname"  defaultValue={data?.firstname} register={register}
        error={errors?.firstname}
        />

        <InputField label="Lastname" name="lastname" defaultValue={data?.lastname} register={register}
        error={errors?.lastname}
        />

        <InputField label="Phone" name="phone" defaultValue={data?.phone} register={register}
        error={errors?.phone}
        />

        <InputField label="Address" name="address" defaultValue={data?.address} register={register}
        error={errors?.address}
        />

        <InputField label="Blood Type" name="bloodType" defaultValue={data?.bloodType} register={register}
        error={errors?.bloodType}
        />
        <InputField label="Birthday" name="birthday" defaultValue={data?.birthday} register={register}
        error={errors?.birthday} type='date'
        />

     

          
      </div>

      <div className='flex gap-4 flex-col md:flex-row  items-center justify-between  m-4 flex-wrap'>

           <div className='flex flex-col gap-1'>
           <select className='text-sm text-gray-500 border-spacing-1 p-2 px-4  border border-gray-300' {...register('sex')}>
            <option value="">Select Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            </select>

            {errors?.sex && <p className='text-xs text-red-500'>{errors 
            .sex.message}</p>}
        
        
        </div>

        <div className='flex flex-col gap-2 w-full md:w-1/4'>
      <label htmlFor='img' className="text-xs text-gray-500 flex items-center ">
        <Image src="/upload.png" alt="upload" width={14} height={14} />
        <span>Upload Image</span>
      </label>

      <input type="file" id="img" className='hidden' {...register('img')} />

      {errors?.img && <p className='text-xs text-red-500'>{errors 
            .img.message}</p>}


      </div>


      </div>

    

      

       

      <button type="submit" className='bg-blue-400 text-white  w-full p-2 rounded-md'>
        {type==="create"?"Create":"Update"}
      </button>
     
    </form>
  )
}

export default TeacherForm