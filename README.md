# Natuativo Aroma & Banho — Catálogo Online

Catálogo digital premium com painel administrativo. Frontend Next.js 14, backend Supabase (PostgreSQL + Storage), deploy Vercel.

---

## Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Estilo**: Tailwind CSS (paleta dourado/creme/oliva)
- **Backend**: Supabase (PostgreSQL + Storage)
- **Auth Admin**: JWT via cookie HttpOnly
- **Deploy**: Vercel (região São Paulo)

---

## Setup local

### 1. Clone e instale

```bash
git clone <repo>
cd natuativo-catalogo
npm install
```

### 2. Configure o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. No SQL Editor, execute o conteúdo de `supabase/schema.sql`
3. Anote a **Project URL** e as chaves **anon** e **service_role**

### 3. Configure as variáveis de ambiente

```bash
cp .env.local.example .env.local
```

Edite `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

JWT_SECRET=coloque-uma-string-aleatoria-longa-aqui

ADMIN_EMAIL=admin@natuativo.com.br
ADMIN_PASSWORD_HASH=  # veja passo 4

NEXT_PUBLIC_WHATSAPP_NUMBER=5548996350861
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Gere o hash da senha admin

```bash
node scripts/hash-password.js MinhaS3nhaForte!
```

Copie o hash gerado e cole em `ADMIN_PASSWORD_HASH` no `.env.local`.

### 5. Execute

```bash
npm run dev
```

Acesse:
- **Loja**: http://localhost:3000
- **Admin**: http://localhost:3000/admin/login

---

## Deploy na Vercel

1. Faça push do projeto para GitHub
2. Conecte o repositório na [Vercel](https://vercel.com)
3. Configure as **Environment Variables** no painel da Vercel com os mesmos valores do `.env.local`
4. Deploy automático ✓

---

## Estrutura de pastas

```
src/
├── app/
│   ├── page.tsx                  # Homepage
│   ├── catalogo/page.tsx         # Catálogo com filtros
│   ├── produto/[slug]/page.tsx   # Página do produto
│   ├── admin/
│   │   ├── login/page.tsx        # Login admin
│   │   ├── produtos/             # CRUD produtos
│   │   └── categorias/           # CRUD categorias
│   └── api/admin/                # API routes protegidas
├── components/
│   ├── layout/                   # Header, Footer
│   ├── catalog/                  # ProductCard, Grid, Filters
│   ├── admin/                    # Sidebar, ProductForm
│   └── ui/                       # WhatsAppButton
├── lib/
│   ├── auth.ts                   # JWT admin auth
│   ├── produtos.ts               # Queries Supabase
│   ├── utils.ts                  # Helpers
│   └── supabase/                 # Clients (browser/server/admin)
└── types/
    └── database.ts               # Tipos gerados do schema
```

---

## Painel Admin

URL: `/admin/login`

Funcionalidades:
- ✅ Criar / editar / excluir produtos
- ✅ Ocultar produto sem deletar (toggle ativo)
- ✅ Upload de múltiplas imagens por produto
- ✅ Definir imagem principal
- ✅ Marcar como Lançamento / Destaque
- ✅ Gerenciar categorias
- ✅ Filtrar e buscar produtos

---

## Catálogo Público

- ✅ Grid responsivo (2→4 colunas)
- ✅ Busca por nome
- ✅ Filtro por categoria
- ✅ Seção de Lançamentos na homepage
- ✅ Página de produto individual com galeria
- ✅ Botão WhatsApp em cada produto
- ✅ Botão WhatsApp flutuante em todas as páginas
- ✅ Mensagem automática personalizada por produto

---

## Categorias padrão

| Categoria | Slug |
|---|---|
| Sabonetes Artesanais | sabonetes-artesanais |
| Sabonetes Esotéricos | sabonetes-esotericos |
| Body Splash | body-splash |
| Aromatizadores | aromatizadores |
| Escalda-Pés | escalda-pes |
| Kits Presente | kits-presente |
| Linha Frutal | linha-frutal |

---

## Contato da loja

- **WhatsApp**: +55 48 99635-0861
- **Instagram**: @natuativoaromaebanho
- **TikTok**: @natuativoaromaebanho
- **Local**: Palhoça — SC — Brasil
