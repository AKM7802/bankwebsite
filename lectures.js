
//Selection methods using DOM API

console.log(document.documentElement);
console.log(document.head)
console.log(document.body)


document.querySelector('.header');

console.log(document.querySelectorAll('.footer-item')); //It returs a node list //We cannot make changes to NodeList from console like HTML Collections

document.getElementById("section-1")

console.log(document.getElementsByTagName("p")) //It returns  a html collection of all the type we specified(EG:- p,button,h1).
                                                //Change in a collection will also change the item in the webpage EG:- Deleting an element in collection also takes effect on the web-page but that is not the case of NodeList

console.log(document.getElementsByClassName("header")) //It also gives an HTML Collection


//CREATING AND INSERTING ELEMENT

// .insertAdjacentHTML

const message=document.createElement('div');

message.classList.add('cookie-message') //To add css/classes into the element


// message.textContent="We use cookied for improved functionality" //to add text inside the element

message.innerHTML="We use cookied for improved funtionality and analytics. <button class='btn-cookie'>Click</button>" //To add whole html content including text and other elements

document.querySelector('.header').prepend(message) //This one adds message element inside header on the beginning
document.querySelector('.header').append(message)//This one adds message element into header at the end 

document.querySelector('.header').before(message) //This adds message before the header element
document.querySelector('.header').after(message)//This adds after header


//Delete elements
document.querySelector('.btn-cookie').addEventListener("click",function(){
    message.remove()//This deletes the whole element
    //The below method was used earlier to remove elements 
    // message.parentElement.removeChild(message)
})

//Styles
message.style.backgroundColor="lightgreen"
message.style.width="500px"
message.style.margin="0 auto 0 auto"

console.log(message.style.backgroundColor)//This will only show values that are specified in the css file and not the one created by above methods.FOr that use the following code

console.log(getComputedStyle(message).color)
console.log(getComputedStyle(message).backgroundColor) 
console.log(getComputedStyle(message).height) //The values will be of string type

message.style.height=Number.parseFloat(getComputedStyle(message).height,10)+30+'px'
console.log(getComputedStyle(message).height)

//To change the values of variables stored in css file inside root
document.documentElement.style.setProperty('--color-primary','orangered');

//Attributes -They are the items we specify while creating html elements
const logo=document.querySelector('.header-logo');
//Standard Attributes i.e attributes which are keyword
console.log(logo.alt)
console.log(logo.src)
console.log(logo.className)

logo.alt="AK DeSIGN BBy"
console.log(logo.alt)

//Non-standard i.e attributes that we declare
console.log(logo.designer) //This will not work for non-standard attributes
console.log(logo.getAttribute('designer'))

console.log(logo.setAttribute('company',"AK Productions"))
console.log(logo.getAttribute("company"))


console.log(logo.src) //This will give the link
console.log(logo.getAttribute("src")) //This will give the folder path

//Data attributes - These are the attributes which begins with 'data' mainly used to store values in UI
console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add("a",'b')
logo.classList.remove("a","b")
logo.classList.toggle("c")
logo.classList.contains('c')


//Scroll

const scrollBtn=document.querySelector('.learn-more-btn');
const section1=document.querySelector("#sec-1")

scrollBtn.addEventListener('click',function(e){
    const s1coordinates=section1.getBoundingClientRect(); //This gives the coordinates
    console.log(s1coordinates)

    console.log(e.target.getBoundingClientRect())//To get info about present element i.e scrollBtn

    console.log("Current scroll (X/Y)",window.pageXOffset,window.pageYOffset) //The position of scroll bar on the right side of window

    console.log('height/width viewport',
                document.documentElement.clientHeight,
                document.documentElement.clientWidth) //Shows the present height and width of webpage
    //Scrolling
    //window.scrollTo(s1coordinates.left,s1coordinates.top) //This will not work because s1coordinates are measured form the start of window i.e from y=0 of scrollbar so when we click that button from mid-way ,the y of scrollbar will measure from 0 again so we wont reach the perfect position
    // window.scrollTo(
    //     s1coordinates.left+window.pageXOffset,
    //     s1coordinates.top + window.pageYOffset
    // );

    //smoothScorll
    // window.scrollTo({
    //     left:s1coordinates.left+window.pageXOffset,
    //     top:s1coordinates.top + window.pageYOffset,
    //     behavior:"smooth",
    // })

    //For simple smooth scrolling without calculation 
    section1.scrollIntoView({behavior:"smooth"})


})


