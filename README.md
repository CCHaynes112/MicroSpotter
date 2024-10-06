# Microspotter

Microspotter is an app that allows users to upload and store photos of the microbes and microorganisms they have discovered.

## Prerequisites

To run this app, you will need:

- Node.js (v14 or above)
- npm (v6 or above)
- Firebase CLI
- Firebase project credentials

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/CCHaynes112/MicroSpotter.git
cd microspotter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Configuration

Create a `.env` file at the root of your project and add your Firebase configuration variables:

```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 4. Firebase Setup

Ensure you have Firebase CLI installed:

```bash
npm install -g firebase-tools
```

Login to Firebase and initialize your project:

```bash
firebase login
firebase init
```

### 5. Running the App Locally

To start the app for local development:

```bash
npm run dev
```

### 6. Running Firebase Emulators Locally

To run Firebase emulators for testing the app with Firebase services:

```bash
firebase emulators:start
```

### 7. Deploying the App

To deploy the app to Firebase Hosting:

```bash
firebase deploy
```

## Technologies Used

- **Frontend**: React, Vite
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Deployment**: Firebase Hosting
- **Development Tools**: Firebase Emulator, Vite
