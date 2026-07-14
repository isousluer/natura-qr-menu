-- Kategoriler tablosu
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

-- Yemekler tablosu
create table menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10,2) not null,
  image_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

-- Public okuma izni (menü sayfası için)
alter table categories enable row level security;
alter table menu_items enable row level security;

create policy "Public read categories" on categories for select using (true);
create policy "Public read menu_items" on menu_items for select using (true);

-- Storage bucket (Supabase Dashboard > Storage'dan da yapılabilir)
-- insert into storage.buckets (id, name, public) values ('menu-images', 'menu-images', true);
