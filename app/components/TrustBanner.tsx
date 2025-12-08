"use client";

import { motion } from "framer-motion";
import { Shield, Award, Clock, HeartHandshake } from "lucide-react";

export function TrustBanner() {
  const items = [
    {
      icon: Shield,
      text: "Paiement sécurisé",
      color: "text-blue-500"
    },
    {
      icon: Award,
      text: "Qualité garantie",
      color: "text-purple-500"
    },
    {
      icon: Clock,
      text: "Réponse sous 24h",
      color: "text-green-500"
    },
    {
      icon: HeartHandshake,
      text: "Satisfaction 100%",
      color: "text-pink-500"
    }
  ];

  return (
    <div className="border-y border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="flex items-center justify-center gap-3"
            >
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
