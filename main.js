let foodDom = document.querySelector(".food img")
let compartments = document.querySelectorAll(".sortingCompartments img")

let totalFoods = 0
let foodsSortedCounter = 0

let foods = loadAllFoods()
let food = getNextFood()
foodDom.src = food.src
foodDom.name = food.type

let gameOver = false
let gameOverBox = document.querySelector(".gameOver")
gameOverBox.style.display = 'none'

let replayBtn = document.getElementById('replayBtn')

// Demo text
let thisText = document.querySelector('h3')
thisText.innerHTML = "Total Foods: " + totalFoods + ", Sorted Foods: " + foodsSortedCounter
//

replayBtn.onclick = function () {
    gameOverBox.style.display = 'none'
    totalFoods = 0
    foodsSortedCounter = 0
    gameOver = false
    let foods = loadAllFoods()
    let food = getNextFood()
    foodDom.src = food.src
    foodDom.name = food.type
}

// Randomizer function, not currently in use
function getRandomFood() {
    let randomIndex = Math.floor(Math.random() * foods.length)
    return foods[randomIndex]
}

function getNextFood() {
    let nextIndex = foodsSortedCounter
    return foods[nextIndex]
}

compartments.forEach(compartment => {
    compartment.addEventListener("dragover", dragFoodOverCompartment)
    compartment.addEventListener("drop", dropFood)
})

function dragFoodOverCompartment(event) {
    if (gameOver) {
        return
    }
    event.preventDefault();
}

function dropFood(event) {
    event.preventDefault();
    compartment = event.target
    if (foodDom.name == compartment.name) {
        foodsSortedCounter++ // Add 1 to foods sorted counter
        thisText.innerHTML = "Total Foods: " + totalFoods + ", Sorted Foods: " + foodsSortedCounter

        if (foodsSortedCounter == totalFoods) {
            gameOverBox.style.display = 'block'
            gameOver = true
        }

        food = getNextFood()
        foodDom.src = food.src
        foodDom.name = food.type


    }

}

function loadAllFoods() {
    let foods = []
    // i <= 1 is redundant but it's because there is only 1 of each item per category
    // Increase loops as the food items grow in size
    for (let i = 1; i <= 2; i++) {
        foods.push({
            type: 'crisperdrawer',
            src: `assets/food/crisperdrawer/${i}.png`
        })
        foods.push({
            type: 'freezer',
            src: `assets/food/freezer/${i}.png`
        })
        foods.push({
            type: 'fridge',
            src: `assets/food/fridge/${i}.png`
        })
        foods.push({
            type: 'trash',
            src: `assets/food/trash/${i}.png`
        })
    }

    // Jumble the array
    for (let i = foods.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        // Swap i and j around
        const temp = foods[i];
        foods[i] = foods[j];
        foods[j] = temp;
    }

    totalFoods = foods.length
    return foods
}