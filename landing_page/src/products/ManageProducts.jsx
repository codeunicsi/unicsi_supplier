import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import ProductTable from "./ProductTable";
import Tabs from "./Tabs";
import SubTabs from "./SubTabs";
import {
  getProducts,
  updateInventory as updateInventoryApi,
} from "../services/product/product.service";

export default function ManageProducts() {
  const queryClient = useQueryClient();

  // fetch products
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // update inventory mutation
  const { mutate: updateInventory, isPending } = useMutation({
    mutationFn: ({ sku, quantity, action }) =>
      updateInventoryApi(sku, { quantity, action }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },

    onError: (err) => {
      console.error("Inventory update failed", err);
    },
  });

  return (
    <div width="60%">
      <h2 className="text-lg font-semibold mb-4">Manage Products</h2>
      <Tabs tabItems={["Inventory", "Approved", "Purchase Order"]} />
      <SubTabs tabItems={["Pending", "Approved", "Closed"]} />

      <ProductTable
        data={data}
        isLoading={isLoading}
        error={error}
        updateInventory={updateInventory}
        isUpdating={isPending}
      />
    </div>
  );
}
