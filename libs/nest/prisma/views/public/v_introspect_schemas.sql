SELECT
  v_introspect_tables.schema,
  row_number() OVER (
    ORDER BY
      v_introspect_tables.schema
  ) AS id,
  json_agg(
    json_build_object(
      'id',
      v_introspect_tables.oid,
      'tablename',
      v_introspect_tables.tablename,
      'columns',
      v_introspect_tables.columns,
      'schema',
      v_introspect_tables.schema
    )
  ) AS TABLES
FROM
  v_introspect_tables
GROUP BY
  v_introspect_tables.schema
ORDER BY
  v_introspect_tables.schema;