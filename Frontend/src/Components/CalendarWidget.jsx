import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

function CalendarWidget(){

const [value,setValue]=useState(new Date());

return(

<div className="chart-card">

<h3>Calendar</h3>

<Calendar
value={value}
onChange={setValue}
/>

</div>

);

}

export default CalendarWidget;