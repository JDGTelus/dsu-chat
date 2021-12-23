const messages = [];

const getMessagesHistory = () => messages;

const addToMessageHistory = ({ userName, message }) =>
  messages.push({ userName, message });

const clearMessages = () => (messages.length = 0);

module.exports = { getMessagesHistory, addToMessageHistory, clearMessages };
