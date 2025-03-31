let input = document.querySelector(".search-box input");
let btn = document.querySelector(".search-btn");
const accessKey = "XgWVfRyo03DE2JMS2U9c0Yeau9ALxm3Y7xCvLUoTBtk";
let page = 1;

async function getResponse() {
    let keyword = input.value;
    if (!keyword) return; // Don't fetch if input is empty

    let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;
    let response = await fetch(url);
    let data = await response.json();
    
    document.querySelector(".images").innerHTML = ""; // Clear old images

    let results = data.results;
    results.forEach((result) => {
        let li = document.createElement("li");
        li.classList.add("image");
        let html = `
            <img src="${result.urls.small}" alt="img" class="photo">
            <div class="details">
                <div class="user">
                    <img src="camera.svg" alt="img">
                    <span>${result.user.name}</span>
                </div>
                <div class="download">
                    <a href="${result.urls.full}" target="_blank">
                        <img src="download.svg" alt="Download">
                    </a>
                </div>
            </div>`;
        li.innerHTML = html;
        document.querySelector(".images").appendChild(li);
    });
}

btn.addEventListener("click", () => { 
    page = 1;
    getResponse();
});
