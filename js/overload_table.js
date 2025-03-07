const options_data = {
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

const options_probability = [10, 10, 12, 12, 12, 12, 12, 10, 10];
const tableBody = document.getElementById("tableBody");
const headerRow_1 = document.getElementById("headerRow_1");


//段階のセル
for (let i = 1; i <= 15; i++) {
    const rankCell = document.createElement("th");
    rankCell.textContent = `${i}`;
    rankCell.classList.add("number_font")
    headerRow_1.appendChild(rankCell);
}


// 表を生成
Object.entries(options_data).forEach(([key, values], index) => {
    const row = document.createElement("tr");

    // オプション名のセル
    const optionNameCell = document.createElement("td");
    optionNameCell.textContent = key;
    optionNameCell.classList.add("option_name_cell")
    row.appendChild(optionNameCell);

    // 付与率のセル
    const optionProbabilityCell = document.createElement("td");
    optionProbabilityCell.textContent = `${options_probability[index]}%`
    optionProbabilityCell.classList.add("option_probability_cell","number_font")
    row.appendChild(optionProbabilityCell);

    // 数値データのセル
    values.forEach(value => {
        const valueCell = document.createElement("td");
        valueCell.textContent = `${value.toFixed(2)}%`;
        valueCell.classList.add("value_cell","number_font")
        row.appendChild(valueCell);
    });

    tableBody.appendChild(row);
});