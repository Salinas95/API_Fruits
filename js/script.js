

//Consulta Fruta (API Pública)
    const searchFruit=(frute)=>{
        fetch('https://www.fruityvice.com/api/fruit/all')
        .then(response=>response.json())
        .then(fruits=>{
            getFruitInfo(fruits,frute);
        })
        .catch(err => {console.error(err);});
    }


//Consulta Fruta (Cargar Select)
    const fruitSelect=()=>{
        fetch('https://www.fruityvice.com/api/fruit/all')
        .then(response=>response.json())
        .then(fruits=>{
            //Fragment
                let fragment=document.createDocumentFragment();
            //Select
                for(let fruit of fruits){
                    //Options
                        let option=document.createElement('option');
                        option.textContent=fruit.name;
                        fragment.appendChild(option);
                }//for
            //Select
                selfruits.appendChild(fragment);
        })
        .catch(err => {console.error(err);});
    }
    document.addEventListener('DOMContentLoaded',fruitSelect);


//Consulta Comida (API Privada)
    const searchFood=(fruit)=>{
        //Las keys son de 2 cuentas distintas - Para cuando se agoten las peticiones gratuitas
        const key='5199f584553d4465ab1dc3240238c636';
        const key2='aee553d3688e484186bf80458eecfb9c';
        const endpoint='recipes/findByIngredients?ingredients=';
        fetch('https://api.spoonacular.com/'+endpoint + fruit + '&apiKey='+key2)
        .then(response=>response.json())
        .then(foods=>{
            getFood(foods);
        })
    }


//Comida Datos
    const getFood=(foods)=>{
        //Borrar anterior consulta
            gallery.textContent='';
        //Mensaje cuando no encuentra el resultado
                if(foods.length==0){wrongSearch();}
        //Visualización
            for(let food of foods){
                //Borrar mensaje de error
                    document.getElementById('message').innerHTML='';
                //Article
                    let article=document.createElement('article');
                    article.classList.add('mcard');
                    gallery.appendChild(article);
                //IMG
                    let img=document.createElement('img');
                    img.classList.add('card__img');
                    img.src=food.image;
                    article.appendChild(img);
                //Titulo
                    let title=document.createElement('h3');
                    title.classList.add('card__h3');
                    title.innerHTML=food.title;
                    article.appendChild(title);
            }
    }


//Select Frutas Values
    selfruits.addEventListener('change',()=>{
        //Value Select -> Info Nutricional
            searchFood(selfruits.value);
        //Value Select -> Menú
            searchFruit(selfruits.value);
    });


//Mensaje error no hay comida
    const wrongSearch=()=>{
        alert('En estos momentos no disponemos de este producto. Disculpe las molestias');
        message.textContent='En estos momentos no disponemos de este producto. Disculpe las molestias';
    }


//Valor Nutricional de la fruta
    const getFruitInfo=(fruits, frute)=>{
        for(let fruit of fruits){
            if(frute==fruit.name){
                document.getElementById('fcard__info').style.display='flex';
                document.getElementById('fname').innerHTML=fruit.name;
                document.getElementById('fcalories').innerHTML=fruit.nutritions.calories;
                document.getElementById('fcarbo').innerHTML=fruit.nutritions.carbohydrates;
                document.getElementById('fproteins').innerHTML=fruit.nutritions.protein;
                document.getElementById('fsugar').innerHTML=fruit.nutritions.sugar;
            }
        }
    }