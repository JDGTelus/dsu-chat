<h1>DSU Chat</h1>

<div>
  <h2>Why?</h2>
  <p>There is a need to induct interns into some of the basics of RESTful services, and sockets, all within the NodeJS tech stack.</p>
  <p>This app is meant to facilitate designing a path for the second week of <b>Systems Integration</b> so the end product is expected to be the goal. This sample app will ease the creation of an initial state to be distributed in a repo so that interns may colaborate there.</p>
</div>

<div>
  <h2>Feature History</h2>
  <h3>v0.0.0</h3>
  <ul>
    <li>The root path supplies the UI for chatting.</li>
    <li>Newly logged in users get the current stack, not the past ones.</li>
    <li>Newly logged in users get a standard user name, "User #" with # being an int.</li>
    <li>No refresh persistence, it will be taken as a new login.</li>
    <li>All chat is kept in memory.</li>
    <li>Messages are added to the stack in a way that enables knowing who the outhor was.</li>
    <li>Users may change their name, affects future records only.</li>
    <li>There is a backend endpoint to get all stored messages.</li>
    <li>There is a backend endpoint to delete all messages, which will delete all chat boards.</li>
  </ul>
</div>
