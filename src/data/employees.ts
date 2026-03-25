export type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  email: string;
  phone: string;
  manager: string;
};

export const EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Product Designer",
    department: "Design",
    location: "Edinburgh",
    email: "sarah.johnson@company.com",
    phone: "+44 131 555 0101",
    manager: "Emma Clarke",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Frontend Developer",
    department: "Engineering",
    location: "London",
    email: "michael.chen@company.com",
    phone: "+44 20 5555 0102",
    manager: "Daniel Moore",
  },
  {
    id: "3",
    name: "Priya Patel",
    role: "HR Manager",
    department: "People",
    location: "Manchester",
    email: "priya.patel@company.com",
    phone: "+44 161 555 0103",
    manager: "Sophie Reed",
  },
  {
    id: "4",
    name: "James Walker",
    role: "Sales Lead",
    department: "Sales",
    location: "Bristol",
    email: "james.walker@company.com",
    phone: "+44 117 555 0104",
    manager: "Olivia Turner",
  },
  {
    id: "5",
    name: "Elena Rossi",
    role: "Mobile Developer",
    department: "Engineering",
    location: "Edinburgh",
    email: "elena.rossi@company.com",
    phone: "+44 131 555 0105",
    manager: "Daniel Moore",
  },
];
