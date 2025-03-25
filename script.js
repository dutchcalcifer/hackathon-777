let fetchedData = null;

// Fetch the data and initialize functions
fetchData("https://fdnd.directus.app/items/women_in_tech").then((data) => {
  fetchedData = data;
  addWomen(fetchedData);
});

// Function to add women in tech to the UI
function addWomen(data) {
  const getWinningPerson = () => {
    const isWinning = Math.random() < 0.5;
    return isWinning ? getRandomPerson(data.length) : null;
  };

  const getRandomPerson = (arrayLength) =>
    Math.floor(Math.random() * arrayLength);

  const get9RandomPeople = (arrayLength) => {
    const numbers = new Set();

    while (numbers.size < 9) {
      numbers.add(Math.floor(Math.random() * arrayLength));
    }

    return Array.from(numbers);
  };

  const winningPerson = getWinningPerson();

  document.querySelectorAll("ul").forEach((row) => {
    const li = row.children;

    if (winningPerson !== null) {
      li[0].children[0].src = `https://fdnd.directus.app/assets/${data[winningPerson].image}`;
    } else {
      li[0].children[0].src = `https://fdnd.directus.app/assets/${
        data[getRandomPerson(data.length)].image
      }`;
    }

    const otherSlots = get9RandomPeople(data.length);
    for (let i = 1; i < 10; i++) {
      const imgSRC = data[otherSlots[i - 1]].image;
      li[i].children[0].src = `https://fdnd.directus.app/assets/${imgSRC}`;
    }
  });
}

// Function to add animation
function addAnimation() {
  document.querySelectorAll("ul").forEach((row) => {
    row.style.animation = "none";
    row.offsetHeight; // Forces reflow
    row.style.animation = "spin 5s var(--delay) ease-out";
  });
}

// Handle button click
function handleClick() {
  addAnimation();
  setTimeout(function () {
    addWomen(fetchedData);
  }, 1000);
}

// Attach event listener
document.querySelector(".handle").addEventListener("click", handleClick);
