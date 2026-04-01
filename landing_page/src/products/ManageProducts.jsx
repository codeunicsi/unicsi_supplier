import { useQueryClient, useMutation } from "@tanstack/react-query";
import ProductTable from "./ProductTable";
import Tabs from "./Tabs";
import SubTabs from "./SubTabs";
import { updateInventory as updateInventoryApi } from "../services/product/product.service";

/** Empty catalog until products are loaded from the API again. */
const EMPTY_PRODUCTS = { data: { products: [] } };

export default function ManageProducts() {
  const queryClient = useQueryClient();

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
    <div style={{ width: "60%" }}>
      <h2 className="text-lg font-semibold mb-4">Manage Products</h2>
      <Tabs tabItems={["Inventory", "Approved", "Purchase Order"]} />
      <SubTabs tabItems={["Pending", "Approved", "Closed"]} />

      <ProductTable
        data={EMPTY_PRODUCTS}
        isLoading={false}
        error={null}
        updateInventory={updateInventory}
        isUpdating={isPending}
      />
    </div>
  );
}
