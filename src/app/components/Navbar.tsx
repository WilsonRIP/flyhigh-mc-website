"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Poetsen_One } from "next/font/google";
import { useState, useEffect } from "react";

// Load Poetsen One (Google Font) at build‑time
const poetsen = Poetsen_One({
  weight: "400",
  subsets: ["latin"],
});

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rules", label: "Rules" },
  { href: "/team", label: "Team" },
  { href: "/socials", label: "Socials" },
  { href: "/connect", label: "Connect" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  
  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add resize event listener
    window.addEventListener("resize", checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 70, damping: 15 }}
      className={`${poetsen.className} sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 text-white shadow-md`}
    >
      <div className="container mx-auto flex items-center px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-2xl md:text-3xl font-semibold tracking-wide mr-8">
          <img 
            src="/server-icon.png" 
            alt="Server Icon" 
            width={32} 
            height={32} 
            className="w-8 h-8 rounded-full"
            loading="lazy"
          />
        </Link>

        {/* Desktop Navigation - Moved to the left */}
        {!isMobile && (
          <motion.ul
            className="flex gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <motion.li
                  key={href}
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Link
                    href={href}
                    className={`relative px-1 py-2 text-sm font-medium transition-colors duration-300 ease-out hover:text-teal-300 ${
                      isActive ? "text-teal-400" : ""
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 -bottom-0.5 h-0.5 w-full rounded bg-teal-400"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 25,
                        }}
                      />
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        )}

        {/* Mobile Menu Button - Pushed to the right with ml-auto */}
        {isMobile && (
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center space-y-1.5 z-50 ml-auto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 8 : 0,
              }}
              className="w-6 h-0.5 bg-white block transition-all duration-300"
            />
            <motion.span
              animate={{
                opacity: isOpen ? 0 : 1,
              }}
              className="w-6 h-0.5 bg-white block transition-all duration-300"
            />
            <motion.span
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -8 : 0,
              }}
              className="w-6 h-0.5 bg-white block transition-all duration-300"
            />
          </motion.button>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md shadow-lg"
          >
            <motion.ul 
              className="flex flex-col items-center py-4 space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
              }}
            >
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <motion.li
                    key={href}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="w-full text-center"
                  >
                    <Link
                      href={href}
                      className={`block py-2 text-lg font-medium transition-colors hover:text-teal-300 ${
                        isActive ? "text-teal-400" : ""
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}