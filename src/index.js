console.log("%c HI", "color: firebrick");

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

document.addEventListener("DOMContentLoaded", contentLoaded);

function contentLoaded() {
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
                imgDiv.append(dogImage);
            });
        });
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const dogList = document.getElementById("dog-breeds");

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
                newDogBreed.addEventListener("click", (e) => {
                    e.target.style = "color:blue";
                });
                dogList.append(newDogBreed);
            }
        });
    const selector = document.getElementById("breed-dropdown");
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
