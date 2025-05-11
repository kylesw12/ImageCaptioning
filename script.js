let caption = "";

document.getElementById("imageInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const preview = document.getElementById("preview");
  preview.src = URL.createObjectURL(file);
});

document.getElementById("captionBtn").addEventListener("click", function () {
  // NOTE: We're NOT uploading the image to S3 from here in this version
  fetch("https://z9ehpxhkvi.execute-api.us-west-2.amazonaws.com/caption", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: "SennaF1Car.jpg" }), // your existing image key in S3
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Adjust this line depending on Lambda's response structure
      caption = data.caption || data.body?.caption || JSON.parse(data.body).content[0]?.text || "No caption found.";
      document.getElementById("captionText").innerText = caption;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong while getting the caption.");
    });
});

document.getElementById("speakBtn").addEventListener("click", function () {
  if (caption !== "") {
    const utterance = new SpeechSynthesisUtterance(caption);
    speechSynthesis.speak(utterance);
  }
});
