fetchData("https://fdnd.directus.app/items/women_in_tech").then((data) => {
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
    row.style.setProperty("--quantity", 10);

    const li = row.children;
    li[0].style.setProperty("--position", 1);

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

      li[i].style.setProperty("--position", i + 1);
    }
  });
});
