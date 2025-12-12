"use client";

import { motion } from "framer-motion";
import { Check, Package, ShoppingCart, Store, ChevronDown } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Section } from "../components/ui/Section";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface Service {
	_id: string;
	title: string;
	subtitle?: string;
	price: string;
	description: string;
	features: string[];
	isRecommended: boolean;
	color: string;
}

interface FAQ {
	_id: string;
	question: string;
	answer: string;
	color: string;
}

interface ServicesClientProps {
	services: Service[];
	faqs: FAQ[];
}

const iconMap: Record<string, React.ReactNode> = {
	blue: <Store className="w-8 h-8 text-blue-400" />,
	purple: <Package className="w-8 h-8 text-purple-400" />,
	orange: <ShoppingCart className="w-8 h-8 text-orange-400" />,
	pink: <ShoppingCart className="w-8 h-8 text-pink-400" />,
	green: <Check className="w-8 h-8 text-green-400" />,
};

export default function ServicesClient({ services, faqs }: ServicesClientProps) {
	const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	return (
		<>
			<Section className="pt-32 pb-10 text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
						Nos Offres & Tarifs
					</h1>
					<p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-4">
						Sites modernes et performants. Prix compétitifs grâce à notre profil junior.
					</p>
					<p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
						💰 Aide de l'État disponible : jusqu'à 50% remboursé pour les artisans et commerçants IDF
					</p>
				</motion.div>
			</Section>

			<Section>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{services.map((service, index) => {
						const icon = iconMap[service.color] || iconMap.blue;
						const serviceId = service.title.toLowerCase().replace(/\s+/g, '-');

						return (
							<motion.div
								key={service._id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: isMobile ? 0 : index * 0.1, duration: 0.4 }}
								className={`relative p-8 rounded-2xl border flex flex-col cursor-pointer transition-all duration-300 ${
									!isMobile ? 'hover:-translate-y-2' : ''
								} ${
									service.isRecommended
										? `bg-purple-50 dark:bg-white/5 border-purple-500/50 shadow-lg shadow-purple-500/10 ${!isMobile ? 'hover:shadow-purple-500/20' : ''}`
										: `bg-neutral-100 dark:bg-neutral-900/50 border-neutral-200 dark:border-white/10 ${!isMobile ? 'hover:border-neutral-300 dark:hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/10' : ''}`
								}`}
							>
								{service.isRecommended && (
									<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-base font-medium">
										Recommandé
									</div>
								)}

								<div className="mb-6">
									<div
										className={cn(
											"w-14 h-14 rounded-xl flex items-center justify-center mb-6 border",
											!isMobile && "transition-transform duration-200 hover:scale-110",
											service.color === "blue" && "bg-blue-500/10 border-blue-500/20",
											service.color === "purple" && "bg-purple-500/10 border-purple-500/20",
											service.color === "pink" && "bg-pink-500/10 border-pink-500/20",
											service.color === "orange" && "bg-orange-500/10 border-orange-500/20"
										)}
									>
										{icon}
									</div>
									<h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">{service.title}</h3>
									<p className="text-neutral-600 dark:text-neutral-400">{service.description}</p>
								</div>

								<div className="mb-8">
									<div className="flex items-baseline gap-2 flex-wrap">
										<span className="text-4xl font-bold text-neutral-900 dark:text-white">{service.price}</span>
										{service.price !== "Devis" && <span className="text-neutral-500 dark:text-neutral-500">HT</span>}
									</div>
									{service.price !== "Devis" && !service.price.includes('€') === false && (
										<p className="text-base text-green-600 dark:text-green-400 mt-2 font-medium">
											Soit {parseInt(service.price.replace('€', '')) / 2}€ après aide IDF*
										</p>
									)}
									{service.subtitle && (
										<p className="text-base text-green-600 dark:text-green-400 mt-2 font-medium">
											{service.subtitle}
										</p>
									)}
								</div>

								<ul className="space-y-4 mb-8 flex-grow">
									{service.features.map((feature, idx) => (
										<li key={idx} className="flex items-start gap-3 text-base text-neutral-700 dark:text-neutral-300">
											<Check className={cn(
												"w-5 h-5 flex-shrink-0",
												service.color === "blue" && "text-blue-400",
												service.color === "purple" && "text-purple-400",
												service.color === "pink" && "text-pink-400",
												service.color === "orange" && "text-orange-400"
											)} />
											<span>{feature}</span>
										</li>
									))}
								</ul>

								<Link href={`/contact?service=${serviceId}`} className="w-full">
									<Button
										variant={service.isRecommended ? "secondary" : "outline"}
										className="w-full"
									>
										Choisir cette offre
									</Button>
								</Link>
							</motion.div>
						);
					})}
				</div>
			</Section>

			{/* FAQ Section */}
			<Section className="bg-neutral-50 dark:bg-neutral-950/50 py-24">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
						Questions fréquentes
					</h2>
					<p className="text-xl text-neutral-600 dark:text-neutral-400">
						Tout ce que vous devez savoir sur nos services
					</p>
				</motion.div>

				<div className="max-w-3xl mx-auto space-y-4">
					{faqs.map((faq, index) => (
						<motion.div
							key={faq._id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: isMobile ? 0 : index * 0.05 }}
							className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-white/10 overflow-hidden"
						>
							<button
								onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
								className="w-full p-6 flex items-center justify-between gap-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
							>
								<div className="flex items-start gap-4 flex-1">
									<div className={cn(
										"w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
										faq.color === "blue" && "bg-blue-500/10",
										faq.color === "green" && "bg-green-500/10",
										faq.color === "purple" && "bg-purple-500/10"
									)}>
										<ChevronDown className={cn(
											"w-5 h-5 transition-transform duration-200",
											faq.color === "blue" && "text-blue-500",
											faq.color === "green" && "text-green-500",
											faq.color === "purple" && "text-purple-500",
											openFaqIndex === index && "rotate-180"
										)} />
									</div>
									<h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
										{faq.question}
									</h3>
								</div>
							</button>

							{openFaqIndex === index && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: "auto", opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									className="px-6 pb-6"
								>
									<div className="pl-14 text-neutral-600 dark:text-neutral-400 whitespace-pre-line">
										{faq.answer}
									</div>
								</motion.div>
							)}
						</motion.div>
					))}
				</div>
			</Section>
		</>
	);
}
