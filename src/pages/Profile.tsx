import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuthStore } from '@/stores/authStore';
import { ReviewCard } from '@/components/ReviewCard';
import { BookCard } from '@/components/BookCard';
import { getReviewsByUserId, getBooksByUserId } from '@/lib/mockData';
import api from './../lib/axios';
import { useQuery } from '@tanstack/react-query';
import { ProfileLoading } from '@/components/profileLoading';

const fetchUserProfile = async () => {
  const response = await api.get('/profile');
  return response.data.data;
};

export default function Profile() {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'reviews' | 'books'>('reviews');

  // For now, use mock data based on user id (fallback to id 1)
  const userId = user?.id || 1;
  const userReviews = getReviewsByUserId(userId);
  const userBooks = getBooksByUserId(userId);

  const handleLogout = async () => {
    await logout();
  };

  const { data: userProfile, isLoading: isUserLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    staleTime: 60 * 60 * 5
  });

  console.log(userProfile);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white border border-parchment rounded-lg p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-forest text-white rounded-full flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1">
              <h1 className="font-serif text-2xl font-bold text-ink">{user?.name || 'User'}</h1>
              <p className="text-muted">{user?.email}</p>
              <p className="text-sm text-muted mt-1">
                Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-burgundy text-burgundy rounded-lg hover:bg-burgundy hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>

          {!user?.isVerified && (
            <div className="mt-4 p-3 bg-gold/20 border border-gold/50 rounded-lg text-sm">
              ⚠️ Your email is not verified. Please check your inbox for the verification link.
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-parchment">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 px-2 font-medium transition-colors ${activeTab === 'reviews'
              ? 'text-burgundy border-b-2 border-burgundy'
              : 'text-muted hover:text-ink'
              }`}
          >
            My Reviews ({userProfile?.reviews.length})
          </button>
          <button
            onClick={() => setActiveTab('books')}
            className={`pb-3 px-2 font-medium transition-colors ${activeTab === 'books'
              ? 'text-burgundy border-b-2 border-burgundy'
              : 'text-muted hover:text-ink'
              }`}
          >
            Books Added ({userProfile?.books?.length})
          </button>
        </div>

        {/* Content */}
        {isUserLoading ?
          <Layout><ProfileLoading /></Layout>
          :
          (
            activeTab === 'reviews' ? (
              userProfile?.reviews?.length > 0 ? (
                <div className="space-y-4">
                  {userProfile?.reviews?.slice().reverse().map((review) => (
                    <ReviewCard key={review.id} review={review} showBookTitle />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted">
                  <p>You haven't written any reviews yet.</p>
                </div>
              )
            ) : userProfile?.books?.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {userProfile?.books?.slice().reverse().map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted">
                <p>You haven't added any books yet.</p>
              </div>
            )
          )
        }
      </div>
    </Layout>
  );
}
