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
5. Create a .env file in the project based on the .env.example file
6. Provide the NEXT_PUBLIC_API_UR which is the url to the edicom api for development it is https://localhost:4001
7. Provide a password for the postgres db in the POSTGRES_PASSWORD variable

### Now set up the Edicom API 

1. Go back to the ediccom folder
   ```bash
   cd ../
   ```
2. Install the api in the same folder as the Front app:
   ```bash
   git clone https://github.com/patrykJ113/edicom-api.git
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
6. Provide the DATABASE_URL url ( the password is the same as the one you set in the POSTGRES_PASSWORD of the fron project .env file, and the host is the name of the db service you given in the compose file )
7. Use this command to generate a secret for the ACCESS_TOKEN_SECRET:
   ```bash
   openssl rand -hex 64
   ```
8. Us the same command from the previous step to generate a secret for the REFRESH_TOKEN_SECRET
9. Before building the images and container it migt be a good idea to clear docker from the prevois constainers and images
   ```bash
   docker system prune -a --volumes
   ```
10. Start the app with:
   ```bash
   docker-compose up
   ```
11. Opent the shell for the newly created api container:
```bash
docker exec -it edicom-dev-api-c sh
```
12. 🛠️ Create a new database if it doesn’t exist:
   ```bash
   npx prisma migrate dev
   ```
13. Exit the api shell
```bash
exit
```

## Usage

After running the app, navigate to http://localhost:3000 in your browser. You wull see a procide further screeen just click ok, do the same for the api when it is your firs time seting up this project ( just coppy the url and visit it in the browser )
