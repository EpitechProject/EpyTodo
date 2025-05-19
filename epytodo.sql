CREATE DATABASE IF NOT EXISTS epytodo;
USE epytodo;
DROP TABLE IF EXISTS todo;
DROP TABLE IF EXISTS user;
CREATE TABLE user (
  	id integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  	email text NOT NULL,
  	password text NOT NULL,
  	name text NOT NULL,
  	firstname text NOT NULL,
  	created_at date DEFAULT (CURRENT_DATE)
);
CREATE TABLE todo (
  	id integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  	title text NOT NULL,
  	description text NOT NULL,
  	created_at date DEFAULT (CURRENT_DATE),
  	due_time date NOT NULL,
    status text DEFAULT "not started",
  	user_id integer NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
