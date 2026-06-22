-- ===== PROFILES =====
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome_produtor text,
  nome_propriedade text,
  municipio text,
  estado text default 'TO',
  foto_url text,
  bio text,
  area_hectares numeric,
  culturas text[],
  whatsapp text,
  nivel text default 'Bronze',
  score_agrocert int default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "profiles_select_public" on public.profiles for select using (true);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

-- ===== PRODUTOS =====
create table public.produtos (
  id uuid primary key default gen_random_uuid(),
  produtor_id uuid not null references auth.users(id) on delete cascade,
  nome text not null,
  categoria text,
  descricao text,
  preco numeric not null default 0,
  unidade text default 'kg',
  estoque numeric not null default 0,
  estoque_minimo numeric default 5,
  foto_url text,
  status text not null default 'ativo' check (status in ('ativo','pausado','rascunho')),
  selos text[] default '{}',
  visualizacoes int default 0,
  vendas_total int default 0,
  qr_code_ativo boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.produtos enable row level security;

create policy "produtos_select_public" on public.produtos for select using (true);
create policy "produtos_insert_own" on public.produtos for insert with check (auth.uid() = produtor_id);
create policy "produtos_update_own" on public.produtos for update using (auth.uid() = produtor_id);
create policy "produtos_delete_own" on public.produtos for delete using (auth.uid() = produtor_id);

create index idx_produtos_produtor on public.produtos(produtor_id);

-- ===== PEDIDOS =====
create table public.pedidos (
  id uuid primary key default gen_random_uuid(),
  produtor_id uuid not null references auth.users(id) on delete cascade,
  cliente_nome text not null,
  cliente_municipio text,
  itens jsonb not null default '[]',
  valor_total numeric not null default 0,
  status text not null default 'novo' check (status in ('novo','separando','transporte','entregue','cancelado')),
  observacoes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.pedidos enable row level security;

create policy "pedidos_select_own" on public.pedidos for select using (auth.uid() = produtor_id);
create policy "pedidos_insert_own" on public.pedidos for insert with check (auth.uid() = produtor_id);
create policy "pedidos_update_own" on public.pedidos for update using (auth.uid() = produtor_id);

create index idx_pedidos_produtor on public.pedidos(produtor_id);

-- ===== CERTIFICACOES =====
create table public.certificacoes (
  id uuid primary key default gen_random_uuid(),
  produtor_id uuid not null references auth.users(id) on delete cascade,
  selo_id text not null,
  status text not null default 'pendente' check (status in ('ativo','em_analise','pendente','expirado')),
  progresso int default 0,
  emitido_em date,
  valido_ate date,
  observacoes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (produtor_id, selo_id)
);
alter table public.certificacoes enable row level security;

create policy "certificacoes_select_public" on public.certificacoes for select using (true);
create policy "certificacoes_insert_own" on public.certificacoes for insert with check (auth.uid() = produtor_id);
create policy "certificacoes_update_own" on public.certificacoes for update using (auth.uid() = produtor_id);

create index idx_certificacoes_produtor on public.certificacoes(produtor_id);

-- ===== TRIGGER updated_at =====
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated before update on public.profiles for each row execute function public.set_updated_at();
create trigger trg_produtos_updated before update on public.produtos for each row execute function public.set_updated_at();
create trigger trg_pedidos_updated before update on public.pedidos for each row execute function public.set_updated_at();
create trigger trg_certificacoes_updated before update on public.certificacoes for each row execute function public.set_updated_at();

-- ===== AUTO PROFILE on signup =====
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nome_produtor, nome_propriedade, municipio)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nome_produtor', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'nome_propriedade', 'Minha Propriedade'),
    coalesce(new.raw_user_meta_data->>'municipio', 'Palmas')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();