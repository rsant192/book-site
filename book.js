const SUPABASE_URL = 'https://jkjfdgjgjpybnixqwiou.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Replace with your actual full key
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const params = new URLSearchParams(window.location.search);
const bookId = params.get('book_id');

async function loadChapters() {
  const chaptersDiv = document.getElementById('chapters');

  const { data: chapters, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('book_id', bookId)
    .order('chapter_number', { ascending: true }); // ✅ ORDER FIXED HERE

  if (error || !chapters) {
    chaptersDiv.innerHTML = '<p>Error loading chapters.</p>';
    return;
  }

  for (const ch of chapters) {
    const chEl = document.createElement('p');
    chEl.textContent = (ch.locked ? '🔒 ' : '📖 ') + ch.title;
    chEl.onclick = () => {
      window.location.href = 'chapter.html?chapter_id=' + ch.id;
    };
    chaptersDiv.appendChild(chEl);
  }
}

loadChapters();
