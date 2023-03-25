if ("webkitSpeechRecognition" in window) {
  let speechRecognition = new webkitSpeechRecognition();
  let final_transcript = "";
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;

  speechRecognition.onstart = () => {
    document.querySelector("#status").style.display = "block";
  };

  speechRecognition.onerror = () => {
    document.querySelector("#status").style.display = "none";
  };

  speechRecognition.onend = () => {
    document.querySelector("#status").style.display = "none";
  };

  speechRecognition.onresult = (event) => {
    let interim_transcript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    document.querySelector("#final").innerHTML = final_transcript;
    document.querySelector("#interim").innerHTML = interim_transcript;
  };

 
  document.querySelector("#start").onclick = () => {
    let lang =document.getElementById("lang").value;
  console.log(lang)
    if(lang === "kn")
     {speechRecognition.lang = 'kn-IN'; }// lang--> kn-IN
     else if(lang === "hin")
     {speechRecognition.lang = 'hi-IN'; }
     else if(lang === "gu")
     {speechRecognition.lang = 'gu-IN'; }
     else if(lang === "tamil")
     {speechRecognition.lang = 'ta-IN'; }
     else if(lang === "telugu")
     {speechRecognition.lang = 'te-IN'; }
     else if(lang === "marathi")
     {speechRecognition.lang = 'mr-IN'; }
    else
     speechRecognition.lang = 'en-IN';
    speechRecognition.start();
  };

  document.querySelector("#stop").onclick = () => {
    speechRecognition.stop();
  };

  document.querySelector("#save").onclick = () => {
    let content = document.querySelector("#final").innerHTML;
    let savedContent = localStorage.getItem("savedContent") || "";
    let savedContentWithDate = savedContent + "\n\n" + new Date().toLocaleString() + "\n" + content;
    localStorage.setItem("savedContent", savedContentWithDate);
    document.querySelector("#savedText").innerHTML = "Saved content: " + content;
  };
} else {
  console.log("Speech Recognition Not Available");
}




























/*if ("webkitSpeechRecognition" in window) {
    
    let speechRecognition = new webkitSpeechRecognition();
   //recognition.lang="kn-IN";
  
  
    let final_transcript = "";
  
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
  
    speechRecognition.onstart = () => {
      document.querySelector("#status").style.display = "block";
    };
    speechRecognition.onerror = () => {
      document.querySelector("#status").style.display = "none";
    };
    speechRecognition.onend = () => {
      document.querySelector("#status").style.display = "none";
    };
  
    speechRecognition.onresult = (event) => {
      let interim_transcript = "";
  
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
  
      document.querySelector("#final").innerHTML = final_transcript;
      document.querySelector("#interim").innerHTML = interim_transcript;
    };


        

    // Set the onClick property of the start button
    document.querySelector("#start").onclick = () => {
      // Start the Speech Recognition
      speechRecognition.start();
    };
    // Set the onClick property of the stop button
    document.querySelector("#stop").onclick = () => {
      // Stop the Speech Recognition
      speechRecognition.stop();
    };

    document.querySelector("#save").onclick = () => {
        speechRecognition.save();
            let content = document.querySelector("#final").innerHTML;
    localStorage.setItem("savedContent", content);
    alert("Content saved successfully!");
    };
  } else {
    console.log("Speech Recognition Not Available");
  }*/