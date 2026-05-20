grant select on table public.ambitec_submissions to authenticated;
grant select on table public.ambitec_responses to authenticated;

drop policy if exists "allow authenticated select submissions" on public.ambitec_submissions;
drop policy if exists "allow authenticated select responses" on public.ambitec_responses;

create policy "allow authenticated select submissions"
on public.ambitec_submissions
for select
to authenticated
using (true);

create policy "allow authenticated select responses"
on public.ambitec_responses
for select
to authenticated
using (true);
