
const $ = s => document.querySelector(s),
      $$ = s => document.querySelectorAll(s);

let cart = 0;

// ==============================
// TOAST
// ==============================
function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(
        () => t.classList.remove('show'),
        2600
    );
}

// ==============================
// MENU
// ==============================
$('#menuToggle').addEventListener('click', () =>
    $('#navlinks').classList.toggle('open')
);

$$('#navlinks a').forEach(a =>
    a.addEventListener('click', () =>
        $('#navlinks').classList.remove('open')
    )
);

// ==============================
// CARRINHO
// ==============================
$$('.add-cart').forEach(b =>
    b.addEventListener('click', () => {
        cart++;
        $('#cartCount').textContent = cart;

        toast(
            b.dataset.name +
            ' adicionado ao carrinho!'
        );
    })
);

$('#cartBtn').addEventListener('click', () =>
    toast(
        cart
            ? `Seu carrinho tem ${cart} ${
                  cart === 1 ? 'item' : 'itens'
              }. Para finalizar, fale com a loja pelo WhatsApp.`
            : 'Seu carrinho está vazio.'
    )
);

// ==============================
// ÁREA DO CLIENTE
// ==============================
$('#accountBtn').addEventListener('click', () =>
    toast(
        'Área do cliente: entre em contato pelo WhatsApp para acessar sua conta.'
    )
);

// ==============================
// BUSCA DE PRODUTOS
// ==============================
function filterProducts(term) {
    let found = 0;

    $$('.product').forEach(p => {
        const show = (
            p.textContent +
            ' ' +
            p.dataset.category
        )
            .toLowerCase()
            .includes(term.toLowerCase());

        p.style.display = show
            ? 'flex'
            : 'none';

        if (show) {
            found++;
        }
    });

    if (!found) {
        toast(
            'Nenhum produto encontrado. Tente outra busca.'
        );
    }
}

$('#searchForm').addEventListener('submit', e => {
    e.preventDefault();

    filterProducts(
        $('#searchInput').value.trim()
    );

    $('#produtos').scrollIntoView();
});

// ==============================
// CATEGORIAS
// ==============================
$$('.category').forEach(c =>
    c.addEventListener('click', () =>
        filterProducts(
            c.dataset.filter
        )
    )
);

// ==============================
// LIMPAR FILTRO
// ==============================
$('#clearFilter').addEventListener('click', e => {
    e.preventDefault();

    $$('.product').forEach(
        p => p.style.display = 'flex'
    );

    $('#searchInput').value = '';
});

// ==============================
// MODAL DE AGENDAMENTO
// ==============================
const backdrop = $('#modalBackdrop');

$$('.book-service').forEach(b =>
    b.addEventListener('click', () => {

        $('#serviceSelect').value =
            b.dataset.service;

        $('#modalTitle').textContent =
            b.dataset.service === 'Hotel e Creche'
                ? 'Consulte disponibilidade'
                : 'Agende seu atendimento';

        backdrop.classList.add('open');

        $('#clientName').focus();
    })
);

function closeModal() {
    backdrop.classList.remove('open');
}

$('#modalClose').addEventListener(
    'click',
    closeModal
);

backdrop.addEventListener('click', e => {
    if (e.target === backdrop) {
        closeModal();
    }
});

// ==============================
// ENVIO DA SOLICITAÇÃO PELO WHATSAPP
// ==============================
$('#bookingForm').addEventListener('submit', e => {
    e.preventDefault();

    // Pega os dados preenchidos no formulário
    const name = $('#clientName').value.trim();
    const pet = $('#petName').value.trim();
    const service = $('#serviceSelect').value;
    const phone = $('#clientPhone').value.trim();

    // Número do WhatsApp da clínica
    // Coloque 55 + DDD + número, sem espaços ou símbolos
    const whatsapp = '5527988872445';

    // Cria a mensagem personalizada
    const mensagem = `Olá! Gostaria de agendar um atendimento.

Nome: ${name}
Pet: ${pet}
Serviço: ${service}
Telefone: ${phone}

Gostaria de verificar a disponibilidade do atendimento.`;

    // Cria o link do WhatsApp
    const url =
        `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagem)}`;

    // Fecha o formulário
    closeModal();

    // Limpa o formulário
    e.target.reset();

    // Abre o WhatsApp
    window.open(url, '_blank');
});

// ==============================
// NEWSLETTER
// ==============================
$('#newsletterForm').addEventListener('submit', e => {
    e.preventDefault();

    toast(
        'Obrigado! Seu e-mail foi cadastrado para novidades.'
    );

    e.target.reset();
});

