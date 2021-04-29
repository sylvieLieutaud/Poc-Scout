--
-- PostgreSQL database dump
--

-- Dumped from database version 10.15 (Ubuntu 10.15-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.15 (Ubuntu 10.15-0ubuntu0.18.04.1)

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

--
-- Name: scout; Type: SCHEMA; Schema: -; Owner: scout
--

CREATE SCHEMA scout;


ALTER SCHEMA scout OWNER TO scout;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: case; Type: TABLE; Schema: scout; Owner: scout
--

CREATE TABLE scout."case" (
    id integer NOT NULL,
    "caseName" character varying(50) NOT NULL,
    "caseNumber" character varying(50) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "idUser" integer NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE scout."case" OWNER TO scout;

--
-- Name: COLUMN "case"."caseName"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout."case"."caseName" IS 'nom d’affaire';


--
-- Name: COLUMN "case"."caseNumber"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout."case"."caseNumber" IS 'numéro d’affaire';


--
-- Name: COLUMN "case"."createdAt"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout."case"."createdAt" IS 'date de création de l''affaire';


--
-- Name: COLUMN "case".status; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout."case".status IS 'activation des données';


--
-- Name: COLUMN "case"."updatedAt"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout."case"."updatedAt" IS 'datetime de modification';


--
-- Name: case_idUser_seq; Type: SEQUENCE; Schema: scout; Owner: scout
--

CREATE SEQUENCE scout."case_idUser_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE scout."case_idUser_seq" OWNER TO scout;

--
-- Name: case_idUser_seq; Type: SEQUENCE OWNED BY; Schema: scout; Owner: scout
--

ALTER SEQUENCE scout."case_idUser_seq" OWNED BY scout."case"."idUser";


--
-- Name: case_id_seq; Type: SEQUENCE; Schema: scout; Owner: scout
--

CREATE SEQUENCE scout.case_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE scout.case_id_seq OWNER TO scout;

--
-- Name: case_id_seq; Type: SEQUENCE OWNED BY; Schema: scout; Owner: scout
--

ALTER SEQUENCE scout.case_id_seq OWNED BY scout."case".id;


--
-- Name: collect; Type: TABLE; Schema: scout; Owner: scout
--

CREATE TABLE scout.collect (
    id integer NOT NULL,
    "gpsX" numeric,
    "gpsY" numeric,
    text character varying(255) NOT NULL,
    "audioURL" character varying(255),
    "videoURL" character varying(255),
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "idVisit" integer NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE scout.collect OWNER TO scout;

--
-- Name: COLUMN collect."gpsX"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.collect."gpsX" IS 'localisation longitude';


--
-- Name: COLUMN collect."gpsY"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.collect."gpsY" IS 'localisation latitude';


--
-- Name: COLUMN collect.text; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.collect.text IS 'description de collecte';


--
-- Name: COLUMN collect."audioURL"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.collect."audioURL" IS 'chemin de stockage audio ';


--
-- Name: COLUMN collect."videoURL"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.collect."videoURL" IS 'chemin de stockage video';


--
-- Name: COLUMN collect."createdAt"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.collect."createdAt" IS 'datetime de création collect';


--
-- Name: COLUMN collect.status; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.collect.status IS 'activation des données';


--
-- Name: COLUMN collect."updatedAt"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.collect."updatedAt" IS 'datetime de modification';


--
-- Name: collect_idVisit_seq; Type: SEQUENCE; Schema: scout; Owner: scout
--

CREATE SEQUENCE scout."collect_idVisit_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE scout."collect_idVisit_seq" OWNER TO scout;

--
-- Name: collect_idVisit_seq; Type: SEQUENCE OWNED BY; Schema: scout; Owner: scout
--

ALTER SEQUENCE scout."collect_idVisit_seq" OWNED BY scout.collect."idVisit";


--
-- Name: collect_id_seq; Type: SEQUENCE; Schema: scout; Owner: scout
--

CREATE SEQUENCE scout.collect_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE scout.collect_id_seq OWNER TO scout;

--
-- Name: collect_id_seq; Type: SEQUENCE OWNED BY; Schema: scout; Owner: scout
--

ALTER SEQUENCE scout.collect_id_seq OWNED BY scout.collect.id;


--
-- Name: organisation; Type: TABLE; Schema: scout; Owner: scout
--

CREATE TABLE scout.organisation (
    id integer NOT NULL,
    "orgName" character varying(50) NOT NULL,
    "orgCity" character varying(50) NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE scout.organisation OWNER TO scout;

--
-- Name: COLUMN organisation."orgName"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.organisation."orgName" IS 'nom de l’organisme';


--
-- Name: COLUMN organisation."orgCity"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.organisation."orgCity" IS 'ville de l’organisme';


--
-- Name: COLUMN organisation.status; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.organisation.status IS 'activation des données';


--
-- Name: COLUMN organisation."createdAt"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.organisation."createdAt" IS 'datetime de creation';


--
-- Name: COLUMN organisation."updatedAt"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.organisation."updatedAt" IS 'datetime de modification';


--
-- Name: organisation_id_seq; Type: SEQUENCE; Schema: scout; Owner: scout
--

CREATE SEQUENCE scout.organisation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE scout.organisation_id_seq OWNER TO scout;

--
-- Name: organisation_id_seq; Type: SEQUENCE OWNED BY; Schema: scout; Owner: scout
--

ALTER SEQUENCE scout.organisation_id_seq OWNED BY scout.organisation.id;


--
-- Name: photo; Type: TABLE; Schema: scout; Owner: scout
--

CREATE TABLE scout.photo (
    id integer NOT NULL,
    "fileName" character varying(50) NOT NULL,
    "photoURL" character varying(255) NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "idCollect" integer NOT NULL
);


ALTER TABLE scout.photo OWNER TO scout;

--
-- Name: COLUMN photo."fileName"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.photo."fileName" IS 'nom de photo';


--
-- Name: COLUMN photo."photoURL"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.photo."photoURL" IS 'chemin de stockage photo';


--
-- Name: COLUMN photo.status; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.photo.status IS 'activation des données';


--
-- Name: photo_idCollect_seq; Type: SEQUENCE; Schema: scout; Owner: scout
--

CREATE SEQUENCE scout."photo_idCollect_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE scout."photo_idCollect_seq" OWNER TO scout;

--
-- Name: photo_idCollect_seq; Type: SEQUENCE OWNED BY; Schema: scout; Owner: scout
--

ALTER SEQUENCE scout."photo_idCollect_seq" OWNED BY scout.photo."idCollect";


--
-- Name: photo_id_seq; Type: SEQUENCE; Schema: scout; Owner: scout
--

CREATE SEQUENCE scout.photo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE scout.photo_id_seq OWNER TO scout;

--
-- Name: photo_id_seq; Type: SEQUENCE OWNED BY; Schema: scout; Owner: scout
--

ALTER SEQUENCE scout.photo_id_seq OWNED BY scout.photo.id;


--
-- Name: user; Type: TABLE; Schema: scout; Owner: scout
--

CREATE TABLE scout."user" (
    id integer NOT NULL,
    "lastName" character varying(50) NOT NULL,
    "firstName" character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "idOrg" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE scout."user" OWNER TO scout;

--
-- Name: COLUMN "user"."lastName"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout."user"."lastName" IS 'nom de l''utilisateur';


--
-- Name: COLUMN "user"."firstName"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout."user"."firstName" IS 'prénom de l''utilisateur';


--
-- Name: COLUMN "user".email; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout."user".email IS 'email de l''utilisateur';


--
-- Name: COLUMN "user".password; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout."user".password IS 'mot de passe de l''utilisateur';


--
-- Name: COLUMN "user".status; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout."user".status IS 'activation des données';


--
-- Name: COLUMN "user"."createdAt"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout."user"."createdAt" IS 'datetime de creation';


--
-- Name: COLUMN "user"."updatedAt"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout."user"."updatedAt" IS 'datetime de modification';


--
-- Name: user_idOrg_seq; Type: SEQUENCE; Schema: scout; Owner: scout
--

CREATE SEQUENCE scout."user_idOrg_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE scout."user_idOrg_seq" OWNER TO scout;

--
-- Name: user_idOrg_seq; Type: SEQUENCE OWNED BY; Schema: scout; Owner: scout
--

ALTER SEQUENCE scout."user_idOrg_seq" OWNED BY scout."user"."idOrg";


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: scout; Owner: scout
--

CREATE SEQUENCE scout.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE scout.user_id_seq OWNER TO scout;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: scout; Owner: scout
--

ALTER SEQUENCE scout.user_id_seq OWNED BY scout."user".id;


--
-- Name: visit; Type: TABLE; Schema: scout; Owner: scout
--

CREATE TABLE scout.visit (
    id integer NOT NULL,
    "visitName" character varying(50) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "idUser" integer NOT NULL,
    "idCase" integer NOT NULL
);


ALTER TABLE scout.visit OWNER TO scout;

--
-- Name: COLUMN visit."visitName"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.visit."visitName" IS 'nom de visite';


--
-- Name: COLUMN visit."createdAt"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.visit."createdAt" IS 'datetime de création visite';


--
-- Name: COLUMN visit."updatedAt"; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.visit."updatedAt" IS 'datetime de modification visite';


--
-- Name: COLUMN visit.status; Type: COMMENT; Schema: scout; Owner: scout
--

COMMENT ON COLUMN scout.visit.status IS 'activation des données';


--
-- Name: visit_idCase_seq; Type: SEQUENCE; Schema: scout; Owner: scout
--

CREATE SEQUENCE scout."visit_idCase_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE scout."visit_idCase_seq" OWNER TO scout;

--
-- Name: visit_idCase_seq; Type: SEQUENCE OWNED BY; Schema: scout; Owner: scout
--

ALTER SEQUENCE scout."visit_idCase_seq" OWNED BY scout.visit."idCase";


--
-- Name: visit_idUser_seq; Type: SEQUENCE; Schema: scout; Owner: scout
--

CREATE SEQUENCE scout."visit_idUser_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE scout."visit_idUser_seq" OWNER TO scout;

--
-- Name: visit_idUser_seq; Type: SEQUENCE OWNED BY; Schema: scout; Owner: scout
--

ALTER SEQUENCE scout."visit_idUser_seq" OWNED BY scout.visit."idUser";


--
-- Name: visit_id_seq; Type: SEQUENCE; Schema: scout; Owner: scout
--

CREATE SEQUENCE scout.visit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE scout.visit_id_seq OWNER TO scout;

--
-- Name: visit_id_seq; Type: SEQUENCE OWNED BY; Schema: scout; Owner: scout
--

ALTER SEQUENCE scout.visit_id_seq OWNED BY scout.visit.id;


--
-- Name: case id; Type: DEFAULT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout."case" ALTER COLUMN id SET DEFAULT nextval('scout.case_id_seq'::regclass);


--
-- Name: collect id; Type: DEFAULT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout.collect ALTER COLUMN id SET DEFAULT nextval('scout.collect_id_seq'::regclass);


--
-- Name: organisation id; Type: DEFAULT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout.organisation ALTER COLUMN id SET DEFAULT nextval('scout.organisation_id_seq'::regclass);


--
-- Name: photo id; Type: DEFAULT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout.photo ALTER COLUMN id SET DEFAULT nextval('scout.photo_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout."user" ALTER COLUMN id SET DEFAULT nextval('scout.user_id_seq'::regclass);


--
-- Name: visit id; Type: DEFAULT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout.visit ALTER COLUMN id SET DEFAULT nextval('scout.visit_id_seq'::regclass);


--
-- Name: visit idCase; Type: DEFAULT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout.visit ALTER COLUMN "idCase" SET DEFAULT nextval('scout."visit_idCase_seq"'::regclass);


--
-- Name: case case_pkey; Type: CONSTRAINT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout."case"
    ADD CONSTRAINT case_pkey PRIMARY KEY (id);


--
-- Name: collect collect_pkey; Type: CONSTRAINT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout.collect
    ADD CONSTRAINT collect_pkey PRIMARY KEY (id);


--
-- Name: organisation organisation_pkey; Type: CONSTRAINT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout.organisation
    ADD CONSTRAINT organisation_pkey PRIMARY KEY (id);


--
-- Name: photo photo_pkey; Type: CONSTRAINT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout.photo
    ADD CONSTRAINT photo_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: visit visit_pkey; Type: CONSTRAINT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout.visit
    ADD CONSTRAINT visit_pkey PRIMARY KEY (id);


--
-- Name: case case_idUser_fkey; Type: FK CONSTRAINT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout."case"
    ADD CONSTRAINT "case_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES scout."user"(id);


--
-- Name: collect collect_idVisit_fkey; Type: FK CONSTRAINT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout.collect
    ADD CONSTRAINT "collect_idVisit_fkey" FOREIGN KEY ("idVisit") REFERENCES scout.visit(id);


--
-- Name: photo photo_idCollect_fkey; Type: FK CONSTRAINT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout.photo
    ADD CONSTRAINT "photo_idCollect_fkey" FOREIGN KEY ("idCollect") REFERENCES scout.collect(id);


--
-- Name: user user_idOrg_fkey; Type: FK CONSTRAINT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout."user"
    ADD CONSTRAINT "user_idOrg_fkey" FOREIGN KEY ("idOrg") REFERENCES scout.organisation(id);


--
-- Name: visit visit_idCase_fkey; Type: FK CONSTRAINT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout.visit
    ADD CONSTRAINT "visit_idCase_fkey" FOREIGN KEY ("idCase") REFERENCES scout."case"(id);


--
-- Name: visit visit_idUser_fkey; Type: FK CONSTRAINT; Schema: scout; Owner: scout
--

ALTER TABLE ONLY scout.visit
    ADD CONSTRAINT "visit_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES scout."user"(id);


--
-- Name: SCHEMA scout; Type: ACL; Schema: -; Owner: scout
--

REVOKE ALL ON SCHEMA scout FROM scout;
GRANT ALL ON SCHEMA scout TO scout WITH GRANT OPTION;
GRANT ALL ON SCHEMA scout TO postgres WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

