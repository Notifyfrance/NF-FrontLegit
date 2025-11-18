# NF-FrontLegit - Project Memory

> Frontend React/TypeScript pour le système de validation de deals Notify France

---

## 🏗️ Architecture

### Stack
- **Framework**: React 18.3 + TypeScript + Vite 5.4
- **Routing**: React Router DOM 6.30
- **Data Fetching**: TanStack Query 5.83 (React Query)
- **UI**: Shadcn/ui + Tailwind CSS + Lucide React
- **Toasts**: Sonner
- **Charts**: Recharts

### Deployment Architecture
```
Frontend (Vercel)                     Backend API (Railway)
├─ nf-legit.me                       ├─ api.nf-legit.me
├─ www.nf-legit.me                   ├─ Bot Discord + REST API
└─ *.vercel.app (preview)            └─ MongoDB Atlas (shared)

DNS: IONOS (nf-legit.me)
```

**Repos séparés**:
- Frontend: `Notifyfrance/NF-FrontLegit` (ce repo)
- Backend: `WaRyXx06/NF-LegitCheck` (Railway)

**Auto-deploy**: Git push to `main` → Vercel build → Production

---

## 📁 Structure Clés

```
src/
├── hooks/
│   ├── useGlobalStats.ts    # Stats API (totalDeals, activeMembers)
│   ├── useTopMembers.ts     # Top 3 membres par deals
│   └── useUserProfile.ts    # Profil (API + mock hybrid)
│
├── lib/
│   ├── api.ts               # Client fetch centralisé (baseURL: VITE_API_URL)
│   ├── types.ts             # Types TS (ApiUserProfile, UserProfile, etc.)
│   └── mockData.ts          # Fallback + données futures features
│
├── pages/
│   ├── Home.tsx             # Homepage (stats + top 3 membres)
│   ├── Profile.tsx          # Profil user (/:username)
│   └── ProfileNotFound.tsx  # 404 profil
│
└── components/
    ├── ui/                  # 50+ composants Shadcn/ui
    └── profile/             # Composants profil (badge, stats, chart, etc.)
```

---

## 🔌 API Integration

### Config
```env
# Vercel env var (déjà configurée)
VITE_API_URL=https://api.nf-legit.me
```

### Endpoints (Railway Backend)
1. `GET /api/stats/global` → `{ totalDeals, activeMembers }`
2. `GET /api/top-members?limit=3` → `[{ username, displayName, avatar, totalDeals, badge }]`
3. `GET /api/user/:username` → `{ userId, username, displayName, avatar, stats, badge, memberSince, lastActive }`

### Approche Hybride (API + Mock)
**Données réelles API**:
- totalDeals, badge, avatar, username, displayName, memberSince, lastActive

**Données mock temporaires** (en attente backend):
- reviews, topPartners, activities, monthlyDealsData
- stats détaillées (confirmedDeals, successRate, etc.)
- ranking, keyDates

→ **NE PAS supprimer `mockData.ts`** (fallback essentiel + futures features)

---

## 🎯 Patterns Importants

### 1. Data Fetching
✅ **TOUJOURS** utiliser hooks TanStack Query (jamais fetch direct)
```typescript
const { data, isLoading } = useGlobalStats(); // ✅
```

**Pourquoi**: Cache (5 min), retry, fallback mockData, loading/error states

### 2. Loading States
✅ Utiliser `<Skeleton />` (pas de spinners)
```typescript
{isLoading ? <Skeleton className="h-10 w-20" /> : <div>{data}</div>}
```

### 3. Error Handling
- 404 user → `<Navigate to="/not-found" replace />`
- Erreurs non critiques → `toast.error()`

### 4. Responsive
Mobile-first: `className="text-3xl md:text-4xl p-6 md:p-8"`

### 5. TypeScript Strict
Typer tous props + retours API (utiliser types de `lib/types.ts`)

### 6. Imports
Alias `@/`: `import { Button } from "@/components/ui/button";`

### 7. CSS Variables
Utiliser variables Tailwind: `bg-primary`, `text-text-muted` (pas de couleurs hardcodées)

**Exception**: Couleurs dynamiques backend:
```typescript
style={{ color: user.badge.color }} // ✅ OK (vient API)
```

---

## 🎨 Design System (Custom Tailwind)

