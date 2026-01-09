"use strict";

// flag
// "pen-flag"のときpenguinsのターン、 "bear-flag"のときbearのターン
let flag = "pen-flag"; // A: Đáp án từ hình ảnh

// ターン数カウンター
let counter = 9; // C: Đáp án (9 ô)

// squaresの要素を取得
const a_1 = document.getElementById("a_1"); // D: Đáp án
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

// NewGameボタン取得 (Chưa có trong bài này)

// Win or Lose Judgment Line (Chưa có trong bài này)

// メッセージ
const msgtxt1 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text">Penguins Attack!</p>';
const msgtxt2 = '<p class="image"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text">WhiteBear Attack!</p>';

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
    function() {
        // メッセージ(最初はpenguinsのターンから)
        setMessage("pen-turn");
    }, false
);

// squareをクリックしたときにイベント発火
// クリックしたsquareに、penguinsかbearを表示。画像を表示したsquareはクリックできないようにする
// Win or Lose Judgementの呼び出し

// E-1: Cách viết đầy đủ (Longhand) cho ô a_1
a_1.addEventListener("click",
    function() {
        isSelect(a_1);
    }, false
);

// E-2 ~ E-9: Cách viết tắt (Shorthand) cho các ô còn lại
a_2.addEventListener("click", () => {
    isSelect(a_2);
});

a_3.addEventListener("click", () => {
    isSelect(a_3);
});

b_1.addEventListener("click", () => {
    isSelect(b_1);
});

b_2.addEventListener("click", () => {
    isSelect(b_2);
});

b_3.addEventListener("click", () => {
    isSelect(b_3);
});

c_1.addEventListener("click", () => {
    isSelect(c_1);
});

c_2.addEventListener("click", () => {
    isSelect(c_2);
});

c_3.addEventListener("click", () => {
    isSelect(c_3);
});

// クリックしたsquareにはpenguinsかbearを表示。
// ・表示したところはクリックできないようにする。
function isSelect(selectSquare) {

    if (flag === "pen-flag") {
        // Penguins turn
        // F-1: Thêm class hiển thị hình chim cánh cụt
        selectSquare.classList.add("js-pen-checked"); //

        // G: Khóa ô lại không cho click nữa
        selectSquare.classList.add("js-unclickable"); //

        // H-1: Đổi thông báo sang lượt của Gấu
        setMessage("bear-turn"); //
        
        // B: Đổi cờ sang Gấu
        flag = "bear-flag"; //

    } else {
        // Bear turn
        // F-2: Thêm class hiển thị hình gấu trắng
        selectSquare.classList.add("js-bear-checked"); //

        // G: Khóa ô lại không cho click nữa
        selectSquare.classList.add("js-unclickable"); //

        // H-2: Đổi thông báo sang lượt của Chim cánh cụt
        setMessage("pen-turn"); //

        // A: Đổi cờ sang Chim cánh cụt
        flag = "pen-flag"; //
    }

    // i: Giảm số lượt đi còn lại
    counter--; //

    // ターン数=0になったらDRAW
    if (counter === 0) {
        setMessage("draw");
    }
}

// メッセージ切り替え関数
// J: Hàm setMessage hoàn chỉnh
function setMessage(id) {
    switch (id) {
        case "pen-turn":
            document.getElementById("msgtext").innerHTML = msgtxt1;
            break;
        case "bear-turn":
            document.getElementById("msgtext").innerHTML = msgtxt2;
            break;
        default:
            document.getElementById("msgtext").innerHTML = msgtxt1;
    }
}

// ゲーム終了時の処理 (Chưa có trong bài này)

// NewGameボタン クリック時、ゲーム初期化 (Chưa có trong bài này)