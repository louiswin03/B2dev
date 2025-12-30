export function LocalBusinessSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "B2dev",
    "image": "https://b2dev.pro/images/og-image.png",
    "description": "Agence web spécialisée dans la création de sites internet pour artisans et PME en Île-de-France",
    "url": "https://b2dev.pro",
    "logo": {
      "@type": "ImageObject",
      "url": "https://b2dev.pro/images/logo_google.png",
      "width": "1436",
      "height": "1072"
    },
    "telephone": "+33682510468",
    "email": "AmauryAll.b2dev@gmail.com",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Paris",
      "addressRegion": "Île-de-France",
      "postalCode": "",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.8566",
      "longitude": "2.3522"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "48.8566",
        "longitude": "2.3522"
      },
      "geoRadius": "50000"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "15"
    },
    "founder": [
      {
        "@type": "Person",
        "name": "Louis Winkelmuller",
        "jobTitle": "CTO & Architecte Technique",
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "ISEP"
        }
      },
      {
        "@type": "Person",
        "name": "Amaury Allemand",
        "jobTitle": "Chef de Projet & Designer UX",
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "ISEP"
        }
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/b2dev"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
