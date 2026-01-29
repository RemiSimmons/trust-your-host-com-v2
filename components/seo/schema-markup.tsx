import Script from "next/script"

interface SchemaMarkupProps {
  schema: Record<string, any> | Record<string, any>[]
}

/**
 * Component to inject JSON-LD schema markup into pages
 * Use this to add structured data for SEO and rich results
 */
export function SchemaMarkup({ schema }: SchemaMarkupProps) {
  // Handle both single schema and array of schemas
  const schemas = Array.isArray(schema) ? schema : [schema]

  return (
    <>
      {schemas.map((schemaItem, index) => (
        <Script
          key={index}
          id={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaItem),
          }}
          strategy="beforeInteractive"
        />
      ))}
    </>
  )
}
