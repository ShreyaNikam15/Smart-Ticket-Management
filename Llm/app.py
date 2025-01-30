import os
import json
from flask import Flask, request, jsonify, session, render_template
from groq import Groq
from flask_session import Session

app = Flask(__name__)

# Configuration for session management
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

# Load API key from config.json
working_dir = os.path.dirname(os.path.abspath(__file__))
config_data = json.load(open(f"{working_dir}/config.json"))

GROQ_API_KEY = config_data["GROQ_API_KEY"]
os.environ["GROQ_API_KEY"] = GROQ_API_KEY

client = Groq()

# Predefined FAQs for suggestions
FAQS = [
    "What are the museum's opening hours?",
    "Are there any tickets available for this weekend?",
    "What is the price of a family ticket?",
    "Can I book a guided tour?"
]

# Define stages and questions for the booking process
STAGES = [
    "Welcome to the museum booking system! What date would you like to visit?",
    "Great! What time would you like to book?",
    "How many tickets do you need?",
    "Thank you for providing the details. You have booked {tickets} tickets for {time}. Is everything correct?",
    "Please proceed to payment. You can complete the payment using the link below."
]

@app.route('/')
def index():
    # Clear the session to start fresh
    session.clear()
    session["chat_history"] = []
    session["booking_stage"] = 0  # Start at the greeting stage
    return render_template('index.html', chat_history=session["chat_history"], faqs=FAQS)

@app.route('/ask', methods=['POST'])
def ask_llama():
    user_prompt = request.json.get('prompt')
    language = request.json.get('language', 'en')  # Default to English if not provided

    if not user_prompt:
        return jsonify({"error": "No prompt provided"}), 400

    # Get the current stage of the booking process
    stage = session.get("booking_stage", 0)

    # Add user message to chat history
    session["chat_history"].append({"role": "user", "content": user_prompt})

    # Prepare the message structure for the LLM
    messages = [
        {"role": "system", "content": "You are a helpful assistant for museum ticket booking. Answer questions about ticket availability, pricing, and events. Help users through a booking process."},
        *session["chat_history"]
    ]

    # Call the Groq API to get the response from the LLM
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=messages
    )

    assistant_response = response.choices[0].message.content

    # Determine the response based on the booking stage
    if stage < len(STAGES) - 1:
        response_text = STAGES[stage]
        if stage == 2:
            # Replace placeholders with user-provided details
            response_text = STAGES[stage].format(tickets=user_prompt, time=session.get("booking_time", "the requested time"))
            session["booking_details"] = {
                "tickets": user_prompt,
                "time": session.get("booking_time", "the requested time")
            }
        session["booking_stage"] += 1
    else:
        response_text = STAGES[stage]
        session["booking_stage"] = 0  # Reset for the next booking

    # Add the assistant's response to chat history
    session["chat_history"].append({"role": "assistant", "content": response_text})

    return jsonify({"response": assistant_response})

@app.route('/faqs', methods=['GET'])
def get_faqs():
    return jsonify({"faqs": FAQS})

if __name__ == '__main__':
    app.run(debug=True)
