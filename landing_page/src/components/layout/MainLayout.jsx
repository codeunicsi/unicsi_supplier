// components/layout/MainLayout.tsx
import { useState } from "react"
import Sidebar from "./Sidebar"
import TopBar from "./TopBar"
import ManageProductsPage from "../../products/ManageProductsPage"
import SourceProduct from "../../products/SourceProduct"
import ProductRequirementpage from "../../products/ProductRequirementPage"
import ManageOrder from "../../products/ManageOrder"
import ManageProduct from "../../products/ManageProducts"
import AnalyticsPage from "../../products/AnalyticsPage"

export default function MainLayout() {
  const [activePage, setActivePage] = useState("Manage Products") // default
  console.log("Active Page:", activePage)

  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return <div>Home Page Content</div>
      case "Manage Orders":
        return <ManageOrder />
      case "Source a Product":
        return <SourceProduct />
      case "Product Requirement":
        return <ProductRequirementpage />
      case "Manage Products":
        return <ManageProduct />
      case "Manage RTO / Returns":
        return <AnalyticsPage />
      default:
        return <div>Select a menu from sidebar</div>
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="p-4 bg-gray-50">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
