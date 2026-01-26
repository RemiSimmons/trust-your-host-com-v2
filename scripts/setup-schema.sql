-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create profiles table to extend auth.users
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  role text default 'guest',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create properties table
create table if not exists public.properties (
  id uuid default uuid_generate_v4() primary key,
  host_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  slug text unique not null,
  location jsonb not null,
  images text[] default '{}',
  experiences text[] default '{}',
  property_type text not null,
  pricing jsonb not null,
  capacity jsonb not null,
  amenities text[] default '{}',
  quick_highlights text[] default '{}',
  description jsonb not null,
  rating_average numeric(3, 2) default 0,
  rating_count integer default 0,
  verified boolean default false,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create bookings table
create table if not exists public.bookings (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  total_price numeric(10, 2) not null,
  status text default 'pending',
  guests integer default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create reviews table
create table if not exists public.reviews (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

create policy "Users can update their own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Policies for properties
create policy "Properties are viewable by everyone"
  on public.properties for select
  using ( true );

create policy "Hosts can insert their own properties"
  on public.properties for insert
  with check ( auth.uid() = host_id );

create policy "Hosts can update their own properties"
  on public.properties for update
  using ( auth.uid() = host_id );

-- Policies for bookings
create policy "Users can view their own bookings"
  on public.bookings for select
  using ( auth.uid() = user_id );

create policy "Hosts can view bookings for their properties"
  on public.bookings for select
  using ( 
    exists (
      select 1 from public.properties 
      where properties.id = bookings.property_id 
      and properties.host_id = auth.uid()
    ) 
  );

create policy "Users can create bookings"
  on public.bookings for insert
  with check ( auth.uid() = user_id );

-- Policies for reviews
create policy "Reviews are viewable by everyone"
  on public.reviews for select
  using ( true );

create policy "Authenticated users can create reviews"
  on public.reviews for insert
  with check ( auth.uid() = user_id );

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
