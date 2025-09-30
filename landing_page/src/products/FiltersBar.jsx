import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import DateRangePicker from "../ui/DateRangePicker";

export default function FiltersBar({ type }) {
  return (
    <div className="flex justify-between items-center gap-3 bg-white p-4 border rounded-md shadow-sm mb-4">
      {/* <DateRangePicker onChange={(range) => console.log(range)} /> */}

      {/* <div className="flex items-center gap-3 flex-wrap">
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
      </div> */}
      {type === "manage-product" && (
        <>
          <div>
            <DateRangePicker onChange={(range) => console.log(range)} />
          </div>
          <div className="flex gap-3">
            <div>
              <Dropdown
                options={["NDR Date", "Today", "Last 7 Days"]}
                value="NDR Date"
                onChange={(val) => console.log(val)}
              />
            </div>
            <div>
              <Dropdown
                options={[
                  "Delivery Attempt",
                  "First Attempt",
                  "Second Attempt",
                ]}
                value="Delivery Attempt"
                onChange={(val) => console.log(val)}
              />
            </div>
            <div>
              <Button variant="primary">Show Pending Orders</Button>
            </div>
            <div>
              <Button variant="secondary">Clear All Filters</Button>
            </div>
          </div>
        </>
      )}

      {type === "manage-product-requirements" && (
        <>
          <div>
            <DateRangePicker onChange={(range) => console.log(range)} />
          </div>
          <div className="flex gap-3">
            <div>
              <Dropdown
                options={["NDR Date", "Today", "Last 7 Days"]}
                value="NDR Date"
                onChange={(val) => console.log(val)}
              />
            </div>

            <div>
              <input type="text" placeholder="Search..." className="border p-1.5 rounded" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
