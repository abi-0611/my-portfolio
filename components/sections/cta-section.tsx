"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const router = useRouter();

  return (
    <section className="flex items-center justify-center py-16 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <LiquidMetalButton
          icon={<ArrowRight className="w-5 h-5" />}
          size="lg"
          metalConfig={{
            colorBack: "#3b82f6",
            colorTint: "#93c5fd",
            speed: 0.4,
          }}
          onClick={() => router.push("/projects")}
        >
          View My Work
        </LiquidMetalButton>
      </motion.div>
    </section>
  );
}
