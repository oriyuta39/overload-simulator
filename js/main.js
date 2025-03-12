
let lockstatus = [false,false,false];

let firstroll = true;

//オプションロック関数
function button_lock_clicked(button,row) {
    if (optionsResult[0] == "-") return;
    
    // 画像の要素を取得
    const image = button.querySelector("img");
    
    // 条件に応じて画像を切り替え
    if (!lockstatus[row]) {
        // 2つ以上ロック状態ならばreturn
        if (lockstatus.filter(value => value === true).length == 2) return;
        image.src = "images/lock.png"; // 次の画像 
        // カスタムモジュール計算
        cModuleLockUsageCounter(true)
    } else {
        image.src = "images/unlock.png"; // 初期画像に戻す
        // カスタムモジュール計算
        cModuleLockUsageCounter(false)
    }
    // クリックしたボタンに"clicked"クラスを切り替え
    button.classList.toggle("clicked");
    // ロック状態変更
    lockstatus[row] = !lockstatus[row]
}

//武器改造&効果変更関数
function button_roll_effect_clicked(){
    firstroll = overload_roll(lockstatus,firstroll)
    effectChangeCounter();
    firstOverloadChecked(false)
}

//数値変更関数
function button_roll_value_clicked(){
    if (optionsResult[0] == "-") return;

    selectOptionRank(lockstatus)
    option_result();
    valueChangeCounter();
}

//リセット関数
function reset_option(){
    lockstatus = [false,false,false];
    document.querySelectorAll("img").forEach(function(img) {
        img.src = "images/unlock.png";  // すべての画像をリセット
    });
    document.querySelectorAll("button").forEach(function(button) {
        button.classList.toggle("clicked",false);  // button.clickedの既存クラスを削除
    });
    option_result(true)

    resetCounter()

    firstOverloadChecked(true)

}

//オプション選択適用
function options_select_apply() {
    const select_gets = select_get();
    if (select_gets.optionsResult[0] == "-") return
    firstOverloadChecked(false)
    select_apply(select_gets);
}
