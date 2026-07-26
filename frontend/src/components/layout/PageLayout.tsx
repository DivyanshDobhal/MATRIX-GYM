import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../site/Navbar";
import { Footer } from "../site/Footer";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="bg-charcoal text-white min-h-screen flex flex-col justify-between">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="flex-1 pt-20"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
