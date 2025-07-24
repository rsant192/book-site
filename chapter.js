// chapter.js — Show full content of one chapter
const SUPABASE_URL = 'https://jkjfdgjgjpybnixqwiou.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Replace with full key if needed
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const params = new URLSearchParams(window.location.search);
const chapterId = params.get('chapter_id');

async function loadChapter() {
  const div = document.getElementById('chapter-content');

  const { data: chapter, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('id', chapterId)
    .single();

  if (error || !chapter) {
    div.innerHTML = '<p>Chapter not found.</p>';
    return;
  }

  div.innerHTML = `
    <h2>${chapter.title}</h2>
    <p>${chapter.content}</p>
  `;
}

loadChapter();
