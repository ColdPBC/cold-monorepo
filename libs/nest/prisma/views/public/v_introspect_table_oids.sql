WITH table_oids AS (
  SELECT
    c.relname,
    c.oid,
    n.nspname,
    c.reltuples,
    c.relkind,
    c.relam,
    n.nspacl,
    c.relacl,
    c.reltype,
    c.relowner,
    c.relhasindex
  FROM
    (
      pg_class c
      LEFT JOIN pg_namespace n ON ((n.oid = c.relnamespace))
    )
  WHERE
    pg_table_is_visible(c.oid)
)
SELECT
  table_oids.relname,
  table_oids.oid,
  table_oids.nspname,
  table_oids.reltuples,
  table_oids.relkind,
  table_oids.relam,
  table_oids.nspacl,
  table_oids.relacl,
  table_oids.reltype,
  table_oids.relowner,
  table_oids.relhasindex
FROM
  table_oids
ORDER BY
  table_oids.nspname,
  table_oids.relname;