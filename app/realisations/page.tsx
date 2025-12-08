"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Section } from "../components/ui/Section";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import "./realisations.css";

const projects = [
	{
		title: "Les Suites du Cygne",
		category: "Projet Professionnel",
		description:
			"Site élégant pour une entreprise de location d'appartements. Options avancées avec google maps intégré, système de reservation via reservit implémenté au site, et traduction en 3 langues.",
		images: [
			"/images/cygne1.png",
			"/images/cygne2.png",
			"/images/cygne3.png",
			"/images/cygne4.png",
			"/images/cygne5.png",
			"/images/cygne6.png",
			"/images/cygne7.png",
			"/images/cygne8.png",
			"/images/cygne9.png",
		],
		tags: ["Google Maps", "Reservit", "Traductions"],
		link: "#",
	},
	{
		title: "Site tout en 1 de cryptommonnaies",
		category: "Projet personnel",
		description:
			"Plateforme de cryptomonnaies qui affiche les prix en temps réel, les graphiques TradingView, permet de faire des backtests avec des stratégies avancées et de connecter ses portefeuilles. Gestion des comptes utilisateurs avec base de données avancée.",
		images: [
			"/images/crypto2.png",
			"/images/crypto3.png",
			"/images/crypto4.png",
			"/images/crypto5.png",
			"/images/crypto6.png",
			"/images/crypto7.png",
			"/images/crypto8.png",
			"/images/crypto9.png",
			"/images/crypto10.png",
			"/images/crypto11.png",
			"/images/crypto12.png",
		],
		tags: ["API temps réel", "Connexion portefeuilles", "Backtest avancé "],
		link: "#",
	},
	{
		title: "Dashboard",
		category: "Projet personnel",
		description:
			"Site de dashboard optimisé pour les entrepreneurs. Implémentation avancée avec revenus, dépenses, investissements (avec prix temps réel), agendas, projet, et fiscalité. Gestion des utilisateurs avec base de données complexe.",
		images: [
			"/images/dashboard.png",
			"/images/dashboard2.png",
			"/images/dashboard7.png",
			"/images/dashboard3.png",
			"/images/dashboard4.png",
			"/images/dashboard8.png",
			"/images/dashboard5.png",
			"/images/dashboard6.png",
			"/images/dashboard9.png",
			"/images/dashboard10.png",
			"/images/dashboard11.png",
			"/images/dashboard12.png",
			"/images/dashboard13.png",
		],
		tags: [
			"Graphiques de suivi",
			"Gestion comptes clients",
			"API ",
		],
		link: "#",
	},
];

