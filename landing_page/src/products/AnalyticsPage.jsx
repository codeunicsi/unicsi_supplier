import Pagination from "../ui/Pagination";
import ProductTable from "./ProductTable";
import Tabs from "./Tabs";
import FiltersBar from "./FiltersBar";
import AnalyticsCard from "../components/AnalyticsCard";
import DashboardChart from "../analytics/DashboardChart";

export default function AnalyticsPage() {
  return (
    <div className="w-full min-w-0 max-w-full space-y-4 pb-6">
      <div className="min-w-0">
        <h1 className="text-base font-semibold text-[#111] sm:text-lg">
          Manage RTO / Returns
        </h1>
        <h2 className="mt-1 text-sm leading-snug text-gray-600 sm:text-base">
          Insights for orders, margins, GMV, RTO%, and more.
        </h2>
      </div>
      <Tabs tabItems={["Overall", "Products"]} />
      <FiltersBar type="analytics" />

      <div className="mb-4 grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <AnalyticsCard
          title="Total Orders"
          value="0"
          percentage="0"
          description="Compared to last month"
          icon="orders"
        />
        <AnalyticsCard
          title="Total Sales"
          value="0"
          percentage="0"
          description="Compared to last month"
          icon="sales"
        />

        <AnalyticsCard
          title="Total Sales"
          value="0"
          percentage="0"
          description="Compared to last month"
          icon="sales"
        />

        <AnalyticsCard
          title="Total Sales"
          value="0"
          percentage="0"
          description="Compared to last month"
          icon="sales"
        />

        <AnalyticsCard
          title="Total Sales"
          value="₹0"
          percentage="0"
          description="Compared to last month"
          icon="sales"
        />
      </div>

      <div className="mb-4 min-w-0 overflow-hidden rounded-lg border bg-white p-2 shadow-sm sm:p-4">
        <DashboardChart />
      </div>

      <div className="mb-4 grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <AnalyticsCard
          title="Total Orders"
          value="0"
          percentage="0"
          description="Compared to last month"
          icon="orders"
        />
        <AnalyticsCard
          title="Total Sales"
          value="0"
          percentage="0"
          description="Compared to last month"
          icon="sales"
        />

        <AnalyticsCard
          title="Total Sales"
          value="0"
          percentage="0"
          description="Compared to last month"
          icon="sales"
        />
      </div>

      <div className="min-w-0 w-full max-w-full overflow-x-auto">
        <ProductTable />
      </div>
      <Pagination />
    </div>
  );
}
