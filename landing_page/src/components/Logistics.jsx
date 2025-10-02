import logistic from "../assets/images/logistic.jpg";
import logistic2 from "../assets/images/logistic2.jpg";
import logistic3 from "../assets/images/logistic3.jpg";
import logistic4 from "../assets/images/logistic4.jpg";
import logistic5 from "../assets/images/logistic5.jpg";  //
const Logistics = () => {
  return (
<div
  style={{
    // height: "450px",
    width: "100%",
    // backgroundColor: "lightblue",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // centers horizontally
    justifyContent: "center", // centers vertically
    // marginBottom: "50px",
  }}
>
  <h4 style={{ textAlign: "center", padding: "20px", fontSize: "38px", fontWeight: "600" }}>
    Logistics Solutions to Help Businesses
  </h4>

  <div
    style={{
      // height: "400px",
      // width: "90%",
      display: "inline-flex",
      justifyContent: "center", // typo fixed ✅
      alignItems: "center", // centers images vertically inside red box
      borderRadius: "10px", // optional spacing between images
      overflowX: "hidden", // enables horizontal scrolling if needed
    }}
  >
    <img
      src={logistic}
      alt="Logistics"
      style={{ height: "623px", width: "246px", objectFit: "cover", }}
    />
    <img src={logistic2} alt="Logistics" style={{ height: "623px", width: "246px", objectFit: "cover" }} />
    <img src={logistic3} alt="Logistics" style={{ height: "623px", width: "246px", objectFit: "cover" }} />
    <img src={logistic4} alt="Logistics" style={{ height: "623px", width: "246px", objectFit: "cover" }} />
    <img src={logistic5} alt="Logistics" style={{ height: "623px", width: "246px", objectFit: "cover" }} />
  </div>
</div>

  );
};

export default Logistics;