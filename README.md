# 🚀 Edicom Front

This is the front of Edicom

## 📦 Installation & Setup

### First setup the front part of Edicom 
1. Creare the folder to store the projects:
```bask
mkdir edicom && cd edicom
```
2. Clone the repository:
   ```bash
   git clone https://github.com/patrykJ113/edicom-front.git
   ```
   ```bash
   cd edicom-front
   ```
3. install dependencies:
   ```bash
   npm ci
   ```
4. 🔐 Generate a Self-Signed SSL Certificate
   ```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
   ```
5. Create a .env file in the project based on the .env.example file
   ```bash
   cp .env.example .env
   ```
7. Provide the NEXT_PUBLIC_API_UR which is the url to the edicom api for development it is https://localhost:4001
8. Provide a password for the postgres db in the POSTGRES_PASSWORD variable

### Now set up the Edicom API 

1. Go back to the ediccom folder
   ```bash
   cd ../
   ```
2. Install the api in the same folder as the Front app:
   ```bash
   git clone https://github.com/patrykJ113/edicom-api.git
   ```
   ```bash
   cd edicom-api
   ```
3. install api dependencies:
   ```bash
   npm ci
   ```
4. 🔐 Generate a Self-Signed SSL Certificate for the api 
   ```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
   ```
5. Create a .env file in the project based on the .env.example file
   ```bash
   cp .env.example .env
   ```
7. Provide the DATABASE_URL url ( the password is the same as the one you set in the POSTGRES_PASSWORD of the fron project .env file, and the host is the name of the db service you given in the compose file )
8. Use this command to generate a secret for the ACCESS_TOKEN_SECRET:
   ```bash
   openssl rand -hex 64
   ```
9. Us the same command from the previous step to generate a secret for the REFRESH_TOKEN_SECRET

### Start the app 
1. Go the the Front app
   ```bash
   cd ../edicom-front
   ```
2. Before building the images and container it migt be a good idea to clear docker from the prevois constainers and images
   ```bash
   docker system prune -a --volumes
   ```
3. Start the app with:
   ```bash
   docker-compose up
   ```
4. Opent the shell for the newly created api container:
```bash
docker exec -it edicom-dev-api-c sh
```
5. 🛠️ Create a new database if it doesn’t exist:
   ```bash
   npx prisma migrate dev
   ```
6. Exit the api shell
```bash
exit
```

## Usage

After running the app, navigate to https://localhost:3000 in your browser. You wull see a procide further screeen just click ok, do the same for the api when it is your firs time seting up this project ( just coppy the url and visit it in the browser )
