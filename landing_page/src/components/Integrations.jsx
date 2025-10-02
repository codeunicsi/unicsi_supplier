import { GraduationCap, TrendingUp, FolderOpen, Tag } from "lucide-react"
import Process from "../assets/images/Process.png";

const Integrations = () => {
  const steps = [
    {
      icon: GraduationCap,
      title: "Learn",
      description: "Get Expert Guidance To Launch Your Business",
    },
    {
      icon: TrendingUp,
      title: "Research",
      description: "Find Trending And High-Growth Products",
    },
    {
      icon: FolderOpen,
      title: "Source",
      description: "Get Your Products From UNICSI",
    },
    {
      icon: Tag,
      title: "Sell",
      description: "Make Money And Your Customers Happy",
    },
  ]

  return (
    <section className="bg-gray-50 py-16 px-4" style={{ border: "1px solid blue" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Time to take the cap off
            <br />
            <span className="relative">
              your income
              <svg
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-3"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path d="M2 10C50 2 150 2 198 10" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </div>

        {/* Process Flow */}
        <div className="grid">
           <img src={Process} alt="Process Flow" className="w-full h-auto mb-8 lg:mb-0" />
        </div>
      </div>
    </section>
  )
}

export default Integrations;
