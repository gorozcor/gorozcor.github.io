const keyboard =document.querySelector(".keyboard");


for(let i=97; 1<=122;i++){

    const button=document.createElement("button");
    button.classList.add("btn");
    button.innerText=String.fromCharCode(i)
    keyboard.appendChild(button)



}