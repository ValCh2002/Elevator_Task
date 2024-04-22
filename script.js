class Elevator {
    constructor(x) {
        this.numberOfElevator=x
        this.currentFloor = 1;
        this.inOrder=false 
    }

    moveTo(floor,y) {
        this.currentFloor = floor;
        this.inOrder=true
        updateElevator(this.numberOfElevator,y);
    }
}

const elevators = [new Elevator(1), new Elevator(2), new Elevator(3)];

function orderElevator(floor,y) {
    let closestElevator = findClosestElevator(floor);
    closestElevator.moveTo(floor,y);
}

function findClosestElevator(floor) {
    let minDistance = Infinity;
    let closestElevator = null;

    for (let elevator of elevators) {
        let distance = Math.abs(elevator.currentFloor - floor);
        if (distance < minDistance && !elevator.inOrder) {
            minDistance = distance;
            closestElevator = elevator;
        }else{
            continue
        }
    }
    return closestElevator;
}

function updateElevator(closestElevator,y) {
    let x=document.querySelectorAll('.elevator div')
    for(let i=0;i<x.length;i++){
        if (x[i].innerText==closestElevator) {
            let evelatorPos = parseInt(x[i].style.top); 
            if (evelatorPos<y) {
                let id=(setInterval(() => {
                    x[i].style.top = evelatorPos + 'px';
                    evelatorPos += 10; 
                    if (evelatorPos > y-100) {
                        elevators[i].inOrder=false
                        clearInterval(id); 
                    }
                }, 80)); 
            }else{
                let id=(setInterval(() => {
                    x[i].style.top = evelatorPos + 'px';
                    evelatorPos -= 10; 
                    if (evelatorPos < y-100) {
                        elevators[i].inOrder=false
                        clearInterval(id); 
                    }
                }, 80)); 
            }
        }
    }
}

const floorsContainer = document.getElementById("floors");
for (let i = 20; i > 0; i--) {
    const floor= document.createElement("div");
    floor.className='floor'
    const p1=document.createElement('p')
    const p2=document.createElement('p')
    const icon=document.createElement('img')
    icon.style.height="25px"
    icon.src="./icons8-person-30.png"
    p1.append(icon)
    p2.innerHTML=i
    floor.append(p1,p2)
    p1.onclick = (e) => {
        orderElevator(i,e.pageY)
    };
    p2.onclick = (e) => {
        orderElevator(i,e.pageY)
    };
    const floorDiv = document.createElement("div");
    floorDiv.className='floors';
    floorDiv.append(floor);
    floorsContainer.appendChild(floorDiv);
}
