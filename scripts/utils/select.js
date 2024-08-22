const handleSelect = (type) => {
    let selectList = document.getElementById(type);
    let select = document.querySelector(`.search-b__select-${type}`);
    let img = document.querySelector(`.search-b__select-${type}-image`);

    if(select.classList.contains("search-b__select--opened")) {
        hideSelects();
    } else {
        hideSelects();
        selectList.classList.add("search-b__select-list--visible");
        select.classList.add("search-b__select--opened");
        img.style.rotate = "180deg";
    }

}

const handleSelectListCLick = (e) => {
    e.stopPropagation();
}

const hideSelects = () => {
    const selects = document.querySelectorAll(".search-b__select");

    selects.forEach(select => {
        select.classList.remove("search-b__select--opened");
        select.children[1].classList.remove("search-b__select-list--visible");
        // select.children[0].chilren[0].style.rotate = "0deg";
        select.children[0].querySelector("img").style.rotate = "0deg";
    });
}

const handleFilterClick = (e, id) => {
    // Affichage
    const activeFilters = document.querySelector('.search-b__active-filters');

    const filterModel = filterFactory(e.target.innerText, id.id);
    const userCardDOM = filterModel.getUserCardDOM();
    activeFilters.appendChild(userCardDOM);

    hideSelects();
    renderFilter(e.target.innerText, id.id, activeFilters);
}

const removeFilter = (e) => {
    const activeFilters = document.querySelector('.search-b__active-filters');
    let filter = e.target.parentElement;

    activeFilters.removeChild(filter);
    let filteredRecipes = getFilteredRecipes(activeFilters);
    displayData(filteredRecipes, true);
}

const renderFilter = (name, id, activeFilters) => {
    let newRecipes = [];
    let filteredRecipes = getFilteredRecipes(activeFilters);

    filteredRecipes.forEach(recipe => {
        switch(id) {
            case 'ingredients':
                recipe.ingredients.forEach(i => {
                    if(i.ingredient === name){
                        newRecipes.push(recipe);
                    } 
                });
            break;
            case 'devices':
                if(recipe.appliance === name){
                    newRecipes.push(recipe);
                }
            break;
            case 'utensils':
                recipe.ustensils.forEach(i => {
                    if(i === name){
                        newRecipes.push(recipe);
                    } 
                });
            break;
        }
    });
    displayData(newRecipes, true);
}

const getFilteredRecipes = (activeFilters) => { 
    let filteredRecipes = [];
    let cr = globalData;
    if(activeFilters.children.length > 0) {
        for (let filter of activeFilters.children) {
            let id = filter.id.split('-');
            id = id[id.length - 1];
            let name = filter.innerText;

            cr.forEach(recipe => {
                switch(id) {
                    case 'ingredients':
                        recipe.ingredients.forEach(i => {
                            if(i.ingredient === name){
                                filteredRecipes.push(recipe);
                            } 
                        });
                        break;
                    case 'devices':
                        if(recipe.appliance === name){
                            filteredRecipes.push(recipe);
                        }
                        break;
                    case 'utensils':
                        recipe.ustensils.forEach(i => {
                            if(i === name){
                                filteredRecipes.push(recipe);
                            } 
                        });
                        break;
                }
            });
            cr = filteredRecipes;
        }
        return [... new Set(filteredRecipes)];
    }
    return globalData;
}