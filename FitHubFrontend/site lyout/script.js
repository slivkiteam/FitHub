document.querySelectorAll('.open-exercise').forEach(function(button) {
    button.addEventListener('click', function() {
        var exercise = this.closest('.exercise'); // Получаем родительский элемент <li>
        var content = exercise.querySelector('.exercise-description'); // Находим описание внутри этого <li>
        // Переключаем класс 'expanded'
        // if (exercise.classList.contains('expanded')) exercise.classList.remove('expanded');
        // else exercise.classList.add('expanded');
        //toggle работает так же, как и блок if-else выше
        exercise.classList.toggle('expanded');
        // Переключаем отображение описания
        content.style.display = (content.style.display === 'none' || content.style.display === '') ? 'block' : 'none';
    });
});
