PRAGMA FOREIGN_KEYS = ON;

DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id          INTEGER           PRIMARY KEY     AUTOINCREMENT,
  username    VARCHAR(32)       NOT NULL        UNIQUE,
  password    VARCHAR(255)      NOT NULL,
  email       VARCHAR(255)      NOT NULL        UNIQUE,
  created_at  DATETIME          NOT NULL,
  updated_at  DATETIME          NOT NULL,
  balance     DECIMAL(10, 2)    NOT NULL
);

CREATE TABLE profiles (
  id          INTEGER           PRIMARY KEY     AUTOINCREMENT,
  name        VARCHAR(255),
  last_name   VARCHAR(255),
  avatar      VARCHAR(255),
  about       TEXT,
  user_id     INTEGER           NOT NULL        UNIQUE,
  FOREIGN KEY (user_id)         REFERENCES      users (id)
);

INSERT INTO users (username, password, email, created_at, updated_at, balance)
VALUES ('John', 'qwerty!', 'doe@mail.com', datetime('now'), datetime('now'), 470);

INSERT INTO profiles (user_id, name, last_name, avatar, about)
VALUES (1, 'John', 'Doe', 'uploads/images/john_doe.png', 'software engineer');

INSERT INTO users (username, password, email, created_at, updated_at, balance)
VALUES ('Bob', '$asdfg', 'smith@mail.com', datetime('now'), datetime('now'), 125);

INSERT INTO profiles (user_id, name, last_name, avatar, about)
VALUES (2, 'Bob', 'Smith', 'uploads/images/bob_smith.png', 'devops engineer');

INSERT INTO users (username, password, email, created_at, updated_at, balance)
VALUES ('Harry', '$%^&!', 'potter@hogwarts.com', datetime('now'), datetime('now'), 852);

INSERT INTO profiles (user_id, name, last_name, avatar, about)
VALUES (3, 'Harry', 'Potter', 'uploads/images/harry.png', 'sorcerer');