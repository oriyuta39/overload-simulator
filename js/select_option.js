
const options_map = {
    "有利コードダメージ増加": [9.54, 10.94, 12.34, 13.75, 15.15, 16.55, 17.95, 19.35, 20.75, 22.15, 23.56, 24.96, 26.36, 27.76, 29.16],
    "クリティカル確率増加": [2.30, 2.64, 2.98, 3.32, 3.66, 4.00, 4.35, 4.69, 5.03, 5.37, 5.71, 6.05, 6.39, 6.73, 7.07],
    "クリティカルダメージ増加": [6.64, 7.62, 8.60, 9.58, 10.56, 11.54, 12.52, 13.50, 14.48, 15.46, 16.44, 17.42, 18.40, 19.38, 20.36],
    "最大装弾数増加": [27.84, 31.95, 36.06, 40.17, 44.28, 48.39, 52.50, 56.60, 60.71, 64.82, 68.93, 73.04, 77.15, 81.26, 85.37],
    "チャージ速度増加": [1.98, 2.28, 2.57, 2.86, 3.16, 3.45, 3.75, 4.04, 4.33, 4.63, 4.92, 5.21, 5.51, 5.80, 6.09],
    "チャージダメージ増加": [4.77, 5.47, 6.18, 6.88, 7.59, 8.29, 9.00, 9.70, 10.40, 11.11, 11.81, 12.52, 13.22, 13.93, 14.63],
    "命中率増加": [4.77, 5.47, 6.18, 6.88, 7.59, 8.29, 9.00, 9.70, 10.40, 11.11, 11.81, 12.52, 13.22, 13.93, 14.63],
    "防御力増加": [4.77, 5.47, 6.18, 6.88, 7.59, 8.29, 9.00, 9.70, 10.40, 11.11, 11.81, 12.52, 13.22, 13.93, 14.63],
    "攻撃力増加": [4.77, 5.47, 6.18, 6.88, 7.59, 8.29, 9.00, 9.70, 10.40, 11.11, 11.81, 12.52, 13.22, 13.93, 14.63],
};

// 初期設定 オプション選択追加
const options_name = Object.keys(options_map);  // options_map のキーを options_name として使用
select_option_setting()

// オプション選択の更新
for (let i = 0; i < 3; i++) {
    document.getElementById(`options-select_${i}`).addEventListener('change', () => updateSelect(i));
}

for (let i = 0; i < 3; i++) {
    document.getElementById(`options-select_value_${i}`).addEventListener('change', () => updateSelect_value(i));
}


//初期設定
function select_option_setting(){

    // オプション選択初期設定
    for (let i = 0; i < 3; i++) {
        const selectElement = document.getElementById('options-select_' + i);
        const placeholderOption = document.createElement('option');
        selectElement.innerHTML = '';
        placeholderOption.value = "-";
        placeholderOption.textContent = "-----";
        selectElement.appendChild(placeholderOption);
        options_name.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key;
            option.classList.add("select_option")
            selectElement.appendChild(option);
        });
        
    }
    // オプション選択の値初期設定
    for (let i = 0; i < 3; i++) {
        const valueSelect = document.getElementById(`options-select_value_${i}`);
        const placeholderOption = document.createElement('option');
        valueSelect.innerHTML = '';
        placeholderOption.textContent = "";
        placeholderOption.disabled = true;
        valueSelect.appendChild(placeholderOption);
    }

}

