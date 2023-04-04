// Descrizione:
// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi i numeri scompaiono e l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
// Consigli del giorno:
// * Pensate prima in italiano.
// * Dividete in piccoli problemi la consegna.
// * Individuate gli elementi di cui avete bisogno per realizzare il programma.

const   max_value       = 100;
const   array_length    = 5; 
let     random_nr_array;

function reset_random_array()
{
    random_nr_array = [];
}

function int_random(max)
{
    return Math.floor(Math.random() * max);
}

function fill_random_array()
{
    reset_random_array();
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
    let html_random_id = document.querySelectorAll("#random_nr_box > div.col-1");
    let slow_show = setInterval(function()
    {
        i++;
        html_random_id[i].innerText = random_nr_array[i];
    }, 2000);
    setTimeout(function()
    {
        clearInterval(slow_show);
    }, 10000)
    console.log(html_random_id);
}

fill_random_array();
show_random_nr();