// main.js — Show all books with cover photo and link to book.html
const SUPABASE_URL = 'https://jkjfdgjgjpybnixqwiou.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Replace with full key if needed
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadBooks() {
  const { data: books, error } = await supabase.from('books').select('*');
  const booksDiv = document.getElementById('books');

  if (error || !books) {
    booksDiv.innerHTML = '<p>Error loading books.</p>';
    return;
  }

  for (const book of books) {
    const div = document.createElement('div');
    div.className = 'book';
    div.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" />
      <div>
        <h3>${book.title}</h3>
        <p>${book.description || ''}</p>
      </div>
    `;
    div.onclick = () => {
      window.location.href = 'book.html?book_id=' + book.id;
    };
    booksDiv.appendChild(div);
  }
}

loadBooks();
