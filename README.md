# 🚀 Edicom Front

This is the front of Edicom

## 📦 Installation & Setup

1. Creare the folder to store the projects:
```bask
mkdir edicom
```
2. Clone the repository:
   ```bash
   git clone https://github.com/patrykJ113/edicom.git
   ```
3. install dependencies:
   ```bash
   npm ci
   ```
4. 🔐 Generate a Self-Signed SSL Certificate
   ```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
   ```
5. Install the api in the same folder as the Front app:
   ```bash
   git clone https://github.com/patrykJ113/edicom-api.git
   ```
6. install api dependencies:
   ```bash
   npm ci
   ```
7. 🔐 Generate a Self-Signed SSL Certificate for the api 
   ```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
   ```
8. Start the app with:
   ```bash
   docker-compose up
   ```
9. Opent the shell for the newly created api container:
```bash
docker exec -it edicom-dev-api-c sh
```
10. 🛠️ Create a new database if it doesn’t exist:
   ```bash
   npx prisma migrate dev
   ```
11. Exit the api shell
```bash
exit
```

## Usage

After running the app, navigate to http://localhost:3000 in your browser.
