"use client"

import { useState } from "react"
import logistic from "../assets/images/logistic.jpg"
import logistic2 from "../assets/images/logistic2.jpg"
import logistic3 from "../assets/images/logistic3.jpg"
import logistic4 from "../assets/images/logistic4.jpg"
import logistic5 from "../assets/images/logistic5.jpg"

const Logistics = () => {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const handleCardClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const cards = [
    {
      image: logistic,
      title: (
        <>
          Global <br /> Fulfillment <br /> Network
        </>
      ),
    },
    {
      image: logistic2,
      title: (
        <>
          Exclusive <br /> CJPacket <br /> Shipping Lines
        </>
      ),
    },
    {
      image: logistic3,
      title: (
        <>
          Customizable <br /> Brand <br /> Packaging
        </>
      ),
    },
    {
      image: logistic4,
      title: (
        <>
          Seamless <br /> E-commerce <br /> Platform <br /> Integration
        </>
      ),
    },
    {
      image: logistic5,
      title: (
        <>
          Inventory <br /> Support and <br />
          Quality <br /> Control
        </>
      ),
    },
  ]

  return (
    <div className="w-full flex flex-col items-center justify-center py-8 md:py-12">
      <h4 className="text-center px-4 md:px-6 py-4 md:py-5 text-2xl md:text-3xl lg:text-4xl font-semibold">
        Logistics Solutions to Help Businesses
      </h4>

      <div className="w-full px-4 md:px-6 lg:hidden">
        <div className="flex flex-col gap-4">
          {cards.map((card, index) => (
            <div key={index} className="relative w-full rounded-lg overflow-hidden">
              <img
                src={card.image || "/placeholder.svg"}
                alt="Logistics"
                className="h-64 sm:h-80 w-full object-cover"
              />
              <h2 className="absolute text-white top-4 left-4 z-30 text-xl sm:text-2xl leading-tight font-medium">
                {card.title}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:block w-full overflow-hidden px-4 md:px-0">
        <div className="flex justify-center items-center gap-0 rounded-lg">
          {cards.map((card, index) => (
            <div
              key={index}
              onMouseEnter={() => setExpandedIndex(index)}
              onMouseLeave={() => setExpandedIndex(null)}
              className={`relative flex-shrink-0 cursor-pointer transition-all duration-500 ease-in-out ${expandedIndex === index ? "w-[492px]" : expandedIndex !== null ? "w-[123px]" : "w-[246px]"
                }`}
            >
              <img src={card.image || "/placeholder.svg"} alt="Logistics" className="h-[623px] w-full object-cover" />

              <h2
                className={`absolute text-white top-9 left-6 z-30 leading-tight transition-all duration-500 ${expandedIndex === index
                    ? "text-3xl opacity-100"
                    : expandedIndex !== null
                      ? "text-sm opacity-0"
                      : "text-2xl opacity-100"
                  }`}
              >
                {card.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Logistics
