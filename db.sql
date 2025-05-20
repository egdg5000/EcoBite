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
);

CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY,
    diet VARCHAR(255),
    allergies TEXT,
    home_location VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE inventory (
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

CREATE TABLE deleted_inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  quantity VARCHAR(50),
  unit VARCHAR(20),
  expiration_date DATE,
  category VARCHAR(50),
  deleted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);