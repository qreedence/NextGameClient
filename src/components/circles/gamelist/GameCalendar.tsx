// import * as React from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import type { DayClickEventHandler } from "react-day-picker";
// import { format, isValid } from "date-fns";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface GameCalendarProps {
//   datesPlayed: string[];
//   onSelectDate?: DayClickEventHandler;
// }

// export default function GameCalendar({
//   datesPlayed,
//   onSelectDate,
// }: GameCalendarProps) {
//   // Convert string dates to Date objects
//   const playedDates = datesPlayed
//     .map((date) => new Date(date))
//     .filter((date) => isValid(date));

//   // Get earliest and latest dates for range
//   const sortedDates = [...playedDates].sort(
//     (a, b) => a.getTime() - b.getTime()
//   );
//   const earliestDate = sortedDates.length > 0 ? sortedDates[0] : new Date();
//   const latestDate =
//     sortedDates.length > 0 ? sortedDates[sortedDates.length - 1] : new Date();

//   // State for current date
//   const [date, setDate] = React.useState<Date>(latestDate);
//   const [calendarOpen, setCalendarOpen] = React.useState(false);

//   // Get years range for the select
//   const startYear = earliestDate.getFullYear();
//   const endYear = Math.max(latestDate.getFullYear(), new Date().getFullYear());
//   const years = Array.from(
//     { length: endYear - startYear + 1 },
//     (_, i) => startYear + i
//   );

//   // Get months for select
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   // Custom modifiers to highlight played dates
//   const playedDatesModifier = {
//     played: playedDates,
//   };

//   // Custom component to render the calendar header with month/year selection
//   function CalendarHeader({
//     date,
//     decreaseMonth,
//     increaseMonth,
//     setDate,
//   }: {
//     date: Date;
//     decreaseMonth: () => void;
//     increaseMonth: () => void;
//     setDate: (date: Date) => void;
//   }) {
//     const handleMonthChange = (month: string) => {
//       const newDate = new Date(date);
//       const monthIndex = months.findIndex((m) => m === month);
//       if (monthIndex !== -1) {
//         newDate.setMonth(monthIndex);
//         setDate(newDate);
//       }
//     };

//     const handleYearChange = (year: string) => {
//       const newDate = new Date(date);
//       newDate.setFullYear(Number.parseInt(year));
//       setDate(newDate);
//     };

//     return (
//       <div className="flex items-center justify-between px-1 py-1">
//         <Button
//           variant="outline"
//           className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
//           onClick={decreaseMonth}
//         >
//           <ChevronLeft className="h-4 w-4" />
//           <span className="sr-only">Previous month</span>
//         </Button>

//         <div className="flex items-center gap-1">
//           <Select
//             value={months[date.getMonth()]}
//             onValueChange={handleMonthChange}
//           >
//             <SelectTrigger className="h-7 border-none px-2 py-0 text-sm font-normal">
//               <SelectValue placeholder={format(date, "MMMM")} />
//             </SelectTrigger>
//             <SelectContent>
//               {months.map((month) => (
//                 <SelectItem key={month} value={month} className="text-sm">
//                   {month}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Select
//             value={date.getFullYear().toString()}
//             onValueChange={handleYearChange}
//           >
//             <SelectTrigger className="h-7 border-none px-2 py-0 text-sm font-normal">
//               <SelectValue placeholder={format(date, "yyyy")} />
//             </SelectTrigger>
//             <SelectContent>
//               {years.map((year) => (
//                 <SelectItem
//                   key={year}
//                   value={year.toString()}
//                   className="text-sm"
//                 >
//                   {year}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <Button
//           variant="outline"
//           className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
//           onClick={increaseMonth}
//         >
//           <ChevronRight className="h-4 w-4" />
//           <span className="sr-only">Next month</span>
//         </Button>
//       </div>
//     );
//   }

//   // Month/Year picker popover
//   const MonthYearPicker = () => {
//     const [selectedMonth, setSelectedMonth] = React.useState(
//       months[date.getMonth()]
//     );
//     const [selectedYear, setSelectedYear] = React.useState(
//       date.getFullYear().toString()
//     );

//     const handleSelect = () => {
//       const monthIndex = months.findIndex((m) => m === selectedMonth);
//       const year = Number.parseInt(selectedYear);

//       if (monthIndex !== -1 && !isNaN(year)) {
//         const newDate = new Date(date);
//         newDate.setMonth(monthIndex);
//         newDate.setFullYear(year);
//         setDate(newDate);
//         setCalendarOpen(false);
//       }
//     };

//     return (
//       <div className="flex flex-col space-y-3 p-3">
//         <div className="grid grid-cols-2 gap-2">
//           <div className="flex flex-col space-y-1">
//             <label className="text-xs font-medium">Month</label>
//             <Select value={selectedMonth} onValueChange={setSelectedMonth}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Month" />
//               </SelectTrigger>
//               <SelectContent>
//                 {months.map((month) => (
//                   <SelectItem key={month} value={month}>
//                     {month}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="flex flex-col space-y-1">
//             <label className="text-xs font-medium">Year</label>
//             <Select value={selectedYear} onValueChange={setSelectedYear}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Year" />
//               </SelectTrigger>
//               <SelectContent>
//                 {years.map((year) => (
//                   <SelectItem key={year} value={year.toString()}>
//                     {year}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <Button onClick={handleSelect}>Go to Date</Button>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-2">
//       <div className="flex items-center justify-between">
//         <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               className="font-normal justify-start text-left"
//             >
//               {format(date, "MMMM yyyy")}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0" align="start">
//             <MonthYearPicker />
//           </PopoverContent>
//         </Popover>
//       </div>

//       <Calendar
//         mode="single"
//         selected={date}
//         onSelect={(newDate) => newDate && setDate(newDate)}
//         onDayClick={onSelectDate}
//         modifiers={playedDatesModifier}
//         modifiersClassNames={{
//           played: "bg-green-500 text-white font-medium hover:bg-green-600",
//         }}
//         components={{
//           Header: CalendarHeader,
//         }}
//         className="rounded-md border"
//       />

//       <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-2">
//         <div className="w-3 h-3 rounded-full bg-green-500"></div>
//         <span>Game played on this day</span>
//       </div>
//     </div>
//   );
// }
