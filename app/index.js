let cardArray = [
    {
        id: 1,
        name: "earth",
        img: "./app/assets/earth.svg",
    },
    {
        id: 2,
        name: "jupiter",
        img: "./app/assets/jupiter.svg",
    },
    {
        id: 3,
        name: "mars",
        img: "./app/assets/mars.svg",
    },
    {
        id: 4,
        name: "mercury",
        img: "./app/assets/mercury.svg",
    },
    {
        id: 5,
        name: "saturn",
        img: "./app/assets/saturn.svg",
    },
    {
        id: 6,
        name: "uranus",
        img: "./app/assets/uranus.svg",
    },
    {
        id: 7,
        name: "earth",
        img: "./app/assets/earth.svg",
    },
    {
        id: 8,
        name: "jupiter",
        img: "./app/assets/jupiter.svg",
    },
    {
        id: 9,
        name: "mars",
        img: "./app/assets/mars.svg",
    },
    {
        id: 10,
        name: "mercury",
        img: "./app/assets/mercury.svg",
    },
    {
        id: 11,
        name: "saturn",
        img: "./app/assets/saturn.svg",
    },
    {
        id: 12,
        name: "uranus",
        img: "./app/assets/uranus.svg",
    },
];

const randomArrayGenerator = (originalArray) => {
    let copyArray = [...originalArray];
    let randomArray = [];

    for (let i = 0; i < originalArray.length; i++) {
        let randomIndex = Math.floor(Math.random() * copyArray.length);
        randomArray.push(copyArray.splice(randomIndex, 1)[0]);
    }

    return randomArray;
};

window.onload = () => {
    const arrayGame = randomArrayGenerator(cardArray);
    console.log(arrayGame);
    pintarJuego(arrayGame);
    showPlanet(arrayGame);
    setNewGame();
};

const pintarJuego = (arrayGame) => {
    const container$$ = document.getElementById("container");
    arrayGame.forEach((el) => {
        const imgContainer$$ = document.createElement("div");
        const img$$ = document.createElement("img");
        img$$.setAttribute("src", "./app/assets/universe.svg");
        img$$.classList.add(el.name);
        img$$.setAttribute("id", el.id);
        imgContainer$$.classList.add("img-container");
        imgContainer$$.appendChild(img$$);
        container$$.appendChild(imgContainer$$);
    });
};

const score$$ = document.querySelector('[data-function="score"]');
const attemps$$ = document.querySelector('[data-function="attempts"]');

let score = 0;
let attemps = 0;

let firstPlanet = "";
let secondPlanet = "";

let firstId = 0;
let secondId = 0;

const countScore = (counter) => {
    let currentPercentage = counter * 16.666;
    console.log(currentPercentage);
    document.querySelector(".progress").style.width = `${currentPercentage}%`;
    counter === 6
        ? (document.querySelector(".progress").style.borderBottomRightRadius =
              "10px")
        : (document.querySelector(".progress").style.borderBottomRightRadius =
              "0px");
};

const showPlanet = (arrayGame) => {
    const images$$ = document.querySelectorAll("img");
    images$$.forEach((el) => {
        el.addEventListener("click", () => {
            const planetId = el.getAttribute("id");
            const planet = arrayGame.find((element) => element.id == planetId);

            if (el.getAttribute("src") === "./app/assets/tick.svg") {
                alert("prueba otra");
            } else {
                el.setAttribute("src", planet.img);
            }

            console.log("me has clickado");

            firstPlanet === ""
                ? (firstPlanet = planet.name)
                : (secondPlanet = planet.name);

            firstId === 0 ? (firstId = planet.id) : (secondId = planet.id);

            if (secondId != 0) {
                attemps += 1;
                setTimeout(() => {
                    attemps$$.innerHTML = attemps;
                }, 500);
            }

            empezarDeCero(images$$);
            acertarPlaneta(images$$);
            fallarPlaneta(images$$);
            clickRepe(images$$);
            setDefaultValues();
        });
    });
};

const acertarPlaneta = (param) => {
    param.forEach((el) => {
        if (
            firstPlanet === secondPlanet &&
            firstId != secondId &&
            firstId == el.getAttribute("id")
        ) {
            setTimeout(() => {
                el.setAttribute("src", "./app/assets/tick.svg");
            }, 500);
            score += 1;
        } else if (
            firstPlanet === secondPlanet &&
            firstId != secondId &&
            secondId == el.getAttribute("id")
        ) {
            setTimeout(() => {
                el.setAttribute("src", "./app/assets/tick.svg");
            }, 500);
            score += 1;
        } else if (score % 2 === 0) {
            setTimeout(() => {
                counter = score / 2;
                score$$.innerHTML = counter;
                countScore(counter);
            }, 1000);
        }
    });
};

const fallarPlaneta = (param) => {
    param.forEach((el) => {
        if (
            firstPlanet != secondPlanet &&
            secondId != 0 &&
            firstId == el.getAttribute("id") &&
            firstId != secondId &&
            firstId != 0 &&
            firstPlanet != "" &&
            secondPlanet != "" &&
            el.getAttribute("src") != "./app/assets/tick.svg"
        ) {
            setTimeout(() => {
                el.setAttribute("src", "./app/assets/universe.svg");
            }, 500);
        } else if (
            firstPlanet != secondPlanet &&
            secondId != 0 &&
            secondId == el.getAttribute("id") &&
            firstId != secondId &&
            firstId != 0 &&
            firstPlanet != "" &&
            secondPlanet != "" &&
            el.getAttribute("src") != "./app/assets/tick.svg"
        ) {
            setTimeout(() => {
                el.setAttribute("src", "./app/assets/universe.svg");
            }, 500);
        }
    });
};

const clickRepe = (param) => {
    param.forEach((el) => {
        if (
            firstPlanet === secondPlanet &&
            firstId === secondId &&
            secondId != 0 &&
            firstId == el.getAttribute("id")
        ) {
            alert("You have click the same card, try again!");
            el.setAttribute("src", "./app/assets/universe.svg");
            firstId = 0;
        } else if (
            firstPlanet === secondPlanet &&
            firstId === secondId &&
            secondId != 0 &&
            secondId == el.getAttribute("id")
        ) {
            alert("You have click the same card, try again!");
            el.setAttribute("src", "./app/assets/universe.svg");
            secondId = 0;
        }
    });
};

const empezarDeCero = (param) => {
    param.forEach((el) => {
        if (
            el.getAttribute("src") == "./app/assets/tick.svg" &&
            el.getAttribute("id") == firstId &&
            secondId == 0
        ) {
            firstPlanet = "";
            secondPlanet = "";
            firstId = 0;
            secondId = 0;
        }
    });
};

const setDefaultValues = () => {
    if (firstPlanet === secondPlanet && firstId != secondId) {
        firstPlanet = "";
        secondPlanet = "";
        firstId = 0;
        secondId = 0;
    } else if (secondPlanet != "" && firstPlanet != secondPlanet) {
        firstPlanet = "";
        secondPlanet = "";
        firstId = 0;
        secondId = 0;
    }
};

const setNewGame = () => {
    const btnNewGame$$ = document.getElementById("start-game");

    btnNewGame$$.addEventListener("click", () => {
        window.location.href =
            "http://127.0.0.1:5500/extra/Memory-game/index.html";
    });
};
