console.log("%c HI", "color: firebrick");

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

document.addEventListener("DOMContentLoaded", contentLoaded);

function contentLoaded() {
    const selector = document.getElementById("breed-dropdown");
    alphabet.forEach((letter) => {
        let newOption = document.createElement("option");
        newOption.value = letter;
        newOption.innerHTML = letter;
        selector.append(newOption);
    });

    const imgDiv = document.getElementById("dog-image-container");
    fetch(imgUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const dogImageURLArray = json.message;
            dogImageURLArray.forEach((url) => {
                let dogImage = document.createElement("img");
                dogImage.src = url;
                dogImage.style.width = "40vw";
                dogImage.style.height = "40vh";
                imgDiv.append(dogImage);
            });
        });
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const dogList = document.getElementById("dog-breeds");
    function changeColor(e) {
        let newColor = Math.floor(Math.random() * 16777215).toString(16);
        e.target.style.color = "#" + newColor.toString();
    }

    fetch(breedUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const breedURLArray = json.message;
            for (const property in breedURLArray) {
                const newDogBreed = document.createElement("li");
                newDogBreed.innerHTML = property;
                newDogBreed.className = "dogLi";
                newDogBreed.addEventListener("click", changeColor);
                if (breedURLArray[property].length != 0) {
                    const newBreedList = document.createElement("ul");
                    breedURLArray[property].forEach((extraBreed) => {
                        const newDogSubBreed = document.createElement("li");
                        newDogSubBreed.innerHTML = extraBreed;
                        newDogSubBreed.addEventListener("click", changeColor);
                        newBreedList.append(newDogSubBreed);
                    });
                    newDogBreed.append(newBreedList);
                }
                dogList.append(newDogBreed);
            }
        });

    selector.addEventListener("change", (e) => {
        let listItems = document.getElementsByClassName("dogLi");
        for (let i = 0; i < listItems.length; i++) {
            if (listItems[i].innerHTML[0] === e.target.value) {
                listItems[i].style.display = "";
            } else {
                listItems[i].style.display = "none";
            }
        }
    });
}
