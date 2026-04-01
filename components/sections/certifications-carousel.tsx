"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Certification {
  _id?: string;
  id?: number;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  badge?: string;
}

interface CertificationsCarouselProps {
  certifications?: Certification[];
}

export function CertificationsCarousel({ certifications = [] }: CertificationsCarouselProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
        Certifications
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-12"
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {certifications.map((cert, idx) => (
              <CarouselItem
                key={cert._id ?? cert.id ?? idx}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/40 hover:border-purple-500/30 transition-colors h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <span className="text-4xl mb-4">{cert.badge}</span>
                    <h3 className="font-bold text-foreground text-sm mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    <p className="text-xs text-purple-400 mt-1">{cert.date}</p>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 text-xs text-purple-400 hover:text-purple-300 underline underline-offset-2"
                      >
                        View Credential →
                      </a>
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-border/40 hover:bg-card" />
          <CarouselNext className="border-border/40 hover:bg-card" />
        </Carousel>
      </motion.div>
    </section>
  );
}
