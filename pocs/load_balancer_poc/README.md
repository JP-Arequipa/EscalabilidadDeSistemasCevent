# Load Balancer Setup with Nginx and Docker

This project sets up a load balancer using Nginx and Docker to distribute traffic across three web applications (`WebApp`, `WebApp2`, `WebApp3`) running on different ports.

## Steps to Run the Load Balancer

### Step 1: Build and Run the Web Applications

Ensure each of the web applications (`WebApp`, `WebApp2`, `WebApp3`) are running locally on different ports. For example:
- `WebApp`: http://localhost:5012
- `WebApp2`: http://localhost:5215
- `WebApp3`: http://localhost:5192

To run these applications:
1. Open a terminal or PowerShell window in each respective directory (`WebApp`, `WebApp2`, `WebApp3`).
2. Run the applications on their respective ports using the command `dotnet run`.

### Step 2: Verify and Update Nginx Ports (if necessary)

Open the `nginx.conf` file and ensure that the ports specified for each web application in the `upstream myapp` block are correct.

By default, the configuration is set up for the following ports:
```nginx
    upstream myapp {
        server host.docker.internal:5012;
        server host.docker.internal:5215;
        server host.docker.internal:5192;
    }
```

If your web applications are running on **different ports**, you will need to **update** these port numbers in the `nginx.conf` file to match your setup.

### Step 3: Build the Nginx Docker Image

Once your applications are running locally, follow these steps to set up the Nginx load balancer:

1. **Open a terminal** in the `LoadBalancer` directory (where the `Dockerfile` and `nginx.conf` are located).
   
2. **Build the Docker image** using the following command:
   ```bash
   docker build -t nginx-load-balancer .
   ```

### Step 4: Run the Nginx Load Balancer

Run the Nginx load balancer container, exposing port 80 (or another if you prefer):
```bash
docker run --name load-balancer -d -p 80:80 nginx-load-balancer
```

This command will:
- Start the container in detached mode (`-d`).
- Map port `80` on your host (your computer) to port `80` inside the Docker container, where Nginx is running.

### Step 5: Access the Load Balancer

Open a browser and visit:
```plain
http://localhost
```

The Nginx load balancer will forward traffic to one of your three applications based on the configuration in the `nginx.conf`.