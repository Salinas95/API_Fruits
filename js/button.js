
//BOTÓN NAV
    document.getElementById('button').addEventListener('click', ()=>{
        let hola=document.getElementById('hola');
        if(hola.style.display!='none'){
            hola.style.display='none';
        } else if(hola.style.display='none'){
            hola.style.display='flex';
            hola.classList.add('navv');
        }
    })