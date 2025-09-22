import inventory from '../assets/images/inventory.svg'
const CTASection = () => {
  return (
<div
  style={{
    height: "547px",
    width: "100%",
    display: "flex",
  }}
>
  {/* Left Section - Stats */}
  <div
    style={{
      width: "50%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      padding: "40px",
    }}
  >
    {/* Stats Grid */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
      }}
    >
      <div>
        <h1 className="mb-2 text-4xl font-extrabold text-gray-900">10+</h1>
        <p>Global Warehouses</p>
      </div>
      <div>
        <h1 className="mb-2 text-4xl font-extrabold text-gray-900">1M+</h1>
        <p>Cooperated Factories</p>
      </div>
      <div>
        <h1 className="mb-2 text-4xl font-extrabold text-gray-900">1500K+</h1>
        <p>Trusted Ecommerce Stores</p>
      </div>
      <div>
        <h1 className="mb-2 text-4xl font-extrabold text-gray-900">120+</h1>
        <p>Partner Couriers Worldwide</p>
      </div>
    </div>

    {/* CTA Text */}
    <div style={{ marginTop: "40px" }}>
      <p className="text-lg">
        Already Running <span style={{ color: "orange" }}>A Store?</span>{" "}
        <span style={{ color: "brown" }}>Connect Now</span> For Hyper-Growth!
      </p>

    </div>
  </div>

  {/* Right Section - Images */}
  <div
    style={{
      position: "relative",
      display:  "flex",
      gap: "10px",
      // height: "75%",

    }}
  >
    <div>
      <img src={inventory} alt="Warehouse worker" style={{ width: "100%", height: "70%", objectFit: "cover" }} />
    </div>
    <div>
      <img src={inventory} alt="Packaging" style={{ width: "100%", height: "70%", objectFit: "cover", position: "absolute", bottom: 0 }} />
    </div>
  </div>
</div>

  );
};

export default CTASection;
