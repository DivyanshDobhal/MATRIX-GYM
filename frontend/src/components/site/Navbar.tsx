import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, User as UserIcon, LogOut, Bell, Settings, CreditCard, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

const publicLinks = [
  { to: "/", label: "Home" },
  { to: "/programs", label: "Programs" },
  { to: "/membership", label: "Membership" },
  { to: "/trainers", label: "Trainers" },
  { to: "/stories", label: "Success Stories" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
  { to: "/ai-assistant", label: "AI Coach" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/' });
    setOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="grid h-10 w-10 place-items-center rounded-xl bg-[#39FF14] text-black font-black text-xl shadow-[0_0_20px_rgba(57,255,20,0.5)] group-hover:shadow-[0_0_30px_rgba(57,255,20,0.8)] transition-shadow"
          >
            M
          </motion.span>
          <span className="font-display text-xl font-black tracking-tight text-white group-hover:text-[#39FF14] transition-colors">
            MATRIX
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <nav className="hidden lg:flex items-center gap-6">
          {publicLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-[#39FF14] font-bold after:w-full" }}
              inactiveProps={{ className: "text-white/70 hover:text-white after:w-0" }}
              className="text-xs uppercase tracking-wider font-semibold transition relative py-1 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#39FF14] after:transition-all hover:after:w-full"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* DESKTOP RIGHT SIDE AUTH */}
        <div className="hidden lg:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/auth/login">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-white/5 backdrop-blur-md border border-white/10 rounded-full transition-all"
                >
                  Sign In
                </motion.button>
              </Link>
              
              <Link to="/auth/register">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(57,255,20,0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 text-xs font-black uppercase tracking-wider text-black bg-[#39FF14] rounded-full shadow-[0_0_15px_rgba(57,255,20,0.4)] transition-shadow"
                >
                  Register
                </motion.button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <motion.button 
                whileHover={{ scale: 1.1, color: "#39FF14" }}
                whileTap={{ scale: 0.9 }}
                className="relative text-white/70 transition-colors p-2"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#39FF14] rounded-full shadow-[0_0_5px_rgba(57,255,20,1)]"></span>
              </motion.button>

              {/* User Avatar Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border-2 border-transparent hover:border-[#39FF14] transition-all overflow-hidden"
                >
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-5 h-5 text-white/70" />
                  )}
                </motion.button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-14 w-56 bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 backdrop-blur-xl"
                    >
                      <div className="px-4 py-3 border-b border-white/5 mb-2">
                        <p className="text-sm font-bold text-white truncate">{user.name}</p>
                        <p className="text-xs text-white/50 truncate">{user.email}</p>
                      </div>

                      <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-[#39FF14] hover:bg-white/5 transition-colors">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      
                      <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-[#39FF14] hover:bg-white/5 transition-colors">
                        <UserIcon className="w-4 h-4" /> Profile
                      </Link>

                      <Link to="/membership" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-[#39FF14] hover:bg-white/5 transition-colors">
                        <CreditCard className="w-4 h-4" /> Membership
                      </Link>

                      <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-[#39FF14] hover:bg-white/5 transition-colors">
                        <Settings className="w-4 h-4" /> Settings
                      </Link>

                      <div className="h-px bg-white/5 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* MOBILE HAMBURGER MENU BUTTON */}
        <button
          className="lg:hidden text-white/80 hover:text-[#39FF14] transition-colors p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#050505]/95 backdrop-blur-3xl border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {publicLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeProps={{ className: "text-[#39FF14] font-bold" }}
                  inactiveProps={{ className: "text-white/80" }}
                  className="text-lg font-semibold uppercase tracking-wider"
                >
                  {l.label}
                </Link>
              ))}
              
              <div className="h-px bg-white/10 my-2" />
              
              {!user ? (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/auth/login"
                    onClick={() => setOpen(false)}
                    className="w-full text-center py-3 text-sm font-bold uppercase tracking-wider text-white bg-white/5 border border-white/10 rounded-full"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/register"
                    onClick={() => setOpen(false)}
                    className="w-full text-center py-3 text-sm font-black uppercase tracking-wider text-black bg-[#39FF14] rounded-full shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                      {user.profileImage ? (
                        <img src={user.profileImage} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{user.name}</p>
                      <p className="text-xs text-white/50">{user.email}</p>
                    </div>
                  </div>

                  <Link to="/dashboard" onClick={() => setOpen(false)} className="text-base font-semibold text-white/80 flex items-center gap-3">
                    <LayoutDashboard className="w-5 h-5 text-[#39FF14]" /> Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-left text-base font-semibold text-red-500 flex items-center gap-3"
                  >
                    <LogOut className="w-5 h-5" /> Log Out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
