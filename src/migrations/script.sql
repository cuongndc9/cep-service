  -- public.role_types definition

  -- Drop table

  -- DROP TABLE public.role_types;

  CREATE TABLE public.role_types (
    id uuid NOT NULL,
    "name" text NULL,
    description text NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL,
    CONSTRAINT role_types_pkey PRIMARY KEY (id)
  );


  -- public.users definition

  -- Drop table

  -- DROP TABLE public.users;

  CREATE TABLE public.users (
    id uuid NOT NULL,
    first_name text NULL,
    last_name text NULL,
    image_id uuid NULL,
    phone text NULL,
    gender text NULL,
    dob text NULL,
    email text NULL,
    contact_address jsonb NULL,
    permanent_address text NULL,
    national_id text NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL,
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_phone_key UNIQUE (phone),
    CONSTRAINT users_pkey PRIMARY KEY (id)
  );


  -- public.accounts definition

  -- Drop table

  -- DROP TABLE public.accounts;

  CREATE TABLE public.accounts (
    id uuid NOT NULL,
    username text NULL,
    "password" text NULL,
    "role" text NULL,
    user_id uuid NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL,
    CONSTRAINT accounts_pkey PRIMARY KEY (id),
    CONSTRAINT accounts_username_key UNIQUE (username),
    CONSTRAINT accounts_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
  );


  -- public.agents definition

  -- Drop table

  -- DROP TABLE public.agents;

  CREATE TABLE public.agents (
    id uuid NOT NULL,
    user_id uuid NULL,
    reference_id uuid NULL,
    roles text NULL,
    official text NULL,
    room text NULL,
    official_address text NULL,
    official_phone text NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL,
    CONSTRAINT agents_pkey PRIMARY KEY (id),
    CONSTRAINT agents_reference_id_fkey FOREIGN KEY (reference_id) REFERENCES agents(id),
    CONSTRAINT agents_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
  );


  -- public.categories definition

  -- Drop table

  -- DROP TABLE public.categories;

  CREATE TABLE public.categories (
    id uuid NOT NULL,
    code varchar(255) NULL,
    title text NULL,
    "description" text NULL,
    parent_id uuid NULL,
    "count" int4 NULL,
    order_by uuid NULL,
    keyword text NULL,
    created_by uuid NULL,
    updated_by uuid NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (id),
    CONSTRAINT categories_created_by_fkey FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT categories_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES categories(id),
    CONSTRAINT categories_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES users(id)
  );


  -- public.families definition

  -- Drop table

  -- DROP TABLE public.families;

  CREATE TABLE public.families (
    id uuid NOT NULL,
    "name" text NULL,
    head_of_family uuid NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL,
    CONSTRAINT families_pkey PRIMARY KEY (id),
    CONSTRAINT families_head_of_family_fkey FOREIGN KEY (head_of_family) REFERENCES users(id)
  );


  -- public.faqs definition

  -- Drop table

  -- DROP TABLE public.faqs;

  CREATE TABLE public.faqs (
    id uuid NOT NULL,
    category_id uuid NULL,
    ref_id uuid NULL,
    question text NULL,
    answer text NULL,
    created_by uuid NULL,
    updated_by uuid NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL,
    CONSTRAINT faqs_pkey PRIMARY KEY (id),
    CONSTRAINT faqs_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id),
    CONSTRAINT faqs_created_by_fkey FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT faqs_ref_id_fkey FOREIGN KEY (ref_id) REFERENCES faqs(id),
    CONSTRAINT faqs_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES users(id)
  );


  -- public.images definition

  -- Drop table

  -- DROP TABLE public.images;

  CREATE TABLE public.images (
    id uuid NOT NULL,
    public_id text NULL,
    url text NULL,
    created_by uuid NULL,
    updated_by uuid NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL,
    CONSTRAINT images_pkey PRIMARY KEY (id),
    CONSTRAINT images_created_by_fkey FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT images_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES users(id)
  );


  -- public.posts definition

  -- Drop table

  -- DROP TABLE public.posts;

  CREATE TABLE public.posts (
    id uuid NOT NULL,
    category_id uuid NULL,
    title text NULL,
    short_description text NULL,
    long_description text NULL,
    thumbnail uuid NULL,
    keyword text NULL,
    created_by uuid NULL,
    updated_by uuid NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL,
    CONSTRAINT posts_pkey PRIMARY KEY (id),
    CONSTRAINT posts_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id),
    CONSTRAINT posts_created_by_fkey FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT posts_thumbnail_fkey FOREIGN KEY (thumbnail) REFERENCES images(id),
    CONSTRAINT posts_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES users(id)
  );


  -- public.relationships definition

  -- Drop table

  -- DROP TABLE public.relationships;

  CREATE TABLE public.relationships (
    id uuid NOT NULL,
    family_id uuid NULL,
    user_id1 uuid NULL,
    user_id2 uuid NULL,
    relationship text NULL,
    role_type1 uuid NULL,
    role_type2 uuid NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL,
    CONSTRAINT relationships_pkey PRIMARY KEY (id),
    CONSTRAINT relationships_family_id_fkey FOREIGN KEY (family_id) REFERENCES families(id),
    CONSTRAINT relationships_role_type1_fkey FOREIGN KEY (role_type1) REFERENCES role_types(id),
    CONSTRAINT relationships_role_type2_fkey FOREIGN KEY (role_type2) REFERENCES role_types(id),
    CONSTRAINT relationships_user_id1_fkey FOREIGN KEY (user_id1) REFERENCES users(id),
    CONSTRAINT relationships_user_id2_fkey FOREIGN KEY (user_id2) REFERENCES users(id)
  );


  -- public.activities definition

  -- Drop table

  -- DROP TABLE public.activities;

  CREATE TABLE public.activities (
    id uuid NOT NULL,
    image_id uuid NULL,
    "name" text NULL,
    "type" text NULL,
    short_description text NULL,
    long_description text NULL,
    keyword text NULL,
    "source" text NULL,
    created_by uuid NULL,
    updated_by uuid NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL,
    CONSTRAINT activities_pkey PRIMARY KEY (id),
    CONSTRAINT activities_created_by_fkey FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT activities_image_id_fkey FOREIGN KEY (image_id) REFERENCES images(id),
    CONSTRAINT activities_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES users(id)
  );


  -- public.diary_notes definition

  -- Drop table

  -- DROP TABLE public.diary_notes;

  CREATE TABLE public.diary_notes (
    id uuid NOT NULL,
    title text NULL,
    notes text NULL,
    activity_id uuid NULL,
    image_id uuid NULL,
    ref_id uuid NULL,
    status text NULL,
    "policy" text NULL,
    created_by uuid NULL,
    updated_by uuid NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL,
    CONSTRAINT diary_notes_pkey PRIMARY KEY (id),
    CONSTRAINT diary_notes_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES activities(id),
    CONSTRAINT diary_notes_created_by_fkey FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT diary_notes_image_id_fkey FOREIGN KEY (image_id) REFERENCES images(id),
    CONSTRAINT diary_notes_ref_id_fkey FOREIGN KEY (ref_id) REFERENCES diary_notes(id),
    CONSTRAINT diary_notes_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES users(id)
  );


  -- public.family_activities definition

  -- Drop table

  -- DROP TABLE public.family_activities;

  CREATE TABLE public.family_activities (
    id uuid NOT NULL,
    family_id uuid NULL,
    activity_id uuid NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL,
    CONSTRAINT family_activities_pkey PRIMARY KEY (id),
    CONSTRAINT family_activities_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES activities(id),
    CONSTRAINT family_activities_family_id_fkey FOREIGN KEY (family_id) REFERENCES families(id)
  );


  -- public.post_images definition

  -- Drop table

  -- DROP TABLE public.post_images;

  CREATE TABLE public.post_images (
    id uuid NOT NULL,
    post_id uuid NULL,
    image_id uuid NULL,
    created_by uuid NULL,
    updated_by uuid NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL,
    CONSTRAINT post_images_pkey PRIMARY KEY (id),
    CONSTRAINT post_images_created_by_fkey FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT post_images_image_id_fkey FOREIGN KEY (image_id) REFERENCES images(id),
    CONSTRAINT post_images_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id),
    CONSTRAINT post_images_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES users(id)
  );
