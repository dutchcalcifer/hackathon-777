//ul --quantity
// li --position n 

const ul = document.querySelectorAll("ul")

const url = "https://fdnd.directus.app/items/women_in_tech"
fetchData(url).then(data => {



// start the spin
    const winning = isWinning()
    let winningNumber = 0
    if (winning) {
        winningNumber = getRandomPerson(data.length)
    }

    ul.forEach((row) => {
        row.style.setProperty("--quantity", 10)
        const li = row.children
        li[0].style.setProperty("--position", 1)

        // first slot
        if (winning) {
            li[0].children[0].src = `https://fdnd.directus.app/assets/${data[winningNumber].image}`
        } else {
            li[0].children[0].src = `https://fdnd.directus.app/assets/${data[getRandomPerson(data.length)].image}`
        }

        // the other 9 slots
        const otherSlots = get9People(data.length)
        for (let i = 1; i < 10; i++) {
            const imgSRC = data[otherSlots[i-1]].image
            li[i].children[0].src = `https://fdnd.directus.app/assets/${imgSRC}`

            li[i].style.setProperty("--position", i + 1)
        }
    })
})

function getRandomPerson(arrayLength) {
    return Math.floor(Math.random() * arrayLength)
}

function get9People(arrayLength) {
    const numbers = new Set(); // Using a Set to ensure uniqueness

    while (numbers.size < 10) {
        numbers.add(Math.floor(Math.random() * arrayLength)); // Random number between 0 and 49
    }

    return Array.from(numbers); // Convert Set to an array
}

function isWinning() {
    return Math.random() < 0.5;
}