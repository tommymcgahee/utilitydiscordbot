FROM arm32v7/node:12

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

WORKDIR /home/node/app
COPY --chown=node:node package*.json ./

USER node
RUN npm install --only=production --loglevel=error

COPY --chown=node:node . .

CMD ["/bin/bash", "-c", "/usr/local/bin/npm run production"]