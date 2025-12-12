import { client } from '@/sanity/lib/client'
import { servicesQuery, faqsQuery } from '@/sanity/lib/queries'
import ServicesClient from './ServicesClient'

interface SanityService {
	_id: string
	title: string
	subtitle?: string
	price: string
	description: string
	features: string[]
	isRecommended: boolean
	color: string
}

interface SanityFAQ {
	_id: string
	question: string
	answer: string
	color: string
}

async function getServicesData() {
	try {
		const [services, faqs] = await Promise.all([
			client.fetch<SanityService[]>(servicesQuery, {}, { cache: 'no-store' }),
			client.fetch<SanityFAQ[]>(faqsQuery, {}, { cache: 'no-store' }),
		])

		return { services, faqs }
	} catch (error) {
		console.error('Erreur lors de la récupération des services:', error)
		return { services: [], faqs: [] }
	}
}

export default async function ServicesPage() {
	const { services, faqs } = await getServicesData()

	if (services.length === 0 && faqs.length === 0) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
						Aucun service disponible
					</h2>
					<p className="text-neutral-600 dark:text-neutral-400">
						Les services seront bientôt disponibles.
					</p>
				</div>
			</div>
		)
	}

	return <ServicesClient services={services} faqs={faqs} />
}
