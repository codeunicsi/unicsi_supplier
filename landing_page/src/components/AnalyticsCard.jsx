export default function AnalyticsCard({width, title, value, percentage, description, icon}) {
  return (
    <div className={`border w-[${width}] h-[120px] rounded-lg shadow-sm bg-white`}>
      <div className="flex flex-col mx-[15px] mt-[23.52px]">
        
        {/* Header Row */}
        <div className="flex justify-between mb-[10px]">
          <div className="flex items-center gap-[4px]">
            {/* Eye Icon */}
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.84863 2.77148C11.9344 2.77148 14.0112 5.78504 14.6279 6.87305C14.7651 7.11507 14.7651 7.40251 14.6279 7.64453C14.0112 8.73252 11.9344 11.7461 7.84863 11.7461C3.763 11.746 1.686 8.73246 1.06934 7.64453C0.932308 7.40262 0.932302 7.11496 1.06934 6.87305C1.686 5.78511 3.763 2.77163 7.84863 2.77148ZM7.85059 4.76562C6.47378 4.76562 5.35742 5.88198 5.35742 7.25879C5.35749 8.63554 6.47382 9.75195 7.85059 9.75195C9.22717 9.75173 10.3427 8.6354 10.3428 7.25879C10.3428 5.88212 9.22721 4.76584 7.85059 4.76562Z"
                fill="#662525"
              />
            </svg>
            <p className="text-[12px] font-medium text-[#662525]">
              Synced Orders
            </p>
          </div>

          {/* Three Dots Menu */}
          <svg
            width="12"
            height="14"
            viewBox="0 0 12 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.0459 8.26433C6.54156 8.26433 6.94336 7.8051 6.94336 7.23861C6.94336 6.67212 6.54156 6.21289 6.0459 6.21289C5.55025 6.21289 5.14844 6.67212 5.14844 7.23861C5.14844 7.8051 5.55025 8.26433 6.0459 8.26433Z"
              fill="black"
              fillOpacity="0.7"
            />
            <path
              d="M10.2861 8.26433C10.7818 8.26433 11.1836 7.8051 11.1836 7.23861C11.1836 6.67212 10.7818 6.21289 10.2861 6.21289C9.79048 6.21289 9.38867 6.67212 9.38867 7.23861C9.38867 7.8051 9.79048 8.26433 10.2861 8.26433Z"
              fill="black"
              fillOpacity="0.7"
            />
            <path
              d="M1.80567 8.26433C2.30132 8.26433 2.70313 7.8051 2.70313 7.23861C2.70313 6.67212 2.30132 6.21289 1.80567 6.21289C1.31001 6.21289 0.908203 6.67212 0.908203 7.23861C0.908203 7.8051 1.31001 8.26433 1.80567 8.26433Z"
              fill="black"
              fillOpacity="0.7"
            />
          </svg>
        </div>

        {/* Value & Percentage */}
        <div className="flex items-center gap-[6px]">
          <h1 className="text-[28px] font-bold">50.8K</h1>
          <span className="bg-[#FCE6D4] text-[#E67C30] text-[12px] font-medium px-[4px] py-[2px] rounded">
            28.4% ↑
          </span>
        </div>
      </div>
    </div>
  );
}
