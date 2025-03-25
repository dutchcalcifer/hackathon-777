// Fetch the data from the API and store it in the fetchedData variable
fetchData("https://fdnd.directus.app/items/women_in_tech").then((data) => {
  fetchedData = data;
  addWomen(fetchedData);
});

// Function to add the women of tech to the slots
function addWomen(data) {
  const getWinningPerson = () => {
    // Randomly decide if there should be a winning person
    const isWinning = Math.random() < 0.5;
    // Return the winning person if there should be one
    return isWinning ? getRandomPerson(data.length) : null;
  };

  const getRandomPerson = (arrayLength) =>
    // Get a random number between 0 and the length of the array
    Math.floor(Math.random() * arrayLength);

  const get9RandomPeople = (arrayLength) => {
    const numbers = new Set();

    // Keep generating random numbers until we have 9 unique numbers
    while (numbers.size < 9) {
      numbers.add(Math.floor(Math.random() * arrayLength));
    }

    return Array.from(numbers);
  };

  const winningPerson = getWinningPerson();

  // Loop through all the ul elements and add the images to the li elements
  document.querySelectorAll("ul").forEach((row) => {
    const li = row.children;

    // If there is a winning person, set the first image to the winning person
    if (winningPerson !== null) {
      li[0].children[0].src = `https://fdnd.directus.app/assets/${data[winningPerson].image}`;
    } else {
      // Otherwise, set it to a random person
      li[0].children[0].src = `https://fdnd.directus.app/assets/${
        data[getRandomPerson(data.length)].image
      }`;
    }

    // Set the other 9 images to random people
    const otherSlots = get9RandomPeople(data.length);
    for (let i = 1; i < 10; i++) {
      const imgSRC = data[otherSlots[i - 1]].image; // Get image URL
      li[i].children[0].src = `https://fdnd.directus.app/assets/${imgSRC}`;
    }
  });

  return winningPerson;
}

// Function to add the animation to the slots
function addAnimation() {
  // Reset the animation on all the ul elements
  document.querySelectorAll("ul").forEach((row) => (row.style.animation = ""));

  // After a short delay, add the animation to all the ul elements
  requestAnimationFrame(() => {
    document
      .querySelectorAll("ul")
      .forEach(
        (row) => (row.style.animation = "spin 5s var(--delay) ease-out")
      );
  });
}

// Function to handle the click event on the handle
function handleClick() {
  // Remove animation from body
  document.body.style.animation = "none";
  // Add the animation to the slots
  addAnimation();

  // After a short delay, add the women to the slots and show the winning popover if there is a winning person
  setTimeout(function () {
    const winningPerson = addWomen(fetchedData);

    if (winningPerson) {
      showWinningPopover(winningPerson);
      // Add winning animation after a short delay
      setTimeout(() => (document.body.style.animation = "light-animation .5s infinite"), 4000);
    }
  }, 1000);

  // Hide the popover
  document.querySelector(".popover").style.display = "none";
}

// Function to show the winning popover
function showWinningPopover(person) {
  const winningPerson = fetchedData[person];

  const popover = document.querySelector(".popover");

  const fields = {
    image: "image",
    name: "name",
    tagline: "tagline",
    work: "work",
    github: "github",
    website: "website",
    codepen: "codepen",
  };

  // Loop through all the fields and add the values to the corresponding elements
  for (const [key, fieldId] of Object.entries(fields)) {
    const value = winningPerson[fieldId];

    const element = document.getElementById(key);

    switch (element.tagName.toLowerCase()) {
      case "img":
        element.src = value ? `https://fdnd.directus.app/assets/${value}` : "#";
        break;

      case "a":
        element.href = value || "#";
        break;

      default:
        element.textContent = value || "none";
    }
  }

  // Show the popover after a short delay
  setTimeout(() => (popover.style.display = "block"), 6000);
}

// Add the event listener to the handle
document.querySelector(".handle").addEventListener("click", handleClick);

// Add the event listener to the document to play the soundtrack when the user clicks anywhere on the page
document.addEventListener("click", function () {
  let audio = document.getElementById("soundtrack");
  audio.muted = false;
  audio.play();
});
