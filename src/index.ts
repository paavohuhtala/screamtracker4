const screamStart = document.getElementById("scream-start") as HTMLAudioElement;
const screamLoop = document.getElementById("scream-loop") as HTMLAudioElement;
const screamEnd = document.getElementById("scream-end") as HTMLAudioElement;

const screamRows = document.getElementById("scream-rows") as HTMLElement;

let screamStartTime: Date | null = null;

let longestScream = 0;

const now = new Date();
const startDate = document.getElementById("start-date") as HTMLSpanElement;
startDate.textContent = `${now.getFullYear()}-${(now.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

function handler() {
  screamLoop.play();
  screamLoop.loop = true;
  screamStart.removeEventListener("ended", handler);
}

document.addEventListener("keydown", (event) => {
  if (event.key === " " && !event.repeat) {
    screamStart.addEventListener("ended", handler);

    screamStart.play();

    screamStartTime = new Date();
  }
});

document.addEventListener("keyup", (event) => {
  if (!screamStartTime || event.key !== " ") {
    return;
  }

  screamLoop.pause();
  screamLoop.currentTime = 0;
  screamStart.removeEventListener("ended", handler);
  screamEnd.play();

  const placeholder = document.querySelector(
    ".scream-placeholder"
  ) as HTMLElement | null;
  placeholder?.remove();

  const row = document.createElement("tr");
  row.classList.add("scream-row");

  const indexElement = document.createElement("td");
  indexElement.textContent = `${screamRows.children.length}`.padStart(2, "0");
  row.appendChild(indexElement);

  const timeElement = document.createElement("td");
  timeElement.textContent = new Date().toISOString();
  row.appendChild(timeElement);

  const duration = new Date().getTime() - screamStartTime.getTime();

  const durationElement = document.createElement("td");
  durationElement.textContent = `${
    new Date().getTime() - screamStartTime.getTime()
  } ms`;
  row.appendChild(durationElement);

  if (duration > longestScream) {
    longestScream = duration;

    for (const element of document.querySelectorAll(".blinkenlights")) {
      element.classList.remove("blinkenlights");
      element.textContent = "";
    }

    const newRecord = document.createElement("td");
    newRecord.textContent = `NEW RECORD!`;
    newRecord.classList.add("blinkenlights");

    row.appendChild(newRecord);
  } else {
    row.appendChild(document.createElement("td"));
  }

  screamRows.appendChild(row);
});
