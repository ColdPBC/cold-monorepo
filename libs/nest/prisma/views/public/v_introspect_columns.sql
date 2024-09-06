SELECT
  toids.relname AS tablename,
  a.attname AS "column",
  format_type(a.atttypid, a.atttypmod) AS datatype,
  toids.nspname AS schema,
  toids.oid,
  row_number() OVER (
    ORDER BY
      toids.nspname DESC,
      toids.relname,
      a.attnum
  ) AS column_id,
  a.attnum AS pos,
  a.atttypid AS typeid,
  a.attlen AS typelen,
  a.atttypmod AS typemod,
  a.attndims AS ndims,
  a.attnotnull AS "notnull",
  a.atthasdef AS hasdefault,
  a.atthasmissing AS hasmissing
FROM
  pg_attribute a,
  v_introspect_table_oids toids
WHERE
  (
    (a.attnum > 0)
    AND (NOT a.attisdropped)
    AND (a.attrelid = toids.oid)
  )
ORDER BY
  toids.nspname DESC,
  toids.relname,
  a.attnum;