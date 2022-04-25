CREATE TABLE public.users(
	ID serial NOT NULL, 
	name varchar(100),
	lastname varchar(100),
	email varchar(100) not null unique,
	passwordhash varchar(100) not null,
	image_url varchar(100),
	role character varying(10) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    Primary Key(ID)
);

CREATE TABLE public.language(
	ID serial NOT NULL, 
	name_ varchar(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    Primary Key(ID)
);
CREATE TYPE "payment_type" AS ENUM (
  'CASH',
  'STRIPE'
);
CREATE TABLE public.client(
	ID serial NOT NULL, 
	userID integer,
	payment_method payment_type,
	langID integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
	
);

CREATE TABLE public.intepreter(
	ID serial NOT NULL, 
	userID integer,
	online_status boolean,
	active_status boolean,
	cert_url text NOT NULL,
	hourly_rate numeric,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
);

CREATE TABLE public.booking(
	ID serial NOT NULL, 
	clientID integer,
	intepreterID integer,
	date_ date,
	time_ time,
	status boolean,
	created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
);
CREATE TABLE public."resetTokens"
(
    id SERIAL NOT NULL,
    email character varying NOT NULL,
    userID integer,
    token character varying NOT NULL,
    used boolean DEFAULT false NOT NULL,
    expiration timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
CREATE TABLE public.intepreter_lang(
   intepreterID integer,
   langID integer,
   created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
   updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
   primary Key(intepreterID,langID)

);


ALTER TABLE public.resetTokens
    ADD FOREIGN KEY (userID)
    REFERENCES public.users (ID)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.client
    ADD FOREIGN KEY (userID)
    REFERENCES public.users (ID)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.client
    ADD FOREIGN KEY (langID)
    REFERENCES public.language (ID)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.intepreter
    ADD FOREIGN KEY (userID)
    REFERENCES public.users (ID)
    ON DELETE CASCADE
    NOT VALID;
ALTER TABLE public.booking
    ADD FOREIGN KEY (clientID)
    REFERENCES public.client (ID)
    ON DELETE CASCADE
    NOT VALID;
ALTER TABLE public.booking
    ADD FOREIGN KEY (intepreterID)
    REFERENCES public.intepreter (ID)
    ON DELETE CASCADE
    NOT VALID;
ALTER TABLE public.intepreter_lang
    ADD FOREIGN KEY (langID)
    REFERENCES public.language (ID)
    ON DELETE CASCADE
    NOT VALID;
ALTER TABLE public.intepreter_lang
    ADD FOREIGN KEY (intepreterID)
    REFERENCES public.intepreter (ID)
    ON DELETE CASCADE
    NOT VALID;
	
CREATE UNIQUE INDEX users_unique_lower_email_idx
    ON public.users (lower(email));


INSERT INTO language(name_) VALUES('AMERICAN SIGN LANGUAGE');
INSERT INTO language(name_) VALUES('SOUTH AFRICAN SIGN LANGUAGE');
INSERT INTO language(name_) VALUES('BRITISH SIGN LANGUAGE');