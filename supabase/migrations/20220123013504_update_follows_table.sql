-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

ALTER TABLE IF EXISTS public.profiles
    ADD CONSTRAINT profiles_username_key UNIQUE (username);

ALTER TABLE IF EXISTS public.follows DROP COLUMN IF EXISTS followed_id;

ALTER TABLE IF EXISTS public.follows DROP COLUMN IF EXISTS follower_id;

ALTER TABLE IF EXISTS public.follows
    ADD COLUMN followed_username character varying COLLATE pg_catalog."default";

ALTER TABLE IF EXISTS public.follows
    ADD COLUMN follower_username character varying COLLATE pg_catalog."default";
ALTER TABLE IF EXISTS public.follows DROP CONSTRAINT IF EXISTS follows_followed_id_fkey;

ALTER TABLE IF EXISTS public.follows DROP CONSTRAINT IF EXISTS follows_follower_id_fkey;

ALTER TABLE IF EXISTS public.follows
    ADD CONSTRAINT follows_followed_username_fkey FOREIGN KEY (followed_username)
    REFERENCES public.profiles (username) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE IF EXISTS public.follows
    ADD CONSTRAINT follows_follower_username_fkey FOREIGN KEY (follower_username)
    REFERENCES public.profiles (username) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;