const register = document.querySelector('.examplesOff')
const btn1 = document.getElementById('btn1')


btn1.addEventListener('click', ()=>{
    register.classList.toggle('examplesOn')
})