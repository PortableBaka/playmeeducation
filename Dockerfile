# Stage 1: Build the React app
FROM node:20 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --force
COPY . .
ARG REACT_APP_API_BASE
ENV REACT_APP_API_BASE=$REACT_APP_API_BASE
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy the build output, checking for both Vite (`dist`) and CRA (`build`) folders
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
