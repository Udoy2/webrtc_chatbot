const localConnection = new RTCPeerConnection();
const dataConnection = localConnection.createDataChannel("dataChannel");

dataConnection.onmessage = (event) => {
  document.getElementById("client_message").innerText = event.data;
};

dataConnection.onopen = () => {
  alert("connection has been stablished!");
  document.getElementById("connection_portion").style.display = "none";
  document.getElementById("chat_portion").style.display = "block";
};

dataConnection.onclose = () => {
  document.getElementById("connection_portion").style.display = "block";
  document.getElementById("chat_portion").style.display = "none";
};

localConnection.onicecandidate = (event) => {
  document.getElementById("sda_part").innerText = JSON.stringify(
    localConnection.localDescription
  );
};

localConnection
  .createOffer()
  .then((offer) => localConnection.setLocalDescription(offer));

document.getElementById("send").addEventListener("click", () => {
  const answer = document.getElementById("answer").value;
  localConnection.setRemoteDescription(JSON.parse(answer));
});

document.getElementById("send_message").addEventListener("click", () => {
  const message = document.getElementById("message").value;
  dataConnection.send(message);
});
