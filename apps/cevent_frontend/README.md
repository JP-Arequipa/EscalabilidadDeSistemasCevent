### Configuring Keycloak

1. **Create a Realm:**

   - Name: `solidarios-realm`

2. **Realm Settings:**

   - Go to the **Login** tab and enable the **User Registration** checkbox.

3. **Create a Client:**

   - ClientId: `next-client`
   - Enable the checkbox of `Service accounts roles` in `Capability config step`
   - Home URL: `http://localhost:3000/`
   - Valid Redirect URIs: `http://localhost:3000/*` (for the frontend)
   - Valid Post Logout Redirect URI: `http://localhost:3000/*`
   - Web Origins: `http://localhost:3000/*`
   - Admin URL: `http://localhost:8080`

4. **Save the Configuration.**

### Accessing the Application

Once the above steps are completed, your frontend and all services should be running smoothly.

**Important:** To start keycloak you should build and start the docker compose file in `/apps`
