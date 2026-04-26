"use client"
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'

import {calendarEvents} from "@/lib/data"
import { useState } from 'react'

const localizer = momentLocalizer(moment)
const BigCalender = () => {

  const [view,setView]=useState<View>(Views.WORK_WEEK);
  const  handlechangeview=(selectedview:View)=>{
    setView(selectedview);
  }

  return (
    <div className=''>
        <div>
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={["work_week","day"]}
      view={view}
      onView={handlechangeview}
      style={{ height: 500 }}
      min={new Date(2026,1,0,8,0,0)}
      max={new Date(2026,1,0,17,0,0)}
    />
  </div>
    </div>
  )
}

export default BigCalender