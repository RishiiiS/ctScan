# MongoDB Installation and Setup Guide

## For macOS

### Option 1: Using Homebrew (Recommended)

1. Install Homebrew (if not already installed):
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Install MongoDB:
```bash
brew tap mongodb/brew
brew install mongodb-community
```

3. Start MongoDB:
```bash
# Start as a service (runs in background)
brew services start mongodb-community

# Or run manually (stays in terminal)
mongod --config /usr/local/etc/mongod.conf
```

4. Verify MongoDB is running:
```bash
mongosh
# You should see MongoDB shell
# Type 'exit' to quit
```

### Option 2: Using Docker (Alternative)

If you prefer Docker:

```bash
# Pull MongoDB image
docker pull mongo

# Run MongoDB container
docker run -d -p 27017:27017 --name mongodb mongo

# Check if running
docker ps
```

## For Windows

1. Download MongoDB Community Server from:
   https://www.mongodb.com/try/download/community

2. Run the installer and follow the setup wizard

3. MongoDB will be installed as a Windows service

4. Verify installation:
```cmd
mongod --version
```

## For Linux (Ubuntu/Debian)

```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod
```

## Verify Installation

Test the connection:
```bash
mongosh
```

You should see output like:
```
Current Mongosh Log ID: xxx
Connecting to: mongodb://127.0.0.1:27017
Using MongoDB: x.x.x
Using Mongosh: x.x.x
```

## Connecting from Backend

Your backend is already configured to connect to MongoDB at:
```
mongodb://localhost:27017/connectremote
```

Once MongoDB is running, restart your backend server:
```bash
cd backend
./start.sh
```

You should see:
```
Server is running on port 5001
MongoDB Connected: 127.0.0.1
```

## MongoDB GUI Tools (Optional)

For easier database management:

### MongoDB Compass (Official)
Download from: https://www.mongodb.com/products/compass

### Studio 3T
Download from: https://studio3t.com/

### Connection String
```
mongodb://localhost:27017/connectremote
```

## Common Issues

### Issue: "Connection refused"
**Solution**: Make sure MongoDB service is running
```bash
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### Issue: "Address already in use"
**Solution**: Another process is using port 27017
```bash
# Find the process
lsof -i :27017

# Kill the process
kill -9 <PID>
```

### Issue: "Data directory not found"
**Solution**: MongoDB data directory doesn't exist
```bash
# macOS
sudo mkdir -p /usr/local/var/mongodb
sudo chown -R $(whoami) /usr/local/var/mongodb

# Linux
sudo mkdir -p /var/lib/mongodb
sudo chown -R mongodb:mongodb /var/lib/mongodb
```

## Quick Start Commands

```bash
# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux

# Stop MongoDB
brew services stop mongodb-community   # macOS
sudo systemctl stop mongod             # Linux

# Restart MongoDB
brew services restart mongodb-community # macOS
sudo systemctl restart mongod           # Linux

# Check status
brew services list                      # macOS
sudo systemctl status mongod            # Linux
```

## Next Steps

1. Install MongoDB using one of the methods above
2. Start the MongoDB service
3. Restart your backend server
4. Test the API endpoints
5. Start building your application!
