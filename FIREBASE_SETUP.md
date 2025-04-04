# Firebase Setup Guide

This guide will help you set up Firebase in your Satta King Central Hub application.

## Prerequisites

1. A Firebase account
2. Node.js and npm installed
3. Firebase project created in the Firebase Console

## Setup Steps

### 1. Install Firebase

The Firebase SDK is already included in the project's dependencies. Install it by running:

```bash
npm install
```

### 2. Firebase Configuration

1. Go to your Firebase Console (https://console.firebase.google.com/)
2. Select your project
3. Click on the gear icon (⚙️) next to "Project Overview" and select "Project settings"
4. Scroll down to the "Your apps" section
5. Click on the web icon (</>)
6. Register your app with a nickname
7. Copy the Firebase configuration object

### 3. Environment Variables

1. Create a new file named `.env` in the root directory
2. Copy the contents from `.env.example`
3. Replace the placeholder values with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

### 4. Firebase Authentication Setup

1. In the Firebase Console, go to Authentication
2. Click "Get Started"
3. Enable Email/Password authentication
4. Add your first admin user:
   - Click "Add User"
   - Enter email and password
   - Save the credentials for admin access

### 5. Firestore Database Setup

1. In the Firebase Console, go to Firestore Database
2. Click "Create Database"
3. Start in production mode
4. Choose a location closest to your users
5. Set up the following collections:
   - `games`: For storing game information
   - `results`: For storing game results

### 6. Security Rules

In the Firestore Database section, go to the Rules tab and set up basic security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to games and results
    match /games/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /results/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Verification

To verify your setup:

1. Start the development server:
```bash
npm run dev
```

2. Try logging in with your admin credentials
3. Attempt to add a new game result
4. Verify that the result appears in real-time

## Troubleshooting

If you encounter issues:

1. Check that all environment variables are correctly set
2. Verify that Firebase configuration matches your project
3. Ensure you're logged in with admin credentials for write operations
4. Check the browser console for any Firebase-related errors

For more help, refer to the [Firebase Documentation](https://firebase.google.com/docs).