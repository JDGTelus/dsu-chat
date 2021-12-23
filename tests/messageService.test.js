const messagesService = require("../services/messagesService");

test("returns an array type when getting messages", () => {
  expect(messagesService.getMessagesHistory()).toEqual([]);
});

test("appends new object to message history", () => {
  const sampleMessageObject = {
    userName: "sample user",
    message: "sample message",
  };

  expect(messagesService.getMessagesHistory().length).toEqual(0);
  messagesService.addToMessageHistory(sampleMessageObject);

  const messages = messagesService.getMessagesHistory();
  expect(messages.length).toEqual(1);
  const latestMessage = messages.pop();
  expect(latestMessage.userName === sampleMessageObject.userName).toBe(true);
  expect(latestMessage.message === sampleMessageObject.message).toBe(true);
});

test("clears message history", () => {
  messagesService.addToMessageHistory({
    userName: "User 1",
    message: "Message 1",
  });
  messagesService.addToMessageHistory({
    userName: "User 2",
    message: "Message 2",
  });
  messagesService.addToMessageHistory({
    userName: "User 3",
    message: "Message 3",
  });
  expect(messagesService.getMessagesHistory().length).toBeGreaterThan(0);

  messagesService.clearMessages();
  expect(messagesService.getMessagesHistory().length).toEqual(0);
});
