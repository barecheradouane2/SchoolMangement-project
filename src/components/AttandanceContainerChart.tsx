import prisma from "@/lib/prisma";
import AttandanceChart from "./AttandanceChart";

const AttandanceContainerChart =async () => {

    const today = new Date();
const dayNumber = today.getDay();

 const daysSinceMonday = dayNumber === 0 ? 6 : dayNumber - 1;

  const lastMonday = new Date(today);

  lastMonday.setDate(today.getDate() - daysSinceMonday);





let  result = await prisma.attendance.groupBy({
  by: ['date',"present"],
  where: {
    date: {
      gte: lastMonday,
      lte: today,
    },
  },
  _count: {
    id: true,
  },
});

const grouped = result.reduce((acc, entry) => {
  const date = entry.date.toLocaleDateString("en-US", {
    weekday: "short",
  });

  if (!acc[date]) {
    acc[date] = {
      date,
      present: 0,
      absent: 0,
    };
  }

  if (entry.present) {
    acc[date].present = entry._count.id;
  } else {
    acc[date].absent = entry._count.id;
  }

  return acc;
}, {} as Record<string, { date: string; present: number; absent: number }>);

const attendanceData = Object.values(grouped);







  return (
    <div className='flex  flex-col gap-2 justify-center'>
            <div className='flex justify-between items-center'>
                <span className='text-[16px] font-semibold'>Attandance</span>
                <div className='w-[25px] h-[25px] text-xl mb-5 cursor-pointer' >
                    ...
                </div>
                  
                
    
            </div>
            <div className='flex gap-4'>
    
            </div>

            <AttandanceChart data={attendanceData} />
            
            
    </div>

            

        
  )
}

export default AttandanceContainerChart