# My_OS - Complete Web Desktop Operating System

[![Node.js](https://img.shields.io/badge/Node.js-18.0%2B-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)](https://github.com)

A complete web-based operating system with user authentication, desktop environment, and multiple applications built with Node.js, Express, and vanilla JavaScript.

![My_OS Desktop](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

## 🌟 Features

### 🔐 Authentication System
- **User Registration** with form validation
- **Password Strength Checking** (weak/medium/strong indicator)
- **JWT-based Authentication** with secure token management
- **Session Persistence** - stay logged in across browser sessions
- **Unified Login/Register Page** with smooth toggle animation

### 🖥️ Desktop Environment
- **Full Desktop Interface** with taskbar, start menu, and system tray
- **Window Management** - draggable, resizable, minimizable windows
- **Multi-tasking** - run multiple applications simultaneously
- **System Status Monitoring** - battery, WiFi, temperature, volume
- **Beautiful UI** with glassmorphism design and smooth animations

### 📱 Applications (9+ Apps)

#### Core Applications
- **🌐 Chrome Browser** - Web browsing with iframe support
- **🔢 Calculator** - Full scientific calculator with operations
- **📷 Camera** - Live camera feed with photo capture
- **🎮 Games** - Snake and Dino games with keyboard controls
- **📁 File Manager** - Browse and manage files
- **💻 Terminal** - Linux-like command interface
- **📱 Screen Share** - Desktop screen capture and recording
- **⚙️ Settings** - System configuration and preferences

#### Additional Applications
- **📝 Notepad** - Text editor with save/load functionality
- **🎨 Paint** - Drawing application with brush tools
- **🎵 Music Player** - Audio player with playlist management
- **📷 Photos Gallery** - Image viewer and photo management

### 🛠️ Technical Features
- **WebSocket Support** for real-time communication
- **File Upload/Download** capabilities
- **Screen Recording** and screenshot capture
- **Camera Integration** with photo capture
- **WiFi Network Simulation** with connection management
- **Battery Status** monitoring (real API when available)
- **Volume Controls** with visual feedback
- **Cross-platform Compatibility**

## 🚀 Quick Start

### Prerequisites
- **Node.js 18.0+** ([Download here](https://nodejs.org/))
- **Modern Web Browser** (Chrome, Edge, Firefox, Safari)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/MyOS-Complete.git
   cd MyOS-Complete
   ```

2. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Start the server:**
   
   **Option A: Using batch file (Windows)**
   ```bash
   # Double-click start-server.bat or run:
   ./start-server.bat
   ```
   
   **Option B: Manual start**
   ```bash
   cd server
   node server.js
   ```

4. **Access your OS:**
   ```
   Open browser and go to: http://localhost:2999
   ```

## 📂 Project Structure

```
MyOS-Complete/
├── server/
│   ├── server.js              # Main Express server
│   ├── package.json           # Node.js dependencies
│   ├── index.html            # Unified login/register page
│   ├── client/
│   │   └── public/
│   │       └── desktop.html  # Main desktop environment
│   ├── users.json            # User database (auto-created)
│   ├── user_files/           # User file storage (auto-created)
│   └── start-my-os.bat       # Chrome launcher with permissions
├── start-server.bat          # Server startup script
├── README.md                 # This file
├── DEMO_GUIDE.md            # Complete testing guide
└── .gitignore               # Git ignore file
```

## 🎮 Usage Guide

### First Time Setup
1. **Start the server** using one of the methods above
2. **Navigate to** http://localhost:2999
3. **Register a new account:**
   - Click "Register" tab
   - Username: 3-20 characters (letters, numbers, underscore)
   - Password: 6+ characters (strength indicator helps)
   - Confirm password
4. **Login** with your credentials
5. **Explore the desktop** - click any icon to open applications

### Desktop Navigation
- **Start Menu:** Click "🏠 Start" button for application launcher
- **System Tray:** Click icons (📶🔋🔊🌡️) for system controls
- **Window Management:** Drag windows by header, use window controls
- **Multi-tasking:** Open multiple applications simultaneously

### Application Features

#### 🌐 Browser
- Navigate to any website using the address bar
- "🚀 Real Chrome" button launches Chrome with full permissions
- Search functionality with fallback for blocked sites

#### 🔢 Calculator
- Full calculator with basic and advanced operations
- Supports +, -, ×, ÷, %, ± operations
- Clear function and continuous calculations

#### 📷 Camera
- Live camera feed (requires camera permission)
- Take photos with instant preview
- Photo gallery with click-to-enlarge

#### 🎮 Games
- **Snake Game:** Arrow keys for movement, collect red food
- **Dino Game:** SPACEBAR to jump over obstacles
- Score tracking and game over detection

#### 💻 Terminal
- Linux-like command interface
- Commands: `help`, `ls`, `cd`, `pwd`, `date`, `whoami`, `echo`, `clear`
- File system navigation simulation

#### 📱 Screen Share
- Desktop screen capture and sharing
- Screen recording with download
- QR code generation for mobile connections
- WebRTC connection simulation

#### 📝 Notepad
- Full text editor with character counting
- Save documents as text files
- Load text files from computer
- Real-time character count

#### 🎨 Paint
- Canvas-based drawing application
- Adjustable brush size and color picker
- Save paintings as PNG files
- Mouse-based drawing interface

#### 🎵 Music Player
- Playlist management with 4 sample tracks
- Play/pause controls with visual feedback
- Previous/Next song navigation
- Progress bar simulation

#### 📷 Photos
- Upload photos from computer
- Grid and list view modes
- Full-screen photo viewer
- Sample photos included

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the server directory:
```env
PORT=2999
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### Server Configuration
- **Default Port:** 2999
- **JWT Secret:** Auto-generated (change in production)
- **User Database:** JSON file storage (users.json)
- **File Storage:** Local filesystem (user_files/)

## 🚀 Deployment

### Local Development
```bash
cd server
npm install
npm start
```

### Production Deployment
1. **Set environment variables:**
   ```env
   NODE_ENV=production
   PORT=3000
   JWT_SECRET=your-secure-secret-key
   ```

2. **Use process manager:**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "myos"
   ```

3. **Setup reverse proxy** (nginx example):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:2999;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🧪 Testing

### Manual Testing
1. **Authentication Flow:**
   - Test registration with various inputs
   - Test login with correct/incorrect credentials
   - Test session persistence and logout

2. **Desktop Applications:**
   - Open each application and test functionality
   - Test window management (drag, resize, close)
   - Test multi-tasking capabilities

3. **System Features:**
   - Test system tray controls
   - Test start menu navigation
   - Test settings and preferences

### API Testing
```bash
# Test registration
curl -X POST http://localhost:2999/api/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass123"}'

# Test login
curl -X POST http://localhost:2999/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass123"}'
```

## 🔒 Security Features

- **Password Hashing:** bcrypt with salt rounds
- **JWT Tokens:** Secure authentication with expiration
- **Input Validation:** Client and server-side validation
- **XSS Protection:** Sanitized inputs and outputs
- **CORS Support:** Configurable cross-origin requests

## 🌐 Browser Compatibility

| Browser | Support Level | Notes |
|---------|---------------|--------|
| Chrome | ✅ Full | Recommended browser |
| Edge | ✅ Full | All features work |
| Firefox | ⚠️ Partial | Limited WebRTC support |
| Safari | ⚠️ Partial | Some media APIs limited |

## 📊 Performance

- **Lightweight:** ~2MB total codebase
- **Fast Loading:** < 3 seconds on modern browsers
- **Responsive:** Optimized for desktop and mobile
- **Memory Efficient:** < 50MB RAM usage
- **Real-time:** WebSocket for instant communication

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit changes:** `git commit -m 'Add amazing feature'`
4. **Push to branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and patterns
- Add comments for complex functionality
- Test all features before submitting
- Update documentation for new features

## 🐛 Known Issues

- **Camera Access:** Requires HTTPS in production environments
- **File System:** Limited to browser storage capabilities
- **Screen Sharing:** Requires secure context (localhost/HTTPS)
- **iframe Restrictions:** Some websites block iframe embedding

## 🔄 Version History

### v1.0.0 (Current)
- ✅ Complete authentication system
- ✅ Desktop environment with 9+ applications
- ✅ Window management and multi-tasking
- ✅ System status monitoring
- ✅ File management capabilities
- ✅ Games and entertainment apps
- ✅ Creative tools (Paint, Notepad)
- ✅ Media applications (Camera, Photos, Music)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Acknowledgments

- **Original Concept:** Shashank Shekhar
- **Development:** Complete rewrite with modern authentication
- **UI/UX:** Glassmorphism design with smooth animations
- **Icons:** Emoji-based iconography for cross-platform compatibility

## 📞 Support

- **Issues:** Create an issue on GitHub
- **Questions:** Check the DEMO_GUIDE.md for detailed testing
- **Feature Requests:** Submit via GitHub issues

## 🌟 Star the Repository

If you find this project useful, please consider giving it a star ⭐ on GitHub!

---

**Made By Shashank Shekhar**

*Experience the future of web-based operating systems!*
