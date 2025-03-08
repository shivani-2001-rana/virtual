let prompt=document.querySelector("#prompt")
let chatContainer=document.querySelector(".chat-container")
let imagebtn=document.querySelector("#image")

let imageinput=document.querySelector("#image input")

const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCaaU3YopCbBEYQtVyxk7zpvaPBkVjRJ8Y"
let user ={
    data:null,
    file:{
      mime_type:null,
        data:null
    }
}
async function generateResponse(aiChatBox) {
let text=aiChatBox.querySelector(".ai-chat-area")
    let RequestOption={
       method :"POST",
        headers:{'Content-Type': 'application/json' },
        body:JSON.stringify(
            {"contents": [
            {"parts":[{"text": user.data}

            ]
        }]
     })
    }
    try{
        let response=await fetch(Api_Url,RequestOption)
        let data=await response.json()
        let apiResponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
        text.innerHTML=apiResponse
        console.log(apiResponse);
    }
    catch(error){
        console.log(error);

    }
    finally{
        chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})
    }
}
function createChatBox(html,classess){
    let div=document.createElement("div")
    div.innerHTML=html
    div.classList.add(classess)
    return div
}


function handlechatResponse(message){
    user.data=message
    let html=`<img src="user.jpg" alt="" id="userImage" width="50">
<div class="user-chat-area">
${user.data}
</div>`
prompt.value=""
let userChatBox=createChatBox(html,"user-chat-box")
chatContainer.appendChild(userChatBox)

chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})

setTimeout(()=>{
let html=`<img src="ai.jpg" alt="" id="aiImage" width="80">
    <div class="ai-chat-area">
    <img src="load copy.gif" alt="" class="load" width="40px">
    </div>`
    let aiChatBox=createChatBox(html,"ai-chat-box")
    chatContainer.appendChild(aiChatBox)
    generateResponse(aiChatBox)

},600)

}

prompt.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        handlechatResponse(prompt.value)

    }
   
})
imageinput.addEventListener("change",()=>{
    const file=imageinput.files[0]
    if(!file)return
    let reader =new FileReader()
    reader.onload=(e)=>{
        console.log(e)
    }
    reader.readAsDataURL(file)
})

imagebtn.addEventListener("click",()=>{
    imagebtn.querySelector("input").click()
})