//showing and closing the sign up
// -----------------------------------------------------------------------------
document.querySelector('.nav-account').addEventListener("click",function(){
    document.querySelector('.modal-window').classList.remove("hidden")
    document.querySelector('.overlay').classList.remove("hidden")
})

document.querySelector('.open-account-btn').addEventListener("click",function(){
    document.querySelector('.modal-window').classList.remove("hidden")
    document.querySelector('.overlay').classList.remove("hidden")
})

document.querySelector(".sign-up-close").addEventListener("click",function(){
    document.querySelector('.modal-window').classList.add("hidden")
    document.querySelector('.overlay').classList.add("hidden")
})

document.addEventListener("keydown",function(e){
    if(e.key==="Escape" && !document.querySelector('.modal-window').classList.contains("hidden")){
        document.querySelector('.modal-window').classList.add("hidden")
        document.querySelector('.overlay').classList.add("hidden")
    }
})

document.querySelector(".overlay").addEventListener("click",function(){
    document.querySelector('.modal-window').classList.add("hidden")
        document.querySelector('.overlay').classList.add("hidden")
})

//----------------------------------------------------------------------------------------
//section-2 Operations changing text by buttons

document.querySelector(".section-2-buttons").addEventListener("click",function(e){
   

    const clicked=e.target.closest('.btn') //To only select buttons inside the .section-2-buttons.It is explained in lectures that when we call a class with the same name of e.target we get that button

    //Return null and ends the program when pressed in the gaps between buttons
    if(!clicked) return;

    //Activating button pops
    document.querySelectorAll('.btn').forEach(item=>item.classList.remove('active'))
    clicked.classList.add('active')

    //Changing text content
    document.querySelectorAll('.section-2-cards').forEach(item=>item.classList.remove('active-tab'))

    document.querySelectorAll('.section-2-cards').forEach(item=>item.classList.add('inactive-tab'))
    console.log(clicked.dataset.btnNumber)
    
    document.querySelector(`.section-2-card-${clicked.dataset.btnNumber}`).classList.add('active-tab')

})

//---------------------------------------------------------------------------------------------------------------
//Fading animation in Navigation bar   //Mouse ever is same as mouseEnter but the latter does not support bubbling
     
    // document.querySelector('.nav').addEventListener('mouseover',function(e){
    //     if(e.target.classList.contains('nav-link')){
    //         const link=e.target;
    //         const siblings=link.closest('.nav').querySelectorAll('.nav-link')
            
    //         siblings.forEach(item=>{
    //             if(item !== link){
    //                 item.style.opacity=0.5;
    //             }
    //         })
    //         document.querySelector('.header-logo').style.opacity=0.5
    //     }

    // })

    // document.querySelector('.nav').addEventListener('mouseout',function(e){
    //     if(e.target.classList.contains('nav-link')){
    //         const link=e.target;
    //         const siblings=link.closest('.nav').querySelectorAll('.nav-link')
            
    //         siblings.forEach(item=>{
    //             if(item !== link){
    //                 item.style.opacity=1;
    //             }
    //         })
    //         document.querySelector('.header-logo').style.opacity=1
    //     }
    // })


    //          ALTERNATE WAY

    const hoverAction=function(e){    
        if(e.target.classList.contains('nav-link')){
            const link=e.target;
            const siblings=link.closest('.nav').querySelectorAll('.nav-link') 
            
            siblings.forEach(item=>{
                if(item !== link){
                    item.style.opacity=this;
                }
            })
            document.querySelector('.header-logo').style.opacity=this      //Here this referred to the parameter we passes while calling and not 'e'
        }
    }

    document.querySelector('.nav').addEventListener('mouseover',hoverAction.bind(0.5))
    document.querySelector('.nav').addEventListener('mouseout',hoverAction.bind(1))  //Since eventListener expects a function rather than a value bind is used . Bind clones the function itself
                                                                                     // Also eventListener takes only one parameter so we use 'this' in the area to pass the value specified and use 'e' as the only argument 


 //---------------------------------------------------------------------------------------------------------------------------------

 //Sticky Navbar after crossing a particular distance
   
 
 
 
    // const section1=document.querySelector('.section-1')
    // const initialCoordinates=section1.getBoundingClientRect()
    // console.log(initialCoordinates)

    // window.addEventListener('scroll',function(){
    //     //console.log(window.scrollY)

    //     if(window.scrollY > initialCoordinates.top){
    //         document.querySelector('.nav').classList.add('sticky')
    //     }else{
    //         document.querySelector('.nav').classList.remove('sticky')
    //     }

    // })
   
   
   
   
   
    //The above mwthod is heavy so we use an alternative
    //Intersection Observer API

    const header=document.querySelector('.heading0')
    const navHeight=document.querySelector('.nav').getBoundingClientRect().height;


    const stickyNav=function(entries){
        const entry=entries[0]  //Since there is only one threshold we do not need to loop over entries

        if(!entry.isIntersecting) document.querySelector('.nav').classList.add('sticky');

        else document.querySelector('.nav').classList.remove('sticky');
    }

    const headerObserver=new IntersectionObserver(stickyNav,{
        root:null,
        threshold:0,
        //rootMargin: "-20px"
        rootMargin:`-${navHeight}px` //To make the nav appear at its exact height before reaching the specified position in threshold
    })

    headerObserver.observe(header)


    //---------------------------------------------------------------------------------------------------------------------------

    //Revealing The headings slowly 

    const sectionAll=document.querySelectorAll('.section')

    const unhide=function(entries,observer){
            const [entry]=entries;
            console.log(entry)
            if(!entry.isIntersecting) return;
            entry.target.classList.remove('section-hidden')
            observer.unobserve(entry.target) //This makes the the code runs only  in the beginning

    }

    const sectionObserver=new IntersectionObserver(unhide,{
        root:null,
        threshold:0.15,

    })

    sectionAll.forEach(individual=>{
        sectionObserver.observe(individual)
        individual.classList.add('section-hidden')  //Hidden is added in JS bcuz in some browser JS is disabled so adding in css might make it invisisble for such persons
    })


    //----------------------------------------------------------------------------------------------------------------
    //Lazy loading


    const imagesAll=document.querySelectorAll('img[data-src]') //To select the 3 images containing attributedata-src
    
    const lazyLoad=function(entries,observer){
        const [entry]=entries;
        if(!entry.isIntersecting) return;
        entry.target.src=entry.target.dataset.src;
        

        entry.target.addEventListener('load',function(){ //This removes the blur only after fully loading the image
            entry.target.classList.remove('section-1-img-blur')
        })

        observer.unobserve(entry.target)

    }

    const lazyObserver=new IntersectionObserver(lazyLoad,{
        root:null,
        threshold:0,
        rootMargin:"-200px"
    })

    imagesAll.forEach(item=>{
        lazyObserver.observe(item)
        
    })


