import { client } from '@/sanity/lib/client'
import { projectsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import PortfolioClient from './PortfolioClient'

interface SanityProject {
	_id: string
	title: string
	description: string
	mainImage: any
	gallery: any[]
	tags: string[]
	projectUrl?: string
}

async function getProjects() {
	try {
		const projects: SanityProject[] = await client.fetch(projectsQuery, {}, {
			cache: 'no-store', // Pour toujours avoir les données à jour
		})

		// Transformer les données Sanity en format utilisable par le composant client
		return projects.map(project => ({
			_id: project._id,
			title: project.title,
			description: project.description,
			mainImage: project.mainImage ? urlFor(project.mainImage).fit('max').auto('format').url() : '',
			gallery: project.gallery && project.gallery.length > 0
				? project.gallery.map(img => urlFor(img).width(1920).fit('max').auto('format').url())
				: project.mainImage
					? [urlFor(project.mainImage).width(1920).fit('max').auto('format').url()]
					: [],
			tags: project.tags || [],
			projectUrl: project.projectUrl,
		}))
	} catch (error) {
		console.error('Erreur lors de la récupération des projets:', error)
		return []
	}
}

export default async function RealisationsPage() {
	const projects = await getProjects()

	if (projects.length === 0) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
						Aucun projet disponible
					</h2>
					<p className="text-neutral-600 dark:text-neutral-400">
						Les projets seront bientôt disponibles.
					</p>
				</div>
			</div>
		)
	}

	return <PortfolioClient projects={projects} />
}
