let data = [{
    id: 1,
    title: "Estudar HTML"
}, {
    id: 2,
    title: "Estudar CSS"
}, {
    id: 3,
    title: "Estudar JS"
}, {
    id: 4,
    title: "Estudar C#"
}];

function renderToDo() {
    document.querySelector('.todo').innerHTML = "";

    data.forEach(task => {

        let li = document.createElement('li');

        li.innerHTML = `
    <input id="task-${task.id}" type="checkbox">
    <label for="task-${task.id}">${task.title} </label>
    <button type="button">X</button>`;

        li.querySelector('input').addEventListener("change", e => {

            if (e.target.checked) {
                li.classList.add('complete');
            } else {
                li.classList.remove('complete');
            }
        });

        li.querySelector('button').addEventListener('click', e => {
            let button = e.target;
            let li = button.parentNode;
            let input = li.querySelector('input');
            let id = input.id;
            let idArray = id.split('-');
            let todoId = idArray[1];
            let title = li.querySelector('label').innerText;

            if (confirm(`Deseja realmente excluir a tarefa ${title}?`)) {

                data = data.filter(task => task.id !== parseInt(todoId));

                renderToDo();
            }
        });

        document.querySelector('.todo').append(li);
    });
}

document.querySelector('#new-task').addEventListener('keyup', e => {

    if (e.key == 'Enter') {

        data.push({
            id: data.length + 1,
            title: e.target.value
        });

        e.target.value = "";
        renderToDo();
    }
});

renderToDo();