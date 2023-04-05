// Descrizione:
// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi i numeri scompaiono e l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
// Consigli del giorno:
// * Pensate prima in italiano.
// * Dividete in piccoli problemi la consegna.
// * Individuate gli elementi di cui avete bisogno per realizzare il programma.

const   error_time      = 2000; 
const   extra_time      = 2500;
const   memo_time       = 1000;
const   max_value       = 100;
const   array_length    = 5; 
let     html_random_id  = document.querySelectorAll("#random_nr_box div.col-1");
let     html_user_id    = document.querySelectorAll("#user_nr_box div.col-1");
let     random_nr_array;
let     user_nr_array;
let     ready_to_input  = false; 

function reset_array()
{
    random_nr_array = [];
    user_nr_array = [];
}

function int_random(max)
{
    return Math.floor(Math.random() * max);
}

function fill_random_array()
{
    reset_array();
    let random_value;
    for (let i = 0; i < array_length; i++)
    {
        do
        {
            random_value = int_random(max_value) + 1;
        }
        while (random_nr_array.includes(random_value));
        random_nr_array.push(random_value);
        console.log(random_nr_array);
    }
}

function show_random_nr()
{
    let i = -1;
    let slow_show = setInterval(function()
    {
        i++;
        html_random_id[i].innerText = random_nr_array[i];
    }, memo_time);
    setTimeout(function()
    {
        clearInterval(slow_show);
    }, memo_time * array_length);
    console.log(html_random_id);
}

function go_to_input()
{
    document.getElementById("input_nr_section").classList.remove("d_none");  
    document.getElementById("user_nr_section").classList.remove("d_none");  
}

function waiting()
{
    let memorise = setTimeout(function()
{
    console.log(ready_to_input)
    for (let i = 0; i < array_length; i++)
    {
        html_random_id[i].innerText = "?";
    }
    ready_to_input = true;
    console.log(ready_to_input);
    go_to_input();
}, extra_time + (memo_time * array_length));
}

function compare_array()
{
    document.getElementById("input_nr_section").classList.add("d_none");
}

function en_dis_input(disable_boolean)
{
    document.getElementById("input_nr").disabled = disable_boolean;
    document.getElementById("submit_nr").disabled = disable_boolean;
}

function value_repeated(user_value)
{
    en_dis_input(true);
    document.getElementById("error_nr").innerText = user_value;
    document.getElementById("error_msg").classList.toggle("d_none");
    let error_timer = setTimeout(function()
    {
        document.getElementById("error_msg").classList.toggle("d_none");
        en_dis_input(false);
    },error_time);
}

data_form.addEventListener("submit", (call_back_function) =>
{
    call_back_function.preventDefault();
    const user_value = document.getElementById("input_nr").value;
    if (user_nr_array.includes(user_value))
    {
        value_repeated(user_value);
    }
    else
    {
        user_nr_array.push(user_value);     
        html_user_id[user_nr_array.length - 1].innerText = user_value;
        document.getElementById("input_nr").value = "";
    }
    if (user_nr_array.length == array_length)
    {
        // Input concluso
        compare_array();
    }
});

fill_random_array();
show_random_nr();
waiting();