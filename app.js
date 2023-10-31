const q = document.querySelectorAll('.q');
const ans = document.querySelectorAll('.q .form-check button');
const form = document.querySelector('.quiz-form');
const end = document.querySelector('.end');
let score = 0;
let maxScore = q.length *3;
let scorePercentage = 0;
let finalScore = 0;
let usia = localStorage.getItem('usia');
let departemen = localStorage.getItem('departemen');

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
    if (count == 14) {
        localStorage.setItem('skor_tes', score);
        let skor_tes = parseInt(score);
        let penjelasan_skor = '';

        if (skor_tes > 31) {
            penjelasan_skor = 
            'Anda memiliki Growth Mindset yang kuat. Itu akan membantu Anda dengan baik! Tapi Anda jangan berpuas diri. Anda dapat membantu orang lain untuk memahami kekuatan Growth Mindset. Anda mempunyai kesempatan untuk membuat perubahan besar di dunia.'
        } 
        else if (skor_tes >= 26 && skor_tes <= 31) {
            penjelasan_skor = 
            'Anda memiliki Growth Mindset dengan beberapa Fixed Mindset (Tetap berpegang teguh dengan opini anda). Anda memahami bahwa perubahan itu mungkin terjadi, jadi sekarang Anda bisa mengeksplorasi jenis perubahan apa yang mungkin terjadi yang tidak dapat Anda bayangkan sebelumnya.'
        }
        else if (skor_tes >= 15 && skor_tes <= 25) {
            penjelasan_skor = 
            'Anda memiliki Fixed Mindset dengan beberapa Growth Mindset. Ambillah ide-ide Growth Mindset yang Anda miliki. Jelajahi mengapa beberapa ide lebih intuitif bagi Anda. Kemudian teliti ilmunya. Temukan seseorang dengan Growth Mindset yang akan sangat membantu untuk membimbing Anda.'
        }
        else if (skor_tes < 15) {
            penjelasan_skor = 
            'Anda memiliki Fixed Mindset yang kuat. Sekarang Anda punya pilihan. Anda bisa tetap di tempat Anda sekarang atau Anda bisa terbuka terhadap perubahan. Sadari bahwa apa pun situasi yang Anda hadapi, Anda punya pilihan. Anda bisa belajar dari situasi tersebut dan menjadi berkembang, atau Anda bisa menolak peluang luar biasa yang ditawarkan oleh Growth Mindset.'
        }

        axios.post('https://anthonygunardi.com:5005/register', {
            usia,
            departemen,
            skor_tes: score,
            persentase_growthMindset: finalScore,
            penjelasan_skor
        })
        .then(result => {
            const attributes = {
                href: "detail.html",
                class: "btns"
            };
            const detailButton = document.createElement("a");
            setAttributes(detailButton, attributes);
            detailButton.innerHTML = "Details";
            document.getElementById("details").appendChild(detailButton);
        })
        .catch(err => console.log(err))
    }
}

function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(attr => {
      element.setAttribute(attr, attributes[attr]);
    });
}
