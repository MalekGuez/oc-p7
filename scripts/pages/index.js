let globalData = recipes;

const displayData = (dishes, filter = false) => {
    if(!filter) {
        globalData = dishes;
    }
    const dishesSection = document.querySelector(".dishes");
    const nbDishes = document.querySelector(".search-b__filters-nb");
    dishesSection.innerHTML = "";

    dishes.forEach((dish) => {
        // console.log(dish);
        const dishModel = dishFactory(dish);
        const userCardDOM = dishModel.getUserCardDOM();
        dishesSection.appendChild(userCardDOM);
    });

    if(dishes.length > 1) {
        nbDishes.innerHTML = dishes.length + ' recettes';
    } else {
        nbDishes.innerHTML = dishes.length + ' recette';

        if(dishes.length === 0) {
            // Afficher le message
        }
    }

    fillSelects(dishes);
};

const fillSelects = (recipes) => {
    const selectsSection = document.querySelector('.search-b__filters-content');
    selectsSection.innerHTML = "";

    const filters = Array.from(document.querySelector('.search-b__active-filters').children);
    let activeFilters = [];
    if(filters.length > 0) {
        filters.forEach(f => {
            activeFilters.push(f.innerText);
        });
    }
    let ingredients = [];
    let devices = [];
    let utensils = [];

    if(recipes.length > 1) {
        recipes.forEach((recipe) => {
            recipe.ingredients.forEach(i => {
                !activeFilters.includes(i.ingredient) && ingredients.push(i.ingredient);
            });
            !activeFilters.includes(recipe.appliance) && devices.push(recipe.appliance);
            recipe.ustensils.forEach(u => {
                !activeFilters.includes(u) && utensils.push(u);
            });
        });
    }


    ingredients = [... new Set(ingredients)]; 
    devices = [... new Set(devices)]; 
    utensils = [... new Set(utensils)]; 

    let data = [
        {
            'name': 'Ingrédients',
            'id': 'ingredients',
            'items': ingredients
        },
        {
            'name': 'Appareils',
            'id': 'devices',
            'items': devices
        },
        {
            'name': 'Ustensiles',
            'id': 'utensils',
            'items': utensils
        }
    ];

    
    data.forEach(d => {
        const selectModel = selectFactory(d);
        const userCardDOM = selectModel.getUserCardDOM();
        selectsSection.appendChild(userCardDOM);
    });
}

const init = () => {
    // console.log(recipes);
    displayData(recipes);
};

init();