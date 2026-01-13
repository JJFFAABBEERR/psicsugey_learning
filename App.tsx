
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Explore } from './pages/Explore';
import { ExploreDetail } from './pages/ExploreDetail';
import { CourseDetail } from './pages/CourseDetail';
import { User, CourseProgress } from './types';

const App: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(() => {
    const saved = localStorage.getItem('psicsugey_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [progress, setProgress] = React.useState<Record<string, CourseProgress>>(() => {
    const saved = localStorage.getItem('psicsugey_progress');
    return saved ? JSON.parse(saved) : {};
  });

  React.useEffect(() => {
    if (user) localStorage.setItem('psicsugey_user', JSON.stringify(user));
    else localStorage.removeItem('psicsugey_user');
  }, [user]);

  React.useEffect(() => {
    localStorage.setItem('psicsugey_progress', JSON.stringify(progress));
  }, [progress]);

  const handleLogin = (u: User) => setUser(u);
  const handleLogout = () => setUser(null);

  const handleEnroll = (courseId: string) => {
    if (!user) return;
    const updatedUser = { ...user, enrolledCourses: [...user.enrolledCourses, courseId] };
    setUser(updatedUser);
    
    if (!progress[courseId]) {
      const initialProgress: CourseProgress = {
        courseId,
        completedLessons: [],
        lastAccessed: Date.now()
      };
      setProgress(prev => ({ ...prev, [courseId]: initialProgress }));
    }
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    setProgress(prev => {
      const current = prev[courseId] || { courseId, completedLessons: [], lastAccessed: Date.now() };
      if (current.completedLessons.includes(lessonId)) return prev;
      
      return {
        ...prev,
        [courseId]: {
          ...current,
          completedLessons: [...current.completedLessons, lessonId],
          lastAccessed: Date.now()
        }
      };
    });
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/explore/:id" element={<ExploreDetail user={user} onEnroll={handleEnroll} />} />
            
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} progress={progress} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/course/:id" 
              element={user ? <CourseDetail user={user} progress={progress} onMarkComplete={markLessonComplete} /> : <Navigate to="/login" />} 
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
