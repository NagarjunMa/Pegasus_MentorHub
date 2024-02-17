import layoutStyles from "./../styles/Layout.module.css";
import gridStyles from "./../styles/Grids.module.css";

export default function InterestLayout({ children }) {
  return <div className="flex min-h-screen bg-[#F5F2EC]">{children}</div>;
}
