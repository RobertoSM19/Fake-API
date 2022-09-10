fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
        let menu=document.getElementById('selUsers');
        let opciones='';
        for(let i=0;i<json.length;i++){
            opciones+=`<option value=${json[i].id}>${json[i].username}</option>`;
        }
        menu.innerHTML=opciones;
    });

const menu=document.getElementById("selUsers");
    menu.addEventListener('change',()=>{
        fetch(`https://jsonplaceholder.typicode.com/users/${menu.value}`)
        .then (response=>response.json())
        .then(json=>{
            let info=document.getElementById('info');
            info.innerHTML+=`<p><b>Nombre:</b> ${json.name} <br><b>Email:</b> ${json.email} <br><b>Calle:</b> ${json.address.street} <br><b>Ciudad:</b>${json.address.city} <br><b>Teléfono:</b> ${json.phone}</p>`
            // console.log(json);
        })
});

const but=document.getElementById('btnPost');
but.addEventListener('click',()=>{
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${menu.value}`)
    .then((response)=>response.json())
    .then((json)=>{
        let info=document.getElementById('inPosts');
        json.forEach(pub=>{
            info.innerHTML+=`
            <div id="pub${pub.id}">
                <h2>${pub.title}</h2>
                <p>${pub.body}</p>
                <button onclick="find(${pub.id})">Ver comentarios</button>
                <div id="pcom${pub.id}">    
                </div>
            </div>`;
        });
    });
});

function find(x){
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${x}`)
    .then(response=>response.json())
    .then(json=>{
        const bot=document.getElementById(`pcom${x}`);
        json.forEach(num=>{
            bot.innerHTML+=(`
            <div id="num${num.id}">
                <h3>Nombre: ${num.name}</h3>
                <p>Correo: ${num.email}<br>${num.body}</p>
            </div>
            `);
        });
        bot.innerHTML+=`<button type="button" onclick="ocultar(${x})">Ocultar comentarios</button>`;
    });
};

function ocultar(x){
    const bot=document.getElementById(`pcom${x}`);
    bot.innerHTML=('<p></p>');
};