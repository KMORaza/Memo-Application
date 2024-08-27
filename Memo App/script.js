document.getElementById('addButton').addEventListener('click', function() {
    const memoInput = document.getElementById('memoInput');
    const memoText = memoInput.value.trim();
    const colorPicker = document.getElementById('colorPicker');
    const memoColor = colorPicker.value;

    if (memoText === '') {
        alert('Please enter a memo!');
        return;
    }

    const memoList = document.getElementById('memoList');
    const memoDiv = document.createElement('div');
    memoDiv.className = 'memo';
    memoDiv.style.backgroundColor = memoColor;

    const memoContent = document.createElement('p');
    memoContent.textContent = memoText;
    memoContent.className = 'editable';
    memoDiv.appendChild(memoContent);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'memoCheckbox';
    memoDiv.appendChild(checkbox);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'memoActions hidden';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click event from toggling the expanded view
        memoDiv.remove();
    });
    actionsDiv.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.className = 'editButton';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click event from toggling the expanded view
        const isEditable = memoContent.isContentEditable;
        if (isEditable) {
            memoContent.contentEditable = 'false';
            memoContent.classList.remove('editable');
        } else {
            memoContent.contentEditable = 'true';
            memoContent.focus();
            memoContent.classList.add('editable');
        }
    });
    actionsDiv.appendChild(editButton);

    const closeButton = document.createElement('button');
    closeButton.className = 'closeButton';
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click event from toggling the expanded view
        memoDiv.classList.remove('expanded');
        actionsDiv.classList.add('hidden');
    });
    actionsDiv.appendChild(closeButton);

    memoDiv.appendChild(actionsDiv);

    let pressTimer;
    memoDiv.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            memoDiv.classList.add('selected');
        }, 500); // Show checkboxes after 500ms of pressing
    });

    memoDiv.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });

    memoDiv.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });

    memoDiv.addEventListener('click', function() {
        const expandedMemo = document.querySelector('.memo.expanded');
        if (expandedMemo && expandedMemo !== memoDiv) {
            expandedMemo.classList.remove('expanded');
            expandedMemo.querySelector('.memoActions').classList.add('hidden');
        }
        memoDiv.classList.toggle('expanded');
        const isExpanded = memoDiv.classList.contains('expanded');
        actionsDiv.classList.toggle('hidden', !isExpanded);
        memoDiv.classList.remove('selected'); // Deselect when expanded
    });

    memoList.appendChild(memoDiv);

    memoInput.value = '';
});
