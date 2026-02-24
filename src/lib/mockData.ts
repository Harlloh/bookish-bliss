// Mock data types and data for the book review application

export interface User {
  id: number;
  name: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  description: string;
  publicationYear: number;
  addedBy: number;
  addedByName: string;
  createdAt: string;
  averageRating: number;
  reviewCount: number;
  imageUrl?: string;
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  bookId: number;
  bookTitle?: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  updatedAt: string;
}

// Mock current user (authenticated state)
export const mockCurrentUser: User | null = {
  id: 1,
  name: "Eleanor Vance",
  email: "eleanor@example.com",
  isVerified: true,
  createdAt: "2024-01-15T10:30:00Z",
};

// Mock users
export const mockUsers: User[] = [
  mockCurrentUser!,
  {
    id: 2,
    name: "Theodore Hayes",
    email: "theo@example.com",
    isVerified: true,
    createdAt: "2024-02-20T14:15:00Z",
  },
  {
    id: 3,
    name: "Margaret Chen",
    email: "margaret@example.com",
    isVerified: true,
    createdAt: "2024-03-05T09:45:00Z",
  },
];

// Mock books
export const mockBooks: Book[] = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    isbn: "9780525559474",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    publicationYear: 2020,
    addedBy: 1,
    addedByName: "Eleanor Vance",
    createdAt: "2024-01-20T12:00:00Z",
    averageRating: 4.2,
    reviewCount: 3,
  },
  {
    id: 2,
    title: "Circe",
    author: "Madeline Miller",
    isbn: "9780316556347",
    description: "In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child—not powerful, like her father, nor viciously alluring like her mother.",
    publicationYear: 2018,
    addedBy: 2,
    addedByName: "Theodore Hayes",
    createdAt: "2024-02-25T16:30:00Z",
    averageRating: 4.8,
    reviewCount: 5,
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    isbn: "9780593135204",
    description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.",
    publicationYear: 2021,
    addedBy: 1,
    addedByName: "Eleanor Vance",
    createdAt: "2024-03-10T08:20:00Z",
    averageRating: 4.6,
    reviewCount: 4,
  },
  {
    id: 4,
    title: "Piranesi",
    author: "Susanna Clarke",
    isbn: "9781635575637",
    description: "Piranesi's house is no ordinary building: its rooms are infinite, its corridors endless, its walls are lined with thousands upon thousands of statues.",
    publicationYear: 2020,
    addedBy: 3,
    addedByName: "Margaret Chen",
    createdAt: "2024-03-15T11:45:00Z",
    averageRating: 4.4,
    reviewCount: 2,
  },
  {
    id: 5,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    isbn: "9780593318171",
    description: "From her place in the store, Klara, an Artificial Friend with outstanding observational qualities, watches carefully the behavior of those who come in to browse.",
    publicationYear: 2021,
    addedBy: 2,
    addedByName: "Theodore Hayes",
    createdAt: "2024-04-01T14:00:00Z",
    averageRating: 4.1,
    reviewCount: 3,
  },
  {
    id: 6,
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    isbn: "9781250217318",
    description: "A magical island. A dangerous task. A burning secret. Linus Baker leads a quiet, solitary life as a caseworker at the Department in Charge Of Magical Youth.",
    publicationYear: 2020,
    addedBy: 1,
    addedByName: "Eleanor Vance",
    createdAt: "2024-04-10T09:30:00Z",
    averageRating: 4.7,
    reviewCount: 6,
  },
];

// Mock reviews
export const mockReviews: Review[] = [
  {
    id: 1,
    userId: 2,
    userName: "Theodore Hayes",
    bookId: 1,
    bookTitle: "The Midnight Library",
    rating: 4,
    reviewText: "A beautiful meditation on the choices we make and the lives we could have lived. Haig writes with such tenderness about regret and hope. The concept is brilliant, though some parts felt a bit rushed.",
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2024-02-01T10:00:00Z",
  },
  {
    id: 2,
    userId: 3,
    userName: "Margaret Chen",
    bookId: 1,
    bookTitle: "The Midnight Library",
    rating: 5,
    reviewText: "This book changed my perspective on life. Every page resonated with me, and I found myself underlining passages constantly. A must-read for anyone going through a difficult time.",
    createdAt: "2024-02-15T14:30:00Z",
    updatedAt: "2024-02-15T14:30:00Z",
  },
  {
    id: 3,
    userId: 1,
    userName: "Eleanor Vance",
    bookId: 2,
    bookTitle: "Circe",
    rating: 5,
    reviewText: "Miller's prose is absolutely enchanting. She breathes new life into these ancient myths while making Circe a fully realized, deeply human character. The feminist reimagining is masterful.",
    createdAt: "2024-03-01T09:15:00Z",
    updatedAt: "2024-03-01T09:15:00Z",
  },
  {
    id: 4,
    userId: 3,
    userName: "Margaret Chen",
    bookId: 2,
    bookTitle: "Circe",
    rating: 5,
    reviewText: "Lyrical, powerful, and deeply moving. This is mythology reimagined at its finest. Circe's journey from overlooked goddess to powerful witch is absolutely captivating.",
    createdAt: "2024-03-05T16:45:00Z",
    updatedAt: "2024-03-05T16:45:00Z",
  },
  {
    id: 5,
    userId: 2,
    userName: "Theodore Hayes",
    bookId: 3,
    bookTitle: "Project Hail Mary",
    rating: 5,
    reviewText: "Andy Weir does it again! The science is fascinating, the humor is perfect, and Rocky is now one of my favorite characters in all of fiction. I stayed up all night to finish this.",
    createdAt: "2024-03-20T22:00:00Z",
    updatedAt: "2024-03-20T22:00:00Z",
  },
  {
    id: 6,
    userId: 1,
    userName: "Eleanor Vance",
    bookId: 4,
    bookTitle: "Piranesi",
    rating: 4,
    reviewText: "Strange, beautiful, and utterly unique. Clarke creates a world unlike anything I've ever read. The mystery unfolds perfectly, though I wished for a bit more at the end.",
    createdAt: "2024-03-25T11:30:00Z",
    updatedAt: "2024-03-25T11:30:00Z",
  },
  {
    id: 7,
    userId: 2,
    userName: "Theodore Hayes",
    bookId: 6,
    bookTitle: "The House in the Cerulean Sea",
    rating: 5,
    reviewText: "Pure comfort in book form. This story about found family, acceptance, and love warmed my heart from start to finish. Klune writes with such genuine kindness.",
    createdAt: "2024-04-15T08:00:00Z",
    updatedAt: "2024-04-15T08:00:00Z",
  },
];

// Helper functions
export const getBookById = (id: number): Book | undefined => {
  return mockBooks.find((book) => book.id === id);
};

export const getReviewsByBookId = (bookId: number): Review[] => {
  return mockReviews.filter((review) => review.bookId === bookId);
};

export const getReviewsByUserId = (userId: number): Review[] => {
  return mockReviews.filter((review) => review.userId === userId);
};

export const getBooksByUserId = (userId: number): Book[] => {
  return mockBooks.filter((book) => book.addedBy === userId);
};

export const searchBooks = (query: string): Book[] => {
  const lowerQuery = query.toLowerCase();
  return mockBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
      book.isbn.includes(query)
  );
};
