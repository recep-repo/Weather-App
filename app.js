const input = document.getElementById("input")
const button = document.querySelector("button")
const errormsg = document.getElementById("error")
const list = document.querySelector(".card-group")

localStorage.setItem("apikey", "1b528d2b9067879600ba54b051cf9cd0")

button.addEventListener("click", e => {
    e.preventDefault()
    getDataFromApi()
})

const getDataFromApi = async () => {
    let apikey = localStorage.getItem("apikey")
    let request = input.value
    let type = "metric"
    const url =  `http://api.openweathermap.org/data/2.5/weather?q=${request}&appid=${apikey}&units=${type}`

    try {
        const response = await axios.get(url)
        const {weather, name, sys, main} = response.data
        const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`
        list.innerHTML += ` 
            <div class="card-deck">
            
                <div class="card m-3">
                    <img src="${iconUrl}" class="card-img-top" alt="..." style="width: 8rem; height: 6rem " >
                    <div class="card-body text-center">
                        <h5 class="card-title">${name} <sup>${sys.country}</sup></h5>
                        <p class="card-text">${Math.round(main.temp)}<sup>°C</sup></p>
                    </div>
                </div>
            </div>`
        
        errormsg.innerText = ""
        input.value = ""
    } catch (error) {
        errormsg.innerText = error
    }
}



