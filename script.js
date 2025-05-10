let caption = "";

document.getElementById("imageInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const preview = document.getElementById("preview");
  preview.src = URL.createObjectURL(file);
});

document.getElementById("captionBtn").addEventListener("click", function () {
  caption = "A dog lying on a cozy couch."; // Simulated output for now
  document.getElementById("captionText").innerText = caption;
});

document.getElementById("speakBtn").addEventListener("click", function () {
  if (caption !== "") {
    const utterance = new SpeechSynthesisUtterance(caption);
    speechSynthesis.speak(utterance);
  }
});
