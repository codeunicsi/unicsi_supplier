import React from "react";
import { Button } from "@mui/material";

const Faqs = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/faq-on-gst.pdf";
    link.download = "faq-on-gst.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-[250px] md:min-h-[300px] lg:min-h-[378px] flex flex-col justify-center bg-gradient-to-br from-[#0097b2] to-[#7ed957] py-8 md:py-12 px-4 md:px-6">
      {/* Header Section */}
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white leading-tight px-4">
          Frequently Asked Questions
        </h1>
      </div>

      {/* Content Section */}
      <div className="text-center">
        <Button
          variant="contained"
          onClick={handleDownload}
          size="large"
          sx={{
            backgroundColor: "white",
            color: "#0097b2",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          Download FAQ on GST PDF
        </Button>
      </div>
    </div>
  );
};

export default Faqs;
