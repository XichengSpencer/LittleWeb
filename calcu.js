//global var for row count
let row_count =2
//let sec_sum = 0;

function RemoveRow(){
    //locate the form
    let form = document.getElementById('timeForm');
    //list of input row as div
    let list = form.querySelectorAll('div');

    if(row_count>2){
        let element = list[list.length-1];
        form.removeChild(element);
        row_count--;
    }else{
        //minimun row required.
        alert('There is no row to remove');
    }



}
function AddRow() {
    const form = document.getElementById('timeForm');
    //define html content
    let html = '<div class="input" id="input'+row_count+'">\
        <label for="hour'+row_count+'">Hour:</label>\
        <input type="text" id="hour'+row_count+'" name="hour '+row_count+'" placeholder="Enter hour"/>\
        <small></small>\
        <label for="minute'+row_count+'">Minute:</label>\
        <input type="text" id="minute'+row_count+'" name="minute'+row_count+'" placeholder="Enter minute"/>\
        <label for="second'+row_count+'">Second:</label>\
        <input type="text" id="second'+row_count+'" name="second'+row_count+'" placeholder="Enter second"/>\
        <small></small>\
    </div>'
    row_count++;
    //insert
    form.insertAdjacentHTML('beforeend',html);

}
function calculateOut(sec_num){
    let min = sec_num/60;
    document.getElementById('out_s').innerText = (sec_num%60).toString();
    document.getElementById('out_m').innerText = (min%60).toString();
    document.getElementById('out_h').innerText = (Math.floor(min/60)).toString();
}
//input is not null
function validate(input){
    return !isNaN(input);
}

//handles both add and subtract
function add(type) {
    //locate the form location
    const form = document.getElementById('timeForm');
    const addInputs = form.querySelectorAll('.input');
    let sec_sum = 0;
    // for each row
    addInputs.forEach(function(time,j){
        let list = time.querySelectorAll('input')
        //iterate h, m, s
        list.forEach(function(input,i){
            if(validate(input.value)){

                if(type=='') {
                    //add
                    sec_sum += Number(input.value) * 60 ** (2 - i);
                }
                //subtract
                else {
                    if(j==0) {
                        //first row as subtract base
                        sec_sum += Number(input.value) * 60 ** (2 - i);
                    }else{
                        sec_sum -= Number(input.value) * 60 ** (2 - i);
                    }

                }
            }
        });
    });

    calculateOut(sec_sum);

}
//for building t
function preprocess(type){
    const form = document.getElementById('timeForm');
    const addInputs = form.querySelectorAll('div.input');

    let sec_sum = 0;
    let input_num = addInputs[0];
    let list = input_num.querySelectorAll('input')
    //multiply input with multiply number
    let multiplier = document.getElementById('multiplier').value;
    if(multiplier==''||!validate(multiplier)){
        alert('Please Enter A Number for Multiplication or Division');
        return false;
    }
    //w
    list.forEach(function(input,i){
        if(validate(input.value)){
            let value = Number(input.value),op_value = Number(multiplier);

            if(type=='multiply') {
                sec_sum += value * op_value * 60 ** (2 - i);
            }else {
                sec_sum += value / op_value * 60 ** (2 - i);
            }
        }
    });
    calculateOut(sec_sum);
}
// takes first two time input to calculate time period
function sleep_period(){

    let sleep_sec = 0;
    const start = document.getElementById('input0');
    const end = document.getElementById('input1');
    let start_list = start.querySelectorAll('input');
    let end_list = end.querySelectorAll('input');

    start_list.forEach((element,i)=>{
        if(validate(element.value)){
            //
            sleep_sec+=(Number(end_list[i].value)-Number(element.value))*60**(2-i);
        }
    });
    console.log("Sleep sec:"+sleep_sec)
    //output string
    let output = '';
    let total_min = Math.abs(sleep_sec/60);
    console.log("Total min:"+total_min);
    // min
    let upper_bound = Math.floor(total_min/70);
    let lower_bound = Math.ceil(total_min/110);
    if( upper_bound <= 1 ){
        output += 'Time is too short for calculation'
    }
    for(let i = lower_bound ;i <= upper_bound;i++){
        let minutes = (total_min/i).toString();
        console.log("Minutes here"+minutes);
        output+='Potentially have '+i.toString()+' cycles, and each cycle has '+minutes+'minutes\n\n';
    }
    console.log (output) ;
    let display = document.getElementById('sleep');

    display.innerText=output;

}