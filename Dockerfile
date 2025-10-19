FROM node:20

RUN apt-get update && apt-get install -y git

WORKDIR /server.node

RUN git clone https://github.com/zairajazmin/appServidores.git /server.node

RUN npm install

EXPOSE 3001

CMD ["node", "server.js"]
