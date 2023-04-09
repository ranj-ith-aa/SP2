if ("webkitSpeechRecognition" in window) {
  let speechRecognition = new webkitSpeechRecognition();//create object
 
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

  let final_transcript = "";

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
     {speechRecognition.lang = 'kn-IN'; }
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
    const text = document.querySelector("#final").innerText;
    const filename = "speech-to-text.txt";
    const blob = new Blob([text], { type: "text/plain" });

    if (window.navigator.msSaveOrOpenBlob) {//checking msSAve method available 
      window.navigator.msSaveBlob(blob, filename);
    }
    
    else {
      const elem = window.document.createElement("a");
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
  };
    
} else {
  console.log("Speech Recognition Not Available");
}