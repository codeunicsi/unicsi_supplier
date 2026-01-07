// components/layout/MainLayout.tsx
// import { useState } from "react"
// import Sidebar from "./Sidebar"
// import TopBar from "./TopBar"
// import SourceProduct from "../../products/SourceProduct"
// import ProductRequirementpage from "../../products/ProductRequirementPage"
// import ManageOrder from "../../products/ManageOrder"
// import ManageProduct from "../../products/ManageProducts"
// import AnalyticsPage from "../../products/AnalyticsPage"

// export default function MainLayout() {
//   const [activePage, setActivePage] = useState("Manage Products") // default
//   console.log("Active Page:", activePage)

//   const renderPage = () => {
//     switch (activePage) {

//       //profile completed the switch case
//       case "Home":
//         return <div>Home Page Content</div>
//       case "Manage Orders":
//         return <ManageOrder />
//       case "Source a Product":
//         return <SourceProduct />
//       case "Product Requirement":
//         return <ProductRequirementpage />
//       case "Manage Products":
//         return <ManageProduct />
//       case "Manage RTO / Returns":
//         return <AnalyticsPage />
//       default:
//         return <div>Select a menu from sidebar</div>
//     }
//   }

//   return (
//     <div className="flex bg-[#F3F4F8] h-screen overflow-hidden rounded-tl-[28px]">
//       {/* Sidebar scrolls independently */}
//       <Sidebar activePage={activePage} setActivePage={setActivePage} />

//       {/* Content area */}
//       <div className="flex flex-col flex-1 h-full ml-8">
//         <TopBar />

//         {/* Only main content scrolls */}
//         <main className="flex-1 overflow-y-auto p-4 hide-scrollbar mr-6" style={{ borderRadius: "24px", backgroundColor: "rgba(255, 255, 255, 0.7)", }}>
//           {renderPage()}
//         </main>
//       </div>
//     </div>
//   )
// }


// components/layout/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function MainLayout() {
  return (
    <div className="flex bg-[#F3F4F8] h-screen overflow-hidden rounded-tl-[28px]">
      <Sidebar />

      <div className="flex flex-col flex-1 h-full ml-8">
        <TopBar />

        <main
          className="flex-1 overflow-y-auto p-4 hide-scrollbar mr-6"
          style={{
            borderRadius: "24px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border : "2px solid #ccc"
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

