PRAGMA FOREIGN_KEYS = ON;

DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255),
  last_name VARCHAR(255),
  photo_url VARCHAR(255),
  about TEXT,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

DROP TRIGGER IF EXISTS new_profile;

CREATE TRIGGER new_profile AFTER INSERT ON users
  FOR EACH ROW
  BEGIN
    INSERT INTO profiles(user_id) VALUES (NEW.id);
END;

DROP TRIGGER IF EXISTS update_user;

CREATE TRIGGER update_user AFTER UPDATE ON profiles
  FOR EACH ROW
  BEGIN
    UPDATE users SET updated_at = datetime('now') WHERE id = OLD.user_id;
END;

DROP TRIGGER IF EXISTS delete_profile;

CREATE TRIGGER delete_profile BEFORE DELETE ON users
  FOR EACH ROW
  BEGIN
    DELETE FROM profiles WHERE user_id = OLD.id;
END;