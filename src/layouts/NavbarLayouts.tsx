import { NextPage } from "next";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface Props {
  children: React.ReactNode;
}

const NavbarLayouts: NextPage<Props> = ({ children }) => {
  return (
    <div className="mx-auto flex min-h-screen flex-col">
      <div className="flex grow flex-col">
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default NavbarLayouts;
