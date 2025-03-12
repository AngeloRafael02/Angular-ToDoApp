CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    middleName VARCHAR(20),
    lastName VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    passwd_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_edited TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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
('Speculation');


CREATE INTO categories(
    id SERIAL PRIMARY KEY,
    cat VARCHAR(20) NOT NULL
);
INSERT TABLE categories(cat)
VALUES
('Other'),
('Personal'),
('Finance'),
('Knowledge'),
('Career'),
('Automotive'),
('IT'),
('Government'),
('Fitness')
;

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    note VARCHAR (255) NOT NULL,
    cat_id SMALLINT NOT NULL REFERENCES categories(id),
    prio SMALLINT DEFAULT 0,
    stat_id SMALLINT REFERENCES condition(id) DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_edited TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    owner_id INT NOT NULL REFERENCES users(id)
);