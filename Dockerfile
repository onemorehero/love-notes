FROM node:20-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @workspace/api-server run build
EXPOSE 8080
CMD ["pnpm", "--filter", "@workspace/api-server", "run", "start"]