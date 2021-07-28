# build environment
FROM node:16.5
WORKDIR /app
COPY . ./
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm run build
RUN npm install serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
# production environment
#FROM nginx:stable-alpine
#COPY --from=build /app/build /usr/share/nginx/html
#EXPOSE 3000
#CMD ["nginx", "-g", "daemon off;"]

