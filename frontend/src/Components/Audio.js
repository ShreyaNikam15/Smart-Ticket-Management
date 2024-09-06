import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Audio = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    museum: false,
    collections: false,
    events: false,
  });
  const [transcript, setTranscript] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [showTranscript, setShowTranscript] = useState(false); // State to manage transcript animation

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
      const response = await axios.post('https://smart-ticket-management.onrender.com/api/chat', { userInput: newMessage });
      const newChat = {
        currQuery: newMessage,
        response: response.data.response,
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

  const handleGenerateTranscript = () => {
    setShowTranscript(true);
    setTranscript('Generated transcript of the audio will be displayed here...');
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFeedbackSubmit = () => {
    console.log('Feedback submitted:', selectedOption, feedbackText);
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
        {['museum', 'collections', 'events'].map((item) => (
          <div style={styles.tagWrapper} key={item}>
            <button style={styles.tagButton} onClick={() => toggleDropdown(item)}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
            {dropdowns[item] && (
              <div style={styles.dropdownContent}>
                {/* Content dynamically rendered for simplicity */}
                {item === 'museum' && (
                  <>
                    <p>Museum History</p>
                    <p>Visitor Guidelines</p>
                    <p>Opening Hours</p>
                  </>
                )}
                {item === 'collections' && (
                  <>
                    <p>Modern Art</p>
                    <p>Historical Artifacts</p>
                    <p>Contemporary Sculptures</p>
                  </>
                )}
                {item === 'events' && (
                  <>
                    <p>Art Workshops</p>
                    <p>Guided Tours</p>
                    <p>Special Exhibits</p>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
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

          {/* Chat History */}
          <div style={styles.chatHistory} ref={chatHistoryRef}>
            {messages.map((message, index) => (
              <div key={index} style={styles.chatMessage}>
                <div style={styles.userMessageContent}>
                  <strong>User:</strong> {message.currQuery}
                </div>
                <div style={styles.aiMessageContent}>
                  <strong>Response:</strong> {message.response}
                </div>
                <span style={styles.timestamp}>
                  {new Date(message.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Audio Player */}
          <div style={styles.audioPlayer}>
            <audio controls>
              <source src="sample-audio.mp3" type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
            <button onClick={handleGenerateTranscript} style={styles.transcriptButton}>
              Generate Transcript
            </button>
            {showTranscript && (
              <p style={{ ...styles.transcriptText, animation: 'fadeIn 1s' }}>{transcript}</p>
            )}
          </div>

          {/* Feedback Section */}
          <div style={styles.feedbackSection}>
            <h3>Feedback</h3>
            {/* MCQ Feedback */}
            <div>
              <h4>Did you find the guide helpful?</h4>
              <label>
                <input type="radio" value="Yes" checked={selectedOption === 'Yes'} onChange={handleOptionChange} />
                Yes
              </label>
              <label>
                <input type="radio" value="No" checked={selectedOption === 'No'} onChange={handleOptionChange} />
                No
              </label>
            </div>

            {/* Descriptive Feedback */}
            <div>
              <textarea
                placeholder="Please provide additional feedback..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                style={styles.textArea}
              ></textarea>
            </div>
            <button onClick={handleFeedbackSubmit} style={styles.submitButton}>
              Submit Feedback
            </button>
          </div>

          {/* Input Form */}
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
    maxWidth: '500px', // Increased for wider view
    margin: '0 auto',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#ffffff',
    fontFamily: '"Playfair Display", serif',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  tagWrapper: {
    position: 'relative',
    margin: '0 10px',
  },
  tagButton: {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    border: 'none',
    padding: '5px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  dropdownContent: {
    position: 'absolute',
    top: '100%',
    left: '0',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    borderRadius: '5px',
    zIndex: 10,
    width: '200px',
  },
  sidebar: {
    width: '250px',
    height: '100%',
    backgroundColor: '#2c3e50',
    position: 'fixed',
    left: 0,
    top: 0,
    padding: '20px',
    color: '#ecf0f1',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ecf0f1',
    fontSize: '30px',
    cursor: 'pointer',
  },
  sidebarHeader: {
    marginBottom: '20px',
  },
  sidebarList: {
    listStyleType: 'none',
    padding: 0,
  },
  sidebarItem: {
    padding: '10px 0',
    cursor: 'pointer',
  },
  chatContentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 20px',
  },
  circularImageContainer: {
    margin: '20px 0',
  },
  circularImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  chatHistory: {
    flex: 1,
    overflowY: 'auto',
    padding: '10px',
    width: '100%',
    marginBottom: '20px',
    backgroundColor: '#f7f9fa',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  chatMessage: {
    marginBottom: '15px',
    padding: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  userMessageContent: {
    marginBottom: '5px',
  },
  aiMessageContent: {
    color: '#2c3e50',
  },
  timestamp: {
    fontSize: '0.8em',
    color: '#999',
  },
  audioPlayer: {
    marginBottom: '20px',
  },
  transcriptButton: {
    marginTop: '10px',
    padding: '5px 15px',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  transcriptText: {
    marginTop: '10px',
    backgroundColor: '#f7f9fa',
    padding: '10px',
    borderRadius: '5px',
  },
  feedbackSection: {
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  textArea: {
    width: '100%',
    height: '60px',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  submitButton: {
    padding: '5px 15px',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    width: '100%',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

// Media queries for responsiveness
const mediaStyles = `
@media (max-width: 768px) {
  .chatContainer {
    max-width: 90%;
  }
  .sidebar {
    width: 200px;
  }
  .chatHistory {
    width: 100%;
  }
  .navbarTitle {
    font-size: 14px;
  }
  .museumLogo {
    width: 25px;
    height: 25px;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;

export default Audio;
