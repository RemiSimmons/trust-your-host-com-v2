-- Create conversations table
create table if not exists public.conversations (
  id uuid default uuid_generate_v4() primary key,
  guest_id uuid references public.profiles(id) on delete cascade not null,
  host_id uuid references public.profiles(id) on delete cascade not null,
  property_id uuid references public.properties(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(guest_id, host_id, property_id)
);

-- Create messages table
create table if not exists public.messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- Policies for conversations
create policy "Users can view their own conversations"
  on public.conversations for select
  using ( auth.uid() = guest_id or auth.uid() = host_id );

create policy "Users can insert conversations they are part of"
  on public.conversations for insert
  with check ( auth.uid() = guest_id or auth.uid() = host_id );

-- Policies for messages
create policy "Users can view messages in their conversations"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations
      where conversations.id = messages.conversation_id
      and (conversations.guest_id = auth.uid() or conversations.host_id = auth.uid())
    )
  );

create policy "Users can insert messages in their conversations"
  on public.messages for insert
  with check (
    exists (
      select 1 from public.conversations
      where conversations.id = conversation_id
      and (conversations.guest_id = auth.uid() or conversations.host_id = auth.uid())
    )
    and auth.uid() = sender_id
  );

-- Indexes for performance
create index if not exists idx_conversations_guest_id on public.conversations(guest_id);
create index if not exists idx_conversations_host_id on public.conversations(host_id);
create index if not exists idx_messages_conversation_id on public.messages(conversation_id);
create index if not exists idx_messages_created_at on public.messages(created_at);
