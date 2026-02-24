import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import api from '@/lib/axios';

export default function AddBook() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    overview: '',
    publishedYear: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create FormData object
      const data = new FormData();
      data.append('title', formData.title);
      data.append('author', formData.author);
      data.append('overview', formData.overview);
      data.append('publishedYear', formData.publishedYear);

      // Add image if selected
      if (imageFile) {
        data.append('image', imageFile);
      }
      const res = await api.post('books/add-book', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res);
      if (res.data.success) {
        navigate(`/books/${res.data.book.id}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add book');
      console.log('Error uploading book', err);
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

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Published Year *</label>
            <input
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              required
              min={1000}
              max={new Date().getFullYear()}
              className="w-full px-4 py-2 border border-parchment rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-burgundy/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Overview</label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-parchment rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-burgundy/30 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-2">Book Cover Image</label>
            {imagePreview ? (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-44 object-cover rounded-lg border border-parchment"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-burgundy text-white rounded-full text-sm hover:bg-burgundy/80"
                >
                  ×
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-32 h-44 border-2 border-dashed border-parchment rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-burgundy/50 transition-colors"
              >
                <span className="text-3xl text-muted mb-1">+</span>
                <span className="text-xs text-muted">Add Image</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
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
              disabled={isLoading}
              className="flex-1 py-3 bg-burgundy text-white rounded-lg font-semibold hover:bg-burgundy/90 disabled:opacity-50"
            >
              {isLoading ? 'Adding...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
