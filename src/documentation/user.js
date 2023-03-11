const register = document.querySelector('.examplesOff')
const btn1 = document.getElementById('btn1')

const login = document.querySelector('.examplesOff2')
const btn2 = document.getElementById('btn2')

const updatedata = document.querySelector('.examplesOff3')
const btn3 = document.getElementById('btn3')

const purchase = document.querySelector('.examplesOff4')
const btn4 = document.getElementById('btn4')

btn1.addEventListener('click', ()=>{
    register.classList.toggle('examplesOn')
})

btn2.addEventListener('click', ()=>{
    login.classList.toggle('examplesOn')
})

btn3.addEventListener('click', ()=>{
    updatedata.classList.toggle('examplesOn')
})

btn4.addEventListener('click', ()=>{
    purchase.classList.toggle("examplesOn")
})