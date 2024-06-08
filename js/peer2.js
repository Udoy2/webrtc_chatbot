const remoteConnection = new RTCPeerConnection();

// setting up events --------------------------------------------------
remoteConnection.onicecandidate = (event) => {
  document.getElementById("sda_part").innerText = JSON.stringify(
    remoteConnection.localDescription
  );
};

remoteConnection.ondatachannel = (event) => {
  const dataConnection = event.channel;
  remoteConnection.dataConnection = dataConnection;
  remoteConnection.dataConnection.onmessage = (event) => {
    document.getElementById("client_message").innerText = event.data;
  };
  remoteConnection.dataConnection.onopen = () => {
    alert("connection has been stablished!");
    document.getElementById("connection_portion").style.display = "none";
    document.getElementById("chat_portion").style.display = "block";
  };
  remoteConnection.dataConnection.onclose = () => {
    document.getElementById("connection_portion").style.display = "block";
    document.getElementById("chat_portion").style.display = "none";
  };
};
// setting up events --------------------------------------------------

document.getElementById("send").addEventListener("click", () => {
  const offer = document.getElementById("offer").value;
  remoteConnection.setRemoteDescription(JSON.parse(offer));
  remoteConnection
    .createAnswer()
    .then((answer) => remoteConnection.setLocalDescription(answer))
    .then(() => {
      document.getElementById("sda_part").innerText = JSON.stringify(
        remoteConnection.localDescription
      );
    });
});

document.getElementById("send_message").addEventListener("click", () => {
  const message = document.getElementById("message").value;
  remoteConnection.dataConnection.send(message);
});
