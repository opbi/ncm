FROM node:alpine

LABEL maintainer "Zhenyu Lin <zhenyu.lyn@gmail.com>"

# Install Yarn
ENV PATH /root/.yarn/bin:$PATH
RUN apk --update add git curl bash binutils tar \
  && rm -rf /var/cache/apk/* \
  && /bin/bash \
  && touch ~/.bashrc \
  && curl -o- -L https://yarnpkg.com/install.sh | bash \
  && apk del git curl tar binutils

# Create user and app directory
RUN adduser -S app
RUN mkdir -p /home/app && chown -R app /home/app
WORKDIR /home/app

# Install Dependencies and Build
ADD . /home/app/
RUN yarn --pure-lockfile \
  && node_modules/.bin/webpack -p \
  && yarn --production \
  && yarn cache clean

USER app
EXPOSE 3000
CMD node .build/index.js
