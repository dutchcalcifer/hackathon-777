let fetchedData = null;

// Fetch data from the given URL and store it in fetchedData
fetchData("https://fdnd.directus.app/items/women_in_tech").then((data) => {
  fetchedData = data;
  addWomen(fetchedData);
});

// Function to add women to the slots
function addWomen(data) {
  // Determine if there is a winning person
  const getWinningPerson = () => {
    const isWinning = Math.random() < 0.5;
    return isWinning ? getRandomPerson(data.length) : null;
  };

  // Get a random index from the data array
  const getRandomPerson = (arrayLength) =>
    Math.floor(Math.random() * arrayLength);

  // Get an array of 9 unique random indices
  const get9RandomPeople = (arrayLength) => {
    const numbers = new Set();

    while (numbers.size < 9) {
      numbers.add(Math.floor(Math.random() * arrayLength));
    }

    return Array.from(numbers);
  };

  const winningPerson = getWinningPerson();

  // Update the image sources for each slot
  document.querySelectorAll("ul").forEach((row) => {
    const li = row.children;

    // Set the first image to the winning person's image or a random image
    if (winningPerson !== null) {
      li[0].children[0].src = `https://fdnd.directus.app/assets/${data[winningPerson].image}`;
    } else {
      li[0].children[0].src = `https://fdnd.directus.app/assets/${
        data[getRandomPerson(data.length)].image
      }`;
    }

    // Set images for the other slots
    const otherSlots = get9RandomPeople(data.length);
    for (let i = 1; i < 10; i++) {
      const imgSRC = data[otherSlots[i - 1]].image;
      li[i].children[0].src = `https://fdnd.directus.app/assets/${imgSRC}`;
    }
  });

  return winningPerson;
}

// Function to add animation to the slots
function addAnimation() {
  document.querySelectorAll("ul").forEach((row) => {
    row.style.animation = "none";
    row.offsetHeight; // Trigger reflow to restart animation
    row.style.animation = "spin 5s var(--delay) ease-out";
  });
}

function handleClick() {
  addAnimation();
  setTimeout(function () {
    const winningPerson = addWomen(fetchedData);
    if (winningPerson) {
      // Only show popover if not null
      showWinningPopover(winningPerson);
    }
  }, 1000);
}

function showWinningPopover(person) {
  const winningPerson = fetchedData[person];

  const popover = document.createElement("div");
  popover.textContent = `${winningPerson.name} wins! 🎉`;
  popover.classList.add("popover");

  document.body.appendChild(popover);

  // Remove popover after 3 seconds
  setTimeout(() => {
    document.body.removeChild(popover);
  }, 3000);
}

// Add event listener for click on the handle to trigger handleClick function
document.querySelector(".handle").addEventListener("click", handleClick);
