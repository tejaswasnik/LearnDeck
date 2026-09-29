# STAGE 1: Build the frontend
FROM node:20-alpine AS frontend_builder

WORKDIR /app

COPY ./Frontend/package*.json /app/

RUN npm install

COPY ./Frontend /app/

# Optional: pass build-time variables if needed
# ARG VITE_API_URL
# ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# STAGE 2: fullstack image
FROM node:20-alpine

WORKDIR /app

COPY ./Backend/package*.json /app/

RUN npm install

COPY ./Backend /app/

# Copy compiled frontend into backend's public directory
COPY --from=frontend_builder /app/dist /app/public

EXPOSE 3000

CMD ["node", "server.js"]
