import Home from "../assets/images/Home.png"
import BeautyHealth from "../assets/images/Beauty&Health.png"
import Clothing from "../assets/images/Clothing.png"
import Kids from "../assets/images/KidPlay.png"
import { CircleUpRightArrow, LeftArrowLine, RightArrowLine } from "../assets/svg"

const PopularProducts = () => {
	const popularProducts = [
		{ id: 1, name: "Beauty & Health", image: BeautyHealth },
		{ id: 2, name: "Home & Kitchen", image: Home },
		{ id: 3, name: "Health & Beauty", image: Clothing },
		{ id: 4, name: "Toy's, Baby", image: Kids },
		{ id: 5, name: "Electronics", image: BeautyHealth },
		{ id: 6, name: "Home", image: Home },
	]
	return (
		<div className="my-8 sm:my-12 md:my-16 lg:my-20">
			<div className="text-center pt-2 font-[600] text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4">
				<h1>Start dropshipping with Best Niche Category's</h1>
			</div>

			<div
				className="flex gap-2 overflow-x-scroll hide-scrollbar"
				style={{
					marginTop: "20px",
					maxWidth: "100%",
					paddingBottom: "8px",
				}}
			>
				{popularProducts.map((product) => (
					<div
						key={product.id}
						className="min-w-[200px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[380px] relative flex-shrink-0"
					>
						<img
							src={product.image || "/placeholder.svg"}
							alt={product.name}
							className="w-full h-[250px] sm:h-[300px] md:h-[380px] lg:h-[450px] object-cover rounded-md"
						/>
						<CircleUpRightArrow className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 w-6 h-6 sm:w-8 sm:h-8" />
						<p
							className="absolute text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold"
							style={{ bottom: "20px", left: "15px", lineHeight: "100%" }}
						>
							{product.name}
						</p>
					</div>
				))}
			</div>
			<div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4" style={{ marginTop: "10px" }}>
				<LeftArrowLine className="mt-2 sm:mt-3 md:mt-4 text-[#8E8E8E] w-6 h-6 sm:w-8 sm:h-8" />
				<RightArrowLine className="mt-2 sm:mt-3 md:mt-4 text-[#8E8E8E] w-6 h-6 sm:w-8 sm:h-8" />
			</div>
		</div>
	)
}

export default PopularProducts
