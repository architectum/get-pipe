# Base image
FROM debian:jessie

LABEL maintainer="Yevhenii Ivanets <evgeniyivanets@gmail.com>"

# Install Node.js Dependencies
RUN apt-get update && \
    apt-get -y install curl git make

RUN git clone https://github.com/tj/n && \
    cd n && \
    make install && \
    n lts

EXPOSE  3000
RUN npm install -g micro micro-dev ava

# Provides cached layer for node_modules
WORKDIR /tmp
COPY package.json ./package.json
RUN npm install
# --------------------
WORKDIR /app
COPY . ./
RUN cp -a /tmp/node_modules /app/

CMD ["npm", "test"]
