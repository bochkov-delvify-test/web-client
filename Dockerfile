# Build Stage
FROM node:18 AS build-stage

WORKDIR /home/app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Bundle app source
COPY . ./
RUN yarn build

# Production Stage
FROM node:18-slim

WORKDIR /home/app/public

# Copy built app from the previous stage
COPY --from=build-stage /home/app/dist .

# Install the serve tool
RUN yarn global add serve

# Expose the app on port 5173
EXPOSE 5173

# Start the app
CMD ["serve", "-s", "."]
