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
                    axios.post('https://anthonygunardi.com:5005/register', {
                        nama_perusahaan: nama_perusahaan.value,
                        jumlah_peserta: jumlah_peserta,
                        nama_peserta: nama_peserta.value,
                        jabatan_peserta: jabatan_peserta.value,
                        nomor_telp: nomor_telp.value
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
                }else{
                    output++;
                }
            },20)
        }
    }
}

function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(attr => {
      element.setAttribute(attr, attributes[attr]);
    });
}