export default function PortfolioPage() {
	const [isMobile, setIsMobile] = useState(false);
	// State pour tracker l'index de l'image actuelle pour chaque projet
	const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: number]: number }>(
		projects.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
	);
	// State pour la lightbox (plein écran)
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [lightboxProject, setLightboxProject] = useState<number | null>(null);
	const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	// Fermer la lightbox avec la touche Echap
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setLightboxOpen(false);
		};
		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, []);

	// Bloquer le scroll quand la lightbox est ouverte
	useEffect(() => {
		if (lightboxOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [lightboxOpen]);

	const nextImage = (projectIndex: number, e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentImageIndices(prev => ({
			...prev,
			[projectIndex]: (prev[projectIndex] + 1) % projects[projectIndex].images.length
		}));
	};

	const prevImage = (projectIndex: number, e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentImageIndices(prev => ({
			...prev,
			[projectIndex]: prev[projectIndex] === 0
				? projects[projectIndex].images.length - 1
				: prev[projectIndex] - 1
		}));
	};

	const goToImage = (projectIndex: number, imageIndex: number, e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentImageIndices(prev => ({
			...prev,
			[projectIndex]: imageIndex
		}));
	};

	// Ouvrir la lightbox
	const openLightbox = (projectIndex: number, imageIndex: number, e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setLightboxProject(projectIndex);
		setLightboxImageIndex(imageIndex);
		setLightboxOpen(true);
	};

	// Navigation dans la lightbox
	const nextLightboxImage = () => {
		if (lightboxProject === null) return;
		setLightboxImageIndex((prev) => (prev + 1) % projects[lightboxProject].images.length);
	};

	const prevLightboxImage = () => {
		if (lightboxProject === null) return;
		setLightboxImageIndex((prev) =>
			prev === 0 ? projects[lightboxProject].images.length - 1 : prev - 1
		);
	};

	return (
		<>
			<Section className="pt-32 pb-10">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
					className="text-center"
				>
					<h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">Notre travail

					</h1>
					<p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
						Découvrez nos différents projets de création de sites web.
					</p>
					<p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
						Des projets professionnels et personnels.
					</p>
				</motion.div>
			</Section>

			<Section>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{projects.map((project, index) => (
						<motion.div
							key={project.title}
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ delay: isMobile ? 0 : index * 0.05, duration: 0.3 }}
							className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 cursor-pointer transition-all duration-300 flex flex-col h-full ${!isMobile ? 'hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-2' : ''} ${index === 2 ? 'md:col-span-2 md:max-w-2xl md:mx-auto' : ''}`}
						>
							{/* Image Carousel */}
							<div
								className="relative h-64 overflow-hidden cursor-pointer"
								onClick={(e) => openLightbox(index, currentImageIndices[index], e)}
							>
								<div className="absolute inset-0 bg-neutral-800 animate-pulse" /> {/* Fallback if image fails */}
								<Image
									src={project.images[currentImageIndices[index]]}
									alt={`${project.title} - Image ${currentImageIndices[index] + 1}`}
									fill
									className={`object-cover fade-in-image ${!isMobile ? 'transition-transform duration-500 group-hover:scale-110' : ''}`}
									placeholder="blur"
									blurDataURL="/images/placeholder-blur.png"
									onLoadingComplete={img => img.classList.add('loaded')}
								/>

								{/* Navigation buttons - Only show if more than 1 image */}
								{project.images.length > 1 && (
									<>
										<button
											onClick={(e) => prevImage(index, e)}
											className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
											aria-label="Image précédente"
										>
											<ChevronLeft className="w-5 h-5" />
										</button>
										<button
											onClick={(e) => nextImage(index, e)}
											className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
											aria-label="Image suivante"
										>
											<ChevronRight className="w-5 h-5" />
										</button>

										{/* Image indicators (dots) */}
										<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
											{project.images.map((_, imageIndex) => (
												<button
													key={imageIndex}
													onClick={(e) => goToImage(index, imageIndex, e)}
													className={`w-2 h-2 rounded-full transition-all ${
														currentImageIndices[index] === imageIndex
															? 'bg-white w-6'
															: 'bg-white/50 hover:bg-white/75'
													}`}
													aria-label={`Aller à l'image ${imageIndex + 1}`}
												/>
											))}
										</div>
									</>
								)}

								<div className="absolute inset-0 bg-black/60 dark:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
									<Link href={project.link} className="p-3 bg-white dark:bg-white text-neutral-900 dark:text-black rounded-full hover:bg-blue-500 hover:text-white transition-colors">
										<ExternalLink className="w-6 h-6" />
									</Link>
								</div>
							</div>

							<div className="p-8 flex-1 flex flex-col">
								<div className="flex justify-between items-start mb-6">
									<div>
										<span className="text-blue-500 dark:text-blue-400 text-lg font-medium mb-3 block">{project.category}</span>
										<h3 className="text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
											{project.title}
										</h3>
									</div>
								</div>

								<p className="text-neutral-600 dark:text-neutral-400 mb-8 text-base leading-relaxed
              flex-grow">
									{project.description}
								</p>

								<div className="flex flex-wrap gap-2 mt-auto">
									{project.tags.map((tag) => (
										<span key={tag} className="px-3 py-1.5 rounded bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-sm text-neutral-700 dark:text-neutral-300">
											{tag}
										</span>
									))}
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</Section>

			{/* Lightbox (Plein écran) */}
			<AnimatePresence>
				{lightboxOpen && lightboxProject !== null && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
						onClick={() => setLightboxOpen(false)}
					>
						{/* Bouton fermer */}
						<button
							onClick={() => setLightboxOpen(false)}
							className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
							aria-label="Fermer"
						>
							<X className="w-6 h-6" />
						</button>

						{/* Navigation précédent */}
						{projects[lightboxProject].images.length > 1 && (
							<>
								<button
									onClick={(e) => {
										e.stopPropagation();
										prevLightboxImage();
									}}
									className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
									aria-label="Image précédente"
								>
									<ChevronLeft className="w-8 h-8" />
								</button>

								{/* Navigation suivant */}
								<button
									onClick={(e) => {
										e.stopPropagation();
										nextLightboxImage();
									}}
									className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
									aria-label="Image suivante"
								>
									<ChevronRight className="w-8 h-8" />
								</button>
							</>
						)}

						{/* Image principale */}
						<motion.div
							initial={{ scale: 0.9 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.9 }}
							className="relative max-w-7xl max-h-[90vh] w-full h-full mx-4"
							onClick={(e) => e.stopPropagation()}
						>
							<Image
								src={projects[lightboxProject].images[lightboxImageIndex]}
								alt={`${projects[lightboxProject].title} - Image ${lightboxImageIndex + 1}`}
								fill
								className="object-contain fade-in-image"
								placeholder="blur"
								blurDataURL="/images/placeholder-blur.png"
								onLoadingComplete={img => img.classList.add('loaded')}
							/>
						</motion.div>

						{/* Indicateurs */}
						{projects[lightboxProject].images.length > 1 && (
							<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
								{projects[lightboxProject].images.map((_, imageIndex) => (
									<button
										key={imageIndex}
										onClick={(e) => {
											e.stopPropagation();
											setLightboxImageIndex(imageIndex);
										}}
										className={`w-2.5 h-2.5 rounded-full transition-all ${
											lightboxImageIndex === imageIndex
												? 'bg-white w-8'
												: 'bg-white/50 hover:bg-white/75'
										}`}
										aria-label={`Aller à l'image ${imageIndex + 1}`}
									/>
								))}
							</div>
						)}

						{/* Info du projet */}
						<div className="absolute top-6 left-6 text-white">
							<h3 className="text-2xl font-bold mb-1">{projects[lightboxProject].title}</h3>
							<p className="text-white/70">
								Image {lightboxImageIndex + 1} / {projects[lightboxProject].images.length}
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
