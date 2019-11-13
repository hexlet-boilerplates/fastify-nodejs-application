FROM node:12.13

ARG USER_ID=$USER_ID
ARG GROUP_ID=$USER_ID
ARG HOMEDIR=$HOMEDIR

RUN npm install -g npm-check-updates
RUN mkdir -p /home/$HOMEDIR/app && chown -R $USER_ID:$GROUP_ID /home/$HOMEDIR

WORKDIR /home/$HOMEDIR/app
ENV HOME=/home/$HOMEDIR