//------------------------------------------------------------------------------------------

//Slider

    const slides=document.querySelectorAll('.slide');
    const btnLeft=document.querySelector('.slider-btn-left')
    const btnRight=document.querySelector('.slider-btn-right')


    let curSlide=0;
    const maxSlide=slides.length-1;

    slides.forEach((s,i)=>{   //To make it all in different positions
        s.style.transform=`translateX(${110*i}%)`
    })

    const rightMov=function(){
        if(curSlide<maxSlide){curSlide++}
        else {curSlide=0}
        
        slides.forEach((s,i)=>{
            s.style.transform= `translateX(${110*(i-curSlide)}%)`
        })
        dotHighlight(curSlide)
    }

    const leftMov=function(){
        if(curSlide===0)curSlide=maxSlide
        else curSlide--
        
        slides.forEach((s,i)=>{
            s.style.transform= `translateX(${110*(i-curSlide)}%)`
        })
        dotHighlight(curSlide)
    }




    btnRight.addEventListener('click',rightMov)
    btnLeft.addEventListener('click',leftMov)
    

    //Keyboard Actions

    document.addEventListener('keydown',function(e){
        if(e.key === 'ArrowLeft') leftMov();
        if(e.key === 'ArrowRight') rightMov();
    })

    //Dots Under Slider

    const dotContainer=document.querySelector('.dots')

    slides.forEach((_,i)=>{
        dotContainer.insertAdjacentHTML('beforeend',`<button class="dots_dot" data-slide="${i}"></button>`)
    })

    dotContainer.addEventListener('click',function(e){
        if(e.target.classList.contains('dots_dot')){
            const slide=e.target.dataset.slide
            
            slides.forEach((s,i)=>{
                s.style.transform= `translateX(${110*(i-slide)}%)`
            })

            dotHighlight(slide)
        }


    })


    const dotHighlight=function(slide){
        document.querySelectorAll('.dots_dot').forEach(item=>item.classList.remove('dot-active'))

        document.querySelector(`.dots_dot[data-slide="${slide}"]`).classList.add('dot-active')

    }

    dotHighlight(0)