let caption = "";

document.getElementById("imageInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const preview = document.getElementById("preview");
  preview.src = URL.createObjectURL(file);
});

document.getElementById("captionBtn").addEventListener("click", function () {
  const file = document.getElementById("imageInput").files[0];
  if (!file) {
    alert("Please upload an image first.");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  fetch("https://9grrr5sfjc.execute-api.us-west-2.amazonaws.com/caption", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      caption = data.caption;
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
