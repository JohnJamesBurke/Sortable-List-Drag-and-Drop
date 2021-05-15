const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const bestTeams = [
    'Liverpool',
    'Leicester City',
    'West Ham United',
    'Burnley',
    'Newcastle United',
    'Chelsea',
    'Arsenal',
    'Everton',
    'Manchester City',
    'Manchester United'
];


// Store List Items
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into Dom
function createList(){
    [...bestTeams]
        .map(a => ({value: a, sort: Math.random() }))
        .sort((a , b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((team,index) => {
            console.log(team);
            const listItem = document.createElement('li');
            
            listItem.setAttribute('data-index',index);

            listItem.innerHTML = `
                <span class="number">${index+1}</span>
                <div class="draggable" draggable="true">
                    <p class="team-name">${team}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `;

            listItems.push(listItem);

            draggableList.appendChild(listItem);
    });

    addEventListeners();
}

function dragStart(){
    //console.log('dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    //console.log(dragStartIndex);



}

function dragOver(e){
    //console.log('dragover');
    e.preventDefault();
}

function dragEnter(){
    //console.log('dragenter');

    // add the class of over to the li
    this.classList.add('over');

}

function dragLeave(){
    //console.log('dragleave');
    this.classList.remove('over');
}

function dragDrop(){
    //console.log('drop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

// Swap list items that are dragged and dropped
function swapItems(fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);

}

// Check if the order matches the order of the starting array
function checkOrder(){
    listItems.forEach((listItem,index) => {
        const teamName = listItem.querySelector('.draggable').innerText.trim();

        if(teamName !== bestTeams[index]){
            // Wrong spot
            listItem.classList.add('wrong');

        } else {
            // correct spot
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

function addEventListeners(){

    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

check.addEventListener('click',checkOrder);
