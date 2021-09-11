# FROM node:10 AS ui-build

# WORKDIR /usr/src/app
# COPY . /usr/src/app/
# #RUN cd user-portal
# #ENV PATH /user-portal/node_modules/.bin:$PATH

FROM node:16.5

WORKDIR /app
COPY . ./
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm run build
RUN npm install serve

EXPOSE 5000

CMD ["serve", "-s", "build", "-l", "5000"]