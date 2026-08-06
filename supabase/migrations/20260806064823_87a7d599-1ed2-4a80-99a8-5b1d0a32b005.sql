
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE IF NOT EXISTS public.course_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_slug text NOT NULL,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  duration text NOT NULL DEFAULT '15 min',
  video_url text,
  thumbnail_url text,
  highlights text[] NOT NULL DEFAULT '{}',
  position integer NOT NULL DEFAULT 0,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.course_videos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.course_videos TO authenticated;
GRANT ALL ON public.course_videos TO service_role;
ALTER TABLE public.course_videos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "course videos public" ON public.course_videos;
CREATE POLICY "course videos public" ON public.course_videos FOR SELECT USING (true);
DROP POLICY IF EXISTS "admins manage course videos" ON public.course_videos;
CREATE POLICY "admins manage course videos" ON public.course_videos FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'teacher'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'teacher'));
DROP TRIGGER IF EXISTS course_videos_updated_at ON public.course_videos;
CREATE TRIGGER course_videos_updated_at BEFORE UPDATE ON public.course_videos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.site_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  user_id uuid,
  referrer text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.site_visits TO anon, authenticated;
GRANT SELECT ON public.site_visits TO authenticated;
GRANT ALL ON public.site_visits TO service_role;
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anyone records a visit" ON public.site_visits;
CREATE POLICY "anyone records a visit" ON public.site_visits FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "admins read visits" ON public.site_visits;
CREATE POLICY "admins read visits" ON public.site_visits FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "admins read profiles" ON public.profiles;
CREATE POLICY "admins read profiles" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
DROP POLICY IF EXISTS "admins read enrollments" ON public.enrollments;
CREATE POLICY "admins read enrollments" ON public.enrollments FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
DROP POLICY IF EXISTS "admins read progress" ON public.video_progress;
CREATE POLICY "admins read progress" ON public.video_progress FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
DROP POLICY IF EXISTS "admins read attempts" ON public.test_attempts;
CREATE POLICY "admins read attempts" ON public.test_attempts FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
DROP POLICY IF EXISTS "admins read certificates" ON public.certificates;
CREATE POLICY "admins read certificates" ON public.certificates FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
DROP POLICY IF EXISTS "admins read badges" ON public.user_badges;
CREATE POLICY "admins read badges" ON public.user_badges FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
DROP POLICY IF EXISTS "admins read practice days" ON public.practice_days;
CREATE POLICY "admins read practice days" ON public.practice_days FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
DROP POLICY IF EXISTS "staff read submissions" ON public.practice_submissions;
CREATE POLICY "staff read submissions" ON public.practice_submissions FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'teacher'));
DROP POLICY IF EXISTS "staff review submissions" ON public.practice_submissions;
CREATE POLICY "staff review submissions" ON public.practice_submissions FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'teacher'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'teacher'));
DROP POLICY IF EXISTS "admins read roles" ON public.user_roles;
CREATE POLICY "admins read roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
DROP POLICY IF EXISTS "admins manage roles" ON public.user_roles;
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

GRANT INSERT, UPDATE, DELETE ON public.live_sessions TO authenticated;
DROP POLICY IF EXISTS "staff manage live sessions" ON public.live_sessions;
CREATE POLICY "staff manage live sessions" ON public.live_sessions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'teacher'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'teacher'));
ALTER TABLE public.live_sessions ADD COLUMN IF NOT EXISTS stream_url text;
ALTER TABLE public.live_sessions ADD COLUMN IF NOT EXISTS is_live boolean NOT NULL DEFAULT false;

ALTER TABLE public.live_messages REPLICA IDENTITY FULL;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='live_sessions') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.live_sessions;
  END IF;
END $$;

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE email = 'srishanthrishi@gmail.com'
ON CONFLICT DO NOTHING;
