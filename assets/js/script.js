const options = document.querySelector(".dashboard-options");
const currentTimes = document.querySelectorAll(".current-time");
const lastTimes = document.querySelectorAll("card-last-time");
const categories = new Map(
  [...document.querySelectorAll(".card")].map((card) => [
    card.dataset.category,
    card,
  ]),
);

const labels = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

function removeActiveState(allOptions) {
  for (const option of allOptions) {
    if (option.classList.contains("active")) {
      option.classList.toggle("active");
      break;
    }
  }
}

options.addEventListener("click", async (e) => {
  if (e.target.classList.contains("active")) return;

  const allOptions = document.querySelectorAll(".dashboard-options p");

  removeActiveState(allOptions);

  e.target.classList.toggle("active");

  try {
    const response = await fetch("./assets/data.json");

    if (!response.ok) console.log("Error Occured!!: ");

    const data = await response.json();

    for (const { title, timeframes } of data) {
      const key = title.toLowerCase().replace(/\s+/g, "-");
      const category = categories.get(key);

      if (!category) continue;

      const activeOption = e.target.textContent.toLowerCase();

      const current = timeframes[activeOption].current;
      const previous = timeframes[activeOption].previous;

      category.querySelector(".current-time").textContent = `${current}hrs`;
      category.querySelector(".card-last-time").textContent =
        `${labels[activeOption]} - ${previous}hrs`;
    }
  } catch (error) {
    console.error("Error Occured!!: " + error);
  }
});
