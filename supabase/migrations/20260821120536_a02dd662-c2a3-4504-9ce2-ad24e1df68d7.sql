CREATE TABLE public.event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  event_slug text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  city text,
  mode text NOT NULL DEFAULT 'online',
  participants integer NOT NULL DEFAULT 1,
  experience_level text NOT NULL DEFAULT 'beginner',
  slot_time text,
  message text,
  status text NOT NULL DEFAULT 'confirmed',
  access_link text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.event_registrations TO authenticated;
GRANT INSERT ON public.event_registrations TO anon;
GRANT ALL ON public.event_registrations TO service_role;

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can register for an event" ON public.event_registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());

CREATE POLICY "read own registrations" ON public.event_registrations
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "staff read registrations" ON public.event_registrations
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "staff update registrations" ON public.event_registrations
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));

CREATE TRIGGER event_registrations_updated_at
  BEFORE UPDATE ON public.event_registrations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier text NOT NULL DEFAULT 'seeker',
  status text NOT NULL DEFAULT 'active',
  amount_cents integer NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'INR',
  payment_reference text,
  started_at timestamptz NOT NULL DEFAULT now(),
  renews_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.memberships TO authenticated;
GRANT ALL ON public.memberships TO service_role;

ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own membership" ON public.memberships
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "admins manage memberships" ON public.memberships
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER memberships_updated_at
  BEFORE UPDATE ON public.memberships
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();