import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function PracticeHeader() {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <nav className='practice-navbar'>
        <div className='flex items-center gap-4'>
          <p className='practice-brand'>COMPKAR</p>
          {!user ? (
            <Button
              onClick={() => setIsAuthModalOpen(true)}
              variant='outline'
              size='sm'
            >
              Sign In
            </Button>
          ) : (
            <div className='flex items-center gap-2'>
              <span className='text-sm text-gray-600'>
                Welcome, {user.email}
              </span>
              <Button
                onClick={handleLogout}
                variant='outline'
                size='sm'
              >
                Logout
              </Button>
            </div>
          )}
        </div>
        <span className='badge-exam' style={{ padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(0,184,107,0.3)', background: 'rgba(0,184,107,0.12)', color: 'var(--lc-green)' }}>
          Student View
        </span>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
