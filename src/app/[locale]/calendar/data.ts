export interface CalendarEvent {
  id: number;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  color: string;
  category: string;
}

// Sample events data
export const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Team Standup",
    description: "Daily team sync meeting to discuss progress and blockers",
    date: new Date(2026, 0, 6),
    startTime: "09:00",
    endTime: "09:30",
    color: "bg-blue-500",
    category: "Work",
  },
  {
    id: 2,
    title: "Project Review",
    description: "Quarterly project review with stakeholders",
    date: new Date(2026, 0, 6),
    startTime: "14:00",
    endTime: "15:30",
    color: "bg-purple-500",
    category: "Meeting",
  },
  {
    id: 3,
    title: "Lunch with Sarah",
    description: "Catching up over lunch at the new cafe",
    date: new Date(2026, 0, 7),
    startTime: "12:00",
    endTime: "13:00",
    color: "bg-green-500",
    category: "Personal",
  },
  {
    id: 4,
    title: "Code Review",
    description: "Review pull requests for the new feature branch",
    date: new Date(2026, 0, 8),
    startTime: "10:00",
    endTime: "11:00",
    color: "bg-orange-500",
    category: "Work",
  },
  {
    id: 5,
    title: "Client Call",
    description: "Weekly sync with the client about project requirements",
    date: new Date(2026, 0, 9),
    startTime: "16:00",
    endTime: "17:00",
    color: "bg-red-500",
    category: "Meeting",
  },
  {
    id: 6,
    title: "Gym Session",
    description: "Weekly workout session",
    date: new Date(2026, 0, 10),
    startTime: "07:00",
    endTime: "08:00",
    color: "bg-emerald-500",
    category: "Personal",
  },
  {
    id: 7,
    title: "Design Workshop",
    description: "UI/UX design workshop for the new product",
    date: new Date(2026, 0, 12),
    startTime: "13:00",
    endTime: "16:00",
    color: "bg-pink-500",
    category: "Work",
  },
  {
    id: 8,
    title: "Sprint Planning",
    description: "Planning session for the next sprint",
    date: new Date(2026, 0, 13),
    startTime: "10:00",
    endTime: "12:00",
    color: "bg-indigo-500",
    category: "Meeting",
  },
];

export const eventColors = [
  { name: "Blue", value: "bg-blue-500" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Green", value: "bg-green-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Red", value: "bg-red-500" },
  { name: "Emerald", value: "bg-emerald-500" },
  { name: "Pink", value: "bg-pink-500" },
  { name: "Indigo", value: "bg-indigo-500" },
];

export const categories = ["Work", "Meeting", "Personal", "Other"];
