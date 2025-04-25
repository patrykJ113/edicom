# 🚀 Edicom Front

This is the front of Edicom

## 📦 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/patrykJ113/edicom.git
   ```
2. install dependencies:
   ```bash
   npm ci
   ```
3. 🔐 Generate a Self-Signed SSL Certificate
   ```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
   ```
4. Install the api in the same folder as the Front app:
   ```bash
   git clone https://github.com/patrykJ113/edicom-api.git
   ```
5. install api dependencies:
   ```bash
   npm ci
   ```
6. 🔐 Generate a Self-Signed SSL Certificate for the api 
   ```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
   ```
7. Start the app with:
   ```bash
   docker-compose up
   ```
8. Opent the shell for the newly created api container:
```bash
docker exec -it edicom-dev-api-c sh
```
9. 🛠️ Create a new database if it doesn’t exist:
   ```bash
   npx prisma migrate dev
   ```
10. Exit the api shell
```bash
exit
```

## Usage

After running the app, navigate to http://localhost:3000 in your browser.
