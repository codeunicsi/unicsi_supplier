import Pagination from "../ui/Pagination";
import ProductTable from "./ProductTable";
import Tabs from "./Tabs";
import SubTabs from "./SubTabs";

export default function ManageProducts() {
  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-4">Manage Products</h2>
      <Tabs tabItems={["Inventory", "Approved", "Purchase Order"]} />
      <SubTabs tabItems={["Pending", "Approved", "Closed"]} />
      <ProductTable />
      {/* <Pagination /> */}
    </div>
  )
}