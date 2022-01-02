const cardSection = document.getElementById("card");
const randomInitBtn = document.getElementById("random-word-btn");
const audio = document.getElementById("audio");
let currentWord = "";
let partOfSpeech = "";
let definition = "";
let example = "";

randomInitBtn.addEventListener("click", async function getRandomWord() {
  await fetch("https://random-word-api.herokuapp.com/word?number=1&swear=0")
    .then((response) => response.json())
    .then((json) => {
      currentWord = json[0];
      (async () => {
        await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`
        )
          .then((response) => response.json())
          .then((json) => {
            let data = json[0];
            if (json.hasOwnProperty("resolution")) {
              card.innerHTML = "Please wait...";
              definition = "";
              example = "";
              audio.src = "none";
              partOfSpeech = "";
              getRandomWord();
              return;
            } else if (!data.meanings[0].definitions[0].example) {
              currentWord = data.word[0].toUpperCase() + data.word.substring(1);
              definition =
                data.meanings[0].definitions[0].definition[0].toUpperCase() +
                data.meanings[0].definitions[0].definition.substring(1);
              example = "No example found, sorry";
              audio.src = data.phonetics[0].audio;
              partOfSpeech =
                data.meanings[0].partOfSpeech[0].toUpperCase() +
                data.meanings[0].partOfSpeech.substring(1);
            } else {
              currentWord = data.word[0].toUpperCase() + data.word.substring(1);
              definition =
                data.meanings[0].definitions[0].definition[0].toUpperCase() +
                data.meanings[0].definitions[0].definition.substring(1);
              example =
                data.meanings[0].definitions[0].example[0].toUpperCase() +
                data.meanings[0].definitions[0].example.substring(1);
              audio.src = data.phonetics[0].audio;
              partOfSpeech =
                data.meanings[0].partOfSpeech[0].toUpperCase() +
                data.meanings[0].partOfSpeech.substring(1);
            }
            if (!json.hasOwnProperty("resolution")) {
              cardSection.innerHTML = `<div class="card text-black bg-primary mb-3">
                                      <div class="card-header" id="word" style="font-size: 20px;"><b>${currentWord}</b></div>
                                      <div class="card-body">
                                        <p class="card-text" id="part-of-speech">${partOfSpeech}</p>
                                        <button type="button" class="btn btn-primary mb-3 btn-vocabcard" onclick="document.getElementById('audio').play()">Pronunciation</button>
                                        <h4 class="card-title" style="font-size: 18px;"><b>Definition:</b></h4>
                                        <p class="card-text" id="definition">${definition}</p>
                                        <h4 class="card-title" style="font-size: 18px;"><b>Example of usage:</b></h4>
                                        <p class="card-text" id="example">
                                          ${example}
                                        </p>
                                      </div>
                                    </div>`;
            }
          });
      })();
    });
});
