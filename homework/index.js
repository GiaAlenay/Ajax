const btnMostrarAmigos= document.getElementById('boton');//id de li<img 
const lista=document.getElementById('lista')//id de ul
var intro = document.getElementById('cuerpo')//id de body


function showfriends(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res=>res.json())
    .then(amigos=>{
        friend.innerHTML=''
        setTimeout(()=>{ $('#gif').hide();
        intro.style.backgroundColor='rgb(48, 42, 47)'},1000)
            
        setTimeout(()=>{
        lista.innerHTML=''
        for (let i = 0; i < amigos.length; i++) {
            let li=`<button onClick='showFriend(${amigos[i].id})' class='tarjeta'>
            <img  class="profilePic" src="./img/img${amigos[i].id}.jpg"/>
            <div class="descrip">
            <li> Nombre : ${amigos[i].name}</li>
           
            <li> Email:  ${amigos[i].email}</li>
            </div>
            </button>`
            lista.innerHTML=lista.innerHTML+li
        }},1000)
        console.log(amigos)
    })
}
btnMostrarAmigos.addEventListener('click',function() {
    lista.innerHTML=''
    intro.style.backgroundColor='rgb(48, 42, 47)'
    $('#gif').show();   
    showfriends()
    
})






const btnBuscar=document.getElementById('search');
const friend=document.getElementById('amigo') 
let input=document.getElementById('input')
let li;

function showFriend(idamigo){
    lista.innerHTML=""
    if(typeof idamigo !== 'number'){
        idamigo=input.value
    }
    if(idamigo !==''){
        fetch(`https://jsonplaceholder.typicode.com/users/${idamigo}`)
    .then(res=>res.json())
    .then(amigo=>{
      
       input.value=''
       li=`<div class='tarjeta'>
            <img class="profilePic" src="./img/img${amigo.id}.jpg"/>
            <div class="descrip">
            <li> Nombre: ${amigo.name}</li>
            <li> Email:  ${amigo.email}</li>
            </div>
            </div>`
 
        let botonEliminarAmix=`<button class="botonEli" onClick="deleteFriend(${amigo.id })" >Eliminar</button>`
       friend.innerHTML=li + botonEliminarAmix
       
    }).catch(error=>{ 
        input.value=''
        let errorMsg=`<div class='msg' >Lo sentimos no existe la persona que buscas.</div>`;
         friend.innerHTML=errorMsg
         setTimeout(()=>{ friend.innerHTML=''},2500)
        })
    }
    
}



function deleteFriend(amixId){
    var result=window.confirm("¿Estas seguro de que quieres eliminar este contacto? ");
    if (result){
        fetch(`http://localhost:5000/amigos/${amixId}`,{method:'DELETE'})
        .then(res=>res.json())
        .then(amigo=>{
            console.log(amigo)       
           friend.innerHTML=''
           let msg=`<div class='msg'>Has eliminado a tu amigo exitosamente...</div>`
           friend.innerHTML=msg;
           setTimeout(()=>{ friend.innerHTML=''},2500)
        })   
    
    }else{
        console.log('noo ')}
    
    
}

btnBuscar.addEventListener('click',showFriend) 
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      showFriend()
  
    }
  });

