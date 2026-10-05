import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar" style={{ viewTransitionName: "navbar" }}>
      <div className="navbar-logo">
        <div className="navbar-item">
          <Link href="/">garis</Link>
        </div>
      </div>
      <div className="navbar-items">
        <div className="navbar-item">
          <Link href="/first">first</Link>
        </div>
        <div className="navbar-item">
          <Link href="/second">second</Link>
        </div>
        <div className="navbar-item">
          <Link href="/third">third</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
