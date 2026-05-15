import { getPages, getTenant, TENANT_SLUG } from '@/lib/payload'

// Always render on request so content changes in the CMS show up immediately.
export const dynamic = 'force-dynamic'

type Params = { slug?: string[] }

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const currentSlug = slug && slug.length > 0 ? slug[0] : 'home'

  const tenant = await getTenant()

  if (!tenant) {
    return (
      <div className="notice">
        <h1>Website nicht gefunden</h1>
        <p>
          Es wurde kein Tenant mit dem Slug <code>{TENANT_SLUG}</code> im CMS gefunden.
          Prüfe die Umgebungsvariablen <code>TENANT_SLUG</code> und{' '}
          <code>PAYLOAD_API_URL</code>.
        </p>
      </div>
    )
  }

  const pages = await getPages(tenant.id)
  const page = pages.find((p) => p.slug === currentSlug)

  if (!page) {
    return (
      <div className="notice">
        <h1>Seite nicht gefunden</h1>
        <p>
          Für <strong>{tenant.name}</strong> gibt es keine Seite mit dem Pfad{' '}
          <code>/{currentSlug}</code>.
        </p>
      </div>
    )
  }

  const sortedPages = [...pages].sort((a, b) => {
    if (a.slug === 'home') return -1
    if (b.slug === 'home') return 1
    return a.title.localeCompare(b.title)
  })

  return (
    <>
      <header className="site-header">
        <span className="brand">{tenant.name}</span>
        <nav className="site-nav">
          {sortedPages.map((p) => (
            <a key={p.id} href={p.slug === 'home' ? '/' : `/${p.slug}`}>
              {p.title}
            </a>
          ))}
        </nav>
      </header>

      <main className="page-main">
        <h1>{page.heading || page.title}</h1>
        {page.body ? <p>{page.body}</p> : null}
      </main>

      <footer className="site-footer">
        Inhalte bereitgestellt vom ZeuZ Payload CMS · Tenant: <code>{tenant.slug}</code>
      </footer>
    </>
  )
}
