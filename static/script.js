const clearBtn = document.getElementById("clearBtn");
const downloadBtn = document.getElementById("downloadBtn");
const toast = document.getElementById("toast");
const loadingText = document.getElementById("loadingText");
clearBtn.addEventListener("click", clearForm);

downloadBtn.addEventListener("click", downloadContent);


const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const result = document.getElementById("result");
const loader = document.getElementById("loader");

generateBtn.addEventListener("click", generateContent);

copyBtn.addEventListener("click", copyContent);

async function generateContent() {

    const type = document.getElementById("type").value;
    const topic = document.getElementById("topic").value.trim();
    const tone = document.getElementById("tone").value;
    const words = document.getElementById("words").value;

    if (topic === "") {

        alert("Please enter a topic or prompt.");

        return;

    }

    loader.classList.remove("hidden");
    loadingText.classList.remove("hidden");
    result.style.display = "none";

    generateBtn.disabled = true;
    generateBtn.innerHTML =
        `<i class="fa-solid fa-spinner fa-spin"></i> Generating...`;

    try {

        const response = await fetch("/generate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                type,
                topic,
                tone,
                words

            })

        });

        const data = await response.json();

        loader.classList.add("hidden");

        result.style.display = "block";

        result.innerText = data.content;

    }

    catch (error) {

        loader.classList.add("hidden");
        loadingText.classList.add("hidden");

        result.style.display = "block";

        result.innerHTML = `
        <strong>Something went wrong.</strong><br><br>
        Please try again.
        `;

    }

    generateBtn.disabled = false;

    generateBtn.innerHTML = `
    <i class="fa-solid fa-wand-magic-sparkles"></i>
    Generate Content
    `;

}

function copyContent(){

navigator.clipboard.writeText(result.innerText);

toast.innerText="Content copied";

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2000);

}


function clearForm(){

document.getElementById("topic").value="";

document.getElementById("words").value=300;

result.innerHTML="Your generated content will appear here.";

}

function downloadContent(){

const text=result.innerText;

const blob=new Blob([text],{type:"text/plain"});

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="scriptly-content.txt";

link.click();

}

document.addEventListener("keydown",function(e){

if(e.ctrlKey && e.key==="Enter"){

generateContent();

}

});