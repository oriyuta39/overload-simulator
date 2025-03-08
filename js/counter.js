const counterElements = {
    effectChange: document.getElementById("effect_change_count"),
    valueChange: document.getElementById("value_change_count"),
    cModuleUsage: document.getElementById("c_module_usage_count"),
    cModuleEffectUsage: document.getElementById("c_module_effect_usage_count"),
    cModuleValueUsage: document.getElementById("c_module_value_usage_count"),
    cModuleLockUsage: document.getElementById("c_module_lock_usage_count"),
};

const counters = {
    effectChange: 0,
    valueChange: 0,
    cModuleUsage: 0,
    cModuleEffectUsage: 0,
    cModuleValueUsage: 0,
    cModuleLockUsage: 0,
};

let cModuleFactor = 1;

// カウント＆表示関数
function updateCounter(key) {
    if(key === "effectChange" || key === "valueChange"){
        counters[key] += 1;
    }else{
        counters[key] += cModuleFactor;
    }
    counterElements[key].textContent = counters[key];
}

// 初期化
function resetCounter() {
    Object.keys(counters).forEach(key => counters[key] = 0);
    cModuleFactor = 1;
    Object.keys(counterElements).forEach(key => counterElements[key].textContent = counters[key]);
}

// 効果変更回数カウント
function effectChangeCounter() {
    updateCounter("effectChange");
    updateCounter("cModuleEffectUsage");
    updateCounter("cModuleUsage");
}

// 数値変更回数カウント
function valueChangeCounter() {
    updateCounter("valueChange");
    updateCounter("cModuleValueUsage");
    updateCounter("cModuleUsage");
}

// ロック時消費量カウント＆消費量変化
function cModuleLockUsageCounter(locked) {
    if (locked) {
        cModuleFactor++;
        updateCounter("cModuleLockUsage");
        updateCounter("cModuleUsage");
    } else {
        cModuleFactor--;
    }
}
