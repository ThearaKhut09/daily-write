import { useEffect, useState } from "react";
import { Moon, Sun, SquarePen, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/DaliyWriteLogo.svg";

export default function NavbarComponent() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const navItems = [
    { path: "/", name: "HOME" },
    { path: "/blogs", name: "BLOGS" },
    { path: "/about", name: "ABOUT" },
  ];

  return (
    <header className="w-full bg-bg-main border-b border-border-main py-2 transition-colors duration-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm font-bold text-primary-orange hover:opacity-70 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/blog-post" className="flex items-center gap-2 text-primary-orange font-bold hover:opacity-80">
            <button className="flex items-center gap-2 text-primary-orange font-bold hover:opacity-80">
              <SquarePen size={24} />
              <span className="text-md hidden lg:inline">Write</span>
            </button>
          </Link>

          <div className="h-6 w-px bg-border-main mx-1 hidden md:block" />

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 bg-primary-orange text-white rounded-lg hover:brightness-110 transition-all"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => navigate("/auth")}
            className="hidden md:block bg-primary-orange px-6 py-2 rounded-lg text-white text-sm font-bold uppercase hover:brightness-110 transition-all"
          >
            Login
          </button>

          <button
            className="md:hidden p-2 text-primary-orange"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-bg-main border-t border-border-main p-4 space-y-4 shadow-xl">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="block text-lg font-bold text-primary-orange"
            >
              {item.name}
            </Link>
          ))}
          <hr className="border-border-main" />
          <button
            onClick={() => {
              navigate("/auth");
              setMenuOpen(false);
            }}
            className="w-full bg-primary-orange py-3 rounded-lg text-white font-bold uppercase"
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
}
