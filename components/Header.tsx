import Link from 'next/link'
import AuthButton from './AuthButton'
import { createClient } from '@/lib/supabase/server';

async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className='sticky top-0 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md z-10 supports-backdrop-filter:bg-stone-50/60'>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href='/' className='flex items-center space-x-2'>
          <span className='font-bold text-2xl'>DealDrop.io</span>
        </Link>
        <AuthButton user={user} />
      </div>
    </header>
  )
}

export default Header