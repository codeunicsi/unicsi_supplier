import DropShippingImg from "../assets/images/dropShippingImg.svg"
import CircleArrowRight from "../assets/icons/circleArrowUpRight.svg"
import LeftArrow from "../assets/icons/leftArrow.svg"
import RightArrow from "../assets/icons/rightArrow.svg"
const PopularProducts = () => {
  return (
    <div
      className="my-16"
      style={{height: "587.2230224609375px" }}
    >
	<div className="text-center pt-2 font-[600] text-[38px]">
		<h1>Start dropshipping with Best Niche Category's</h1>
	</div>
		
			<div
			  className="flex gap-2 overflow-x-scroll hide-scrollbar"
			  style={{
			    // height: "450.7058410644531px",
			    // border: "1px solid green",
			    marginTop: "60px",
			    maxWidth: "1600px",
			    paddingBottom: "8px", // optional for better scroll experience
			  }}
			>
			  {[...Array(5)].map((_, idx) => (
			    <div key={idx} className="min-w-[350px] relative">
			      <img
			        src={DropShippingImg}
			        alt="Bag"
			        className="w-full h-[450.7058410644531px] object-cover rounded-md"
			      />
				  <img
			        src={CircleArrowRight}
			        alt="Arrow"
			        className="absolute top-4 right-4"
			      />
				  <p style={{ position: "absolute", top: "397.68px", left: "30.13px", color: "white", fontSize: "22.15px", fontWeight: "bold", lineHeight: "100%" }}>Beauty & Health</p>
			    </div>
				
			  ))}
			  {/* Example text overlay */}
			  
			  {/* <p style={{ position: "absolute", top: "397.68px", left: "430.13px", color: "white", fontSize: "22.15px", fontWeight: "bold", lineHeight: "100%" }}>Home & Kitchen</p>
			  <p style={{ position: "absolute", top: "397.68px", left: "830.13px", color: "white", fontSize: "22.15px", fontWeight: "bold", lineHeight: "100%" }}>Health & Beauty</p>
			  <p style={{ position: "absolute", top: "397.68px", left: "1200.13px", color: "white", fontSize: "22.15px", fontWeight: "bold", lineHeight: "100%" }}>Toy’s, Baby</p> */}
			</div>
	<div className="flex justify-center" style={{gap : "20px"}}>
		<img src={LeftArrow} alt="Left Arrow" className="ml-4 text-[#8E8E8E]" />
		<img src={RightArrow} alt="Right Arrow" className="mr-4 text-[#8E8E8E]" />
	</div>		
	</div>
  );
};

export default PopularProducts;
