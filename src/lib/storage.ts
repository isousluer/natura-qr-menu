import { supabase } from './supabase'

export async function deleteStorageImage(url: string | null) {
  if (!url) return
  try {
    const path = url.split('/menu-images/')[1]
    if (path) await supabase.storage.from('menu-images').remove([path])
  } catch {}
}
