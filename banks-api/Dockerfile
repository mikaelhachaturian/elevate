# Use an official Python runtime as a base image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy only the necessary files into the container
COPY banksData.py /app/

# Install Flask (assuming Flask is the only dependency)
RUN pip install Flask==2.3.2 Werkzeug==3.0.1 flask-cors==4.0.0

# Expose port 5000
EXPOSE 5000

# Run app.py when the container launches
CMD ["python", "banksData.py"]
