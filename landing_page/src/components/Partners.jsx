// import Framer from "../assets/images/framer.png";
import Framer from "../assets/images/Framer.png"
import Pipedrive from "../assets/images/pipedrive.png"
import Rippling from "../assets/images/rippling.png"
import HashiCorp from "../assets/images/hashicop.png"
import Square from "../assets/images/square.png"
import Mailchip from "../assets/images/mailchip.png"
import Notion from "../assets/images/notion.png"
import Intercomp from "../assets/images/innercomp.png"
import Toggl from "../assets/images/togg.png"
import CultureAmp from "../assets/images/cultureamp.png"
import Afterpay from "../assets/images/afterplay.png"
import Discord from "../assets/images/discord.png"
import LauncghDarkly from "../assets/images/launchDarkly.png"
import Medium from "../assets/images/medium.png"

const Partners = () => {
  const topRowLogos = [
    { name: "Framer", logo: Framer },
    { name: "Pipedrive", logo: Pipedrive },
    { name: "Rippling", logo: Rippling },
    { name: "HashiCorp", logo: HashiCorp },
    { name: "Square", logo: Square },
    { name: "Mailchimp", logo: Mailchip },
    { name: "Notion", logo: Notion },
  ]

  const bottomRowLogos = [
    { name: "Intercom", logo: Intercomp },
    { name: "Toggl", logo: Toggl },
    { name: "Culture Amp", logo: CultureAmp },
    { name: "Afterpay", logo: Afterpay },
    { name: "Discord", logo: Discord },
    { name: "LaunchDarkly", logo: LauncghDarkly },
    { name: "Medium", logo: Medium },
  ]

  return (
    <div className="min-h-[250px] md:min-h-[300px] lg:min-h-[378px] flex flex-col justify-center bg-white py-8 md:py-12 px-4 md:px-6">
      {/* Header Section */}
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-black leading-tight px-4">
          Managing 25+ ECommerce Couriers
          <br className="hidden md:block" />
          <span className="md:inline"> So You Don't Have To</span>
        </h1>
      </div>

      {/* Logo Grid */}
      <div className="space-y-4 md:space-y-6">
        {/* Top Row */}
        <div className="partner">
          <div className="horizontal-scrolling-items__item">
            <div className="flex items-center gap-8 md:gap-12 flex-wrap horizontal-scrolling-items">
              {[...topRowLogos, ...topRowLogos].map((company, index) => (
                <div key={index} className="flex items-center justify-center min-w-[60px] md:min-w-[80px]">
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    className="h-6 md:h-8 lg:h-10 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="partner-reverse">
          <div className="horizontal-scrolling-items-reverse__item">
            <div className="flex items-center gap-8 md:gap-12 horizontal-scrolling-items-reverse">
              {[...bottomRowLogos, ...bottomRowLogos].map((company, index) => (
                <div key={index} className="flex items-center justify-center min-w-[60px] md:min-w-[80px]">
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    className="h-6 md:h-8 lg:h-10 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Partners
