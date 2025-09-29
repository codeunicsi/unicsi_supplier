import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import DateRangePicker from "../ui/DateRangePicker";

export default function FiltersBar() {
  return (
    <div className="flex justify-evenly items-center gap-3 bg-white p-3 border rounded-md shadow-sm mb-4">
      <DateRangePicker onChange={(range) => console.log(range)} />

      <div className="flex items-center gap-3 flex-wrap">
        <Dropdown
          options={["NDR Date", "Today", "Last 7 Days"]}
          value="NDR Date"
          onChange={(val) => console.log(val)}
        />

        <Dropdown
          options={["Delivery Attempt", "First Attempt", "Second Attempt"]}
          value="Delivery Attempt"
          onChange={(val) => console.log(val)}
        />

        <Button variant="primary">Show Pending Orders</Button>
        <Button variant="secondary">Clear All Filters</Button>
      </div>
    </div>
  );
}
