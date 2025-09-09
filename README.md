# YouTube Notes Extension

A powerful Chrome extension that allows users to take timestamped notes while watching YouTube videos, with cloud synchronization across multiple devices.

## ✨ Features

- **📝 Rich Note-Taking**: Create and edit notes with TipTap rich text editor featuring formatting, lists, and more
- **⌨️ Keyboard Shortcuts**: Efficient note-taking with customizable keyboard shortcuts
- **🔗 Video Linking**: Notes are automatically linked to specific YouTube videos
- **⏱️ Timestamp Support**: Jump to specific moments in videos from your notes
- **☁️ Cloud Sync**: Access your notes from any device with real-time synchronization via Firestore
- **🔐 Secure Login**: Google OAuth authentication for seamless access
- **🎨 Modern UI**: Clean, responsive design with organized component architecture
- **🔍 Search & Organize**: Find your notes quickly with built-in search functionality
- **📱 Cross-Device**: Works across all your Chrome browsers with automatic syncing
- **🏗️ Clean Architecture**: Well-organized codebase with modular imports and component structure

## 🛠️ Tech Stack

- **Framework**: [Plasmo](https://plasmo.com/) - Modern Chrome extension framework
- **Frontend**: React + TypeScript
- **Editor**: [TipTap](https://tiptap.dev/) - Rich text editor with extensible architecture
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Google OAuth)
- **Styling**: CSS Modules with component-specific organization

## 📊 Progress Tracker

### Overall Progress: 85% Complete

| Phase | Status | Progress | Description |
|-------|--------|----------|-------------|
| 🏗️ **Setup & Infrastructure** | ✅ Complete | 100% | Project initialization, clean architecture |
| 🔐 **Authentication** | ✅ Complete | 100% | Firebase Auth integration, Google OAuth |
| 📝 **Core Note-Taking** | ✅ Complete | 100% | TipTap rich text editor, CRUD operations |
| 🔗 **YouTube Integration** | 🔄 In Progress | 70% | Video detection, URL syncing, warnings |
| ☁️ **Cloud Synchronization** | ✅ Complete | 100% | Real-time sync across devices via Firestore |
| 🎨 **UI/UX Polish** | ✅ Complete | 95% | Clean component architecture, modular styles |
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
- [x] Rich text editor integration (TipTap)
- [x] Keyboard shortcuts
- [ ] Dark/light theme toggle
- [ ] Export functionality
- [x] Performance optimizations
- [x] Component architecture cleanup
- [x] Import/export pattern optimization

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
│   │   │   └── index.ts       # Clean exports
│   │   ├── dashboard/         # Dashboard components
│   │   │   ├── Dashboard.tsx  # Main dashboard
│   │   │   ├── GetNotes.tsx   # Notes retrieval component
│   │   │   ├── UserHeader.tsx # User profile header
│   │   │   └── index.ts       # Clean exports
│   │   ├── note/             # Note-related components
│   │   │   ├── ExistingNote.tsx # Edit existing notes
│   │   │   ├── NewNote.tsx    # Create new notes
│   │   │   ├── NoteEditor.tsx  # Rich text editor with TipTap
│   │   │   ├── info-popup/    # Info popup subcomponent
│   │   │   │   ├── InfoPopup.tsx
│   │   │   │   └── index.ts
│   │   │   ├── yt-warning-popup/ # YouTube warning subcomponent
│   │   │   │   ├── YTWarningPopup.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts       # Clean exports
│   │   └── index.ts           # Main component exports
│   ├── assets/               # Organized assets
│   │   └── icons/            # Icon management
│   │       └── index.ts      # Centralized icon exports
│   ├── styles/               # Organized CSS modules
│   │   ├── auth/             # Authentication styles
│   │   │   ├── login.module.css
│   │   │   └── index.ts
│   │   ├── dashboard/        # Dashboard styles
│   │   │   ├── dashboard.module.css
│   │   │   └── index.ts
│   │   ├── note/             # Note component styles
│   │   │   ├── note.module.css
│   │   │   ├── info.module.css
│   │   │   ├── yt-warning.module.css
│   │   │   └── index.ts
│   │   ├── global/           # Global styles
│   │   │   ├── global.module.css
│   │   │   └── index.ts
│   │   └── index.ts          # Main styles export
│   ├── firebase/             # Firebase integration
│   │   ├── index.ts          # Firebase configuration
│   │   └── hook.ts           # Firebase hooks
│   ├── hooks/                # Custom React hooks
│   │   ├── useDebounce.ts    # Debounce utility hook
│   │   ├── useFirestoreCollection.ts
│   │   ├── useFirestoreDoc.ts
│   │   ├── useKeyboardShortcuts.ts
│   │   ├── useNoteEditor.ts  # TipTap editor hook
│   │   └── index.ts          # Clean exports
│   ├── types/                # TypeScript type definitions
│   │   ├── index.ts          # Main type exports
│   │   ├── Note.ts           # Note type definitions
│   │   └── svg.d.ts          # SVG module declarations
│   ├── utils/                # Utility functions
│   │   ├── get-current-tab-url.ts
│   │   ├── noteHelpers.ts    # Note-related utilities
│   │   ├── youtube_context/  # YouTube integration utilities
│   │   │   └── check_youtube_url.ts
│   │   └── index.ts          # Clean exports
│   └── types/                # TypeScript definitions
├── assets/                   # Static assets (root level)
│   ├── youtube.svg           # YouTube icon
│   ├── brain.svg             # AI icon
│   ├── plus.svg              # Add icon
│   ├── info.svg              # Info icon
│   ├── back.svg              # Back icon
│   ├── delete.svg            # Delete icon
│   ├── edit.svg              # Edit icon
│   └── icon.png              # Extension icon
├── build/                    # Build output
│   ├── chrome-mv3-dev/       # Development build
│   └── chrome-mv3-prod/      # Production build
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
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

### Code Organization & Import Patterns

This project follows a clean architecture with organized imports and exports:

#### ✨ Clean Import Patterns
```typescript
// ✅ Clean imports using index.ts files
import { useNoteEditor, useKeyboardShortcuts } from '../../hooks'
import { getStatusMessage, openYoutubeLink } from '../../utils'
import { LoginPage, Dashboard } from './components'
import { YoutubeIcon, AIIcon, AddIcon } from '../../assets/icons'

// ❌ Avoid deep imports
import { useNoteEditor } from '../../hooks/useNoteEditor'
import { getStatusMessage } from '../../utils/noteHelpers'
```

#### 📁 Directory Structure Benefits
- **Modular Organization**: Each directory has its own `index.ts` for clean exports
- **Component Colocation**: Related components are grouped together
- **Style Organization**: CSS modules are organized by component hierarchy
- **Asset Management**: Centralized icon and asset management
- **Type Safety**: Centralized TypeScript definitions

#### 🎯 Development Best Practices
- **Import from index files**: Always import from directory index files when possible
- **Component composition**: Break complex components into smaller, reusable pieces
- **Style encapsulation**: Use CSS modules for component-specific styling
- **Hook extraction**: Extract reusable logic into custom hooks
- **Type definitions**: Maintain centralized type definitions in `/types`

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