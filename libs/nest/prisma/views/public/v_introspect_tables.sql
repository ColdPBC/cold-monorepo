SELECT
  col.tablename,
  col.oid,
  col.schema,
  ts.reltuples,
  ts.relkind,
  ts.relam,
  ts.relacl,
  ts.reltype,
  ts.relowner,
  ts.relhasindex,
  json_agg(
    json_build_object(
      'column',
      col."column",
      'datatype',
      col.datatype,
      'table',
      col.tablename,
      'pos',
      col.pos,
      'typeid',
      col.typeid,
      'typelen',
      col.typelen,
      'typemod',
      col.typemod,
      'notnull',
      col."notnull",
      'hasdefault',
      col.hasdefault,
      'hasmissing',
      col.hasmissing,
      'parent_id',
      col.oid
    )
  ) AS COLUMNS
FROM
  v_introspect_columns col,
  v_introspect_table_oids ts
WHERE
  (ts.oid = col.oid)
GROUP BY
  col.tablename,
  col.oid,
  col.schema,
  ts.reltuples,
  ts.relkind,
  ts.relam,
  ts.nspacl,
  ts.relacl,
  ts.reltype,
  ts.relowner,
  ts.relhasindex
ORDER BY
  col.schema DESC,
  col.tablename,
  ts.relkind;