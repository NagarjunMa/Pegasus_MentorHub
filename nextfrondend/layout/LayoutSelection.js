export default function LayoutSelection({ children }) {
  return (
    <div
      className="flex min-h-screen bg-[#F5F2EC]"
      style={{
        backgroundImage: `url(./images/loginPage.png)`,
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  );
}
