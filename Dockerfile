FROM mhart/alpine-node:9

WORKDIR /app
COPY . .

RUN npm install --production --unsafe-perm

EXPOSE 4200

CMD ["npm", "run", "start", "--production"]
