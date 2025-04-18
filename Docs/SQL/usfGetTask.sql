--BUG "owner_id" as ambigius

CREATE OR REPLACE FUNCTION uspGetTask(
    "mode" VARCHAR(10) DEFAULT '',
    "id" INT DEFAULT 0,
    "oid" INT DEFAULT 0
)
returns table(
    "ID" INT, 
    "Title" VARCHAR(50), 
    "Description" VARCHAR(255), 
    "CID" SMALLINT, 
    "Category" VARCHAR(20),
    "Priority" SMALLINT,
    "SID" SMALLINT,
    "Status" VARCHAR(20),
    "Created At" TIMESTAMP WITH TIME ZONE,
    "Last Edited" TIMESTAMP WITH TIME ZONE,
    "UID" INT  
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF "mode" = 'GetAll' THEN
        RETURN QUERY
        SELECT
            t.id AS "ID",
            t.title AS "Title",
            t.note AS "Description",
            t.cat_id AS "CID",
            cat.cat AS "Category",
            t.prio AS "Priority",
            t.stat_id AS "SID",
            con.stat AS "Status",
            t.created_at AS "Created At",
            t.last_edited AS "Last Edited",
            u.id AS "UID"
        FROM tasks AS t
        INNER JOIN categories AS cat ON t.cat_id = cat.id
        INNER JOIN conditions AS con ON t.stat_id = con.id
        INNER JOIN users AS u on t.owner_id = u.id
        WHERE t.owner_id = "oid";
    ELSIF "mode" = 'GetOne' THEN
        RETURN QUERY
        SELECT
            t.id AS "ID",
            t.title AS "Title",
            t.note AS "Description",
            t.cat_id AS "CID",
            cat.cat AS "Category",
            t.prio AS "Priority",
            t.stat_id AS "SID",
            con.stat AS "Status",
            t.created_at AS "Created At",
            t.last_edited AS "Last Edited",
            u.id AS "UID"
        FROM tasks AS t
        INNER JOIN categories AS cat ON t.cat_id = cat.id
        INNER JOIN conditions AS con ON t.stat_id = con.id
        INNER JOIN users AS u on t.owner_id = u.id
        WHERE t.id = 1;
    ELSE
        RAISE NOTICE 'Mode Input is Unexpected';
    END IF;
EXCEPTION
    WHEN others THEN
        RAISE NOTICE 'Caught an unexpected error: %', SQLERRM;
END;$$;