// オプション選択を更新する関数
function updateSelect(select_row) {

    // 選択されているオプションを収集
    const selectedValues = [];
    for (let i = 0; i < 3; i++) {
        const selectElement = document.getElementById(`options-select_${i}`);
        if (selectElement.value && selectElement.value !== "-") {
            selectedValues.push(selectElement.value);
        }
    }

    //選択されているオプションを無効化
    for (let i = 0; i < 3; i++) {
        const selectElement = document.getElementById(`options-select_${i}`);

        const options = selectElement.querySelectorAll('option');
        options.forEach(option => {

            option.disabled = false;
            option.style.color = '';
        
            if (selectedValues.includes(option.value)) {
                option.disabled = true;
                option.style.color = 'rgb(200, 200, 200)';
            }
        });
    }

    // options-select_value_${select_row} を更新
    const valueSelect = document.getElementById(`options-select_value_${select_row}`);
    valueSelect.innerHTML = ""; // 既存のオプションをクリア

    const selectedOption = document.getElementById(`options-select_${select_row}`).value;
    if (selectedOption && selectedOption !== "-") {
        // 選択されたオプションに基づいて関連するランクを選択
        const ranks = options_map[selectedOption];
        ranks.forEach((ranks) => {
            const option = document.createElement('option');
            option.value = ranks;
            option.classList.add("value-color")
            option.textContent = ranks.toFixed(2)+"%";
            valueSelect.appendChild(option);
        });
    } else {
        // "-----"が選択されている場合は、ランク選択を無効化
        const placeholderOption = document.createElement('option');
        placeholderOption.textContent = "";
        placeholderOption.disabled = true;
        valueSelect.appendChild(placeholderOption);
    }

    updateSelect_value(select_row)
}

//オプション選択の値の色を更新する関数
function updateSelect_value(select_row){
    const valueSelect = document.getElementById(`options-select_value_${select_row}`);
    const rankSelect = document.getElementById(`options-select_rank_${select_row}`);

    //"-----"が選択されている場合は、値を無効化
    if(valueSelect.selectedIndex == -1) {
        rankSelect.innerHTML = ""
        rankSelect.style.backgroundColor = ''
        valueSelect.style.backgroundColor = ''
        valueSelect.style.color = 'rgb(0, 0, 0)'
        return
    }

    rankSelect.innerHTML = valueSelect.selectedIndex + 1 ;


    if (valueSelect.selectedIndex + 1 >= 12){
        valueSelect.style.color = 'rgb(0, 140, 255)'
    }else{
        valueSelect.style.color = 'rgb(0, 0, 0)'
    }

    if(valueSelect.selectedIndex + 1 <= 5){
        rankSelect.style.color = 'rgb(0, 200, 0)';
        valueSelect.style.backgroundColor = 'rgb(240, 255, 240)'
    } else if (valueSelect.selectedIndex + 1 <= 10){
        rankSelect.style.color = 'rgb(255, 150, 0)';
        valueSelect.style.backgroundColor = 'rgb(255, 250, 240)'
    } else if (valueSelect.selectedIndex + 1 <= 14){
        rankSelect.style.color = 'rgb(255, 0, 0)';
        valueSelect.style.backgroundColor = 'rgb(255, 240, 240)'
    } else {
        rankSelect.style.color = 'rgb(255, 0, 0)';
        valueSelect.style.backgroundColor = 'rgb(0, 0, 0)'
    }

}

//オプション選択収集
function select_get(){
    const optionsResult = [];
    const rankResult = [];
    const optionsValue = []
    for (let i = 0; i < 3; i++) {
        optionsResult[i] = document.getElementById(`options-select_${i}`).value;

        optionsValue[i] = document.getElementById(`options-select_value_${i}`).value;
        if (optionsValue[i] == '') optionsValue[i] = '-'
        rankResult[i] = document.getElementById(`options-select_value_${i}`).selectedIndex;
        rankResult[i] +=1
        if (rankResult[i] == 0) rankResult[i] = '-'
    }

    return {optionsResult,optionsValue,rankResult}
}

//オプション選択ボタン無効化有効化
function select_apply_button_disabled(isEnabled){
    const buttonApplyElement = document.getElementById("button_apply")
    if (isEnabled){
        buttonApplyElement.disabled = true;
    }else{
        buttonApplyElement.disabled = false;
    }
}
