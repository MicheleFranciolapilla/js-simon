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
const   bg_color_array  = ["yellow", "green", "orange", "red", "blue"];
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

function final_msg(matches)
{
    let message = "";
    switch (matches)
    {
        case 0:
            message = "Ragazzo/a mio/a, mangia più pesce, poichè la tua memoria è messa maluccio!!!";
            break;
        case 1:
            message = "Diciamo che poteva andarti peggio ..... almeno un numero lo hai ricordato!";
            break;
        case 2:
            message = "2 su 5..... Hai dei margini di miglioramento ma non stai messo male!";
            break;
        case 3:
            message = "Wow!!! Ne hai ricordati 3 su 5. Bravo/a; continua ad esercitarti!!!";
            break;
        case 4:
            message = "Complimenti! Hai dato prova di buona memoria visiva: 4 su 5!!!";
            break;
        default:
            message = "Che dire?!? Ci inchiniamo di fronte ai tuoi neuroni..... 5 su 5!!!!!";
            break;
    }
    document.getElementById("finished").classList.remove("d_none");
    document.querySelector("#finished h3").innerText = message;
}

function compare_array()
{
    document.getElementById("input_nr_section").classList.add("d_none");
    for (let i = 0; i < array_length; i++)
    {
        html_random_id[i].innerText = random_nr_array[i];
    }
    let matches = 0;
    for (let i = 0; i < array_length; i++)
    {
        for (let j = 0; j < array_length; j++)
        {
            if (user_nr_array[i] == random_nr_array[j])
            {
                html_user_id[i].setAttribute("style", `background-color: ${bg_color_array[matches]} !important; color: white;`);
                html_random_id[j].setAttribute("style", `background-color: ${bg_color_array[matches]} !important; color:white;`);
                matches++;
            }
        }
    }
    final_msg(matches);
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