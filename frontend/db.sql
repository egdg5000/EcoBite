CREATE DATABASE sessions;
CREATE DATABASE ecobite;
USE ecobite;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    signup_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    signin_token VARCHAR(255),
    last_signin DATETIME NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE, 
    verification_token VARCHAR(255), 
    verification_expires DATETIME
    ALTER TABLE users ADD COLUMN push_token VARCHAR(255);
    ADD COLUMN notify_expiry BOOLEAN DEFAULT TRUE,
    ADD COLUMN notify_deletion BOOLEAN DEFAULT TRUE;
);

CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY,
    diet VARCHAR(255),
    allergies TEXT,
    home_location VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    item_name VARCHAR(255) NOT NULL,
    quantity DECIMAL(10,2),
    unit VARCHAR(50),
    expiration_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    ingredients JSON,
    instructions TEXT,
    estimated_time INT,
    creator_id INT,
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE saved_recipes (
    user_id INT,
    recipe_id INT,
    saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE user_products_deleted (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  quantity VARCHAR(50),
  unit VARCHAR(20),
  expiration_date DATE,
  category VARCHAR(50),
  deleted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users_gamification (
  user_id INT PRIMARY KEY,
  level INT DEFAULT 1,
  xp INT DEFAULT 0,
  co2_saved DECIMAL(10, 2) DEFAULT 0.0,
  FOREIGN KEY (user_id) REFERENCES users(id)
  ALTER TABLE users_gamification ADD streak_days INT DEFAULT 0;
  ALTER TABLE users_gamification ADD last_activity DATE DEFAULT NULL;
);

CREATE TABLE weekly_challenges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  challenge_text TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);

CREATE TABLE user_challenges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  challenge_id INT NOT NULL,
  week_start DATE NOT NULL,
  completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_challenge_per_week (user_id, challenge_id, week_start)
);

