import { useState, useEffect } from "react";
import ratanak from "../../../../public/Team/Saren Ratanak.jpg";
import student2 from "../../../../public/Team/IMG_0070.JPG";
import student3 from "../../../../public/Team/IMG_4905.JPG";

export default function ReviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('right'); // Track slide direction
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto float functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setDirection('right');
        handleNext();
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('left');
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? students.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('right');
    setCurrentIndex((prevIndex) => 
      prevIndex === students.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

const students = [
  {
    id: 1,
    name: "Pao Ponareachh",
    feedback: "The React tutorials on this blog helped me understand hooks and state management better than any other resource I've tried.",
    image: ratanak,
    alt: "Pao Ponareachh",
    favoriteArticle: "Understanding React Hooks",
    date: "2024-03-15"
  },
  {
    id: 2,
    name: "John Smith",
    feedback: "I look forward to every Monday for the new blog posts. The career advice series has been invaluable for my professional growth.",
    image: student2,
    alt: "John Smith",
    favoriteArticle: "10 Tips for Junior Developers",
    date: "2024-03-10"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    feedback: "As a beginner, I really appreciate how the blog breaks down complex topics into digestible pieces. Keep up the great work!",
    image: student3,
    alt: "Sarah Johnson",
    favoriteArticle: "JavaScript Fundamentals for Beginners",
    date: "2024-03-05"
  }
];

  const currentStudent = students[currentIndex];

  // Slide animation classes based on direction
  const getSlideAnimation = () => {
    if (direction === 'right') {
      return 'animate-slide-in-right';
    } else {
      return 'animate-slide-in-left';
    }
  };

  return (
    <div className="container mx-auto px-6 text-center">
      <div className="mb-16 animate-fade-in-up">
        <span className="text-sm font-bold text-primary-orange uppercase tracking-widest">
          Testimonials
        </span>
        <h2 className="mt-2 text-4xl lg:text-5xl font-extrabold text-text-main">
          HEAR FROM OUR USER
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto flex items-center justify-center">
        <button 
          onClick={handlePrevious}
          disabled={isAnimating}
          className="absolute left-0 z-10 w-12 h-12 flex items-center justify-center bg-bg-secondary rounded-full text-text-sub hover:bg-border-main transition-colors shadow-sm animate-pulse-slow disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row items-center gap-12 px-16">
          <div className={`relative ${getSlideAnimation()}`}>
            <div className="w-50 h-50 bg-primary-orange rounded-[40%_60%_70%_30%/40%_50%_60%_50%] overflow-hidden flex items-start justify-start shadow-xl animate-float">
              <img
                src={currentStudent.image}
                alt={currentStudent.alt}
                className="w-[90%] h-[90%] object-cover p-2 rounded-full hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className={`text-left max-w-md relative ${getSlideAnimation()}`} style={{ animationDelay: '0.1s' }}>
            <span className="absolute -top-6 -left-4 text-border-main text-6xl font-serif animate-pulse-slow">
              “
            </span>

            <h3 className="text-2xl font-bold text-text-main mb-4">
              {currentStudent.name}
            </h3>

            <p className="text-text-sub text-lg leading-relaxed italic animate-fade-in-up-delay mb-4">
              {currentStudent.feedback}
            </p>

            <span className="absolute -bottom-10 right-0 text-border-main text-6xl font-serif animate-pulse-slow ">
              ”
            </span>
          </div>
        </div>

        <button 
          onClick={handleNext}
          disabled={isAnimating}
          className="absolute right-0 z-10 w-12 h-12 flex items-center justify-center bg-bg-secondary rounded-full text-text-sub hover:bg-border-main transition-colors shadow-sm animate-pulse-slow disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-8">
        {students.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            disabled={isAnimating}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary-orange w-4 animate-pulse-glow' 
                : 'bg-border-main hover:bg-primary-orange/50'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Optional: Add counter */}
      <p className="text-sm text-text-sub mt-4">
        {currentIndex + 1} / {students.length}
      </p>
    </div>
  );
}