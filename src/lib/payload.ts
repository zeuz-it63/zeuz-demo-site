const API_URL = (process.env.PAYLOAD_API_URL || 'http://localhost:3000').replace(/\/$/, '')
const TENANT_SLUG = process.env.TENANT_SLUG || 'demo-cafe'

export type Tenant = {
  id: string
  name: string
  slug: string
  domain?: string
}

export type Page = {
  id: string
  title: string
  slug: string
  heading?: string
  body?: string
}

/** Look up the tenant this website belongs to, by its slug. */
export async function getTenant(): Promise<Tenant | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/tenants?where[slug][equals]=${encodeURIComponent(TENANT_SLUG)}&limit=1`,
      { cache: 'no-store' },
    )
    if (!res.ok) return null
    const data = await res.json()
    return (data.docs && data.docs[0]) || null
  } catch {
    return null
  }
}

/** Fetch all pages that belong to a tenant. */
export async function getPages(tenantId: string): Promise<Page[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/pages?where[tenant][equals]=${encodeURIComponent(tenantId)}&limit=100&depth=0`,
      { cache: 'no-store' },
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.docs || []
  } catch {
    return []
  }
}

export { API_URL, TENANT_SLUG }
