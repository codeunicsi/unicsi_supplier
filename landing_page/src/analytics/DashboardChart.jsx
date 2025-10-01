import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

// Sample Data
const areaData = [
  { date: "13 Aug", orders: 20000, gmv: 10000 },
  { date: "14 Aug", orders: 40000, gmv: 15000 },
  { date: "15 Aug", orders: 125200, gmv: 70000 },
  { date: "16 Aug", orders: 100000, gmv: 60000 },
  { date: "17 Aug", orders: 140000, gmv: 90000 },
  { date: "18 Aug", orders: 80000, gmv: 50000 },
  { date: "19 Aug", orders: 220000, gmv: 120000 },
  { date: "20 Aug", orders: 180000, gmv: 100000 },
];

const barData = [
  { date: "12 Aug", value: 50 },
  { date: "13 Aug", value: 70 },
  { date: "14 Aug", value: 60 },
  { date: "15 Aug", value: 80 },
  { date: "16 Aug", value: 75 },
  { date: "17 Aug", value: 40 },
  { date: "17 Aug", value: 90 },
  { date: "17 Aug", value: 50 },
  { date: "17 Aug", value: 90 },
  { date: "17 Aug", value: 90 },
  { date: "17 Aug", value: 30 },
  { date: "17 Aug", value: 90 },
  { date: "17 Aug", value: 90 },
  { date: "17 Aug", value: 80 },
  { date: "17 Aug", value: 90 },
  { date: "17 Aug", value: 90 },
  { date: "17 Aug", value: 90 },
  { date: "17 Aug", value: 90 },
  { date: "17 Aug", value: 90 },    
  { date: "17 Aug", value: 90 },
  { date: "17 Aug", value: 70 },
  { date: "17 Aug", value: 90 },
  { date: "17 Aug", value: 90 },
  { date: "17 Aug", value: 50 },
  { date: "17 Aug", value: 90 },
  { date: "17 Aug", value: 40 },
];

const lineData = [
  { time: "12 AM", value: 5 },
  { time: "4 AM", value: 15 },
  { time: "8 AM", value: 8 },
  { time: "12 PM", value: 20 },
  { time: "4 PM", value: 45 },
  { time: "8 PM", value: 10 },
  { time: "11 PM", value: 5 },
];

// Orders & GMV Component
function OrdersAndGMVCard() {
  return (
    <div
      className="border rounded-lg shadow-sm bg-white p-4 w-full h-full"
    >
      <div
        className="flex justify-between items-center mb-2"
      >
        <h2 className="font-medium text-[14px]">Orders & GMV</h2>

        {/* Legend */}
        <div className="flex items-center gap-4">

          <div className="flex gap-4 mb-2 text-sm align-middle justify-center my-2">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>{" "}
              Orders
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span> GMV
            </div>
          </div>

          <div className="px-2 py-1 border rounded-md text-sm text-gray-600">
            Jan 2025 - Dec 2025
          </div>
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <h1 className="text-[28px] font-bold">240.8K</h1>
        <span className="bg-[#FCE6D4] text-[#E67C30] text-[12px] px-2 py-[2px] rounded">
          24.6% ↑
        </span>
      </div>

      {/* Area Chart */}
      <ResponsiveContainer width="100%" height="70%">
        <AreaChart data={areaData}>
          <defs>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F1B356" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#943A09" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorGMV" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#943A09" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#943A09"
            fillOpacity={1}
            fill="url(#colorOrders)"
          />
          <Area
            type="monotone"
            dataKey="gmv"
            stroke="#00000042"
            fillOpacity={1}
            fill="url(#colorGMV)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Margin Applied % Component
function MarginAppliedCard() {
  return (
    <div className="border rounded-lg shadow-sm bg-white p-4 h-[200px]">
      <h2 className="font-medium text-[14px] mb-2">Margin Applied %</h2>
      <div className="flex items-baseline gap-2 mb-3">
        <h1 className="text-[24px] font-bold">144.6K</h1>
        <span className="bg-[#E8F7ED] text-[#16A34A] text-[12px] px-2 py-[2px] rounded">
          As a % of GMV ↑
        </span>
      </div>

      <ResponsiveContainer width="100%" height="60%">
        <BarChart data={barData}>
          <XAxis dataKey="date" />
          <Tooltip />
          <Bar dataKey="value" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Total Orders Component
function TotalOrdersCard() {
  return (
    <div className="border rounded-lg shadow-sm bg-white p-4 h-[200px]">
      <h2 className="font-medium text-[14px] mb-2">Total Orders</h2>
      <div className="flex items-baseline gap-2 mb-3">
        <h1 className="text-[24px] font-bold">400</h1>
        <span className="bg-[#E8F7ED] text-[#16A34A] text-[12px] px-2 py-[2px] rounded">
          16.8% ↑
        </span>
      </div>

      <ResponsiveContainer width="100%" height="60%">
        <LineChart data={lineData}>
          <XAxis dataKey="time" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#A855F7"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Dashboard Layout
export default function DashboardChart() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="col-span-2">
        <OrdersAndGMVCard />
      </div>
      <div className="flex flex-col justify-around gap-4">
        <MarginAppliedCard />
        <TotalOrdersCard />
      </div>
    </div>
  );
}
