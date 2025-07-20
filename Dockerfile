# Stage 1: Build the React app
FROM node:20 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy the build output, checking for both Vite (`dist`) and CRA (`build`) folders
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
