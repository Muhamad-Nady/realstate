# backend/Dockerfile
FROM python:3.11

# Set the working directory
WORKDIR /app

# Install necessary system packages
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y xsel && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements.txt first for better layer caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# RUN if [ ! -d "/app/realState" ]; then django-admin startproject realState .; fi

# Copy the existing project files into the container
COPY . .

# Expose the port the app runs on (changed to 8001)
EXPOSE 8001

# Command to run the Django server on the new port
CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]

