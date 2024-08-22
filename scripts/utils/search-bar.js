document.getElementById('main-search-bar').addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        handleSearch('main');
    }
});

const displayReset = (e, type) => {
    if(type != 'main') {
        const filters = document.getElementById(`${type}-list`).querySelectorAll('span');
        filters.forEach(filter => {
            filter.style.display = "block";
        });
    }
   
    const reset = document.getElementById(`reset-${type}`);
    if(!e.altKey && !e.ctrlKey && e.key != 'Backspace' && e.key != "CapsLock") {
        reset.style.opacity = "1";
        reset.style.visibility = "visible";
    } else if((e.key == 'Backspace' && e.target.value.length == 1) || e.key == 'Backspace' && (e.target.selectionStart == 0 && e.target.selectionEnd == e.target.value.length)) {
        reset.style.opacity = "0";
        reset.style.visibility = "hidden";

        if(type === "main") {
            displayData(recipes);
        }
    }
    
    if(type != "main" && e.target.value != "") {
        filters.forEach(filter => {
            if(!(filter.innerText.includes(e.target.value))) {
                filter.style.display = "none";
            }
        });
    }
}

const resetSearch = (type) => {
    const reset = document.getElementById(`reset-${type}`);
    const searchBar = document.getElementById(`${type}-search-bar`);
    searchBar.value = "";
    reset.style.opacity = "0";
    reset.style.visibility = "hidden";

    if(type === "main") {
        displayData(recipes);
    } else {
        const filters = document.getElementById('ingredients-list').querySelectorAll('span');
        filters.forEach(filter => {
            filter.style.display = "block";
        });
    }
}


const handleSearch = (type) => {
    const s = document.getElementById(`${type}-search-bar`).value;
    if(s.length >= 3) {
        let newRecipes = [];

        // first algo
        globalData.forEach(recipe => {
            if(containsString(recipe.name, s) || containsString(recipe.description, s)){
                newRecipes.push(recipe);
            }
            recipe.ingredients.forEach(i => {
                if(containsString(i.ingredient, s)){
                    newRecipes.push(recipe);
                } 
            });
        });
        
        // // second algo
        // for (let i = 0; i < globalData.length; i++) {
        //     const recipe = globalData[i];
            
        //     if (containsString(recipe.name, s) || containsString(recipe.description, s)) {
        //         newRecipes.push(recipe);
        //     }
            
        //     const ingredients = recipe.ingredients;
        //     for (let j = 0; j < ingredients.length; j++) {
        //         if (containsString(ingredients[j].ingredient, s)) {
        //             newRecipes.push(recipe);
        //             break;
        //         }
        //     }
        // }

        let filteredRecipes = [...new Set(newRecipes)];
        displayData(filteredRecipes);
    }
}


const containsString = (main, search) => {
    main = main.toLowerCase();
    search = search.toLowerCase();
    return main.includes(search);
}