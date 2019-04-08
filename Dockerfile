# ENV DB_HOST=10.0.200.26
# ENV DB_NAME=appotek
# ENV DB_PASSWORD=eykRJ2zQnl
FROM appotek/micro:latest as deps
ENV NODE_ENV development
COPY package.json ./package.json
RUN npm install
# # -----------w---------
# 
FROM appotek/micro:latest as prod
LABEL traefik.port=3000
LABEL traefik.enable=true
ENV NODE_ENV production
WORKDIR /app
RUN npm i -g micro-dev typescript 
COPY --chown=root:root . ./
COPY --chown=root:root --from=deps /app/node_modules /app/node_modules
# 
ENV JWT_KEY_PATH=/etc/sign/verify.pub
ENV VERIFY_TOKEN_URL=http://authtoken/api/v4/token/verify
ENV DB_USER=postgres
ENV DB_HOST=postgres
ENV DB_NAME=postgres
ENV DB_PASSWORD=postgres
ENV DB_PORT=5432
ENV MAX_POOL_SIZE=100
ENV MIN_POOL_SIZE=1
ENV DB_KEEP_ALIVE=0
CMD [ "npm", "run", "dev:docker" ]


