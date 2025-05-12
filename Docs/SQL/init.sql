CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    middleName VARCHAR(20),
    lastName VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    passwdHash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_edited TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users(
    "firstName", 
    "middleName",
    "lastName", 
    "email",
    "passwdHash"
) VALUES (
    'Angelo Rafael',
    'Fruto',
    'Recio',
    'recioangelorafael@gmail.com',
    '1'
);


CREATE TABLE condition(
    id SERIAL PRIMARY KEY,
    stat VARCHAR(20) NOT NULL
);
INSERT INTO conditions(stat)
VALUES
    ('Unfinished'),
    ('In Progress'),
    ('Finished'),
    ('Cancelled'),
    ('Delayed'),
    ('Continuous'),
    ('On Hold'),
    ('Speculation');



CREATE INTO categories(
    id SERIAL PRIMARY KEY,
    cat VARCHAR(20) NOT NULL
);
INSERT INTO categories(cat)
VALUES
    ('Personal'),
    ('Knowledge'),
    ('Career'),
    ('Automotive'),
    ('IT'),
    ('Government'),
    ('Finance'),
    ('Estate'),
    ('Fitness'),
    ('Health'),
    ('Other')
;

CREATE TABLE threats(
    id SERIAL PRIMARY KEY,
    "level" VARCHAR(10)
);
INSERT INTO threats("level") VALUES
('Low'),
('Medium'),
('High'),
('Alarming'),
('Inevitable');

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    note VARCHAR (255) NOT NULL,
    cat_id SMALLINT NOT NULL REFERENCES categories(id),
    prio SMALLINT DEFAULT 0,
    stat_id SMALLINT REFERENCES condition(id) DEFAULT 1,
    threat_id SMALLINT REFERENCES threats(id) DEFAULT 1,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_edited TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    DEADLINE TIMESTAMP WITHOUT TIME ZONE,
    owner_id INT NOT NULL REFERENCES users(id)
);