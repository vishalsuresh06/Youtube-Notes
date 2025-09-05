# YouTube Notes Extension

A powerful Chrome extension that allows users to take timestamped notes while watching YouTube videos, with cloud synchronization across multiple devices.

## ✨ Features

- **📝 Rich Note-Taking**: Create and edit notes with a clean, intuitive interface
- **🔗 Video Linking**: Notes are automatically linked to specific YouTube videos
- **⏱️ Timestamp Support**: Jump to specific moments in videos from your notes
- **☁️ Cloud Sync**: Access your notes from any device with real-time synchronization
- **🔐 Secure Login**: Google OAuth authentication for seamless access
- **🎨 Modern UI**: Clean, responsive design that integrates seamlessly with YouTube
- **🔍 Search & Organize**: Find your notes quickly with built-in search functionality
- **📱 Cross-Device**: Works across all your Chrome browsers with automatic syncing

## 🛠️ Tech Stack

- **Framework**: [Plasmo](https://plasmo.com/) - Modern Chrome extension framework
- **Frontend**: React + TypeScript
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Google OAuth)

## 📊 Progress Tracker

### Overall Progress: 56% Complete

| Phase | Status | Progress | Description |
|-------|--------|----------|-------------|
| 🏗️ **Setup & Infrastructure** | ✅ Complete | 100% | Project initialization, tech stack decisions |
| 🔐 **Authentication** | ✅ Complete | 100% | Firebase Auth integration, Google OAuth |
| 📝 **Core Note-Taking** | 📋 In Progress | 75% | Basic CRUD operations for notes |
| 🔗 **YouTube Integration** | 📋 Planned | 0% | Video detection, URL syncing |
| ☁️ **Cloud Synchronization** | 📋 In Progress | 50% | Real-time sync across devices |
| 🎨 **UI/UX Polish** | 📋 In Progress | 66% | Responsive design, user experience |
| 🚀 **Testing & Deployment** | 📋 Planned | 0% | QA, Chrome Web Store submission |

### Feature Completion Status

#### ✅ Completed Features
- [x] Project Initialization
   - [x] Project architecture design
   - [x] Technology stack selection
   - [x] Firebase project setup
   - [x] Initial Plasmo configuration
   - [x] Google OAuth Setup
   - [x] Project documentation
- [x] Firebase Authentication implementation
  - [x] Firebase Auth configuration
  - [x] Google OAuth setup
  - [x] Login/logout UI components
  - [x] Authentication state management

- [x] Basic project structure (40%)
  - [x] Folder organization
  - [x] TypeScript configuration
  - [x] Core component scaffolding
  - [x] State management setup

#### 🔄 In Progress Features

**Phase 1: Core Functionality**
- [x] Sidepanel React application
- [x] Note creation and editing interface
- [ ] YouTube video detection
- [x] Firestore database integration
- [x] Basic note storage and retrieval

**Phase 3: Polish & Optimization**
- [ ] Rich text editor integration
- [ ] Keyboard shortcuts
- [ ] Dark/light theme toggle
- [ ] Export functionality
- [ ] Performance optimizations

#### 📋 Planned Features

**Phase 2: Advanced Features**
- [ ] Timestamp linking to video moments
- [ ] Real-time synchronization
- [ ] Offline support
- [ ] Search functionality
- [ ] Note organization (tags/folders)



**Phase 4: Release Preparation**
- [ ] Comprehensive testing
- [ ] User documentation
- [ ] Chrome Web Store assets
- [ ] Privacy policy and terms
- [ ] Beta testing program

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and pnpm
- Chrome browser for development
- Google account for Firebase setup

