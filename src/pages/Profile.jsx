import React from 'react';
import { 
  User, Info, Bookmark, LogOut, 
  ChevronDown, ChevronLeft, ChevronRight,
  Heart, Bookmark as BookmarkIcon
} from 'lucide-react';
import { useGetCurrentUserQuery } from '../app/features/auth/auth';
import { getDecryptedRefreshToken, clearTokens } from '../util/tokenUtil';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ category, title, description, time, likes, saves, image, tagColor, authorName, authorImage }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
    {/* Card Header */}
    <div className="p-3 flex items-center gap-2">
      <img src={authorImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"} alt="avatar" className="w-6 h-6 rounded-full border border-gray-200 object-cover" />
      <span className="text-xs font-medium text-gray-700">{authorName}</span>
    </div>
    
    {/* Image Container */}
    <div className="relative h-40 w-full bg-gray-200">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <span className={`absolute bottom-2 left-2 text-[10px] px-2 py-0.5 rounded text-white font-medium ${tagColor}`}>
        {category}
      </span>
    </div>

    {/* Content */}
    <div className="p-4 flex-1">
      <h3 className="font-bold text-sm leading-tight mb-2 text-gray-800">{title}</h3>
      <p className="text-xs text-gray-500 line-clamp-2 mb-4">{description}</p>
      
      <div className="mt-auto">
        <span className="text-[10px] text-gray-400 block mb-3">{time}</span>
        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-gray-400">
            <div className="flex items-center gap-1">
              <Heart size={14} className="text-orange-500 fill-orange-500" />
              <span className="text-[10px] font-bold text-gray-600">{likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookmarkIcon size={14} className="text-orange-500 fill-orange-500" />
              <span className="text-[10px] font-bold text-gray-600">{saves}</span>
            </div>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold py-1.5 px-4 rounded-lg transition-colors">
            Read More
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const token = getDecryptedRefreshToken();
  
  const { data: userData, isLoading, isError } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  const user = userData?.data;

  React.useEffect(() => {
    if (!token) {
      navigate('/auth');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    clearTokens();
    navigate('/');
    window.location.reload();
  };

  if (!token) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFCFB]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const blogs = [
    { category: 'roblox-player', title: 'POV: You spent 3 hours on this Roblox character 💀', description: 'me and my bro on the roblox, while we also have thousand of assignment... lmao too random...', time: '18h ago', likes: '41', saves: '21', tagColor: 'bg-green-600', image: 'https://picsum.photos/seed/roblox/400/300' },
    { category: 'Git', title: 'What is Git? What does we used it for?', description: 'Git is a version control system used to track changes in your code or files. It helps developers...', time: '23h ago', likes: '412k', saves: '21k', tagColor: 'bg-black', image: 'https://picsum.photos/seed/git/400/300' },
    { category: 'Coding', title: 'Just me and my Match against the world 💚', description: 'Coding while sipping the matcha made my day better than ever xd... low battery no never felt tired...', time: '2 days ago', likes: '41.9k', saves: '21', tagColor: 'bg-green-500', image: 'https://picsum.photos/seed/matcha/400/300' },
    { category: 'Coding', title: 'Night shift mode: ON 🌙', description: 'Coding at 2 AM with just the screen lighting up the room. Share thoughts on why nighttime feels...', time: '2 days ago', likes: '41.9k', saves: '21', tagColor: 'bg-green-500', image: 'https://picsum.photos/seed/night/400/300' },
  ];

  return (
    <div className="flex min-h-screen bg-[#FDFCFB]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-100 flex flex-col p-6 fixed h-full bg-white">
        <div className="flex items-center gap-2 mb-12 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <span className="text-orange-600 text-xl">🖋️</span>
          </div>
          <h1 className="font-bold text-xl text-gray-800">DailyWrite</h1>
        </div>

        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-500 text-white font-medium shadow-md shadow-orange-200">
            <User size={18} /> Profile
          </button>
          <button 
            onClick={() => navigate('/about')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-orange-400 hover:bg-orange-50 font-medium transition-all"
          >
            <Info size={18} /> About
          </button>
          <button 
            onClick={() => navigate('/save-blog')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-orange-400 hover:bg-orange-50 font-medium transition-all"
          >
            <Bookmark size={18} /> Saved
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header Section */}
        <header className="flex justify-between items-start mb-12">
          <div className="flex flex-col items-center mx-auto">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-yellow-400 overflow-hidden bg-gray-100 flex items-center justify-center">
                {user?.profileUrl ? (
                  <img src={user.profileUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-gray-400" />
                )}
              </div>
              <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" className="w-5 h-5" alt="badge" />
              </div>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">{user?.fullName || 'User'}</h2>
            <p className="text-gray-400 text-sm">{user?.email || 'email@example.com'}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-red-700 transition-colors"
          >
            Log Out
          </button>
        </header>

        {/* Blogs Feed */}
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center mb-8 relative">
            <h2 className="text-4xl font-black text-orange-500 tracking-tight">Blogs</h2>
            <div className="absolute right-0 flex items-center gap-2 text-sm">
              <span className="text-gray-500">Sort by:</span>
              <button className="flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-1 bg-white text-gray-700">
                Latest <ChevronDown size={14} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...blogs, ...blogs].map((blog, idx) => (
              <BlogCard 
                key={idx} 
                {...blog} 
                authorName={user?.fullName || 'User'} 
                authorImage={user?.profileUrl}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-12">
            <button className="p-2 rounded-lg bg-gray-200 text-gray-500"><ChevronLeft size={18} /></button>
            <button className="w-8 h-8 rounded-lg bg-orange-500 text-white font-bold text-sm">1</button>
            <button className="w-8 h-8 rounded-lg bg-gray-200 text-gray-500 font-bold text-sm">2</button>
            <span className="text-gray-400 px-2">...</span>
            <button className="w-8 h-8 rounded-lg bg-gray-200 text-gray-500 font-bold text-sm">10</button>
            <button className="p-2 rounded-lg bg-gray-200 text-gray-500"><ChevronRight size={18} /></button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;