"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMail } from "react-icons/fi";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import BorderGlow from "@/components/ui/border-glow";
import { ContactForm } from "@/components/sections/contact-form";
import { useHydrated } from "@/lib/hooks/use-hydrated";

export function ContactPageClient() {
  const [open, setOpen] = useState(false);
  const hydrated = useHydrated();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const overlay = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="contact-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              key="contact-card"
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 24 }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
              className="pointer-events-auto w-full max-w-lg"
              style={{ borderRadius: 24 }}
            >
              <BorderGlow
                edgeSensitivity={30}
                glowColor="80 40 120"
                backgroundColor="transparent"
                borderRadius={24}
                glowRadius={60}
                glowIntensity={1.2}
                coneSpread={30}
                animated={false}
                colors={["#c084fc", "#f472b6", "#38bdf8"]}
                fillOpacity={0.35}
              >
                <div
                  className="overflow-hidden rounded-[22px] bg-neutral-950 shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
                  style={{ maxHeight: "86vh", overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: "#4a4a4a transparent" }}
                >
                  <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-white/8">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-purple-400 font-medium mb-0.5">Reach Out</p>
                      <h2 className="text-xl font-bold text-foreground">Send a Message</h2>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      aria-label="Close"
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="px-7 py-6">
                    <ContactForm onSuccess={() => setOpen(false)} />
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="flex justify-center mt-4">
        <LiquidMetalButton
          icon={<FiMail className="w-5 h-5" />}
          size="lg"
          metalConfig={{ colorBack: "#7c3aed", colorTint: "#c084fc", speed: 0.5 }}
          onClick={() => setOpen(true)}
        >
          Contact Me
        </LiquidMetalButton>
      </div>
      {hydrated && createPortal(overlay, document.body)}
    </>
  );
}
