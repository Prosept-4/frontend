FROM node:20.9.0 as build

LABEL description="Procept hakathon team 4: Frontend" \
      version="1.0.0" \
      maintainer="Team 4" \
      developers="https://github.com/Red-Handed-Guy | https://github.com/Doctorian-Bogdan"

WORKDIR /app

COPY package*.json ./

COPY package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

CMD cp -r dist /frontend_static/
