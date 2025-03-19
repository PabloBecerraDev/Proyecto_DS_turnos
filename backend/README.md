# Backend Component

## Summary

The backend component is responsible for handling business logic, data processing, and providing an interface between the database and frontend components. 

## Steps run the backend without Docker (development mode)

Guide for running the backend without Docker, including explanations and step in [Installation Guide](./INSTALLATION.md)

## Steps run the backend with Docker

### 1. Build docker image

From within the backend directory, build the Docker image for the backend application:

```bash
docker build -t yonie/container_backend .

```

### 2. Run backend within Docker container

To start a container from the backend image, use:

```bash
docker run --name container_backend -p 0.0.0.0:8000:8000 yonie/container_backend
```

## FAQ

In [Frequently Asked Questions](./FAQ.md) find quick answers to some of the most common questions