-- ============================================================
-- NATUATIVO AROMA & BANHO - Schema do Banco de Dados
-- Execute este SQL no Supabase SQL Editor
-- ============================================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ============================================================
-- TABELA: categorias
-- ============================================================
CREATE TABLE IF NOT EXISTS categorias (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome       TEXT NOT NULL UNIQUE,
  slug       TEXT NOT NULL UNIQUE,
  descricao  TEXT,
  ordem      INTEGER DEFAULT 0,
  ativo      BOOLEAN DEFAULT true,
  criado_em  TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABELA: produtos
-- ============================================================
CREATE TABLE IF NOT EXISTS produtos (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  descricao       TEXT,
  beneficios      TEXT[],
  preco           NUMERIC(10, 2) NOT NULL DEFAULT 0,
  preco_original  NUMERIC(10, 2),
  categoria_id    UUID REFERENCES categorias(id) ON DELETE SET NULL,
  ativo           BOOLEAN DEFAULT true,
  lancamento      BOOLEAN DEFAULT false,
  destaque        BOOLEAN DEFAULT false,
  ordem           INTEGER DEFAULT 0,
  meta_title      TEXT,
  meta_desc       TEXT,
  criado_em       TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABELA: produto_imagens
-- ============================================================
CREATE TABLE IF NOT EXISTS produto_imagens (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  produto_id  UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  storage_path TEXT,
  alt         TEXT,
  principal   BOOLEAN DEFAULT false,
  ordem       INTEGER DEFAULT 0,
  criado_em   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ÍNDICES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_produtos_categoria  ON produtos(categoria_id);
CREATE INDEX IF NOT EXISTS idx_produtos_ativo       ON produtos(ativo);
CREATE INDEX IF NOT EXISTS idx_produtos_lancamento  ON produtos(lancamento);
CREATE INDEX IF NOT EXISTS idx_produtos_slug        ON produtos(slug);
CREATE INDEX IF NOT EXISTS idx_produto_imagens_pid  ON produto_imagens(produto_id);
CREATE INDEX IF NOT EXISTS idx_produto_imagens_principal ON produto_imagens(produto_id, principal);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_produtos_nome_fts ON produtos USING GIN(to_tsvector('portuguese', nome));

-- ============================================================
-- FUNÇÃO: atualiza updated_at automaticamente
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER produtos_updated_at
  BEFORE UPDATE ON produtos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER categorias_updated_at
  BEFORE UPDATE ON categorias
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- FUNÇÃO: gerar slug único
-- ============================================================
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT AS $$
DECLARE
  slug_text TEXT;
BEGIN
  slug_text := lower(unaccent(input_text));
  slug_text := regexp_replace(slug_text, '[^a-z0-9\s-]', '', 'g');
  slug_text := regexp_replace(slug_text, '\s+', '-', 'g');
  slug_text := regexp_replace(slug_text, '-+', '-', 'g');
  slug_text := trim(both '-' from slug_text);
  RETURN slug_text;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Produtos: leitura pública de ativos, escrita autenticada
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE produto_imagens ENABLE ROW LEVEL SECURITY;

-- Políticas de leitura pública
CREATE POLICY "Produtos ativos publicos" ON produtos
  FOR SELECT USING (ativo = true);

CREATE POLICY "Categorias ativas publicas" ON categorias
  FOR SELECT USING (ativo = true);

CREATE POLICY "Imagens publicas" ON produto_imagens
  FOR SELECT USING (true);

-- Políticas de escrita para service_role (admin via API)
CREATE POLICY "Admin pode tudo em produtos" ON produtos
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admin pode tudo em categorias" ON categorias
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admin pode tudo em imagens" ON produto_imagens
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================================
-- STORAGE BUCKET para imagens
-- ============================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'produto-imagens',
  'produto-imagens',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Política de leitura pública no storage
CREATE POLICY "Imagens publicas storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'produto-imagens');

-- Política de upload para service_role
CREATE POLICY "Admin upload imagens" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'produto-imagens' AND auth.role() = 'service_role'
  );

CREATE POLICY "Admin delete imagens" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'produto-imagens' AND auth.role() = 'service_role'
  );

-- ============================================================
-- SEED: Categorias iniciais
-- ============================================================
INSERT INTO categorias (nome, slug, ordem) VALUES
  ('Sabonetes Artesanais',  'sabonetes-artesanais',  1),
  ('Sabonetes Esotéricos',  'sabonetes-esotericos',  2),
  ('Body Splash',           'body-splash',           3),
  ('Aromatizadores',        'aromatizadores',        4),
  ('Escalda-Pés',           'escalda-pes',           5),
  ('Kits Presente',         'kits-presente',         6),
  ('Linha Frutal',          'linha-frutal',          7)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- VIEW: produtos com categoria e imagem principal
-- ============================================================
CREATE OR REPLACE VIEW produtos_completos AS
SELECT
  p.*,
  c.nome        AS categoria_nome,
  c.slug        AS categoria_slug,
  img.url       AS imagem_principal_url,
  img.alt       AS imagem_principal_alt,
  (
    SELECT COUNT(*) FROM produto_imagens pi2
    WHERE pi2.produto_id = p.id
  ) AS total_imagens
FROM produtos p
LEFT JOIN categorias c ON c.id = p.categoria_id
LEFT JOIN produto_imagens img ON img.produto_id = p.id AND img.principal = true;
