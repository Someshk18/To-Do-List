window.onload = function () {
      const saved = localStorage.getItem("tasks");
      if (saved) {
        const tasks = JSON.parse(saved);
        tasks.forEach(task => addTask(task.text, task.done));
      }
    };

    function addTask(taskText = null, isDone = false) {
      const input = document.getElementById("taskInput");
      const text = taskText || input.value.trim();
      if (text === "") return;

      const li = document.createElement("li");
      li.textContent = text;

      if (isDone) li.classList.add("done");

      li.addEventListener("click", () => {
        li.classList.toggle("done");
        saveTasks();
      });

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.className = "delete-btn";
      delBtn.onclick = (e) => {
        e.stopPropagation();
        li.remove();
        saveTasks();
      };

      li.appendChild(delBtn);
      document.getElementById("taskList").appendChild(li);
      if (!taskText) input.value = "";

      saveTasks();
    }

    function saveTasks() {
      const listItems = document.querySelectorAll("#taskList li");
      const tasks = [];
      listItems.forEach(li => {
        const text = li.firstChild.textContent;
        const done = li.classList.contains("done");
        tasks.push({ text, done });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