### Installation for Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/youtube-notes-extension.git
   cd youtube-notes-extension
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up Firebase**
   - Create a new project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Enable Authentication with Google provider
   - Copy your Firebase config

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your Firebase configuration:
   ```env
   PLASMO_PUBLIC_FIREBASE_API_KEY=your_api_key
   PLASMO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   PLASMO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   PLASMO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   PLASMO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   PLASMO_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Load the extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `build/chrome-mv3-dev` directory

## 📁 Project Structure

```
youtube-notes/
├── src/
│   ├── sidepanel.tsx           # Main sidepanel component
│   ├── background.ts           # Background script entry point
│   ├── components/             # React components
│   │   ├── auth/              # Authentication components
│   │   │   ├── LoginPage.tsx  # Login interface
│   │   │   ├── login.module.css
│   │   │   └── index.ts
│   │   ├── dashboard/         # Dashboard components
│   │   │   ├── Dashboard.tsx  # Main dashboard
│   │   │   ├── GetNotes.tsx   # Notes retrieval component
│   │   │   ├── UserHeader.tsx # User profile header
│   │   │   ├── dashboard.module.css
│   │   │   └── index.ts
│   │   ├── note/             # Note-related components
│   │   │   ├── ExistingNote.tsx # Edit existing notes
│   │   │   ├── NewNote.tsx    # Create new notes
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── firebase/             # Firebase integration
│   │   ├── index.ts          # Firebase configuration
│   │   ├── hook.ts           # Firebase hooks
│   │   └── use-firestore-doc.ts # Firestore document hook
│   ├── hooks/                # Custom React hooks
│   │   └── useDebounce.ts    # Debounce utility hook
│   ├── types/                # TypeScript type definitions
│   │   ├── index.ts          # Main type exports
│   │   ├── Note.ts           # Note type definitions
│   │   └── svg.d.ts          # SVG module declarations
│   ├── utils/                # Utility functions
│   │   ├── delete-note.ts    # Note deletion utility
│   │   ├── get-notes.ts      # Notes retrieval utility
│   │   ├── save-note.ts      # Note saving utility
│   │   └── index.ts
│   └── global.module.css     # Global styles
├── assets/                   # Static assets
│   ├── delete.svg           # Delete icon
│   ├── edit.svg             # Edit icon
│   └── icon.png             # Extension icon
├── build/                   # Build output
│   ├── chrome-mv3-dev/      # Development build
│   └── chrome-mv3-prod/     # Production build
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md               # Project documentation
```

## 🎯 Usage

1. **Installation**: Install the extension from the Chrome Web Store (coming soon) or load it manually in developer mode

2. **Authentication**: Click the extension icon and sign in with your Google account

3. **Taking Notes**: 
   - Navigate to any YouTube video
   - Open the extension sidepanel
   - Start taking notes - they'll be automatically linked to the current video
   - Click on timestamps in your notes to jump to specific moments

4. **Accessing Notes**: Your notes are automatically synced across all devices where you're signed in

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run package` - Create extension package for Chrome Web Store

### Firebase Setup

1. **Firestore Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /notes/{noteId} {
         allow read, write: if request.auth != null 
           && request.auth.uid == resource.data.userId;
       }
       
       match /users/{userId} {
         allow read, write: if request.auth != null 
           && request.auth.uid == userId;
       }
     }
   }
   ```

2. **Authentication Configuration**
   - Enable Google Sign-in in Firebase Auth
   - Add your extension ID to authorized domains
   - Configure OAuth consent screen

### Chrome Extension Permissions

The extension requires these permissions:
- `sidePanel` - To display the notes interface
- `activeTab` - To interact with YouTube pages
- `storage` - To cache user preferences locally

## 🐛 Troubleshooting

### Common Issues

**Extension not loading**
- Ensure you're using Chrome 114+ (required for sidePanel API)
- Check that developer mode is enabled
- Refresh the extension after making changes

**Authentication failing**
- Verify Firebase configuration is correct
- Check that the OAuth consent screen is properly configured
- Ensure your domain is added to Firebase authorized domains

**Notes not syncing**
- Check your internet connection
- Verify Firestore security rules are correctly configured
- Check browser console for any error messages

## 🗺️ Long-term Roadmap

- [ ] **v1.0**: Core functionality (notes, sync, timestamps)
- [ ] **v1.1**: Advanced search and filtering
- [ ] **v1.2**: Note sharing and collaboration
- [ ] **v1.3**: Export options (PDF, Markdown)
- [ ] **v1.4**: Integration with note-taking apps
- [ ] **v2.0**: Mobile companion app

---

**Made with ❤️ for the YouTube community**