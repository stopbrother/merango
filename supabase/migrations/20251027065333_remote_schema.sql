

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."party_type_enum" AS ENUM (
    'hunt',
    'quest',
    'boss'
);


ALTER TYPE "public"."party_type_enum" OWNER TO "postgres";


COMMENT ON TYPE "public"."party_type_enum" IS '파티 타입 유형';



CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$begin
  insert into public.profiles (id, full_name, avatar_url, username)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url', 
    coalesce( 
      nullif(new.raw_user_meta_data->'custom_claims'->>'global_name', ''),
      new.raw_user_meta_data->>'full_name'
      )
    );
  return new;
end;$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."limit_recruit_count"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$BEGIN
if (select count(*) from party_recruit where created_by = new.created_by ) >= 5 then
raise exception '구인글은 최대 5개까지만 작성할 수 있습니다.';
end if;
return new;
END;$$;


ALTER FUNCTION "public"."limit_recruit_count"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."party_auto_join"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$begin
  insert into public.party_member (party_id, profile_id)
  values (new.id, new.created_by);
  return new;
end;$$;


ALTER FUNCTION "public"."party_auto_join"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."recruit_updated_date_time"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$BEGIN
  IF NEW.title IS DISTINCT FROM OLD.title OR
     NEW.party_type IS DISTINCT FROM OLD.party_type OR
     NEW.description IS DISTINCT FROM OLD.description THEN
  NEW.updated_date_time = now();
  END IF;
  RETURN NEW;
END;$$;


ALTER FUNCTION "public"."recruit_updated_date_time"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."party_member" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "party_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profile_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "joined_date_time" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE ONLY "public"."party_member" REPLICA IDENTITY FULL;


ALTER TABLE "public"."party_member" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."party_recruit" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" DEFAULT ''::"text" NOT NULL,
    "description" "text" DEFAULT ''::"text" NOT NULL,
    "created_by" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "party_type" "public"."party_type_enum" DEFAULT 'hunt'::"public"."party_type_enum" NOT NULL,
    "created_date_time" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_date_time" timestamp with time zone,
    "raised_date_time" timestamp with time zone,
    "sort_time" timestamp with time zone GENERATED ALWAYS AS (COALESCE("raised_date_time", "created_date_time")) STORED NOT NULL
);


ALTER TABLE "public"."party_recruit" OWNER TO "postgres";


COMMENT ON TABLE "public"."party_recruit" IS '구인';



COMMENT ON COLUMN "public"."party_recruit"."created_by" IS '작성자';



CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone,
    "username" "text" NOT NULL,
    "full_name" "text" NOT NULL,
    "avatar_url" "text" NOT NULL,
    "website" "text",
    "intro" "text",
    "social_name" "text",
    "level" smallint,
    "job" "text",
    "terms_accepted_at" timestamp with time zone,
    "terms_version" "text",
    "privacy_accepted_at" timestamp with time zone,
    "privacy_version" "text",
    "age_confirmed_at" timestamp with time zone,
    CONSTRAINT "username_length" CHECK (("char_length"("username") >= 3))
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


ALTER TABLE ONLY "public"."party_member"
    ADD CONSTRAINT "party_member_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."party_recruit"
    ADD CONSTRAINT "party_recruit_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");



ALTER TABLE ONLY "public"."party_member"
    ADD CONSTRAINT "unique_recruit_member" UNIQUE ("party_id", "profile_id");



CREATE OR REPLACE TRIGGER "trigger_limit_count_recruit" BEFORE INSERT ON "public"."party_recruit" FOR EACH ROW EXECUTE FUNCTION "public"."limit_recruit_count"();



CREATE OR REPLACE TRIGGER "trigger_party_auto_join" AFTER INSERT ON "public"."party_recruit" FOR EACH ROW EXECUTE FUNCTION "public"."party_auto_join"();



CREATE OR REPLACE TRIGGER "trigger_recruit_updated_time" BEFORE UPDATE ON "public"."party_recruit" FOR EACH ROW EXECUTE FUNCTION "public"."recruit_updated_date_time"();



ALTER TABLE ONLY "public"."party_member"
    ADD CONSTRAINT "party_member_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "public"."party_recruit"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."party_member"
    ADD CONSTRAINT "party_member_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."party_recruit"
    ADD CONSTRAINT "party_recruit_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Allow party owner to delete party members" ON "public"."party_member" FOR DELETE USING ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "party_recruit"."created_by"
   FROM "public"."party_recruit"
  WHERE ("party_recruit"."id" = "party_member"."party_id"))));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."party_member" FOR DELETE USING ((( SELECT "auth"."uid"() AS "uid") = "profile_id"));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."party_recruit" FOR DELETE USING ((( SELECT "auth"."uid"() AS "uid") = "created_by"));



CREATE POLICY "Enable insert for users based on user_id" ON "public"."party_member" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "profile_id"));



CREATE POLICY "Enable insert for users based on user_id" ON "public"."party_recruit" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "created_by"));



CREATE POLICY "Enable read access for all users" ON "public"."party_member" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."party_recruit" FOR SELECT USING (true);



CREATE POLICY "Enable update for users based on uid" ON "public"."party_recruit" FOR UPDATE USING (("auth"."uid"() = "created_by")) WITH CHECK (("auth"."uid"() = "created_by"));



CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (true);



CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



ALTER TABLE "public"."party_member" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."party_recruit" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";






ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."party_member";



ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."party_recruit";



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";




















































































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."limit_recruit_count"() TO "anon";
GRANT ALL ON FUNCTION "public"."limit_recruit_count"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."limit_recruit_count"() TO "service_role";



GRANT ALL ON FUNCTION "public"."party_auto_join"() TO "anon";
GRANT ALL ON FUNCTION "public"."party_auto_join"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."party_auto_join"() TO "service_role";



GRANT ALL ON FUNCTION "public"."recruit_updated_date_time"() TO "anon";
GRANT ALL ON FUNCTION "public"."recruit_updated_date_time"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."recruit_updated_date_time"() TO "service_role";



























GRANT ALL ON TABLE "public"."party_member" TO "anon";
GRANT ALL ON TABLE "public"."party_member" TO "authenticated";
GRANT ALL ON TABLE "public"."party_member" TO "service_role";



GRANT ALL ON TABLE "public"."party_recruit" TO "anon";
GRANT ALL ON TABLE "public"."party_recruit" TO "authenticated";
GRANT ALL ON TABLE "public"."party_recruit" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


  create policy "Anyone can upload an avatar."
  on "storage"."objects"
  as permissive
  for insert
  to public
with check ((bucket_id = 'avatars'::text));



  create policy "Avatar images are publicly accessible."
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'avatars'::text));



