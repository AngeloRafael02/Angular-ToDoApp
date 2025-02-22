CREATE OR REPLACE PROCEDURE spUpdateTask(
   psOption VARCHAR(100),
   plData VARCHAR(MAX)
)
language plpgsql
AS $$
BEGIN

    COMMIT;
END;$$;