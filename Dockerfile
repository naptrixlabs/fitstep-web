# Build the static Vive marketing site, then serve it with nginx (SPA fallback).
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Vite bakes VITE_* at build time — declare every VITE_* the site reads.
ARG VITE_API_BASE_URL
ARG VITE_APP_STORE_URL
ARG VITE_PLAY_STORE_URL
ARG VITE_CONTACT_EMAIL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_APP_STORE_URL=$VITE_APP_STORE_URL \
    VITE_PLAY_STORE_URL=$VITE_PLAY_STORE_URL \
    VITE_CONTACT_EMAIL=$VITE_CONTACT_EMAIL
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
ENV PORT=8080
EXPOSE 8080
