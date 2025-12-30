export function OrganizationSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "B2dev",
    "url": "https://b2dev.pro",
    "logo": {
      "@type": "ImageObject",
      "url": "https://b2dev.pro/images/logo_google.png",
      "width": "600",
      "height": "60"
    },
    "image": "https://b2dev.pro/images/og-image.png",
    "description": "Agence web spécialisée dans la création de sites internet pour artisans et PME en Île-de-France",
    "email": "AmauryAll.b2dev@gmail.com",
    "telephone": "+33682510468",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Paris",
      "addressRegion": "Île-de-France",
      "addressCountry": "FR"
    },
    "sameAs": [
      "https://www.linkedin.com/company/b2dev",
      "https://www.facebook.com/B2Dev"
    ],
    "founder": [
      {
        "@type": "Person",
        "name": "Louis Winkelmuller",
        "jobTitle": "CTO & Architecte Technique"
      },
      {
        "@type": "Person",
        "name": "Amaury Allemand",
        "jobTitle": "Chef de Projet & Designer UX"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
