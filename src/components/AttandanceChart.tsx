"use client" 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


// #region Sample data
type AttendanceItem = {
  date: string;
  present: number;
  absent: number;
};

type Props = {
  data: AttendanceItem[];
};

const AttandanceChart = ({ data }: Props) => {
  return (
    
        <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="Present" fill="#FAE27C" activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[10, 10, 0, 0]} />
      <Bar dataKey="Absent" fill="#C3EBFA" activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[10, 10, 0, 0]} />
     
    </BarChart>
  
  )
}

export default AttandanceChart