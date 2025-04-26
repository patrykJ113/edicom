# 🚀 Edicom Front

This is the frontend of Edicom.

## 📦 Installation & Setup

### Set up the frontend
1. Creare the folder to store the projects:
```bask
mkdir edicom && cd edicom
```
2. Clone the frontend repository:
   ```bash
   git clone https://github.com/patrykJ113/edicom-front.git
   ```
   ```bash
   cd edicom-front
   ```
3. Install dependencies:
   ```bash
   npm ci
   ```
4. 🔐 Generate a self-signed SSL certificate:
   ```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
   ```
5. Create a .env file based on .env.example:
   ```bash
   cp .env.example .env
   ```
6. Set the NEXT_PUBLIC_API_URL variable in your .env file. For development, use:
   ```bash
   https://localhost:4001
   ```
9. Set the POSTGRES_PASSWORD variable with the password for your Postgres database.

### Set up the API

1. Go back to the edicom folder:
   ```bash
   cd ../
   ```
2. Clone the API repository:
   ```bash
   git clone https://github.com/patrykJ113/edicom-api.git
   ```
   ```bash
   cd edicom-api
   ```
3. Install API dependencies:
   ```bash
   npm ci
   ```
4. 🔐 Generate a self-signed SSL certificate for the API:
   ```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
   ```
5. Create a .env file based on .env.example:
   ```bash
   cp .env.example .env
   ```
7. Set the DATABASE_URL in the API .env file (use the same password you set for POSTGRES_PASSWORD and the database service name from your docker-compose.yml).
8. Use this command to generate a secret for the ACCESS_TOKEN_SECRET:
   ```bash
   openssl rand -hex 64
   ```
9. Us the same command from the previous step to generate a secret for the REFRESH_TOKEN_SECRET

### Start the app
1. Go back to the frontend project:
   ```bash
   cd ../edicom-front
   ```
2. (Optional) Clear Docker containers, images, and volumes if needed:
   ```bash
   docker system prune -a --volumes
   ```
3. Start the app:
   ```bash
   docker-compose up
   ```
4. Open a shell inside the running API container:
```bash
docker exec -it edicom-dev-api-c sh
```
5. 🛠️ Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
6. Exit the API container shell:
```bash
exit
```

## 📖 Usage

After starting the app, visit https://localhost:3000 in your browser.
You may see a warning screen — just proceed (do the same for the API if needed, by copying its URL and opening it in the browser).
