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
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Build Tool**: Plasmo's built-in bundler

## 📊 Progress Tracker

### Overall Progress: 15% Complete

| Phase | Status | Progress | Description |
|-------|--------|----------|-------------|
| 🏗️ **Setup & Infrastructure** | ✅ Complete | 100% | Project initialization, tech stack decisions |
| 🔐 **Authentication** | 🔄 In Progress | 60% | Firebase Auth integration, Google OAuth |
| 📝 **Core Note-Taking** | 📋 Planned | 0% | Basic CRUD operations for notes |
| 🔗 **YouTube Integration** | 📋 Planned | 0% | Video detection, URL syncing |
| ☁️ **Cloud Synchronization** | 📋 Planned | 0% | Real-time sync across devices |
| 🎨 **UI/UX Polish** | 📋 Planned | 0% | Responsive design, user experience |
| 🚀 **Testing & Deployment** | 📋 Planned | 0% | QA, Chrome Web Store submission |

### Feature Completion Status

#### ✅ Completed Features
- [x] Project architecture design
- [x] Technology stack selection
- [x] Firebase project setup
- [x] Initial Plasmo configuration
- [x] Project documentation

#### 🔄 In Progress Features
- [ ] Firebase Authentication implementation (60%)
  - [x] Firebase Auth configuration
  - [x] Google OAuth setup
  - [ ] Login/logout UI components
  - [ ] Authentication state management
- [ ] Basic project structure (40%)
  - [x] Folder organization
  - [x] TypeScript configuration
  - [ ] Core component scaffolding
  - [ ] State management setup

#### 📋 Planned Features

**Phase 1: Core Functionality**
- [ ] Sidepanel React application
- [ ] Note creation and editing interface
- [ ] YouTube video detection
- [ ] Firestore database integration
- [ ] Basic note storage and retrieval

**Phase 2: Advanced Features**
- [ ] Timestamp linking to video moments
- [ ] Real-time synchronization
- [ ] Offline support
- [ ] Search functionality
- [ ] Note organization (tags/folders)

**Phase 3: Polish & Optimization**
- [ ] Rich text editor integration
- [ ] Keyboard shortcuts
- [ ] Dark/light theme toggle
- [ ] Export functionality
- [ ] Performance optimizations

**Phase 4: Release Preparation**
- [ ] Comprehensive testing
- [ ] User documentation
- [ ] Chrome Web Store assets
- [ ] Privacy policy and terms
- [ ] Beta testing program

### Development Milestones

#### 🎯 Milestone 1: MVP (Target: 2 weeks)
- [ ] Basic authentication working
- [ ] Simple note-taking interface
- [ ] YouTube video detection
- [ ] Notes saved to Firestore

#### 🎯 Milestone 2: Beta Release (Target: 4 weeks)
- [ ] Full feature set implemented
- [ ] Cross-device synchronization
- [ ] Polished user interface
- [ ] Basic testing completed

#### 🎯 Milestone 3: Public Release (Target: 6 weeks)
- [ ] Chrome Web Store submission
- [ ] Comprehensive documentation
- [ ] User support system
- [ ] Analytics implementation

### Next Steps (Current Sprint)
1. **Complete Firebase Authentication** - Finish login/logout functionality
2. **Create Basic Sidepanel** - Implement core React components
3. **YouTube Content Script** - Detect video changes and extract metadata
4. **Database Schema** - Finalize Firestore data structure
5. **State Management** - Set up Zustand stores for auth and notes

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
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
   npm install
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
src/
├── sidepanel/              # Sidepanel React application
│   ├── index.tsx          # Main sidepanel component
│   ├── components/        # UI components
│   └── hooks/             # Custom React hooks
├── background/            # Service worker scripts
│   └── index.ts          # Background script entry point
├── content/              # Content scripts for YouTube integration
│   └── youtube.ts        # YouTube page integration
├── components/           # Shared UI components
│   ├── ui/              # shadcn/ui components
│   └── common/          # Custom shared components
├── lib/                 # Utilities and configurations
│   ├── firebase.ts      # Firebase configuration
│   ├── utils.ts         # Helper functions
│   └── types.ts         # TypeScript type definitions
├── stores/              # Zustand state management
│   ├── auth.ts          # Authentication state
│   └── notes.ts         # Notes state management
└── assets/              # Static assets
    ├── icon.png         # Extension icon
    └── styles/          # Global styles
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

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Plasmo](https://plasmo.com/) for the excellent Chrome extension framework
- [Firebase](https://firebase.google.com/) for backend services
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Lucide](https://lucide.dev/) for icons

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/youtube-notes-extension/issues) page
2. Create a new issue with detailed information
3. Join our [Discord community](https://discord.gg/your-invite-link) for discussions

## 🗺️ Long-term Roadmap

- [ ] **v1.0**: Core functionality (notes, sync, timestamps)
- [ ] **v1.1**: Advanced search and filtering
- [ ] **v1.2**: Note sharing and collaboration
- [ ] **v1.3**: Export options (PDF, Markdown)
- [ ] **v1.4**: Integration with note-taking apps
- [ ] **v2.0**: Mobile companion app

---

**Made with ❤️ for the YouTube community**