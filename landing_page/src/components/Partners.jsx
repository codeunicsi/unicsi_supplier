import Framer from "../assets/images/framer.svg";
import Pipedrive from "../assets/images/pipedrive.svg";
import Rippling from "../assets/images/rippling.svg";
import HashiCorp from "../assets/images/hashicop.svg";
import Square from "../assets/images/square.svg";
import Mailchip from "../assets/images/mailchip.svg";
import Notion from "../assets/images/notion.svg";
import Intercomp from "../assets/images/innercomp.svg";
import Toggl from "../assets/images/togg.svg";
import CultureAmp from "../assets/images/cultureamp.svg";
import Afterpay from "../assets/images/afterplay.svg";
import Discord from "../assets/images/discord.svg";
import LauncghDarkly from "../assets/images/launchDarkly.svg";
import Medium from "../assets/images/medium.svg";


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
    <div className="min-h-[378px] border border-black flex flex-col justify-center bg-white">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-black leading-tight">
          Managing 25+ ECommerce Couriers
          <br />
          So You Don't Have To
        </h1>
      </div>

      {/* Decorative Dotted Line with Star */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex-1 border-t-2 border-dotted border-blue-400 max-w-md"></div>
        <div className="mx-4 text-blue-400 text-xl">✦</div>
        <div className="flex-1 border-t-2 border-dotted border-blue-400 max-w-md"></div>
      </div>

      {/* Logo Grid */}
      <div className="space-y-6">
        {/* Top Row */}
        <div className="flex items-center justify-between gap-8 md:gap-12 flex-wrap" style={{ border : "1px solid #E5E7EB",}}>
          {topRowLogos.map((company, index) => (
            <div key={index} className="flex items-center justify-center min-w-[80px]">
              <img src={company.logo} alt={company.name} className="h-8 md:h-10 object-contain" />
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between gap-8 md:gap-12" style ={{ border : '1px solid red'}}>
          {bottomRowLogos.map((company, index) => (
            <div key={index} className="flex items-center justify-center min-w-[80px]">
            <img src={company.logo} alt={company.name} className="h-8 md:h-10 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Partners
