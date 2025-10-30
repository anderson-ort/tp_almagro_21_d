CREATE TABLE public.productos (
  id bigint NOT NULL,
  nombre text NOT NULL,
  precio numeric NOT NULL,
  descripcion text NOT NULL,
  embedding USER-DEFINED,
  CONSTRAINT productos_pkey PRIMARY KEY (id)
);