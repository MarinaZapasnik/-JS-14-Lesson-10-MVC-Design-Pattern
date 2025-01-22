const MOCK_TASKS = [
  { id: 1, title: "Изучить паттерн MVC", isDone: false },
  { id: 2, title: "Подготовить моковые данные", isDone: true },
];
// хранение данных, бизнес-логика(то есть методы, которые в дальнейшем будут вызываться) работы с этими данными)
const model = {
  tasks: MOCK_TASKS,
    addTask(title) {
      const newTask = {
        id: new Date().getTime(), 
        title: title, 
        isDone: false
      }
      this.tasks.push(newTask); 
      view.renderTasks(this.tasks);
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(el => el.id !== taskId)
      view.renderTasks(this.tasks)
    },
    toggleTask(taskId) {
      this.tasks = this.tasks.map((task) => {
        if (task.id === taskId) {
          task.isDone = !task.isDone
        }
        return task
      })
      view.renderTasks(this.tasks)
    }
};

// отображение данных: рендер списка задач, размещение обработчиков событий
const view = {
  init() {
    this.renderTasks(model.tasks);
    const form = document.querySelector('.form');
    const input = document.querySelector('.input');
    const list = document.querySelector('.list');

    //Добавляем обработчик событий на форму
    form.addEventListener('submit', function(event) {
      event.preventDefault() //Предотвращаем стандартное поведение формы
      const title = input.value
      controller.addTask(title) //Вызываем метод addTask контроллера

      input.value = '' //Очищаем поле ввода
    })

    //Добавляем обработчик событий на список задач на кнопку "Удалить"
    list.addEventListener('click', function (event) {
      if (event.target.classList.contains('task-title')) {
        const taskId = +event.target.parentElement.id
        controller.toggleTask(taskId)
      }
 
      // 1. проверяем, что клик был по кнопке удаления
      if (event.target.classList.contains('delete-button')) {
        const taskId = +event.target.parentElement.id
        // 2. вызываем метод контроллера для удаления задачи
        controller.deleteTask(taskId)
      }
    })

  },

  renderTasks(tasks) {
    const list = document.querySelector(".list");

    let tasksHTML = "";

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];

      tasksHTML += `
          <li id="${task.id}" class="${task.isDone ? "done" : ""}">
            <b class="task-title">${task.title}</b>
            <button class="delete-button" type="button">Удалить 🗑</button>
          </li>
        `;
    }

    list.innerHTML = tasksHTML;
  },
};

// обработка действий пользователя, обновление модели(используя методы модели)
const controller = {
  addTask(title) {
    if (title && title.trim() !== '') {
      model.addTask(title)
    }
  },
  deleteTask(taskId) {
    model.deleteTask(taskId)
  },
  toggleTask(taskId){
    model.toggleTask(taskId)
  }
};

function init() {
  view.init();
}

init();
