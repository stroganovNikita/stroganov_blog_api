require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
  fetch: fetch.bind(globalThis)
});

exports.supabaseReturnImgUrl = async (file) => {
    const { data, error } = await supabase.storage
    .from('blog')
    .upload(file.originalname, file.buffer);

    const retrieve = await supabase.storage
    .from('blog')
    .getPublicUrl(file.originalname)

    return retrieve.data
}