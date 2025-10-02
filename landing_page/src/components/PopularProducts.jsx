import Home from "../assets/images/Home.png"
import BeautyHealth from "../assets/images/Beauty&Health.png"
import Clothing from "../assets/images/Clothing.png"
import Kids from "../assets/images/KidPlay.png"
import { CircleUpRightArrow, LeftArrowLine, RightArrowLine} from "../assets/svg"

const PopularProducts = () => {
	const popularProducts = [
		{ id: 1, name: "Beauty & Health", image: BeautyHealth },
		{ id: 2, name: "Home & Kitchen", image: Home },
		{ id: 3, name: "Health & Beauty", image: Clothing },
		{ id: 4, name: "Toy’s, Baby", image: Kids },
		{ id: 5, name: "Electronics", image: BeautyHealth },
		{ id: 6, name: "Home", image: Home },
	];
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
			  {popularProducts.map((product) => (
			    <div key={product.id} className="min-w-[350px] relative">
			      <img
			        src={product.image}
			        alt={product.name}
			        className="w-full h-[450.7058410644531px] object-cover rounded-md"
			      />
				  <CircleUpRightArrow className="absolute top-4 right-4" />
				  <p style={{ position: "absolute", top: "397.68px", left: "30.13px", color: "white", fontSize: "22.15px", fontWeight: "bold", lineHeight: "100%" }}>Beauty & Health</p>
			    </div>
				
			  ))}
			  {/* Example text overlay */}
			  
			  {/* <p style={{ position: "absolute", top: "397.68px", left: "430.13px", color: "white", fontSize: "22.15px", fontWeight: "bold", lineHeight: "100%" }}>Home & Kitchen</p>
			  <p style={{ position: "absolute", top: "397.68px", left: "830.13px", color: "white", fontSize: "22.15px", fontWeight: "bold", lineHeight: "100%" }}>Health & Beauty</p>
			  <p style={{ position: "absolute", top: "397.68px", left: "1200.13px", color: "white", fontSize: "22.15px", fontWeight: "bold", lineHeight: "100%" }}>Toy’s, Baby</p> */}
			</div>
	<div className="flex justify-center" style={{gap : "10px", marginTop : "-15px"}}>
	    <LeftArrowLine className="mt-4 text-[#8E8E8E]" />
	   <RightArrowLine className="mt-4 text-[#8E8E8E]" />
		
	</div>		
	</div>
  );
};

export default PopularProducts;
