# ZeuZ Demo Website

A standalone Next.js website that renders content pulled from the central
**ZeuZ Payload CMS** via its REST API. One deployment of this app = one website.
Point it at a different tenant by changing `TENANT_SLUG`.

## Environment variables
| Variable | Description |
| --- | --- |
| `PAYLOAD_API_URL` | Base URL of the Payload CMS, e.g. `http://148.230.105.171:8080` |
| `TENANT_SLUG` | Which tenant (website) to render, e.g. `demo-cafe` or `tech-startup` |

## How it works
1. Looks up the tenant by `TENANT_SLUG` via `/api/tenants`.
2. Fetches that tenant's pages via `/api/pages?where[tenant][equals]=<id>`.
3. Renders the page matching the URL path (`/` -> slug `home`, `/about` -> `about`, ...).

## Local development
```bash
npm install --legacy-peer-deps
cp .env.example .env   # adjust values
npm run dev
```

## Deployment (Dokploy)
Provider = Git or Drop, Build Type = Dockerfile. Set `PAYLOAD_API_URL` and
`TENANT_SLUG` as environment variables. The app listens on container port 3000.
