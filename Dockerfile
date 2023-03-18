FROM node:18.15.0

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN mkdir config
RUN touch config/token_file.cfg
RUN wget https://nmap.org/dist/nmap-7.93.tar.bz2
RUN bzip2 -cd nmap-7.93.tar.bz2 | tar xvf -
RUN cd nmap-7.93
RUN ./configure
RUN make
RUN make install
RUN cd /app

ENV TOKEN_FILE_PATH=/app/config/token_file.cfg

COPY . .

EXPOSE 3228

CMD [ "npm", "run", "start:dev"]