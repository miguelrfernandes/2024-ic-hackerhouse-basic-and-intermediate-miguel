import { useState } from "react";
import NfidLogin from "./components/NfidLogin";

function App() {
  const [backendActor, setBackendActor] = useState();
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [userText, setUserText] = useState();

  function handleSubmitUserProfile(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    backendActor.setUserProfile(name).then((response) => {
      if (response.ok) {
        setUserId(response.ok.id.toString());
        setUserName(response.ok.name);
      } else if (response.err) {
        setUserId(response.err);
      } else {
        console.error(response);
        setUserId("Unexpected error, check the console");
      }
    });
    return false;
  }

  function handleSubmitUserResult(event) {
    event.preventDefault();
    const text = event.target.elements.text.value;
    backendActor.addUserResult(text).then((response) => {
      if (response.ok) {
        if (Array.isArray(userText)) {
          setUserText([...userText, text]);
        } else {
          setUserText([text]);
        }
      } else if (response.err) {
        if (Array.isArray(userText)) {
          setUserText([...userText, response.err]);
        } else {
          setUserText([response.err]);
        }
      } else {
        console.error(response);
      }
    });
    return false;
  }

  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <img
        src="/logo2.svg"
        alt="DFINITY logo"
        style={{ width: "150px", marginBottom: "20px" }}
      />
      <h1 style={{ color: "#333" }}>Welcome to IC AI Hacker House 2024! 🎉</h1>
      {!backendActor && (
        <section id="nfid-section" style={{ margin: "20px 0" }}>
          <NfidLogin setBackendActor={setBackendActor}></NfidLogin>
        </section>
      )}
      {backendActor && (
        <>
          <div style={{ margin: "20px 0" }}>
            <h2 style={{ color: "#555" }}>Set your user profile 👤</h2>
            <form
              action="#"
              onSubmit={handleSubmitUserProfile}
              style={{ display: "inline-block", textAlign: "left" }}
            >
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: "8px" }}
              >
                Enter your name:
              </label>
              <input
                id="name"
                alt="Name"
                type="text"
                style={{
                  padding: "8px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="submit"
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Save 💾
              </button>
            </form>
            {userId && (
              <section
                className="response"
                style={{ marginTop: "10px", color: "#007bff" }}
              >
                {userId}
              </section>
            )}
            {userName && (
              <section
                className="response"
                style={{ marginTop: "10px", color: "#007bff" }}
              >
                {userName}
              </section>
            )}
          </div>

          <div style={{ margin: "20px 0" }}>
            <h2 style={{ color: "#555" }}>Save a text message 📝</h2>
            <form
              action="#"
              onSubmit={handleSubmitUserResult}
              style={{ display: "inline-block", textAlign: "left" }}
            >
              <label
                htmlFor="text"
                style={{ display: "block", marginBottom: "8px" }}
              >
                Enter your text:
              </label>
              <input
                id="text"
                alt="Text"
                type="text"
                style={{
                  padding: "8px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="submit"
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Save 💾
              </button>
            </form>
          </div>

          <div style={{ margin: "20px 0" }}>
            <h2 style={{ color: "#555" }}>Saved Text Messages 💬</h2>
            {Array.isArray(userText) && userText.length > 0 ? (
              <ul style={{ listStyleType: "none", padding: "0" }}>
                {userText.map((text, index) => (
                  <li
                    key={index}
                    style={{
                      background: "#f9f9f9",
                      margin: "5px 0",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    {text}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#999" }}>No text messages saved yet.</p>
            )}
          </div>
        </>
      )}
    </main>
  );
}

export default App;
