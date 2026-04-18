import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import ProductTable from "./ProductTable";
import Tabs from "./Tabs";
import SubTabs from "./SubTabs";
import {
  updateInventory as updateInventoryApi,
  getProducts,
} from "../services/product/product.service";

const EMPTY_PRODUCTS = { data: { products: [] } };

export default function ManageProducts() {
  const queryClient = useQueryClient();

  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

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
    <div className="w-full min-w-0 max-w-full">
      <h2 className="text-lg font-semibold mb-4">Manage Products</h2>

      <Tabs tabItems={["Inventory", "Approved", "Purchase Order"]} />
      <SubTabs tabItems={["Pending", "Approved", "Closed"]} />

      <ProductTable
        data={productsData}
        isLoading={isLoading}
        error={error}
        updateInventory={updateInventory}
        isUpdating={isPending}
      />
    </div>
  );
}
