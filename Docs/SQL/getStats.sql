SELECT c.cat AS "Category", COUNT(t.cat_id) AS "Count"
FROM task as t
JOIN categories AS c ON t.cat_id = c.id
WHERE t.threat_id NOT IN (3,4) AND t.ownerid = 1
GROUP BY t.cat_id, c.cat
;

SELECT c.stat AS "Status", COUNT(t.stat_id) AS "Count"
FROM task as t
JOIN conditions AS c ON t.stat_id = c.id
GROUP BY t.stat_id, c.stat
;

SELECT c.level AS "Threat Level", COUNT(t.threat_id) AS "Count"
FROM task as t
JOIN threats AS c ON t.threat_id = c.id
WHERE t.threat_id NOT IN (3,4)
GROUP BY t.threat_id, c.level
;

