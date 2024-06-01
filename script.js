
const url="https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn")
const inpWord = document.getElementById("inp-word");


btn.addEventListener("click", searchWord);
inpWord.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchWord();
    }
});

function searchWord() {
    let inpWordValue = inpWord.value;
    console.log(inpWordValue);
    fetch(`${url}${inpWordValue}`)
        .then((response)=>response.json())
        .then((data)=>
        {   
            console.log(data) 
            const validationData = validation(data);
            // console.log(validationData.exampleNew);
            result.innerHTML = `
            <div class="word">
                <h3>${inpWordValue}</h3>
                    <button onclick="playSound()">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
            </div>
            <div class="details">
                <p>${validationData.partOfSpeechNew}</p>
                <p>${validationData.textNew}</p>
            </div>
            <p class="word-meaning">
                ${validationData.definitionNew}
            </p>
            <p class="word-example">
                ${validationData.exampleNew}
            </p>
            `;  
            sound.setAttribute("src",`${validationData.audioNew}`) ;  
            // console.log(sound)  
        })  
        .catch(()=>{
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        })
        var element = document.getElementById('title_dic');
        element.classList.remove('visible');
        
    }

function validation(data)
{
    let partOfSpeechNew = "";
    let definitionNew ="";
    let textNew = "";
    let exampleNew = "";
    let audioNew = "";
    for(let i=0;i<data[0].meanings.length;i++)
        {   //ต้องมีการตรวจสอบก่อนด้วยว่ามี obj นั้นจริงๆ ไม่งั้นมันจะเข้า catch block ตลอด ตรวจสอบโดย Ex. data[0].meanings[i].partOfSpeech
            if(data[0].meanings[i].partOfSpeech && data[0].meanings[i].partOfSpeech.length !==0)
                {
                    partOfSpeechNew = data[0].meanings[i].partOfSpeech
                }
            for(let j=0;j<data[0].meanings[i].definitions.length;j++)
                {
                    if(data[0].meanings[i].definitions[j].definition && data[0].meanings[i].definitions[j].definition.length!==0)
                    {
                         definitionNew = data[0].meanings[i].definitions[j].definition
                    }
                    if(data[0].meanings[i].definitions[j].example && data[0].meanings[i].definitions[j].example.length!==0)
                    {
                            exampleNew = data[0].meanings[i].definitions[j].example
                    }
                }   
        }
    for(let i=0;i<data[0].phonetics.length;i++)
        {
            if(data[0].phonetics[i].text && data[0].phonetics[i].text.length!==0)
                {
                     textNew = data[0].phonetics[i].text;
                }
            if(data[0].phonetics[i].audio && data[0].phonetics[i].audio.length!==0)
                {
                     audioNew = data[0].phonetics[i].audio;
                }
            
        }
        if(audioNew ==="")
            {
                audioNew = "error.mp3"
            }
        //return obj of result after validate empty data
        return { partOfSpeechNew, definitionNew, textNew, exampleNew ,audioNew };
}
function playSound(){
    sound.play();
}
window.onload = function() {
    var element = document.getElementById('title_dic');
    var element2 = document.getElementById('container_id');
    element.classList.add('visible');
    element2.classList.add('visible');
};