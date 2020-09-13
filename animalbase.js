"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};

function start() {
    console.log("ready");
    // TODO: Add event-listeners to filter and sort buttons

    getButtons();
    loadJSON("animals.json");
}

function getButtons() {
    const buttons = document.querySelectorAll('button');
    for (const button of buttons) {
        button.addEventListener('click', function () {
            console.log(this.dataset.filter);
            getAnimal(this.dataset.filter);

        });
    }
}

function getAnimal(typeOfAnimal) {
    let filteredAnimals = [];
    if (typeOfAnimal === '*') {
        filteredAnimals = allAnimals;

    } else {
        filteredAnimals = allAnimals.filter(animal => animal.type === typeOfAnimal);
        // displayAnimal(filteredAnimals);
    }
    displayList(filteredAnimals);
}



async function loadJSON(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    // when loaded, prepare data objects
    prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
    allAnimals = jsonData.map(preapareObject);

    // TODO: This might not be the function we want to call first

    displayList(allAnimals);
}

function preapareObject(jsonObject) {
    const animal = Object.create(Animal);

    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;

    return animal;
}


function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    animals.forEach(displayAnimal);

}

function displayAnimal(animal) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild(clone);
}


