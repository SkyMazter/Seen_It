#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "===== PNK Archive System Dependencies Checker and Installer ====="

# Function to check if command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check and install MySQL
echo -e "\n${YELLOW}Checking MySQL...${NC}"
if command_exists mysql; then
  echo -e "${GREEN}MySQL is already installed.${NC}"
  mysql --version
else
  echo -e "${RED}MySQL is not installed. Installing...${NC}"
  sudo apt update
  sudo apt install -y mariadb-server

  echo -e "\n${YELLOW}Securing MySQL installation...${NC}"
  sudo mysql_secure_installation
fi

# Check and setup database
echo -e "\n${YELLOW}Checking if database exists...${NC}"

echo "===== Please Set the Parameters for your Database ====="

read -s -p "Enter the password for your database" DB_PASSWORD
echo

DB_NAME="database"
DB_USER="seenit"


if command_exists mysql; then
  # Check if database exists
  DB_EXISTS=$(sudo mysql -e "SHOW DATABASES LIKE '$DB_NAME';" | grep -o "$DB_NAME")

  if [ "$DB_EXISTS" == "$DB_NAME" ]; then
    echo -e "${GREEN}Database '$DB_NAME' already exists.${NC}"
  else
    echo -e "${RED}Database '$DB_NAME' does not exist. Creating...${NC}"
    sudo mysql -e "CREATE DATABASE $DB_NAME;"
    sudo mysql -e "CREATE USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"
    sudo mysql -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';"
    sudo mysql -e "FLUSH PRIVILEGES;"
    echo -e "${GREEN}Database created and user permissions set.${NC}"
  fi
fi

# Check and install Node.js
echo -e "\n${YELLOW}Checking Node.js...${NC}"
if command_exists node; then
  echo -e "${GREEN}Node.js is already installed.${NC}"
  node --version
else
  echo -e "${RED}Node.js is not installed. Installing...${NC}"
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt install -y nodejs
  echo -e "${GREEN}Node.js installed:${NC}"
  node --version
fi
# Check and install npm
echo -e "\n${YELLOW}Checking npm...${NC}"
if command_exists npm; then
  echo -e "${GREEN}npm is already installed.${NC}"
  npm --version
else
  echo -e "${RED}npm is not installed. Installing...${NC}"
  sudo apt install -y npm
  echo -e "${GREEN}npm installed:${NC}"
  npm --version
fi

# Check and install Apache
echo -e "\n${YELLOW}Checking Apache...${NC}"
if command_exists apache2; then
  echo -e "${GREEN}Apache is already installed.${NC}"
  apache2 -v
else
  echo -e "${RED}Apache is not installed. Installing...${NC}"
  sudo apt update
  sudo apt install -y apache2
  sudo systemctl enable apache2
  sudo systemctl start apache2
  echo -e "${GREEN}Apache installed and started.${NC}"
fi

Check Apache configuration
echo -e "\n${YELLOW}Checking Apache configuration...${NC}"
if [ -f /etc/apache2/sites-available/000-default.conf ]; then
  echo -e "${GREEN}Apache default configuration exists.${NC}"
else
  echo -e "${RED}Apache default configuration not found. Creating basic config...${NC}"
  sudo tee /etc/apache2/sites-available/000-default.conf > /dev/null << EOF
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
EOF
  sudo systemctl reload apache2
  echo -e "${GREEN}Basic Apache configuration created.${NC}"
fi

echo -e "\n${GREEN}====== System check and installation complete! ======${NC}"
echo -e "MySQL: $(command_exists mysql && echo "Installed" || echo "Not installed")"
echo -e "Database: $([ "$DB_EXISTS" == "$DB_NAME" ] && echo "Created" ||  echo "Not created")"
echo -e "Node.js: $(command_exists node && echo "Installed ($(node -v))" || echo "Not installed")"
echo -e "npm: $(command_exists npm && echo "Installed ($(npm -v))" || echo "Not installed")"
echo -e "Apache: $(command_exists apache2 && echo "Installed" || echo "Not installed")"

echo "===== Dependancy Installation Complete: Now Installing Application ====="

ENV_FILE=".env"
TARGET_DIR="$(pwd)/server"

cat > "$ENV_FILE" << EOF
#Environment Variables
DB_NAME=$DB_NAME
DB_PASSWORD=$DBPASSWORD
DB_HOST=127.0.0.1
DB_USER=$DB_USER
DB_PORT=3306

mkdir -p "$TARGET_DIR"

mv "$ENV_FILE" "$TARGET_DIR/"

echo "===== .env file created and moved to its target directory ====="
