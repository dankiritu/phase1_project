const apiKey = " n0P5W0A05KWNk4HYkjBg3R8i1CbvOCOvLBKjsNmdFBK03OUk2il0qolJ"
const perPage = 15
let currentPage = 1


const imagesWrapper = document.querySelector(".images")
const loadMore = document.querySelector(".loadMore")
const search = document.querySelector(".Search input")
let searchTerm = null
const light_Box = document.querySelector(".lightBox")
const like = document.querySelector(".uil uil-heart")

const showLightBox = (name, img) => {
    light_Box.classList.add("show") 
    light_Box.querySelector("span").innerText = (name)
    light_Box.querySelector("img").src = (img) 
}
const generateHTML = (images) => {
    imagesWrapper.innerHTML += images.map(img => 
        `<li class="card" onclick = "showLightBox('${img.photographer}', '${img.src.large2x}' )">
        <img src="${img.src.large2x}" alt="img">
        <div class="details">
            <div class="photographer">
                <i class="uil uil-camera"></i>
                <span>${img.photographer}</span>
            </div>
            <button onclick= "downloadImg('${img.src.large2x}')">
                <i class="uil uil-import"></i>
            </button> 
        </div>
    </li>`).join("")
} 


const getImages =  (apiUrl) => {
    fetch(apiUrl, {
        headers:{Authorization: apiKey}
    })
    .then((resp) => resp.json())
    .then((data) => 
    generateHTML(data.photos))
    
} 

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}per_page=${perPage}`)

const loadMoreImages = () => {
    currentPage++
    let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}per_page=${perPage}`
    apiUrl = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}per_page=${perPage}`: apiUrl
    getImages(apiUrl)
    console.log("Loaded more")
}

loadMore.addEventListener("click", loadMoreImages)

const searchImages = (e) => {
    if (e.key == "Enter") {
        currentPage = 1
        searchTerm = e.target.value
        imagesWrapper.innerHTML = ""
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}per_page=${perPage}`)

    }
     
}

search.addEventListener("keyup", searchImages)

const downloadImg = (imgURL) => {
    fetch(imgURL)
    .then((resp) => resp.blob())
    .then((file) => {
        const a = document.createElement("a")
        a.href = URL.createObjectURL(file)
        a.download = new Date().getTime()
        a.click()
    })
    .catch(() => alert("Image Not Found"))
}