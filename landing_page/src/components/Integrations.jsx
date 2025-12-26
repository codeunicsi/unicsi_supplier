import { GraduationCap, TrendingUp, FolderOpen, Tag } from "lucide-react"

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
    <section className="bg-gray-50 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2 leading-tight">
            Time to take the cap off
            <br />
            <span className="relative inline-block mt-1 sm:mt-2">
              your income
              <svg
                className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 md:w-48 lg:w-56 h-2 sm:h-3"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d="M2 10C50 2 150 2 198 10" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </div>

        <div className="grid px-2 sm:px-4 md:px-0">
          <img
            src="/business-process-flow-diagram-learn-research-sourc.jpg"
            alt="Process Flow showing Learn, Research, Source, and Sell steps"
            className="w-full h-auto mb-4 sm:mb-6 md:mb-8 lg:mb-0 rounded-lg shadow-sm"
          />
        </div>
      </div>
    </section>
  )
}

export default Integrations
