CREATE OR REPLACE PROCEDURE uspManipulateTask(
   "mode" VARCHAR(10) DEFAULT '',
   "id" INT DEFAULT 0,
   "title" VARCHAR(50) DEFAULT '',
   "note" VARCHAR (255) DEFAULT '',
   "cat_id" SMALLINT DEFAULT 0,
   "prio" SMALLINT DEFAULT 0,
   "stat_id" SMALLINT DEFAULT 0,
   "owner_id" INT DEFAULT 0 
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF "mode" = 'AddOne'THEN
        INSERT INTO tasks(title,note,cat_id,prio,stat_id,created_at,last_edited,owner_id)
        VALUES (
            "id",
            "title",
            "note",
            "cat_id",
            "prio",
            "stat_id",
            NOW(),
            NOW(),
            "owner_id"
        );
    ELSIF "mode" = 'UpdateOne'THEN
        UPDATE tasks
        SET 
            title = "title",
            note = "note",
            cat_id = "id",
            prio = "prio",
            stat_id = "stat_id",
            last_edited = NOW()
        WHERE
            owner_id = "owner_id" AND
            id = "id";
    ELSIF "mode" = 'DeleteOne'THEN
        DELETE FROM tasks WHERE id = "id";
    ELSE
        RAISE NOTICE 'Mode Input is Unexpected';
    END IF;

    COMMIT;
EXCEPTION
    WHEN others THEN
        RAISE NOTICE 'Caught an unexpected error: %', SQLERRM;
        ROLLBACK;
END;$$;