// components/layout/MainLayout.tsx
import Sidebar from "./Sidebar"
import TopBar from "./TopBar"
import FiltersBar from "../../products/FiltersBar"
import Tabs from "../../products/Tabs";
import ManageProductsPage from "../../products/ManageProductsPage";
import ProductRows from "../../products/ProductRow";
import ProductDetailsCard from "../../products/ProductDetailsCard";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="p-4 bg-gray-50">{children}
         
          <ManageProductsPage />
        </main>
      </div>
    </div>
  )
}
