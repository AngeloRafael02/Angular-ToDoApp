CREATE VIEW task_view AS
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
;