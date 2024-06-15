#!/bin/bash

# Navigate to the backend directory and start the server
cd backend
npm start &

# Navigate back to the project root and then to the frontend directory
cd ..
cd frontend
npm start