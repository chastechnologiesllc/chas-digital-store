create table if not exists orders (
  id text primary key,
  reference text unique not null,
  product_id text not null,
  product_name text not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  amount integer not null,
  currency text not null,
  gateway text not null,
  status text not null default 'pending',
  live boolean not null default false,
  telegram_access_status text not null default 'not_generated',
  telegram_invite_url text,
  gateway_reference text,
  failure_reason text,
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  updated_at timestamptz not null default now()
);

create unique index if not exists orders_reference_idx on orders (reference);
create index if not exists orders_status_idx on orders (status);

create table if not exists payment_events (
  id text primary key,
  order_id text not null,
  gateway text not null,
  event_type text not null,
  created_at timestamptz not null default now()
);

create index if not exists payment_events_order_id_idx on payment_events (order_id);
