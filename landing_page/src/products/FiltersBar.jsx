import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import DateRangePicker from "../ui/DateRangePicker";

function DateFilter() {
  return <DateRangePicker onChange={(range) => console.log(range)} />;
}

function DropdownFilter({ options, value }) {
  return (
    <Dropdown
      options={options}
      value={value}
      onChange={(val) => console.log(val)}
    />
  );
}

function SearchBox() {
  return (
    <input
      type="text"
      placeholder="Search..."
      className="border p-1.5 rounded"
    />
  );
}

function ActionButtons() {
  return (
    <>
      <Button variant="primary">Show Pending Orders</Button>
      <Button variant="secondary">Clear All Filters</Button>
    </>
  );
}

export default function FiltersBar({ type }) {
  return (
    <div className="flex justify-between items-center gap-3 bg-white p-4 border rounded-md shadow-sm mb-4">
      {type === "manage-product" && (
        <>
          <DateFilter />
          <div className="flex gap-3 flex-wrap">
            <DropdownFilter
              options={["NDR Date", "Today", "Last 7 Days"]}
              value="NDR Date"
            />
            <DropdownFilter
              options={["Delivery Attempt", "First Attempt", "Second Attempt"]}
              value="Delivery Attempt"
            />
            <ActionButtons />
          </div>
        </>
      )}

      {["manage-product-requirements", "order", "manage-product-2"].includes(
        type
      ) && (
        <>
          <DateFilter />
          <div className="flex gap-3 flex-wrap">
            <DropdownFilter
              options={["NDR Date", "Today", "Last 7 Days"]}
              value="NDR Date"
            />
            <SearchBox />
          </div>
        </>
      )}
    </div>
  );
}
