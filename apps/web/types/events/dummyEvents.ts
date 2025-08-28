export type Host = {
  name: string;
  email: string;
  role?: "Creator" | "Manager";
  isCurrentUser: boolean;
  position?: string;
};

export type TimeRange = {
  start: string; // "15:00"
  end: string; // "22:00"
};

export type TaskStatus = "pending" | "in_progress" | "completed";
export type GuestStatus = "going" | "not_going" | "pending";
export type Currency = "$" | "£" | "€" | "¥";
export type NavigationTab = "details" | "guests" | "tasks" | "budget";

// Base Interfaces
export interface Person {
  name: string;
  email: string;
}

export interface CoHost extends Person {
  role?: string;
}

export interface Time {
  start: string; // HH:MM format
  end: string; // HH:MM format
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Venue {
  name: string;
  address: string;
  coordinates: Coordinates;
}

export interface BudgetCategory {
  id: number;
  name: string;
  budgeted: number;
  spent: number;
  color?: string; // Hex color code
}

export interface Budget {
  total: number;
  spent: number;
  currency: Currency;
  categories: BudgetCategory[];
}

export interface Task {
  id: number;
  title: string;
  cost: number;
  currency: Currency;
  dueDate: string; // YYYY-MM-DD format
  status: TaskStatus;
  assignee: number; // References host/cohost ID
}

export interface Guest {
  id: number;
  name: string;
  email: string;
  status: GuestStatus;
  avatar: string; // URL to avatar image
  invitedDate?: string; // YYYY-MM-DD format
}

export interface EventStats {
  totalInvited: number;
  going: number;
  notGoing: number;
  pending: number;
}

export interface Theme {
  primaryColor: string; // Hex color code
  secondaryColor: string; // Hex color code
  accentColor: string; // Hex color code
}

// Main Wedding Event Interface
export interface FullEventsProps {
  id: number;
  name: string;
  type: "past" | "upcoming" | "drafts";
  host: Host;
  coHost: CoHost;
  date: string; // YYYY-MM-DD format
  time: Time;
  venue: Venue;
  description: string;
  budget: Budget;
  tasks: Task[];
  guests: Guest[];
  stats: EventStats;
  theme: Theme;
  backgroundImage: string; // URL to background image
}

export type EventProps = {
  id: string;
  name: string;
  hosts: Host[];
  date: string;
  time: TimeRange;
  toDo: string[];
  venue: {
    name: string;
    address: string;
  };
  slug: string;
  guestStats: {
    going: number;
    pending: number;
    notGoing: number;
  };
  about: string;
};

export const data: EventProps[] = [
  {
    id: "event_001",
    name: "Oliver & Emily's Wedding",
    date: "2025-08-20",
    time: {
      start: "15:00",
      end: "22:00",
    },
    venue: {
      name: "The Grand Hall, Rosewood Estate",
      address: "123 Broadway Avenue, NY 10001",
    },
    slug: "oliver-emily-wedding",
    hosts: [
      {
        name: "Jenny Wilson",
        email: "jenny@example.com",
        role: "Creator",
        isCurrentUser: true,
      },
      {
        name: "Groom’s Name",
        email: "Hgroom’sname@email.com",
        role: "Manager",
        isCurrentUser: false,
      },
    ],
    toDo: ["Send Invites", "Confirm Photographer", "Book Venue"],
    guestStats: {
      going: 0,
      pending: 0,
      notGoing: 0,
    },
    about:
      "Celebrate the union of Oliver and Emily at the beautiful Rosewood Estate. Enjoy a romantic ceremony, followed by a gourmet dinner and lively dance.",
  },
];
export const invitedGuest = [
  {
    name: "Kathryn Murphy",
    email: "deanna.curtis@example.com",
    status: "going",
  },
  {
    name: "Theresa Webb",
    email: "tim.jennings@example.com",
    status: "notGoing",
  },
  {
    name: "Darlene Robertson",
    email: "darlene.robertson@example.com",
    status: "going",
  },
  {
    name: "Ralph Edwards",
    email: "ralph.edwards@example.com",
    status: "maybe",
  },
  {
    name: "Savannah Nguyen",
    email: "savannah.nguyen@example.com",
    status: "notGoing",
  },
  {
    name: "Arlene McCoy",
    email: "arlene.mccoy@example.com",
    status: "going",
  },
  {
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    status: "going",
  },
  {
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    status: "maybe",
  },
  {
    name: "Kristin Watson",
    email: "kristin.watson@example.com",
    status: "notGoing",
  },
  {
    name: "Brooklyn Simmons",
    email: "brooklyn.simmons@example.com",
    status: "going",
  },
  {
    name: "Esther Howard",
    email: "esther.howard@example.com",
    status: "going",
  },
  {
    name: "Guy Hawkins",
    email: "guy.hawkins@example.com",
    status: "maybe",
  },
  {
    name: "Albert Flores",
    email: "albert.flores@example.com",
    status: "notGoing",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    status: "going",
  },
  {
    name: "Jerome Bell",
    email: "jerome.bell@example.com",
    status: "maybe",
  },
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    status: "going",
  },
];
export const dummyEvents: FullEventsProps[] = [
  {
    id: 1,
    name: "Oliver & Emily's Wedding",
    host: {
      role: "Manager",
      name: "Jenny Wilson",
      email: "jenny@example.com",
      isCurrentUser: true,
    },
    coHost: {
      role: "photographers",
      name: "Groom's Name",
      email: "groomsname@email.com",
    },
    date: "2025-08-20",
    type: "drafts",
    time: {
      start: "15:00",
      end: "22:00",
    },
    venue: {
      name: "The Grand Hall, Rosewood Estate",
      address: "123 Broadway Avenue, NY 10001",
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
    description:
      "Celebrate the union of Oliver and Emily at the beautiful Rosewood Estate. Enjoy a romantic ceremony, followed by a gourmet dinner and lively dance. Join us for an evening of love, joy, and unforgettable memories as the couple begins their journey together.",
    budget: {
      total: 50000,
      spent: 30000,
      currency: "$",
      categories: [
        {
          id: 1,
          name: "Venue",
          budgeted: 2500,
          spent: 2500,
          color: "#8B5CF6",
        },
        {
          id: 2,
          name: "Music and Entertainment",
          budgeted: 1200,
          spent: 1200,
          color: "#60A5FA",
        },
        {
          id: 3,
          name: "Feeding",
          budgeted: 8000,
          spent: 200,
          color: "#C084FC",
        },
        {
          id: 4,
          name: "Photography & Videography",
          budgeted: 3000,
          spent: 0,
          color: "#F87171",
        },
        {
          id: 5,
          name: "Florals & Décor",
          budgeted: 2000,
          spent: 0,
          color: "#34D399",
        },
      ],
    },
    tasks: [
      {
        id: 1,
        title: "Book the Perfect Venue",
        cost: 4500,
        currency: "£",
        dueDate: "2025-02-19",
        status: "completed",
        assignee: 1,
      },
      {
        id: 2,
        title: "Arrange Delicious Catering for Your Guests",
        cost: 8000,
        currency: "£",
        dueDate: "2025-02-22",
        status: "completed",
        assignee: 1,
      },
      {
        id: 3,
        title: "Capture Every Moment with Photography & Videography",
        cost: 3000,
        currency: "£",
        dueDate: "2025-02-22",
        status: "pending",
        assignee: 1,
      },
      {
        id: 4,
        title: "Set the Mood with Entertainment (DJ/Band)",
        cost: 1500,
        currency: "£",
        dueDate: "2025-02-22",
        status: "pending",
        assignee: 2,
      },
      {
        id: 5,
        title: "Decorate the Venue with Beautiful Florals & Décor",
        cost: 2000,
        currency: "£",
        dueDate: "2025-02-22",
        status: "pending",
        assignee: 1,
      },
    ],
    guests: [
      {
        id: 1,
        name: "Kathryn Murphy",
        email: "deanna.curtis@example.com",
        status: "going",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612c7bd?w=150",
        invitedDate: "2025-01-15",
      },
      {
        id: 2,
        name: "Theresa Webb",
        email: "tim.jennings@example.com",
        status: "going",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        invitedDate: "2025-01-15",
      },
      {
        id: 3,
        name: "Darlene Robertson",
        email: "kenzi.lawson@example.com",
        status: "going",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        invitedDate: "2025-01-15",
      },
      {
        id: 4,
        name: "Arlene McCoy",
        email: "curtis.weaver@example.com",
        status: "going",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        invitedDate: "2025-01-15",
      },
      {
        id: 5,
        name: "Jane Cooper",
        email: "alma.lawson@example.com",
        status: "going",
        avatar:
          "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150",
        invitedDate: "2025-01-15",
      },
      {
        id: 6,
        name: "Jacob Jones",
        email: "debbie.baker@example.com",
        status: "going",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        invitedDate: "2025-01-15",
      },
      {
        id: 7,
        name: "Robert Fox",
        email: "robert.fox@example.com",
        status: "going",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        invitedDate: "2025-01-15",
      },
      {
        id: 8,
        name: "Brooklyn Simmons",
        email: "brooklyn.simmons@example.com",
        status: "going",
        avatar:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150",
        invitedDate: "2025-01-15",
      },
      {
        id: 9,
        name: "Leslie Alexander",
        email: "leslie.alexander@example.com",
        status: "not_going",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
        invitedDate: "2025-01-15",
      },
      {
        id: 10,
        name: "Guy Hawkins",
        email: "guy.hawkins@example.com",
        status: "not_going",
        avatar:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150",
        invitedDate: "2025-01-15",
      },
      {
        id: 11,
        name: "Savannah Nguyen",
        email: "savannah.nguyen@example.com",
        status: "pending",
        avatar:
          "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150",
        invitedDate: "2025-01-20",
      },
      {
        id: 12,
        name: "Ralph Edwards",
        email: "ralph.edwards@example.com",
        status: "pending",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
        invitedDate: "2025-01-20",
      },
    ],
    stats: {
      totalInvited: 12,
      going: 8,
      notGoing: 2,
      pending: 2,
    },
    theme: {
      primaryColor: "#8B5CF6",
      secondaryColor: "#60A5FA",
      accentColor: "#C084FC",
    },
    backgroundImage:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200",
  },
  {
    id: 2,
    name: "Sarah & Michael's Beach Wedding",
    host: {
      role: "Manager",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      isCurrentUser: false,
    },
    coHost: {
      role: "photographers",
      name: "Michael Rodriguez",
      email: "michael.rodriguez@example.com",
    },
    date: "2025-06-15",
    type: "drafts",
    time: {
      start: "16:30",
      end: "23:00",
    },
    venue: {
      name: "Sunset Beach Resort",
      address: "456 Ocean Drive, Miami, FL 33139",
      coordinates: {
        lat: 25.7617,
        lng: -80.1918,
      },
    },
    description:
      "Join us for a magical beachfront ceremony as Sarah and Michael exchange vows with the ocean as their backdrop. Experience a sunset celebration with tropical cocktails, fresh seafood, and dancing under the stars.",
    budget: {
      total: 35000,
      spent: 28500,
      currency: "$",
      categories: [
        {
          id: 1,
          name: "Venue",
          budgeted: 8000,
          spent: 8000,
          color: "#06B6D4",
        },
        {
          id: 2,
          name: "Music and Entertainment",
          budgeted: 2500,
          spent: 2500,
          color: "#8B5CF6",
        },
        {
          id: 3,
          name: "Catering",
          budgeted: 12000,
          spent: 12000,
          color: "#F59E0B",
        },
        {
          id: 4,
          name: "Photography & Videography",
          budgeted: 4500,
          spent: 4500,
          color: "#EF4444",
        },
        {
          id: 5,
          name: "Florals & Décor",
          budgeted: 3500,
          spent: 1500,
          color: "#10B981",
        },
      ],
    },
    tasks: [
      {
        id: 1,
        title: "Reserve Beachfront Venue",
        cost: 8000,
        currency: "$",
        dueDate: "2025-03-01",
        status: "completed",
        assignee: 1,
      },
      {
        id: 2,
        title: "Book Tropical Catering Menu",
        cost: 12000,
        currency: "$",
        dueDate: "2025-04-15",
        status: "completed",
        assignee: 2,
      },
      {
        id: 3,
        title: "Hire Beach Wedding Photographer",
        cost: 4500,
        currency: "$",
        dueDate: "2025-05-01",
        status: "completed",
        assignee: 1,
      },
      {
        id: 4,
        title: "Arrange Live Steel Drum Band",
        cost: 2500,
        currency: "$",
        dueDate: "2025-05-15",
        status: "completed",
        assignee: 2,
      },
      {
        id: 5,
        title: "Design Tropical Flower Arrangements",
        cost: 3500,
        currency: "$",
        dueDate: "2025-06-01",
        status: "in_progress",
        assignee: 1,
      },
    ],
    guests: [
      {
        id: 1,
        name: "Emma Watson",
        email: "emma.watson@example.com",
        status: "going",
        avatar:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150",
        invitedDate: "2025-02-01",
      },
      {
        id: 2,
        name: "James Wilson",
        email: "james.wilson@example.com",
        status: "going",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        invitedDate: "2025-02-01",
      },
      {
        id: 3,
        name: "Lisa Chen",
        email: "lisa.chen@example.com",
        status: "going",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        invitedDate: "2025-02-01",
      },
    ],
    stats: {
      totalInvited: 45,
      going: 38,
      notGoing: 4,
      pending: 3,
    },
    theme: {
      primaryColor: "#06B6D4",
      secondaryColor: "#10B981",
      accentColor: "#F59E0B",
    },
    backgroundImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200",
  },
  {
    id: 3,
    name: "David & Amanda's Garden Party",
    host: {
      role: "Manager",
      name: "Amanda Foster",
      email: "amanda.foster@example.com",
      isCurrentUser: false,
    },
    coHost: {
      role: "photographers",
      name: "David Mitchell",
      email: "david.mitchell@example.com",
    },
    date: "2025-09-12",
    type: "drafts",
    time: {
      start: "14:00",
      end: "20:00",
    },
    venue: {
      name: "Botanical Gardens Pavilion",
      address: "789 Garden Lane, Portland, OR 97205",
      coordinates: {
        lat: 45.5152,
        lng: -122.6784,
      },
    },
    description:
      "Celebrate love in full bloom at our enchanted garden wedding. Surrounded by vibrant flowers and lush greenery, join David and Amanda for an afternoon of romance, delicious cuisine, and joyful celebration in nature's embrace.",
    budget: {
      total: 42000,
      spent: 15800,
      currency: "$",
      categories: [
        {
          id: 1,
          name: "Venue",
          budgeted: 6500,
          spent: 6500,
          color: "#10B981",
        },
        {
          id: 2,
          name: "Music and Entertainment",
          budgeted: 3200,
          spent: 0,
          color: "#8B5CF6",
        },
        {
          id: 3,
          name: "Catering",
          budgeted: 15000,
          spent: 3000,
          color: "#F59E0B",
        },
        {
          id: 4,
          name: "Photography & Videography",
          budgeted: 5800,
          spent: 5800,
          color: "#EF4444",
        },
        {
          id: 5,
          name: "Florals & Décor",
          budgeted: 8500,
          spent: 500,
          color: "#EC4899",
        },
      ],
    },
    tasks: [
      {
        id: 1,
        title: "Book Garden Pavilion Venue",
        cost: 6500,
        currency: "$",
        dueDate: "2025-04-01",
        status: "completed",
        assignee: 1,
      },
      {
        id: 2,
        title: "Plan Farm-to-Table Catering",
        cost: 15000,
        currency: "$",
        dueDate: "2025-07-15",
        status: "in_progress",
        assignee: 2,
      },
      {
        id: 3,
        title: "Book Nature Photography Session",
        cost: 5800,
        currency: "$",
        dueDate: "2025-06-01",
        status: "completed",
        assignee: 1,
      },
      {
        id: 4,
        title: "Hire Acoustic String Quartet",
        cost: 3200,
        currency: "$",
        dueDate: "2025-08-01",
        status: "pending",
        assignee: 2,
      },
      {
        id: 5,
        title: "Design Wildflower Arrangements",
        cost: 8500,
        currency: "$",
        dueDate: "2025-08-15",
        status: "pending",
        assignee: 1,
      },
    ],
    guests: [],
    stats: {
      totalInvited: 85,
      going: 0,
      notGoing: 0,
      pending: 85,
    },
    theme: {
      primaryColor: "#10B981",
      secondaryColor: "#EC4899",
      accentColor: "#F59E0B",
    },
    backgroundImage:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200",
  },
  {
    id: 4,
    name: "Alex & Jordan's City Loft Wedding",
    host: {
      role: "Manager",
      name: "Alex Thompson",
      email: "alex.thompson@example.com",
      isCurrentUser: false,
    },
    coHost: {
      role: "photographers",
      name: "Jordan Kim",
      email: "jordan.kim@example.com",
    },
    date: "2025-10-08",
    type: "drafts",
    time: {
      start: "18:00",
      end: "01:00",
    },
    venue: {
      name: "Industrial Loft 42",
      address: "321 Factory Street, Brooklyn, NY 11201",
      coordinates: {
        lat: 40.6892,
        lng: -73.9442,
      },
    },
    description:
      "Experience urban romance at its finest in our converted industrial loft. Alex and Jordan invite you to celebrate their love with city skyline views, craft cocktails, and contemporary cuisine in this chic metropolitan setting.",
    budget: {
      total: 65000,
      spent: 45200,
      currency: "$",
      categories: [
        {
          id: 1,
          name: "Venue",
          budgeted: 12000,
          spent: 12000,
          color: "#6B7280",
        },
        {
          id: 2,
          name: "Music and Entertainment",
          budgeted: 8500,
          spent: 8500,
          color: "#8B5CF6",
        },
        {
          id: 3,
          name: "Catering",
          budgeted: 22000,
          spent: 22000,
          color: "#F59E0B",
        },
        {
          id: 4,
          name: "Photography & Videography",
          budgeted: 7500,
          spent: 2700,
          color: "#EF4444",
        },
        {
          id: 5,
          name: "Décor & Lighting",
          budgeted: 9500,
          spent: 0,
          color: "#06B6D4",
        },
      ],
    },
    tasks: [
      {
        id: 1,
        title: "Reserve Industrial Loft Space",
        cost: 12000,
        currency: "$",
        dueDate: "2025-05-01",
        status: "completed",
        assignee: 1,
      },
      {
        id: 2,
        title: "Book Gourmet Catering Service",
        cost: 22000,
        currency: "$",
        dueDate: "2025-07-01",
        status: "completed",
        assignee: 2,
      },
      {
        id: 3,
        title: "Hire Professional DJ & Sound System",
        cost: 8500,
        currency: "$",
        dueDate: "2025-08-01",
        status: "completed",
        assignee: 1,
      },
      {
        id: 4,
        title: "Book Urban Wedding Photographer",
        cost: 7500,
        currency: "$",
        dueDate: "2025-09-01",
        status: "in_progress",
        assignee: 2,
      },
      {
        id: 5,
        title: "Design Modern Lighting Setup",
        cost: 9500,
        currency: "$",
        dueDate: "2025-09-15",
        status: "pending",
        assignee: 1,
      },
    ],
    guests: [],
    stats: {
      totalInvited: 120,
      going: 0,
      notGoing: 0,
      pending: 120,
    },
    theme: {
      primaryColor: "#6B7280",
      secondaryColor: "#06B6D4",
      accentColor: "#8B5CF6",
    },
    backgroundImage:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200",
  },
  {
    id: 5,
    name: "Isabella & Ryan's Mountain Retreat",
    host: {
      role: "Manager",
      name: "Isabella Martinez",
      email: "isabella.martinez@example.com",
      isCurrentUser: false,
    },
    coHost: {
      role: "photographers",
      name: "Ryan O'Connor",
      email: "ryan.oconnor@example.com",
    },
    date: "2025-07-26",
    type: "drafts",
    time: {
      start: "17:00",
      end: "23:30",
    },
    venue: {
      name: "Alpine Lodge & Gardens",
      address: "567 Mountain View Road, Aspen, CO 81611",
      coordinates: {
        lat: 39.1911,
        lng: -106.8175,
      },
    },
    description:
      "Escape to the mountains for Isabella and Ryan's intimate wedding celebration. Surrounded by snow-capped peaks and alpine meadows, join us for a cozy evening of rustic elegance, hearty cuisine, and mountain hospitality.",
    budget: {
      total: 38000,
      spent: 22100,
      currency: "$",
      categories: [
        {
          id: 1,
          name: "Venue",
          budgeted: 9500,
          spent: 9500,
          color: "#92400E",
        },
        {
          id: 2,
          name: "Music and Entertainment",
          budgeted: 2800,
          spent: 2800,
          color: "#7C2D12",
        },
        {
          id: 3,
          name: "Catering",
          budgeted: 14000,
          spent: 9800,
          color: "#B45309",
        },
        {
          id: 4,
          name: "Photography & Videography",
          budgeted: 4200,
          spent: 0,
          color: "#DC2626",
        },
        {
          id: 5,
          name: "Rustic Décor",
          budgeted: 5500,
          spent: 0,
          color: "#059669",
        },
      ],
    },
    tasks: [
      {
        id: 1,
        title: "Book Mountain Lodge Venue",
        cost: 9500,
        currency: "$",
        dueDate: "2025-03-15",
        status: "completed",
        assignee: 1,
      },
      {
        id: 2,
        title: "Plan Mountain Feast Catering",
        cost: 14000,
        currency: "$",
        dueDate: "2025-06-01",
        status: "in_progress",
        assignee: 2,
      },
      {
        id: 3,
        title: "Hire Folk Music Band",
        cost: 2800,
        currency: "$",
        dueDate: "2025-05-15",
        status: "completed",
        assignee: 1,
      },
      {
        id: 4,
        title: "Book Mountain Landscape Photographer",
        cost: 4200,
        currency: "$",
        dueDate: "2025-07-01",
        status: "pending",
        assignee: 2,
      },
    ],
    guests: [],
    stats: {
      totalInvited: 35,
      going: 0,
      notGoing: 0,
      pending: 35,
    },
    theme: {
      primaryColor: "#92400E",
      secondaryColor: "#059669",
      accentColor: "#B45309",
    },
    backgroundImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
  },
];
