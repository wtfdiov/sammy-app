FROM node:carbon
WORKDIR /usr/src/app
COPY ./sammy-front/package.json .
RUN npm install
COPY ./sammy-front .
RUN npm run build

FROM nginx:1.13
COPY --from=0 /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]