    // オプションとその対応する値の定義
const options = {
    "有利コードダメージ増加": [9.54, 10.94, 12.34, 13.75, 15.15, 16.55, 17.95, 19.35, 20.75, 22.15, 23.56, 24.96, 26.36, 27.76, 29.16],
    "クリティカル率増加": [2.30, 2.64, 2.98, 3.32, 3.66, 4.00, 4.35, 4.69, 5.03, 5.37, 5.71, 6.05, 6.39, 6.73, 7.07],
    "クリティカルダメージ増加": [6.64, 7.62, 8.60, 9.58, 10.56, 11.54, 12.52, 13.50, 14.48, 15.46, 16.44, 17.42, 18.40, 19.38, 20.36],
    "最大装弾数増加": [27.84, 31.95, 36.06, 40.17, 44.28, 48.39, 52.50, 56.60, 60.71, 64.82, 68.93, 73.04, 77.15, 81.26, 85.37],
    "チャージ速度増加": [1.98, 2.28, 2.57, 2.86, 3.16, 3.45, 3.75, 4.04, 4.33, 4.63, 4.92, 5.21, 5.51, 5.80, 6.09],
    "チャージダメージ増加": [4.77, 5.47, 6.18, 6.88, 7.59, 8.29, 9.00, 9.70, 10.40, 11.11, 11.81, 12.52, 13.22, 13.93, 14.63],
    "命中率増加": [4.77, 5.47, 6.18, 6.88, 7.59, 8.29, 9.00, 9.70, 10.40, 11.11, 11.81, 12.52, 13.22, 13.93, 14.63],
    "防御力増加": [4.77, 5.47, 6.18, 6.88, 7.59, 8.29, 9.00, 9.70, 10.40, 11.11, 11.81, 12.52, 13.22, 13.93, 14.63],
    "攻撃力増加": [4.77, 5.47, 6.18, 6.88, 7.59, 8.29, 9.00, 9.70, 10.40, 11.11, 11.81, 12.52, 13.22, 13.93, 14.63],
};

// ランクと確率の定義
const optionRanks = Array.from({ length: 15 }, (_, i) => i + 1); // ランク: 1〜15
const optionWeights = [10, 10, 12, 12, 12, 12, 12, 10, 10]; // オプションの選択確率
const rankWeights = [12, 12, 12, 12, 12, 7, 7, 7, 7, 7, 1, 1, 1, 1, 1]; // ランクの選択確率

// 結果を格納する配列
let optionsResult = ["-","-","-"]; // 選ばれたオプション
let rankResult = ["-","-","-"]; // 選ばれたランク
let optionsValue = ["-","-","-"]; // 選ばれた値

const chance_val = [100,50,30]; // 各スロットの付与率

function overload_roll(lockstatus,firstroll) {

    // オプションを3回選択 (確率 100%, 50%, 30%)
    for (let i = 0; i < lockstatus.length; i++) {
        if(lockstatus[i]){
            continue
        }
            optionsResult[i] = "-"; // 選ばれたオプション
            rankResult[i] = "-"; // 選ばれたランク
            optionsValue[i] = "-"; // 選ばれた値
            selectOption(chance_val[i], i);
    }
    selectOptionRank();

    // --- 結果の表示 ---
    console.log(optionsResult);
    console.log(optionsValue);
    console.log(rankResult);
    option_result();
    return firstroll = false;
}

// オプション抽選
function selectOption(chance,row) {

    //指定された確率でオプションを選択する。失敗した場合は "-" を追加。
    if (Math.random() * 100 <= chance) {
        for (let i = 0; i < 100; i++) {
            const selected = weightedRandom(Object.keys(options), optionWeights);
            if (!optionsResult.includes(selected)) {
                optionsResult.splice(row,1,selected);
                
                break;
            }
        }
    }else {
        optionsResult.splice(row,1,"-");
    }
}

// --- ランクと値の抽選 ---
function selectOptionRank() {
    for (let i = 0; i < optionsResult.length ; i ++){
        if(lockstatus[i]){
            continue
        }
        
        for (let j = 0; j < Object.keys(options).length ; j++){
            if (optionsResult[i] == Object.keys(options)[j]){
    
                let rank = null;
    
                // 初回ロールはランク11
                if (firstroll){
                    rank = 11;
                    rankResult.splice(i,1,rank);
                }else {
                // ランクを選択
                rank = weightedRandom(optionRanks, rankWeights);
                rankResult.splice(i,1,rank); 
                }
    
                // 値を取得
                const value = options[Object.keys(options)[j]][rank - 1].toFixed(2);
                optionsValue.splice(i,1,value);
            }
            
        }
    }
}

// --- 結果の表示 ---
function option_result(reset) {

    for (let i = 0; i < 3; i++) {

        const option_name_i = document.getElementById("option_name_"+i)
        const option_i = document.getElementById("option_"+i)
        const option_value_i = document.getElementById("option_value_"+i)
        const option_rank_i = document.getElementById("option_rank_"+i)
        // 装飾解除
        option_i.classList.remove("black_white", "gray");
        option_name_i.classList.remove("gray");
        option_value_i.classList.remove("blue", "gray");
        option_rank_i.classList.remove("red", "orange", "green");

        // 効果未獲得もしくは引数がtrueならば効果未獲得表示
        if (optionsResult[i] == "-" || reset) {
            option_name_i.innerHTML = "効果未獲得"
            option_value_i.innerHTML = ``;
            option_rank_i.innerHTML = ``;
            option_i.classList.add("gray");
            if (reset){
                optionsResult[i] = "-";
                rankResult[i] = "-";
                optionsValue[i] = "-";
                continue
            }
        } else {
            option_name_i.innerHTML = `${optionsResult[i]}`;
            option_value_i.innerHTML = `${optionsValue[i]}%`;
            option_rank_i.innerHTML = `${rankResult[i]}`;
        }
        
        // ランクに応じて数値の色を変更
        if (rankResult[i] == 15) {
            option_value_i.classList.add("blue");
            option_i.classList.add("black_white");
        } else if (rankResult[i] >= 12) {
            option_value_i.classList.add("blue");
        }

        // ランクに応じてランクの色を変更
        if (rankResult[i] <= 5) {
            option_rank_i.classList.add("green");
        } else if (rankResult[i] <= 10) {
            option_rank_i.classList.add("orange");
        } else if (rankResult[i] <= 15) {
            option_rank_i.classList.add("red");
        } else {
            
        }

    }
}

// itemsとweightsに基づいて重み付きランダム選択
function weightedRandom(items, weights) {
    const randomWeight = Math.random() * weights.reduce((sum, weight) => sum + weight, 0);
    let totalWeight = 0;

    for (let i = 0; i < items.length; i++) {
        totalWeight += weights[i];
        if (randomWeight <= totalWeight) {
            return items[i];
        }
    }
}

//オプション選択適用
function select_apply(select_gets) {
        optionsResult = select_gets.optionsResult
        optionsValue = select_gets.optionsValue
        rankResult = select_gets.rankResult

        console.log(optionsResult)
        console.log(optionsValue)
        console.log(rankResult)
        option_result();
}