### Couleurs Principales
- **Primary**: `#ff8c1a` (orange Notify France)
- **Backgrounds**: `bg-base` (#121f33), `bg-card` (#1a2a42)
- **Text**: `text-primary` (white), `text-secondary` (#d4dae3), `text-muted` (#9aa5b8)
- **Badges**: `badge-1` (#00cc00), `badge-5` (#00ff00), `badge-10` (#80ff80)

### Spacing
- Cards: `p-6 md:p-8`, `gap-4 md:gap-6`
- Rounded: `rounded-2xl` (cards), `rounded-full` (buttons)

---

## 🚀 Workflows

### Développement Local
```bash
npm install
echo "VITE_API_URL=https://api.nf-legit.me" > .env.local
npm run dev  # → http://localhost:5173
```

### Déploiement Production
```bash
# 1. Feature branch
git checkout -b feat/description

# 2. Commit
git add . && git commit -m "feat: Description"

# 3. Push → Preview Vercel auto
git push -u origin feat/description

# 4. Créer PR → Tester preview

# 5. Merge → Auto-deploy production
# → nf-legit.me + www.nf-legit.me
```

**Vérifications avant merge**:
- ✅ Preview Vercel OK
- ✅ Console DevTools (0 erreurs)
- ✅ API requests réussissent
- ✅ Responsive OK
- ✅ Loading skeletons affichent

### Rollback
**Vercel Dashboard** → Deployments → "Promote to Production" (déploiement précédent)

---

## 🐛 Debugging

### Logs Vercel
Dashboard → Deployments → [Deployment] → Logs

### Errors Fréquentes
1. **CORS error**: Vérifier config backend autorise `https://nf-legit.me`
2. **VITE_API_URL undefined**: Vérifier variable Vercel + redéployer
3. **404 après refresh**: Vercel SPA routing auto (normalement OK)
4. **TypeScript errors**: `npm run build` local avant push

---

## 📊 Pages & Routes

### Home (`/`)
- Stats globales (API) + Top 3 membres (API)
- CTA Discord
- Hooks: `useGlobalStats()`, `useTopMembers(3)`

### Profile (`/:username`)
- Header (avatar, displayName, badge)
- Stats détaillées, ranking, historique, top partners, dates clés
- Hook: `useUserProfile(username)` (API + mock hybrid)
- Routes: userId Discord (ex: `/591895054868676621`)
- 404 → redirect `/not-found`

---

## 🚨 Points d'Attention

### Ne JAMAIS
❌ Commiter `.env.local`
❌ Hardcoder secrets/tokens
❌ Supprimer `mockData.ts` (fallback essentiel)
❌ Modifier `ui/*` sans backup (Shadcn)
❌ Push direct sur `main` (toujours PR)
❌ Oublier tester preview avant merge

### Toujours
✅ Build local avant push: `npm run build`
✅ Console DevTools 0 erreurs
✅ Responsive mobile + desktop
✅ Hooks TanStack Query (pas fetch direct)
✅ TypeScript strict (typer props/functions)
✅ `<Skeleton />` pour loading
✅ Fallback mockData si API down
✅ Commits descriptifs (`feat:`, `fix:`)

---

## 🔧 Config Vercel

### Env Variables (Production)
```
VITE_API_URL = https://api.nf-legit.me
```

**Ajouter via Dashboard**:
Settings → Environment Variables → Add → Name: `VITE_API_URL`, Envs: Production, Preview, Development

### Domaines
- `nf-legit.me` (prod)
- `www.nf-legit.me` (redirect)
- `*.vercel.app` (preview)

---

## 📝 TODO / Roadmap

### Remplacer Mock (Backend requis)
- [ ] `reviews` - Avis utilisateurs
- [ ] `topPartners` - Top 3 partenaires
- [ ] `activities` - Historique détaillé
- [ ] `monthlyDealsData` - Stats par mois
- [ ] `stats` détaillées - confirmedDeals, successRate, etc.
- [ ] `ranking` - Classement global
- [ ] `keyDates` - firstDeal, lastDeal

### Améliorations UX
- [ ] Recherche utilisateur
- [ ] Filtres stats (période, type)
- [ ] Dark mode toggle
- [ ] PWA support

---

**Dernière mise à jour**: 2025-01-18 (feat/connect-real-api merged)
**Contact**: Discord Notify France
