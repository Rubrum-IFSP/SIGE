import "./Layout.css";
import Footer from "./Footer";
import NavBar from "./NavBar";

interface Props {
  children: any;
  childrenNav?: any;
  connected: boolean;
}

export default function Layout({ children, childrenNav, connected }: Props) {
  return (
    <div className="layoutWrapper">
      <NavBar connected={connected} children={childrenNav}></NavBar>
      <div className="contentWrapper">{children}</div>
      <Footer></Footer>
    </div>
  );
}
