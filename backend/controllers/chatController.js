import Groq from 'groq-sdk';
const groq = new Groq({ apiKey: "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" });

const chatController = {
    chatWithGroq: async (req, res) => {
        const { userInput } = req.body;

        if (!userInput) {
            return res.status(400).json({ message: 'No input provided' });
        }

        try {
            const groqResponse = await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: userInput,
                    },
                ],
                model: "mixtral-8x7b-32768",
            });
            const responseContent = groqResponse.choices[0]?.message?.content || 'No response from Groq';
            res.status(200).json({ response: responseContent });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
};

export default chatController; // Use export default for the object
