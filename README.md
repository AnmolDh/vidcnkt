# VidCnkt

VidCnkt is an open-source video conferencing web application built using React, Node.js, Express, Socket.io, and WebRTC. It allows users to conduct real-time video and audio calls, chat, share screens, and exchange files securely.

**This project is still in active development and is not yet suitable for production environments.**

## Features

- **Video Conferencing:** Connect with others via video and audio.
- **Multi-Participant Calls:** Have calls with multiple participants simultaneously.
- **Secure:** End-to-end encryption for all communications.
- **Responsive:** Works on desktop and mobile browsers.

## Installation

To run VidCnkt locally, follow these steps:

### Server

1. Clone the repository:
   ```bash
   git clone https://github.com/AnmolDh/vidcnkt.git
   cd vidcnkt
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

### Client

1. Open a new terminal window/tab.

2. Navigate to the cloned repository:
   ```bash
   cd vidcnkt
   ```

3. Install client dependencies:
   ```bash
   cd client
   npm install
   ```

4. Start the client:
   ```bash
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

- Enter your name and click "Start" to join a call.
- Share your room link with others to invite them to the call.
- Use the leave button to leave the call.

## Roadmap

The following features are planned for future releases:

- User authentication and room management.
- Improved UI/UX design.
- Recording and playback of calls.
- Integration with cloud storage for file sharing.
- Support for virtual backgrounds.
- Mobile app versions for Android and iOS.


## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## Acknowledgements

- [React](https://react.dev/)
- [Socket.io](https://socket.io/)
- [WebRTC](https://webrtc.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
