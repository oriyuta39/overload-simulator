const checkbox = document.getElementById('first_overload');
const toggle = document.getElementById('toggle_button');
const effectChangeElement = document.getElementById('effect_change');


//firstOverload監視
checkbox.addEventListener('change', () => {

    if (optionsResult[0] != "-") {
        checkbox.checked = false;
        
        return;
    }

    if (checkbox.checked) {
        firstOverloadChecked(true)
    } else {
        firstOverloadChecked(false)
    }
});

//firstOverload切り替え
function firstOverloadChecked(isEnabled){
    if(isEnabled){
        effectChangeElement.classList.remove("button_roll_blue")
        effectChangeElement.classList.add("button_roll_red")
        effectChangeElement.textContent = "装備改造"
        toggle.classList.remove("fa-toggle-off")
        toggle.classList.add("fa-toggle-on")
        toggle.classList.add("blue")
        firstroll = true;
        checkbox.checked = true;
    }else{
        effectChangeElement.classList.remove("button_roll_red")
        effectChangeElement.classList.add("button_roll_blue")
        effectChangeElement.textContent = "効果変更"
        toggle.classList.remove("fa-toggle-on")
        toggle.classList.add("fa-toggle-off")
        toggle.classList.remove("blue")
        firstroll = false;
        checkbox.checked = false;
    }
}
