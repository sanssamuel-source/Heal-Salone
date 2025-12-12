FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate --schema=src/prisma/schema.prisma

EXPOSE 4000

CMD ["npm", "start"]
