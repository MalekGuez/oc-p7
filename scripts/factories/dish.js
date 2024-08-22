const dishFactory = (data) => {
    const { name, description, image, time, ingredients } = data;
    const imagePath = `./assets/resized-dishes/${image}`;
    let ingredientsList = "";

    ingredients.forEach(ingredient => {
        let quantity = "1";
        let unit = "";
        if(ingredient.quantity) {
            quantity = ingredient.quantity;
        }
        if(ingredient.unit) {
            unit = ingredient.unit;
        }
        ingredientsList += `
            <div class="dish__ingredients__item">
                <label class="dish__ingredients__item-name" title="${ingredient.ingredient}">${ingredient.ingredient}</label>
                <span class="dish__ingredients__item-quantity">${quantity} ${unit}</span>
            </div>
        `;
    });
    const getUserCardDOM = () => {
        const article = document.createElement('article');
        article.className = "dish";
        article.innerHTML = `
            <div class="dish__header">
                <img src="${imagePath}" />
                <label class="dish__header-duration">${time}min</label>
            </div>
            <div class="dish__body">
                <h2 class="dish__title">
                    ${name}
                </h2>
                <div class="dish__recipe">
                    <h3 class="dish__body-title">Recette</h3>
                    <p>${description}</p>
                </div>
                <div class="dish__ingredients">
                    <h3 class="dish__body-title">Ingrédients</h3>
                    <div class="dish__ingredients__list">
                        ${ingredientsList}
                    </div>
                </div>
            </div>
        `;
        return (article);
    }
    return { getUserCardDOM }
}

const selectFactory = (data) => {
    const { name, id, items } = data;
    let itemsList = '';
    items.forEach(item => {
        itemsList += `
            <span class="search-b__select-filter" onclick="handleFilterClick(event, ${id})">${item}</span>
        `;
    });
    const getUserCardDOM = () => {
        const select = document.createElement('div');
        select.className = `search-b__select search-b__select-${id}`;
        select.addEventListener('click', (e) => {
            handleSelect(id);
        });
        select.innerHTML = `
            <div class="search-b__select-name">${name} <img class="search-b__select-${id}-image" src="./assets/arrow.svg"></div>

            <div class="search-b__select-list" id="${id}" onclick="handleSelectListCLick(event)">
                <div class="search-b__select-search">
                    <input type="text" id="${id}-search-bar" onkeyup="displayReset(event, '${id}')">
                    <div class="search-b__select-search-buttons">
                        <button type="button" id="reset-${id}" class="search-b__select-search-reset" onclick="resetSearch('${id}')">
                            <img src="./assets/xmark.svg">
                        </button>   
                        <button type="button" class="search-b__select-search-btn" onclick="handleFilterSearch('${id}')">
                            <img src="./assets/grey-loop.svg">
                        </button>
                    </div>
                </div>
                <div class="search-b__select-filters" id="${id}-list">
                    ${itemsList}
                </div>
            </div>
        `;
        return (select);
    }
    return { getUserCardDOM }
}


const filterFactory = (name, id) => {
    const getUserCardDOM = () => {
        let idName = name.replace(/\s+/g, '-').toLowerCase();
        const filter = document.createElement('div');
        filter.className = 'search-b__active-filter';
        filter.id = `${idName}-${id}`;
        // filter.addEventListener('click', (e) => {
        //     removeFilter(e);
        // });
        filter.innerHTML = `
            ${name}
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="removeFilter(event)">
                <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="currentColor" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        return (filter);
    }
    return { getUserCardDOM }
}