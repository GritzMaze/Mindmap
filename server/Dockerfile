FROM node:18.0.0-alpine3.14
RUN npm i -g npm@8.10.0

RUN addgroup --gid 990 mindmap
RUN adduser mindmap --home /home/mindmap --uid 990 --system -G mindmap

USER mindmap

RUN mkdir /home/mindmap/server
WORKDIR /home/mindmap/server
COPY --chown=mindmap ./package*.json ./

RUN npm install

COPY --chown=mindmap . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]