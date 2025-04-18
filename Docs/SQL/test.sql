INSERT INTO 
    "task"(
        "title", 
        "note", 
        "cat_id", 
        "prio", 
        "stat_id", 
        "created_at", 
        "last_edited", 
        "deadline", 
        "owner_id", 
        "categoryId", 
        "conditionsId", 
        "ownerId"
    ) 
VALUES (
    $1, 'Test2',
    $2, 'from Angular',
    DEFAULT, 
    $3, 1,
    DEFAULT, 
    $4, 
    $5, 
    $6, 
    DEFAULT, 
    DEFAULT, 
    DEFAULT, 
    DEFAULT
    ) 
RETURNING 
    "id", 
    "prio", 
    "stat_id", 
    "created_at", 
    "last_edited

     [
    'Test2',
    'from Angular',
    1,
    '4/9/2025, 9:13:53 AM',
    '4/9/2025, 9:13:53 AM',
    '4/9/2025, 11:59:59 PM'
  ],
