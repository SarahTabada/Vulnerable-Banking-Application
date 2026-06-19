# CS 4389 - SQL Injection Prevention System

## Team Members
BJ Anderson, Juan F. Arce, Yousuf Stanikzay, Jahnavi Dhulipalla, Sarah Chacko, Sarah Tabada, Wyatt Skov

## Overview
SQL injection prevention system for a banking application using Flask (backend), Vue.js (frontend), MySQL (database), and Docker.

## Requirements
- Docker Desktop
- Git

## Quick Start

1. **Clone and navigate to project**
   ```bash
   git clone https://github.com/Auric115/cs4389-project.git
   cd cs4389-project
   ```

2. **Create environment files**
   
   Create `.envdb`:
   ```env
   MYSQL_ROOT_PASSWORD=secure_root_password_123
   MYSQL_DATABASE=banking_db
   MYSQL_USER=app_user
   MYSQL_PASSWORD=secure_app_password_456
   ```
   
   Create `.envapi`:
   ```env
   # .env
   # Flask settings
   SECRET_KEY=supersecretkey1234567890
   FLASK_ENV=development

   #JWT settings
   JWT_SECRET="mysupersecurelongsecret"
   JWT_ALGO="HS256"
   COOKIE_NAME="bank_auth"

   #insecure version
   INSECURE=1 #1 if want sql injectable 0 if not

   # MySQL settings
   MYSQL_HOST=mysql
   MYSQL_USER=myuser
   MYSQL_PASSWORD=mypass
   MYSQL_DB=mydatabase
   MYSQL_PORT=3306
   ```

3. **Run the application**
   ```bash
   docker compose up -d
   ```

4. **Access at https://localhost**
And make sure you accept the certificate (self signed so it is important to accept it)
Also note if you wait a while you may need to reload your page and redo this (so api can continue to work)

5. **Log in as one of the users**

U: admin P: admin123
U: john.doe P: password123
U: jahn.smith P: business456

6. **Run various SQL commands at certain places**

Accidential DOS - admin'; UPDATE users SET password='notahash'; -- '
 - Passwords are hashed but this command sets them to pass
 - This means no one can log in anymore (the attacker bricked the system trying to get in)
Multiline Madness - a', NULL, NULL, NULL) [Values to forge transfer if can guess]; [Malicious command] -- '
 - Interesting where guessing args and lenght can lead to more inserts

7. **Environment Reset**

Under the conditions you broke the app we decided for api to reload our data upon running
```
docker compose up -d
```
again

## Development

**Rebuild services:** `docker compose up -d --no-deps --build <service_name>`
**View logs:** `docker compose logs <service_name>`
**Run tests:** `docker compose exec api python -m pytest tests/`

## Project Status

**WORK IN PROGRESS** - Frontend, backend, and database components exist and have endpoint connectivity but not all pieces have full functionality.

**Next Steps:**
- Make API sqlalchemy ORM models corresponding to the MySQL database
- Implement REST API endpoints
- Double Check Connections after API endpoints are written
- Add SQL injection prevention measures
- Complete authentication system

## Goals

- Develop SQL injection prevention system
- Create database input sanitization filter  
- Implement prepared statements for secure database access
- Build security monitoring and logging
- Optional: Add honeypot functionality

## Troubleshooting

**Port conflicts:** `docker compose down` then `netstat -an | findstr ":80"`
**Permission issues:** Run PowerShell as Administrator
**Reset everything:** `docker system prune -a --volumes`

