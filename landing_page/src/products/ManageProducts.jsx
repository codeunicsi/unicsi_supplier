import { useQuery, useQueryClient } from "@tanstack/react-query";
import Pagination from "../ui/Pagination";
import ProductTable from "./ProductTable";
import Tabs from "./Tabs";
import SubTabs from "./SubTabs";
import { getProducts} from "../services/product/product.service";




export default function ManageProducts() {
    const queryClient = useQueryClient()
    
    //fetch data 
    const { data, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: () => getProducts(),
      })

      console.log(data?.data?.products)
  

  return (
    
    <div className="" style={{ border : "2px solid red"}} width="60%">
      <h2 className="text-lg font-semibold mb-4">Manage Products</h2>
      <Tabs tabItems={["Inventory", "Approved", "Purchase Order"]} />
      <SubTabs tabItems={["Pending", "Approved", "Closed"]} />
      <ProductTable data={data} isLoading={isLoading} error={error}/>
      {/* <Pagination /> */}
    </div>
  )
}