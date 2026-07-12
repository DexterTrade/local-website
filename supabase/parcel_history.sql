-- ─────────────────────────────────────────────
-- Parcel history — dated status trail (UPS-style).
-- One row per event: status, time, optional location and note.
-- Run this once in the Supabase SQL Editor.
-- ─────────────────────────────────────────────

create table if not exists public.parcel_history (
  id          bigint generated always as identity primary key,
  parcel_id   uuid not null references public.parcel (id) on delete cascade,
  status_id   bigint not null references public.parcel_status (id),
  location    text,
  note        text,
  event_time  timestamptz not null default now(),
  created_at  timestamptz not null default now()
);

create index if not exists parcel_history_parcel_idx
  on public.parcel_history (parcel_id, event_time desc);

-- RLS: public may read, only signed-in admins may write
alter table public.parcel_history enable row level security;

drop policy if exists "public read parcel_history" on public.parcel_history;
create policy "public read parcel_history" on public.parcel_history
  for select using (true);

drop policy if exists "auth write parcel_history" on public.parcel_history;
create policy "auth write parcel_history" on public.parcel_history
  for all to authenticated using (true) with check (true);

-- Backfill: seed one history entry per existing parcel at its current status,
-- so the /track history list is never empty for old orders.
insert into public.parcel_history (parcel_id, status_id, event_time)
select p.id, p.status_id, coalesce(p.updated_at, p.created_at)
from public.parcel p
where not exists (
  select 1 from public.parcel_history h where h.parcel_id = p.id
);
