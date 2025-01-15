let footerClickCount = 0;

function handleFooterClick() {
    footerClickCount++;
    if (footerClickCount >= 8) {
        openAdminPanel();
        footerClickCount = 0; // Сбрасываем счетчик
    }
}

function openAdminPanel() {
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.admin-panel').style.display = 'block';
}

function closeAdminPanel() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.admin-panel').style.display = 'none';
}

async function saveGift() {
    const gift = {
        date: document.getElementById('gift-date').value,
        cost: document.getElementById('gift-cost').value,
        quantity: document.getElementById('gift-quantity').value,
        title: document.getElementById('gift-title').value,
        url: document.getElementById('gift-url').value,
    };

    const response = await fetch('/add_gift', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gift),
    });

    if (response.ok) {
        const newGift = await response.json();
        addGiftToPage(newGift);
        closeAdminPanel();
    } else {
        alert('Ошибка при добавлении подарка.');
    }
}

function addGiftToPage(gift) {
    const container = document.querySelector('.gifts-container');
    const noGifts = document.querySelector('.no-gifts');
    if (noGifts) noGifts.remove();

    const giftElement = document.createElement('div');
    giftElement.className = 'gift';
    giftElement.innerHTML = `<img src="${gift.url}" alt="${gift.title}"><h3>${gift.title}</h3>`;
    container.appendChild(giftElement);
}