//Event handlers and eventFunctions

const h1=document.querySelector('h1');

//mouseenter is same as hover in css
const alerth1=function(e){
    alert("You're reading Heading")
    
     h1.removeEventListener('mouseenter',alerth1) //This removes the eventhandler
    //The above allows the alert to pop up only once when it is first called
}   

h1.addEventListener('mouseenter',alerth1)

//removeEventListener can be sspecified both outside and inside the function
// h1.removeEventListener('mouseenter',alerth1)

//Event handler can also be specified outside addeventlistener by adding 'on' infront of the condition EG:-
h1.onmouseenter=function(e){
    alert("this is an alternative")
}

//It can be also specified along with html code as follows

// <h1 onclick="alert("HTML alert")">


//Event Propogation-Bubbling and Capturing

//rgb(255,255,255)
const randomInt=(min,max)=>{

   return Math.floor(Math.random()*(max-min+1)+min);
}

const randomColor=()=>`rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`

//Due to eventPropogation and Bubbling clicking on features will also change the colors of nav-list and nav

document.querySelector('.nav-features').addEventListener('click',function(e){
    this.style.backgroundColor=randomColor();
    console.log("Features",e.target,e.currentTarget) //e.taget returns the element where the event occured ,i.e where we clicked but e.currentTarget returns the element where the event handler is placed i.e e.currentTarget===this
    e.stopPropagation(); //this stops the propogation efect so when features is clicked only it will change color 
}) //,true)


document.querySelector('.nav-list').addEventListener('click',function(e){
    this.style.backgroundColor=randomColor();
    console.log("NAV LIST",e.target,e.currentTarget)
}) //,true)


document.querySelector('.nav').addEventListener('click',function(e){
    this.style.backgroundColor=randomColor();
    console.log("NAV",e.target,e.currentTarget)
}) //,true)

//When we click features due to bubbling Features > NAV LIST > NAV
//When we enable Capturing by providing true as a 3rd argument : NAV > NAV LIST > Features


///////////////////////////////////////////////////////////////////////

//DOM Traversing

//Going Downwards: child

//querySelector
//querySelectorAll
console.log(h1.childNodes) //Returns Nodes
console.log(h1.children) //Returns only Elements
h1.firstElementChild.style.color="white"
h1.lastElementChild.style.color='orange'





//Going Upwards: parents
console.log(h1.parentNode)
console.log(h1.parentElement)
       //closest is like querySelector but opposite querySelector allows to select any child element but closest allows to choose any parent element 
h1.closest('.header').style.background="var(--gradient-secondary)"

//Choosing the same element using closest
h1.closest('h1').style.backgroundColor="black" //If we are calling h1 element by h1 itself it returns that element itself





//Going Sideways: siblings

console.log(h1.previousElementSibling)
console.log(h1.nextElementSibling)

console.log(h1.previousSibling)
console.log(h1.nextSibling)



//Intersection Observer API

const obsCallback=function(entries,observer){
    entries.forEach(entry=>{
        console.log(entry)
    })

}

const obsOptions={
    // root:document.querySelector('.features-column-name')
    root:null, //The element we want the target element to intersect . Null defines the viewPort as the element i.e the screen
    threshold:[0],   //Percentage of intersection . Here If we scroll below the line and exceed 10 percent intersecting becomes true
                        // Here 0 means callback will be called when the viewPort enter or exit the target
                        // 0.2 will call the callback when 20 percent of the target is visible on the viewport So it will be called after entering 20% and before leaving 20%

}
const observer=new IntersectionObserver(obsCallback,obsOptions)

observer.observe(section1) //section1 is the target element




//-------------------------------------------------------------------------------------------------------

//DOM Cycle

    document.addEventListener('DOMContentLOaded',function(e){
        console.log('HTML parsed and DOM tree built!', e)  //This will run after html and javascript is compiled
    })

    window.addEventListener('load',function(e){
        console.log("Page fully loaded",e)   //This will be loaded after completely loading page i.e images and css
    })

    window.addEventListener('beforeunload',function(e){ //This will run before the user exit the page.i.e it gives a pop up when we try to close the window
        
        e.preventDefault();
        console.log(e)
        e.returnValue=''; //This wont do anything now but is required
    })
