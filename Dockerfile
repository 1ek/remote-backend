FROM node:18.15.0

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN mkdir config
RUN touch config/token_file.cfg


RUN apt-get update
RUN apt-get install -y nmap


ENV TOKEN_FILE_PATH=/app/config/token_file.cfg
ENV POSTGRES_HOST=remote-db-new

COPY . .

EXPOSE 3228

CMD [ "npm", "run", "start:dev"]
