-- CREATE DATABASE c21_memo_wall;

\c c21_memo_wall


CREATE TABLE memos (
	id SERIAL PRIMARY KEY,
	content TEXT NOT NULL,
	image VARCHAR,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes (
	id SERIAL PRIMARY KEY,
	user_id integer,
	FOREIGN KEY (user_id) REFERENCES users(id),
	memo_id integer,
	FOREIGN KEY (memo_id) REFERENCEs memos(id)
);

-- INSERT INTO users (username, password) VALUES ('jason@tecky.io', '1234'), ('adams@tecky.io', '1234');