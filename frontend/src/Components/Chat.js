import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    museum: false,
    collections: false,
    events: false,
  });

  const chatHistoryRef = useRef(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // Updated the API URL and request body
      const response = await axios.post('https://automated-museum-ticketing-system.onrender.com/api/chat', {
        prompt: newMessage,
        language: 'en',
      });

      const newChat = {
        currQuery: newMessage,
        response: response.data.response,
        stage: response.data.stage,  // Save the stage if needed
        stageResponse: response.data.stage_response,  // Save the stage response if needed
        createdAt: new Date(),
      };

      setMessages([...messages, newChat]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const toggleDropdown = (dropdownName) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.navbar}>
        <button onClick={toggleSidebar} style={styles.menuButton}>☰</button>
        <div style={styles.navbarTitle}>Museum Guide</div>
        <div style={styles.museumLogo}>M</div>
      </div>

      {/* Tags with Dropdowns */}
      <div style={styles.tags}>
        <div style={styles.tagWrapper}>
          <button style={styles.tagButton} onClick={() => toggleDropdown('museum')}>Museum</button>
          {dropdowns.museum && (
            <div style={styles.dropdownContent}>
              <p>Museum History</p>
              <p>Visitor Guidelines</p>
              <p>Opening Hours</p>
            </div>
          )}
        </div>

        <div style={styles.tagWrapper}>
          <button style={styles.tagButton} onClick={() => toggleDropdown('collections')}>Collections</button>
          {dropdowns.collections && (
            <div style={styles.dropdownContent}>
              <p>Modern Art</p>
              <p>Historical Artifacts</p>
              <p>Contemporary Sculptures</p>
            </div>
          )}
        </div>

        <div style={styles.tagWrapper}>
          <button style={styles.tagButton} onClick={() => toggleDropdown('events')}>Events</button>
          {dropdowns.events && (
            <div style={styles.dropdownContent}>
              <p>Art Workshops</p>
              <p>Guided Tours</p>
              <p>Special Exhibits</p>
            </div>
          )}
        </div>
      </div>

      <div style={styles.contentWrapper}>
        {isSidebarVisible && (
          <div style={styles.sidebar}>
            <button onClick={toggleSidebar} style={styles.closeButton}>×</button>
            <h3 style={styles.sidebarHeader}>Explore</h3>
            <ul style={styles.sidebarList}>
              <li style={styles.sidebarItem}>Exhibits</li>
              <li style={styles.sidebarItem}>Collections</li>
              <li style={styles.sidebarItem}>Events</li>
              <li style={styles.sidebarItem}>Visitor Info</li>
              <li style={styles.sidebarItem}>About</li>
            </ul>
          </div>
        )}

        <div style={styles.chatContentContainer}>
          <div style={styles.circularImageContainer}>
            <div style={styles.circularImage}>
              <img src="aigirl.jpg" alt="Assistant" style={styles.image} />
            </div>
          </div>

          <div style={styles.chatHistory} ref={chatHistoryRef}>
            {messages.map((message, index) => (
              <div key={index} style={styles.chatMessage}>
                <div style={styles.userMessageContent}>
                  <strong>User:</strong> {message.currQuery}
                </div>
                <div style={styles.aiMessageContent}>
                  <strong>Response:</strong> {message.response}
                  {message.stage && <p><strong>Stage Response:</strong> {message.stageResponse}</p>}
                </div>
                <span style={styles.timestamp}>
                  {new Date(message.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} style={styles.form}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '500px',
    margin: '0 auto',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: '"Playfair Display", serif',
    ...(window.innerWidth <= 768 && {
      maxWidth: '100%',
      height: '90vh',
      margin: '0',
    }),
  },
  navbar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '10px 20px',
    height: '60px',
  },
  menuButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ecf0f1',
    fontSize: '20px',
    cursor: 'pointer',
  },
  navbarTitle: {
    flexGrow: 1,
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  museumLogo: {
    width: '30px',
    height: '30px',
    backgroundColor: '#ecf0f1',
    color: '#2c3e50',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  tags: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0',
    backgroundColor: '#ecf0f1',
  },
  tagWrapper: {
    position: 'relative',
    margin: '0 10px',
  },
  tagButton: {
    backgroundColor: '#2c3e50',
    border: 'none',
    color: '#ecf0f1',
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  dropdownContent: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '10px',
    zIndex: 1,
    minWidth: '150px',
  },
  contentWrapper: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    ...(window.innerWidth <= 768 && {
      flexDirection: 'column',
      padding: '0',
    }),
  },
  sidebar: {
    width: '200px',
    backgroundColor: '#34495e',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    color: '#ecf0f1',
    padding: '20px',
    overflowY: 'auto',
    height: 'calc(100vh - 60px)', // Subtracting navbar height
    ...(window.innerWidth <= 768 && {
      display: 'none', // Hide sidebar on mobile
    }),
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ecf0f1',
    fontSize: '24px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  sidebarHeader: {
    color: '#ecf0f1',
    fontSize: '20px',
    marginBottom: '15px',
    borderBottom: '1px solid #ecf0f1',
    paddingBottom: '10px',
  },
  sidebarList: {
    listStyle: 'none',
    padding: '0',
  },
  sidebarItem: {
    padding: '10px 0',
    cursor: 'pointer',
  },
  chatContentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    margin: '10px',
    ...(window.innerWidth <= 768 && {
      margin: '0',
    }),
  },
  circularImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0',
    backgroundColor: '#ecf0f1',
  },
  circularImage: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid #2c3e50',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  chatHistory: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
  },
  chatMessage: {
    marginBottom: '15px',
  },
  userMessageContent: {
    maxWidth: '75%',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgb(255 249 199)',
    wordBreak: 'break-word',
    marginBottom: '5px',
  },
  aiMessageContent: {
    maxWidth: '75%',
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: '#f1f0f0',
    wordBreak: 'break-word',
    marginBottom: '5px',
  },
  timestamp: {
    fontSize: '12px',
    color: '#888',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderTop: '1px solid #ddd',
  },
  input: {
    flex: 1,
    padding: '10px',
    marginRight: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: 'rgb(236 126 5)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default Chat;