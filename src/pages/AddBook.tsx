import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import api from '@/lib/axios';

export default function AddBook() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    // isbn: '',
    description: '',
    publicationYear: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/books', {
        ...formData,
        publicationYear: parseInt(formData.publicationYear, 10),
      });

      if (res.data.success) {
        navigate(`/books/${res.data.book.id}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl font-bold text-ink mb-8">Add a New Book</h1>

        {error && (
          <div className="mb-6 p-4 bg-burgundy/10 border border-burgundy/30 rounded-lg text-burgundy">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-parchment rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-burgundy/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Author *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-parchment rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-burgundy/30"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-ink mb-1">ISBN *</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
              maxLength={13}
              className="w-full px-4 py-2 border border-parchment rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-burgundy/30"
            />
            <p className="text-xs text-muted mt-1">13-digit ISBN number</p>
          </div> */}

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Publication Year *</label>
            <input
              type="number"
              name="publicationYear"
              value={formData.publicationYear}
              onChange={handleChange}
              required
              min={1000}
              max={new Date().getFullYear()}
              className="w-full px-4 py-2 border border-parchment rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-burgundy/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-parchment rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-burgundy/30 resize-none"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-parchment rounded-lg text-ink hover:bg-parchment"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-burgundy text-white rounded-lg font-semibold hover:bg-burgundy/90 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
