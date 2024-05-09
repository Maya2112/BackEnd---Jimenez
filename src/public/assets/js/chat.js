const socket = io();

let user;
let messageLog = document.getElementById('messageLog');
let chatBox = document.getElementById('chatBox');
let data;

socket.on('message', msg=>{
    data=msg;
});

socket.on('messageLogs', msgs=>{
    renderizar(msgs);

})

const renderizar = (msgs)=>{
    let messages = '';
    msgs.forEach(message =>{
        messages = messages + `<div> ${message.user}: ${message.message}</div>`
    });
    messageLog.innerHTML= messages;
    chatBox.scrollIntoView(false);

}

Swal.fire({
    title: 'Activa tu session',
    input: 'email',
    text: 'Ingresa tu correo para identificarte',
    inputValidator: (value)=>{
        if(!value){
            return 'Necesitas un correo electronico para poder activar tu session'
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(value)){
            return 'Ingresa un correo electronico valido';
        }
        return null;
    },
    allowOutsideClcik: false
}).then(result => {
    if (result.isConfirmed){
        user = result.value;
        renderizar(data);
    }
});

chatBox.addEventListener('keyup', evt =>{
    if(evt.key=== 'Enter'){
        if(chatBox.value.trim().length > 0){
            const message = chatBox.value;
            socket.emit('message',{user, message});
            chatBox.value='';
        }
    }
});

socket.on('newUser', ()=>{
    Swal.fire({
        text: 'Un nuevo usuario se ha conectado',
        toast: true,
        position: 'top'
    })
})