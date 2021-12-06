const keyboard = {
    data: {
        numberOfRows: 4,
        rowsWrapper: null,
        rows: [],
        keysForRows: [
            ['\\', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'del'],
            ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '+'],
            ['caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter'],
            ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift']
        ],
        randomKey: null
    },
    init() {
        const container = document.querySelector('.container');
        this.data.rowsWrapper = container.appendChild(document.createElement('div'));

        this.data.rowsWrapper.classList.add('rows-wrapper');
        this.renderRows();
        this.jiggleKey();
        this.removeJiggle();
    },
    renderRows() {
        for (let i = 0; i < this.data.numberOfRows; i++) {
            this.data.rows.push(this.data.rowsWrapper.appendChild(document.createElement('div')));
            this.data.rows[i].classList.add('row', 'row-' + [i]);
            this.renderKeys(i);
        }
    },
    renderKeys(rowIndex) {
        const rowKeys = this.data.keysForRows[rowIndex];

        for (let i = 0; i < rowKeys.length; i++) {
            const value = rowKeys[i];
            const createdKeys = this.data.rows[rowIndex].appendChild(document.createElement('div'));

            createdKeys.classList.add('key');
            createdKeys.dataset.value = value;
            createdKeys.textContent = value.toUpperCase();
            
            switch (value) {
                case 'del':
                    createdKeys.classList.add('del-key');
                    createdKeys.dataset.value = 'delete';
                    break;
                
                case 'tab':
                    createdKeys.classList.add('tab-key');
                    break;
                
                case 'caps':
                    createdKeys.classList.add('caps-key');
                    createdKeys.dataset.value = 'capslock';
                    break;
                
                case 'enter':
                    createdKeys.classList.add('enter-key');
                    break;
                
                case 'shift':
                    createdKeys.classList.add('shift-key');
                    break;
            
                default:
                    // Do nothing
                    break;
            }
        }
    },
    removeJiggle() {
        const keys = document.querySelectorAll('.key');
        
        document.addEventListener('keydown', e => {            
            for (let i = 0; i < keys.length; i++) {
                if (keys[i].classList.contains('jiggle')) {
                    if (this.data.randomKey.dataset.value.toLowerCase() === e.key.toLowerCase()) {
                        this.data.randomKey.classList.remove('jiggle');
                        this.jiggleKey();
                    }
                }
            }
        });
    },
    jiggleKey() {
        const keysToJiggle = document.querySelectorAll('.key');
        const random = Math.floor(Math.random() * (keysToJiggle.length));
        this.data.randomKey = keysToJiggle[random];
        this.data.randomKey.classList.add('jiggle');
    }
}

window.onload = function () {
    keyboard.init();
}