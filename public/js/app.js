// const { response } = require("express")

// const { response } = require("express")

// console.log('cliednt side')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messegeOne = document.querySelector('#messege-1')
const messegeTwo = document.querySelector('#messege-2')


weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value


    messegeOne.textContent = 'loading..'
    messegeTwo.textContent = ''

    fetch('http://localhost:3000/wheater?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                meessegeOne.textContent = data.error
            } else {
                messegeOne.textContent = data.location
                messegeTwo.textContent = data.forecast
            }
        })
    })
})