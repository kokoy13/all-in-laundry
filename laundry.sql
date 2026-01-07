-- Chingu Laundry Management System Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS chingu_laundry;
USE chingu_laundry;

-- Customers/Users Table
CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(100),
  address VARCHAR(255),
  city VARCHAR(50),
  postal_code VARCHAR(10),
  preferred_service VARCHAR(50),
  total_orders INT DEFAULT 0,
  total_spent DECIMAL(10, 2) DEFAULT 0,
  loyalty_points INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_phone (phone),
  INDEX idx_created_at (created_at)
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  base_price DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(20) DEFAULT 'kg',
  processing_time_hours INT,
  category ENUM('regular', 'express', 'dry_clean', 'special') DEFAULT 'regular',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_category (category)
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id INT NOT NULL,
  pickup_address VARCHAR(255),
  delivery_address VARCHAR(255),
  pickup_date DATETIME NOT NULL,
  estimated_delivery DATETIME,
  actual_delivery DATETIME,
  status ENUM('pending', 'picked_up', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
  total_amount DECIMAL(10, 2),
  payment_status ENUM('unpaid', 'partial', 'paid') DEFAULT 'unpaid',
  payment_method ENUM('cash', 'transfer', 'card') DEFAULT 'cash',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  INDEX idx_status (status),
  INDEX idx_customer_id (customer_id),
  INDEX idx_pickup_date (pickup_date),
  INDEX idx_order_number (order_number)
);

-- Order Items Table (Services in each order)
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  service_id INT NOT NULL,
  quantity DECIMAL(5, 2) NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE RESTRICT,
  INDEX idx_order_id (order_id)
);

-- Pricing Table (Different rates)
CREATE TABLE IF NOT EXISTS pricing (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_id INT NOT NULL,
  min_quantity DECIMAL(5, 2),
  max_quantity DECIMAL(5, 2),
  price_per_unit DECIMAL(10, 2) NOT NULL,
  discount_percentage DECIMAL(5, 2) DEFAULT 0,
  effective_from DATE,
  effective_to DATE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  INDEX idx_service_id (service_id)
);

-- Transactions/Payments Table
CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method ENUM('cash', 'transfer', 'card') NOT NULL,
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reference_number VARCHAR(100),
  notes TEXT,
  created_by VARCHAR(100),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  INDEX idx_order_id (order_id),
  INDEX idx_transaction_date (transaction_date)
);

-- Dashboard Statistics Table (for caching)
CREATE TABLE IF NOT EXISTS daily_statistics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  statistics_date DATE UNIQUE NOT NULL,
  total_orders INT DEFAULT 0,
  total_revenue DECIMAL(10, 2) DEFAULT 0,
  completed_orders INT DEFAULT 0,
  pending_orders INT DEFAULT 0,
  new_customers INT DEFAULT 0,
  average_order_value DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_date (statistics_date)
);

-- Insert Sample Services
INSERT INTO services (name, description, base_price, unit, processing_time_hours, category) VALUES
('Cuci Biasa', 'Layanan cuci standar dengan pengeringan', 8000, 'kg', 24, 'regular'),
('Cuci Express', 'Layanan cuci cepat siap 3 jam', 12000, 'kg', 3, 'express'),
('Dry Clean', 'Layanan dry cleaning untuk pakaian premium', 25000, 'piece', 24, 'dry_clean'),
('Setrika', 'Layanan setrika profesional', 3000, 'piece', 2, 'special'),
('Whitening', 'Pemutihan pakaian putih', 10000, 'kg', 24, 'special'),
('Softener Premium', 'Pencuci dengan softener premium', 10000, 'kg', 24, 'special');

-- Insert Sample Customer
INSERT INTO customers (name, phone, email, address, city) VALUES
('Budi Santoso', '081234567890', 'budi@example.com', 'Jl. Merdeka No. 123', 'Jakarta');

-- Commit changes
COMMIT;
