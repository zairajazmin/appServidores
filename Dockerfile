FROM node:20

RUN apt-get update && apt-get install -y git

RUN git clone https://github.com/zairajazmin/appServidores-node.git /server.node

WORKDIR /appServidor

RUN npm install

Expose 3001

CMD ["node", "server,js"]