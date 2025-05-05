document.addEventListener("DOMContentLoaded", () => {

    let turnOfX = true;
    let turnesPlayed = 0;
    let winner = null;

    let scoreBlue = 0;
    let scoreGreen = 0;

    // show score from the beginning
    document.getElementById("scoreBlue").innerHTML = `blue: ${scoreBlue}`;
    document.getElementById("scoreGreen").innerHTML = `green: ${scoreGreen}`;

    // get all elements with class "check"
    // const elements = document.querySelectorAll(".check");
    // make them easy accessable by id
    /*const elementsByID = {};
    elements.forEach(element => {
        elementsByID[element.id] = element; 
    });*/
    // same thing in
    const elements = Object.fromEntries(
        Array.from(document.querySelectorAll(".check")).map(element => [element.id, element])
    );

    // elements.forEach((element) => { - had to be adjusted because we are now working with an object
    Object.values(elements).forEach((element) => {
        element.addEventListener("click", cangeToPlayerColor); 
    });
    
    // create colorchange-function - needet for removeEventListener
    function cangeToPlayerColor(e) {
        if (turnOfX) {
            e.target.style.backgroundColor = "blue";
        } else {
            e.target.style.backgroundColor = "green";
        }
        e.target.removeEventListener("click", cangeToPlayerColor);
        turnOfX = !turnOfX;
        turnesPlayed++;
        checkIfGameOver();
        // console.log(turnesPlayed);
    };

    // check if one player won
    function checkIfGameOver() {
        // first row
        if (elements.aa.style.backgroundColor === elements.ab.style.backgroundColor &&
            elements.aa.style.backgroundColor === elements.ac.style.backgroundColor &&
            elements.aa.style.backgroundColor !== "") {
                winner = elements.aa.style.backgroundColor;
        // second row
        } else if (elements.ba.style.backgroundColor === elements.bb.style.backgroundColor &&
            elements.ba.style.backgroundColor === elements.bc.style.backgroundColor &&
            elements.ba.style.backgroundColor !== "") {
                winner = elements.ba.style.backgroundColor;
        // third row
        } else if (elements.ca.style.backgroundColor === elements.cb.style.backgroundColor &&
            elements.ca.style.backgroundColor === elements.cc.style.backgroundColor &&
            elements.ca.style.backgroundColor !== "") {
                    winner = elements.ca.style.backgroundColor;
        // first column
        } else if (elements.aa.style.backgroundColor === elements.ba.style.backgroundColor &&
            elements.aa.style.backgroundColor === elements.ca.style.backgroundColor &&
            elements.aa.style.backgroundColor !== "") {
                winner = elements.aa.style.backgroundColor;
        // secont column
        } else if (elements.ab.style.backgroundColor === elements.bb.style.backgroundColor &&
            elements.ab.style.backgroundColor === elements.cb.style.backgroundColor &&
            elements.ab.style.backgroundColor !== "") {
                winner = elements.ab.style.backgroundColor;
        // third column
        } else if (elements.ac.style.backgroundColor === elements.bc.style.backgroundColor &&
            elements.ac.style.backgroundColor === elements.cc.style.backgroundColor &&
            elements.ac.style.backgroundColor !== "") {
                winner = elements.ac.style.backgroundColor;
        // diagonal top left to bottom right
        } else if (elements.aa.style.backgroundColor === elements.bb.style.backgroundColor &&
                elements.aa.style.backgroundColor === elements.cc.style.backgroundColor &&
                elements.aa.style.backgroundColor !== "") {
                    winner = elements.aa.style.backgroundColor;
        // diagonal top right to bottom left
        } else if (elements.ac.style.backgroundColor === elements.bb.style.backgroundColor &&
            elements.ac.style.backgroundColor === elements.ca.style.backgroundColor &&
            elements.ac.style.backgroundColor !== "") {
                winner = elements.ac.style.backgroundColor;
        }
        // console.log(winner);
        // console.log(turnesPlayed);

        // display result
        if (winner != null) {
            disableBoard();
            if (winner === "blue") {
                scoreBlue++;
            } else {
                scoreGreen++;
            }
            document.getElementById("scoreBlue").innerHTML = `blue: ${scoreBlue}`;
            document.getElementById("scoreGreen").innerHTML = `green: ${scoreGreen}`;
            document.getElementById("message").innerHTML = `Winner: ${winner}!`;
            document.getElementById("messageBoard").style.backgroundColor = winner;
            document.getElementById("messageBoard").style.display = "block";
            // console.log(`Winner: ${winner}!`);
        } else if (winner === null && turnesPlayed === 9) {
            document.getElementById("message").innerHTML = `Draw!`;
            document.getElementById("messageBoard").style.backgroundColor = "#d5d5d5";
            document.getElementById("messageBoard").style.display = "block";
            // console.log(`Draw!`);
        }
    };
    
    // disable board if game is over
    function disableBoard() {
        Object.values(elements).forEach((element) => {
            element.removeEventListener("click", cangeToPlayerColor);
        });
    };

    // reset board for new game
    document.getElementById("again").addEventListener("click", resetBoard);

    function resetBoard() {
        Object.values(elements).forEach((element) => {
            element.addEventListener("click", cangeToPlayerColor); 
            element.style.backgroundColor = "";
            turnOfX = true;
            turnesPlayed = 0;
            winner = null;
            document.getElementById("messageBoard").style.display = "none";
            document.getElementById("messageBoard").style.backgroundColor = "";
        });
    };

    // reset score
    document.getElementById("resetScore").addEventListener("click", () => {
        scoreBlue = 0;
        scoreGreen = 0;
        document.getElementById("scoreBlue").innerHTML = `blue: ${scoreBlue}`;
        document.getElementById("scoreGreen").innerHTML = `green: ${scoreGreen}`;
    })
});