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

  fetch("https://z9ehpxhkvi.execute-api.us-west-2.amazonaws.com/caption", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: "SennaF1Car.jpg" }), // use actual uploaded key here
  })
    .then((response) => response.json())
    .then((data) => {
      caption = data.caption; // depending on how you structured return
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



// let caption = "";
// let uploadedFilename = ""; // Track the uploaded file name

// document.getElementById("imageInput").addEventListener("change", async function (e) {
//   const file = e.target.files[0];
//   if (!file) {
//     alert("Please select a file.");
//     return;
//   }

//   // Step 1: Get pre-signed URL from Lambda via API Gateway
//   try {
//     const response = await fetch("https://jb0cof4tl7.execute-api.us-west-2.amazonaws.com/prod/get-upload-url", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ filename: file.name }),
//     });

//     if (!response.ok) throw new Error("Failed to get upload URL");

//     const data = await response.json();
//     const uploadUrl = data.upload_url;

//     // Step 2: Upload the file directly to S3
//     const uploadResponse = await fetch(uploadUrl, {
//       method: "PUT",
//       headers: {
//         "Content-Type": file.type,
//       },
//       body: file,
//     });

//     if (!uploadResponse.ok) throw new Error("Upload to S3 failed");

//     uploadedFilename = file.name; // Save filename for captioning
//     alert("Image uploaded successfully!");

//   } catch (error) {
//     console.error("Error uploading image:", error);
//     alert("Image upload failed.");
//   }
// });

// document.getElementById("captionBtn").addEventListener("click", function () {
//   if (!uploadedFilename) {
//     alert("Please upload an image first.");
//     return;
//   }

//   fetch("https://z9ehpxhkvi.execute-api.us-west-2.amazonaws.com/caption", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ key: uploadedFilename }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       caption = data.caption || data.body?.caption || JSON.parse(data.body).content[0]?.text || "No caption found.";
//       document.getElementById("captionText").innerText = caption;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       alert("Something went wrong while getting the caption.");
//     });
// });

// document.getElementById("speakBtn").addEventListener("click", function () {
//   if (caption !== "") {
//     const utterance = new SpeechSynthesisUtterance(caption);
//     speechSynthesis.speak(utterance);
//   }
// });

