console.log('client side javascript file is loaded')

 
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg1')
const msgTwo = document.querySelector('#msg2')

// msgOne.textContent='From javascript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    msgOne.textContent='Loading...'
    msgTwo.textContent=''
    


    fetch('/weather?address='+location )
    .then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            msgTwo.textContent=data.error
            msgOne.textContent=''
        }else{
            console.log(data.location)
            console.log(data.forecastData)
            msgOne.textContent=data.location
            msgTwo.textContent=data.forecastData       
        }
    })
})
})