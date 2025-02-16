import './style.css';

const inputField = document.getElementById("input");
const form = document.getElementById("form");
const resultContainer = document.getElementById("result"); 

inputField.addEventListener("focus", function() {
    if (this.value === "talk to the rock") {
        this.value = "";
    }
});

inputField.addEventListener("focusout", function() {
    if (this.value === "") {
        this.value = "talk to the rock";
    }
});


form.addEventListener("submit", async function(e) {
    e.preventDefault(); 

    const userInput = inputField.value.trim();
    if (!userInput) return; 
    inputField.disabled = true;

    try {
        const response = await fetch("https://ollama.nicholascoiner.com/api/generate", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({  
                model: "rock",
                prompt: userInput, 
                keep_alive: "-1m",
                stream: false
            })
        });
        

        if (!response.ok) {
            throw new Error("Failed to fetch response");
        }

        const data = await response.json();
        resultContainer.textContent = data.response || "*the rock is not currently running on any of the stupidly expensive gpu networks (i.e. my personal computer)*"; 

    } catch (error) {
        console.log(error.message)
        resultContainer.textContent = "Error: " + error.message;
    }
    inputField.disabled = false;
    inputField.value = ""; 
});
