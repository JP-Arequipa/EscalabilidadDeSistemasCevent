# Keycloak WebAPI POC

This project demonstrates how to integrate Keycloak authentication with a .NET WebAPI. Follow the instructions below to get the project up and running.

## Prerequisites

- Docker must be installed on your machine. You can download and install Docker from [here](https://www.docker.com/products/docker-desktop).

## Running the Project

1. **Clone the repository** and navigate to the project root directory.

2. **Start the containers**:
   Run the following command in the root directory of the project to start the required services (Keycloak, PostgreSQL, and the WebAPI):

   ```bash
   docker compose up -d
   ```

   This will start the necessary Docker containers in detached mode.

3. **Verify the containers**:
   Check that all three containers have started successfully by running the following command:

   ```bash
   docker ps
   ```

   You should see containers for:
   - Keycloak
   - PostgreSQL
   - WebAPI

   If any container is not running, troubleshoot by checking the logs with:

   ```bash
   docker logs <container_name>
   ```

## Keycloak Configuration

Once the containers are up and running, configure Keycloak for the project:

1. **Access Keycloak Admin Console**:
   Navigate to [http://localhost:8080](http://localhost:8080) and log in using the default admin credentials (if you haven’t set these, they are often `admin`/`admin`).

2. **Create a Realm**:
   - Go to the **Realms** section and create a new realm named: `myrealm`.

3. **Enable User Registration**:
   - In the newly created `myrealm`, go to **Realm Settings**.
   - In the **Login** tab, enable the **User Registration** option.

4. **Create a Client**:
   - Navigate to the **Clients** section and create a new client with the following settings:
     - **Client ID**: `public-client`
     - **Client Protocol**: `openid-connect`
     - In **Access Settings**, enable the **Implicit Flow** checkbox.

5. **Configure Redirect URIs and Web Origins**:
   - In the **Valid Redirect URIs** field, add: `http://localhost:5029/*`
   - In the **Web Origins** field, add: `http://localhost:5029/`

   Save the client settings.

Now, Keycloak is fully configured to work with your WebAPI.

## Testing the API

1. Open your browser and go to the WebAPI URL: [http://localhost:5029](http://localhost:5029).

2. Attempt to make a request (e.g., to the `/weatherforecast` endpoint). You should see that the request is blocked unless you are authorized.

3. To authorize, click on the **Login** button (or equivalent action in your UI) to be redirected to Keycloak for authentication.

Once authenticated, you should be able to access the API requests.