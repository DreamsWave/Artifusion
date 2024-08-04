import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link to={"/"}>Welcome</Link>
      <Link to={"/dashboard"}>Dashboard</Link>
      <Link to={"/error"}>Error</Link>
    </nav>
  );
};

export default Navigation;
