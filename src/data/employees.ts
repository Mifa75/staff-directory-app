export type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  email: string;
};

export const EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Product Designer",
    department: "Design",
    location: "Edinburgh",
    email: "sarah.johnson@company.com",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Frontend Developer",
    department: "Engineering",
    location: "London",
    email: "michael.chen@company.com",
  },
  {
    id: "3",
    name: "Priya Patel",
    role: "HR Manager",
    department: "People",
    location: "Manchester",
    email: "priya.patel@company.com",
  },
  {
    id: "4",
    name: "James Walker",
    role: "Sales Lead",
    department: "Sales",
    location: "Bristol",
    email: "james.walker@company.com",
  },
  {
    id: "5",
    name: "Elena Rossi",
    role: "Mobile Developer",
    department: "Engineering",
    location: "Edinburgh",
    email: "elena.rossi@company.com",
  },
];
