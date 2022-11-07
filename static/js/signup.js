let id = document.querySelector('#username')
let pw = document.querySelector('#password')

let btn = document.querySelector('#SignupBtn')
let label;

btn.addEventListener('click', () => {
    if (id.value == "") {
        label = id.nextElementSibling
        label.classList.add('warning')
        setTimeout(() => {
            label.classList.remove('warning')
        }, 1500)
    } else if (pw.value == "") {
        label = pw.nextElementSibling
        label.classList.add('warning')
        setTimeout(() => {
            label.classList.remove('warning')
        }, 1500)
    }
})