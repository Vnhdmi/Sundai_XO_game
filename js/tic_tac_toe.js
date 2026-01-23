"use strict";

// flag
let flag = "pen-flag";

// ターン数カウンター
let counter = 9;

// class="square" を取得
const squares = document.getElementsByClassName("square");

// Array に変換
const squaresArray = Array.from(squares);

// squaresの要素を取得
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

//class="level" を取得
const levels = document.querySelectorAll(".level");
// Array に変換
const level_1 = document.getElementById("level_1");
const level_2 = document.getElementById("level_2");
const level_3 = document.getElementById("level_3");


// Win or Lose Judgment Line
const line1 = JudgLine(squaresArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squaresArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

const lineRandom = cornerLine(squaresArray, ["a_1", "a_3", "c_1", "c_3"]);
let winningLine = null;

// メッセージ
const msgtxt1 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text">Penguins Attack! (your turn)</p>';
const msgtxt2 = '<p class="image"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text">WhiteBear Attack! (computer turn)</p>';
const msgtxt3 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!</p>';
const msgtxt4 = '<p class="image"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">WhiteBear Win!!</p>';
const msgtxt5 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__bounceIn">Draw!!</p>';

// sound effect
let gameSound = ["sound/click_sound1.mp3", "sound/click_sound2.mp3", "sound/penwin_sound.mp3", "sound/bearwin_sound.mp3", "sound/draw_sound.mp3"];

// 本体が読み込まれたタイミングで実行がるコード
window.addEventListener("DOMContentLoaded",
    function () {
        // メッセージ (最初はpenguins ターンから)
        setMessage("pen-turn");
        // squareがクリック可能かを判断するクラスを追加
        squaresArray.forEach(function (square) {
            square.classList.add("js-clickable");
        });

        LevelSetting(0); // default level 1

        // level ボタン クリック時、レベル設定
        let index;
        levels.forEach((level) => {
            level.addEventListener("click", () => {
                index = [].slice.call(levels).indexOf(level);
                LevelSetting(index);
            });
        });

    }, false
);

// Win or Lose Judgment Lineを配列化
function JudgLine(targetArray, idArray) {
    return targetArray.filter(function (e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}

// レベル設定　ボタン　
function LevelSetting(index) {
    level_1.classList.remove("level-selected");
    level_2.classList.remove("level-selected");
    level_3.classList.remove("level-selected");
    level_1.classList.remove("level_non_selected");
    level_2.classList.remove("level_non_selected");
    level_3.classList.remove("level_non_selected");

    if (sessionStorage.getItem("tic_tac_toe_access")) {
        switch (index) {
            case 0:
                sessionStorage.setItem("tic_tac_toe_access", "1");
                level_1.classList.add("level-selected");
                level_2.classList.add("level_non_selected");
                level_3.classList.add("level_non_selected");
                break;
            case 1:
                sessionStorage.setItem("tic_tac_toe_access", "2");
                level_1.classList.add("level_non_selected");
                level_2.classList.add("level-selected");
                level_3.classList.add("level_non_selected");
                break;
            case 2:
                sessionStorage.setItem("tic_tac_toe_access", "3");
                level_1.classList.add("level_non_selected");
                level_2.classList.add("level_non_selected");
                level_3.classList.add("level-selected");
                break;
        }


    } else {
        sessionStorage.setItem("tic_tac_toe_access", "1");
        level_1.classList.add("level-selected");
        level_2.classList.add("level_non_selected");
        level_3.classList.add("level_non_selected");
    }
}

function cornerLine(targetArray, idArray) {
    return targetArray.filter(function (e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2] || e.id === idArray[3]);
    });
}

// squareをクリックしたときにイベント発火(はっか)
// クリックしたsquareに、penguinsかbearを表示。画像を表示した
squaresArray.forEach(function (square) {
    square.addEventListener('click', () => {
        let gameOverFlg = isSelect(square);

        // GameOverではない場合、クマのターン (auto)
        if (gameOverFlg === "0") {
            const squaresBox = document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable");

            setTimeout(
                function () {
                    bearTurn();
                },
                "2000"
            );
        }
    });
});

// クリックしたsquareにはpenguinsかbearを表示。
function isSelect(selectSquare) {
    let gameOverFlg = "0";

    if (flag === "pen-flag") {
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-pen-checked");
        selectSquare.classList.add("js-unclickable");
        // squareがクリック可能かを判断するクラスを削除
        selectSquare.classList.remove("js-clickable");

        // penguins win
        if (isWinner("penguins")) {
            setMessage("pen-win");
            gameOver("penguins");
            return gameOverFlg = "1";
        }

        setMessage("bear-turn");
        flag = "bear-flag";

    } else {
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");
        // squareがクリック可能かを判断するクラスを削除
        selectSquare.classList.remove("js-clickable");

        // white-bear win
        if (isWinner("bear")) {
            setMessage("bear-win");
            gameOver("bear");
            return gameOverFlg = "1";
        }

        setMessage("pen-turn");
        flag = "pen-flag";
    }

    // カウンター
    counter--;

    // ターン数 l=0 になったらDRAW
    if (counter === 0) {
        setMessage("draw");
        gameOver("draw");
        return gameOverFlg = "1";
    }

    return gameOverFlg = "0";
}

// 勝敗判定
function isWinner(symbol) {
    const result = lineArray.some(function (line) {
        const subResult = line.every(function (square) {
            if (symbol === "penguins") {
                return square.classList.contains("js-pen-checked");
            }
            if (symbol === "bear") {
                return square.classList.contains("js-bear-checked");
            }
        });
        if (subResult) {
            winningLine = line
        }
        return subResult;
    });
    return result;
}

// メッセージ切り替え関数
function setMessage(id) {
    switch (id) {
        case "pen-turn":
            document.getElementById("msgtext").innerHTML = msgtxt1;
            break;
        case "bear-turn":
            document.getElementById("msgtext").innerHTML = msgtxt2;
            break;
        case "pen-win":
            document.getElementById("msgtext").innerHTML = msgtxt3;
            break;
        case "bear-win":
            document.getElementById("msgtext").innerHTML = msgtxt4;
            break;
        case "draw":
            document.getElementById("msgtext").innerHTML = msgtxt5;
            break;
    }
}

// ゲーム終了時の処理
function gameOver(status) {
    let w_sound;
    switch (status) {
        case "penguins":
            w_sound = gameSound[2];
            break;
        case "bear":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break;
    }
    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();

    // squares-boxをクリックできないようにする
    const squaresBox = document.getElementById("squaresBox");
    squaresBox.classList.add("js-unclickable");

    if (status === "penguins" && winningLine) {
        winningLine.forEach(square => square.classList.add("js-pen_highLight"));
        $(document).snowfall({ flakeColor: "rgb(255,240,245)", maxSpeed: 3, minSpeed: 1, maxSize: 20, minSize: 10, round: true });
    } else if (status === "bear" && winningLine) {
        winningLine.forEach(square => square.classList.add("js-bear_highLight"));
        $(document).snowfall({ flakeColor: "rgb(175,238,238)", maxSpeed: 3, minSpeed: 1, maxSize: 20, minSize: 10, round: true });
    }
    newgamebtn_display.classList.remove("js-hidden");
}

/************************************************************/
/* New Game ボタン                                          */
/************************************************************/
const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

// NewGameボタン クリック時、ゲーム初期化
newgamebtn.addEventListener("click", function () {
    // penguins ターン
    flag = "pen-flag";

    // ターン数カウンター
    counter = 9;

    winningLine = null;
    squaresArray.forEach(function (square) {
        square.classList.remove("js-pen-checked");
        square.classList.remove("js-bear-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-pen_highLight");
        square.classList.remove("js-bear_highLight");
        // マス目に、クリック可能かを判断するクラスを追加
        square.classList.add("js-clickable");
    });

    // マス目のエリアのプロテクトを解除
    const squaresBox = document.getElementById("squaresBox");
    squaresBox.classList.remove("js-unclickable");

    setMessage("pen-turn");
    newgamebtn_display.classList.add("js-hidden");
    // snowfall stop
    $(document).snowfall("clear");
});

// クマのターン
function bearTurn() {
    let bearTurnEnd = "0";
    let gameOverFlg = "0";
    while (bearTurnEnd === "0") {

        bearTurnEnd = isReach("bear");
        if (bearTurnEnd === "1") {
            gameOverFlg = "1";
            break;
        }

        bearTurnEnd = isReach("penguins");
        if (bearTurnEnd === "1") {
            break;
        }

        // クリックできるマス目を抽出する。
        const bearSquare = squaresArray.filter(function (square) {
            return square.classList.contains("js-clickable");
        });

        // クリックできるマス目の中から、1つをランダムに選ぶ。
        let n = Math.floor(Math.random() * bearSquare.length);

        // 選択したマス目の処理
        gameOverFlg = isSelect(bearSquare[n]);
        break;
    }

    // GameOverではない場合、マス目のエリアをクリックできるようにする。
    if (gameOverFlg === "0") {
        const squaresBox = document.getElementById("squaresBox");
        squaresBox.classList.remove("js-unclickable");
    }
}

// ***********************************************
// リーチ行をさがす
// ***********************************************
function isReach(status) {
    let bearTurnEnd = "0";  // クマのターン "1":終了

    lineArray.some(function (line) {
        let bearCheckCnt = 0;  // クマがチェックされている数
        let penCheckCnt = 0;   // ペンギンがチェックされている数

        line.forEach(function (square) {
            if (square.classList.contains("js-bear-checked")) {
                bearCheckCnt++; // クマがチェックされている数
            }
            if (square.classList.contains("js-pen-checked")) {
                penCheckCnt++; // ペンギンがチェックされている数
            }
        });

        // クマのリーチ行検索時に、クマのリーチ行あり
        if (status === "bear" && bearCheckCnt === 2 && penCheckCnt === 0) {
            bearTurnEnd = "1"; // クマのリーチ行あり
        }

        // ペンギンのリーチ行検索時に、ペンギンのリーチ行あり
        if (status === "penguins" && bearCheckCnt === 0 && penCheckCnt === 2) {
            bearTurnEnd = "1"; // クマのリーチ行あり
        }

        // クマかペンギンのリーチ行ありの場合、空いているマス目を選択する
        if (bearTurnEnd === "1") {
            line.some(function (square) {
                if (square.classList.contains("js-clickable")) {
                    isSelect(square);
                    return true; // line378 の line.some の loop をぬける
                }
            })
            return true; // line353 の lineArray.some の loop をぬける
        }
    });

    return bearTurnEnd;
}