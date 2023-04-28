export default function Footer() {
  return (
    <div>
      <div
        style={{
          // position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80px",
          // backgroundColor: "#f5f5f5",
          fontFamily: "Montserrat",
          fontSize: "14px",
        }}
      >
        Made by ‎{" "}
        <a href="https://github.com/bhagatpratik07" target="_blank">
          {" "}
          Pratik Bhagat
        </a>
      </div>
    </div>
  );
}
