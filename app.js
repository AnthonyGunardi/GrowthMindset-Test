const q = document.querySelectorAll('.q');
const ans = document.querySelectorAll('.q .form-check button');
const form = document.querySelector('.quiz-form');
const end = document.querySelector('.end');
let score = 0;
let maxScore = q.length *3;
let scorePercentage = 0;
let finalScore = 0;

form.addEventListener('click',(e)=>{
    e.preventDefault();
})

ans.forEach(anseach => {
    anseach.addEventListener('click',function(){
        step();
        let point = this.getAttribute("point")
        if (point == "0") {
            score+=0;
        }
        if (point == "1") {
            score+=1;
        }
        if (point == "2") {
            score+=2;
        }
        if (point == "3") {
            score+=3;
        }
        scorePercentage = score / maxScore *100;
        finalScore = scorePercentage.toFixed();
    })
});

let count = 0;
function step() {
    count+=1;
    for (let i = 0; i < q.length; i++) {
        q[i].className='q';
        if (count<=13) {
            q[count].className='q active';
        }else{
            end.classList.remove('d-none');
            let output = 0;
            console.log(finalScore)
            const timer = setInterval(()=>{
                end.querySelector('span').textContent=`${output}%`;
                if (output == finalScore) {
                    clearInterval(timer);
                }else{
                    output++;
                }
            },20)
        }
    }
}