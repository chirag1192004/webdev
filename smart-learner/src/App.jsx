import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Trash2, CheckCircle, Circle, Home, Zap, 
  BarChart3, Settings, ChevronRight, ArrowLeft, 
  Book, FileText, Link as LinkIcon, Image as ImageIcon, 
  Youtube, Sparkles, Send, MoreVertical, X, Calendar, 
  Flame, Play, Pause, RotateCcw, Trophy, Clock,
  Search, Moon, Sun, Download, Upload, TrendingUp
} from 'lucide-react';

// --- CSS STYLES (Embedded) ---
const APP_STYLES = `
/* --- Global Reset & Variables --- */
:root {
  --primary: #4f46e5;       /* Indigo 600 */
  --primary-bg: #e0e7ff;    /* Indigo 100 */
  --bg-color: #f8fafc;      /* Slate 50 */
  --card-bg: #ffffff;       /* White */
  --text-main: #0f172a;     /* Slate 900 */
  --text-muted: #64748b;    /* Slate 500 */
  --border-color: #e2e8f0;  /* Slate 200 */
  --input-bg: #f1f5f9;      /* Slate 100 */
  --danger: #ef4444;
  --success: #10b981;
  --radius: 16px;
  --shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

/* Dark Mode Overrides */
.dark {
  --primary: #818cf8;       /* Indigo 400 */
  --primary-bg: #312e81;    /* Indigo 900 */
  --bg-color: #0f172a;      /* Slate 900 */
  --card-bg: #1e293b;       /* Slate 800 */
  --text-main: #ffffff;     /* Pure White for max contrast */
  --text-muted: #94a3b8;    /* Slate 400 */
  --border-color: #334155;  /* Slate 700 */
  --input-bg: #020617;      /* Slate 950 */
  --shadow: 0 10px 15px -3px rgb(0 0 0 / 0.5);
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: #cbd5e1; /* Desktop wallpaper color */
  color: var(--text-main);
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

/* --- Layout --- */
.app-container {
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  background: var(--bg-color);
  color: var(--text-main); /* CRITICAL FIX: Explicitly apply color here so it updates in .dark */
  position: relative;
  padding-bottom: 90px;
  box-shadow: 0 0 40px rgba(0,0,0,0.2);
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow-x: hidden;
}

.view-container {
  padding: 24px;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --- Components --- */
button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
  transition: transform 0.1s;
  color: inherit;
  padding: 0;
}
button:active {
  transform: scale(0.96);
}

.btn-primary {
  background-color: var(--text-main);
  color: var(--bg-color);
  padding: 14px;
  border-radius: var(--radius);
  font-weight: 700;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.95rem;
}

.btn-icon {
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon:hover {
  background-color: rgba(128,128,128,0.1);
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 18px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  transition: border-color 0.2s;
}

.card-title {
  font-weight: 700;
  font-size: 1.15rem;
  margin: 0 0 6px 0;
  letter-spacing: -0.02em;
}

.card-subtitle {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0;
  font-weight: 500;
}

.input-field {
  width: 100%;
  padding: 14px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  font-size: 1rem;
  box-sizing: border-box;
  margin-bottom: 12px;
  background: var(--input-bg);
  color: var(--text-main);
}
.input-field:focus {
  outline: none;
  border-color: var(--primary);
}

/* --- Navigation --- */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  background: var(--card-bg);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-around;
  padding: 12px 0 20px 0;
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: var(--text-muted);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-item.active {
  color: var(--primary);
}

/* --- Stats & Charts --- */
.header-stats {
  background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
  color: white;
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 28px;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.4);
}

.stat-row {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.stat-box {
  background: rgba(255,255,255,0.1);
  padding: 14px;
  border-radius: 16px;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  backdrop-filter: blur(10px);
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 120px;
  gap: 8px;
  padding-top: 20px;
}

.bar-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.bar {
  width: 100%;
  background-color: var(--primary-bg);
  border-radius: 6px;
  transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 4px;
  position: relative;
}
.bar.active {
  background-color: var(--primary);
}

.bar-label {
  font-size: 10px;
  color: var(--text-muted);
  font-weight: bold;
}

/* --- Modals --- */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: var(--card-bg);
  padding: 28px;
  border-radius: 24px;
  width: 100%;
  max-width: 340px;
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  color: var(--text-main);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

@keyframes slideUp {
  from { transform: translateY(40px) scale(0.95); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
}

/* Utilities */
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.flex-gap { display: flex; gap: 8px; }
.text-danger { color: var(--danger); }
.text-success { color: var(--success); }
.mt-4 { margin-top: 16px; }
.mb-4 { margin-bottom: 16px; }
.w-full { width: 100%; }

/* Color dots */
.dot { width: 32px; height: 32px; border-radius: 50%; cursor: pointer; border: 3px solid transparent; transition: transform 0.2s; }
.dot:hover { transform: scale(1.1); }
.dot.selected { border-color: var(--text-main); }
.bg-blue-500 { background-color: #3b82f6; }
.bg-red-500 { background-color: #ef4444; }
.bg-green-500 { background-color: #22c55e; }
.bg-purple-500 { background-color: #a855f7; }
.bg-orange-500 { background-color: #f97316; }

/* Text colors matching dots for icons */
.text-blue-500 { color: #3b82f6; }
.text-red-500 { color: #ef4444; }
.text-green-500 { color: #22c55e; }
.text-purple-500 { color: #a855f7; }
.text-orange-500 { color: #f97316; }

/* Scrollbar hide */
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }

/* Heatmap Grid */
.heatmap-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}
.heatmap-cell {
  aspect-ratio: 1;
  border-radius: 6px;
  transition: all 0.2s;
}
.heatmap-cell:hover { transform: scale(1.1); }
`;

// --- INITIAL DATA ---
const INITIAL_DATA = {
  subjects: [], topics: [], tasks: [], activity: {},
  stats: { points: 0, streak: 0, lastActive: null, totalFocusMinutes: 0 },
  settings: { apiKey: '', username: 'Learner', theme: 'light' } 
};

export default function UltimateApp() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('ultimate_learner_db');
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch(e) { return INITIAL_DATA; }
  });

  const [activeTab, setActiveTab] = useState('home');
  const [navStack, setNavStack] = useState([{ type: 'root' }]);
  const [modal, setModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [focusTimer, setFocusTimer] = useState(25 * 60);
  const [isFocusing, setIsFocusing] = useState(false);

  const [aiChat, setAiChat] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInput, setAiInput] = useState('');

  // Refs
  const subTitleRef = useRef(null);
  const topTitleRef = useRef(null);
  const topDescRef = useRef(null);
  const attUrlRef = useRef(null);
  const attLabelRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const tempColorRef = useRef('bg-blue-500');
  const tempTypeRef = useRef('link');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    localStorage.setItem('ultimate_learner_db', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    let interval = null;
    if (isFocusing && focusTimer > 0) {
      interval = setInterval(() => setFocusTimer(p => p - 1), 1000);
    } else if (focusTimer === 0 && isFocusing) {
      setIsFocusing(false);
      updateStats('focus');
      setFocusTimer(25 * 60);
      alert("Focus Session Complete! +50 Points");
    }
    return () => clearInterval(interval);
  }, [isFocusing, focusTimer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);
  
  const getToday = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCurrentView = () => navStack[navStack.length - 1];

  const updateStats = (type) => {
    const today = getToday();
    setData(prev => {
      let newStats = { ...prev.stats };
      let newActivity = { ...prev.activity };
      if (type === 'task') {
        newStats.points += 10;
        newActivity[today] = (newActivity[today] || 0) + 1;
      }
      if (type === 'focus') {
        newStats.points += 50;
        newStats.totalFocusMinutes += 25;
      }
      const lastActive = newStats.lastActive;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,'0')}-${String(yesterday.getDate()).padStart(2,'0')}`;

      if (lastActive === yesterdayStr && today !== lastActive) {
        newStats.streak += 1;
      } else if (lastActive !== today && lastActive !== yesterdayStr) {
        newStats.streak = 1;
      } else if (newStats.streak === 0) {
        newStats.streak = 1;
      }
      newStats.lastActive = today;
      return { ...prev, stats: newStats, activity: newActivity };
    });
  };

  const callGemini = async (prompt) => {
    if (!data.settings.apiKey) {
      setAiChat(p => [...p, { role: 'system', text: 'Please enter API Key in Settings.' }]);
      return;
    }
    setAiLoading(true);
    setAiChat(p => [...p, { role: 'user', text: prompt }]);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${data.settings.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "Error parsing response.";
      setAiChat(p => [...p, { role: 'model', text: text }]);
    } catch (e) {
      setAiChat(p => [...p, { role: 'system', text: 'Connection failed.' }]);
    } finally {
      setAiLoading(false);
    }
  };

  const toggleTheme = () => {
    setData(p => ({...p, settings: {...p.settings, theme: p.settings.theme === 'dark' ? 'light' : 'dark'}}));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(data);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-${getToday()}.json`;
    a.click();
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (confirm("Replace current data with this backup?")) {
          setData(parsed);
          alert("Import successful!");
        }
      } catch (err) {
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  const addSubject = (title, color) => {
    if (!title) return;
    setData(p => ({ ...p, subjects: [...p.subjects, { id: generateId(), title, color }] }));
    setModal(null);
  };
  const addTopic = (subjectId, title, desc) => {
    if (!title) return;
    setData(p => ({ ...p, topics: [...p.topics, { id: generateId(), subjectId, title, desc, attachments: [] }] }));
    setModal(null);
  };
  const addTask = (topicId, text) => setData(p => ({ ...p, tasks: [...p.tasks, { id: generateId(), topicId, text, completed: false, createdAt: Date.now() }] }));
  
  const toggleTask = (taskId) => {
    let completedNow = false;
    setData(p => ({ ...p, tasks: p.tasks.map(t => { 
      if (t.id === taskId) { 
        completedNow = !t.completed; 
        return { ...t, completed: !t.completed, completedAt: !t.completed ? Date.now() : null }; 
      } 
      return t; 
    }) }));
    if (completedNow) updateStats('task');
  };

  const addAttachment = (topicId, type, url, label) => {
    if (!url) return;
    setData(p => ({ ...p, topics: p.topics.map(t => t.id === topicId ? { ...t, attachments: [...(t.attachments||[]), { id: generateId(), type, url, label }] } : t) }));
    setModal(null);
  };
  const deleteItem = (type, id) => {
    if(!confirm("Delete?")) return;
    setData(p => {
      if(type === 'subject') return { ...p, subjects: p.subjects.filter(s => s.id !== id), topics: p.topics.filter(t => t.subjectId !== id) };
      if(type === 'topic') return { ...p, topics: p.topics.filter(t => t.id !== id) };
      if(type === 'task') return { ...p, tasks: p.tasks.filter(t => t.id !== id) };
      return p;
    });
  };

  /* --- VIEWS --- */
  const HomeView = () => {
    const view = getCurrentView();
    if (view.type === 'root') {
      const filteredSubjects = data.subjects.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()));
      const filteredTopics = searchTerm 
        ? data.topics.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()))
        : [];

      return (
        <div className="view-container">
          <div className="header-stats">
            <div className="flex-between">
              <div>
                <h1 className="card-title" style={{color:'white'}}>Welcome</h1>
                <p className="card-subtitle" style={{color:'#94a3b8'}}>Let's grow.</p>
              </div>
              <div style={{background:'rgba(255,255,255,0.2)', padding:'4px 12px', borderRadius:'20px', display:'flex', alignItems:'center', gap:'4px'}}>
                <Trophy size={16} color="#facc15" /> <strong>{data.stats.points}</strong>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat-box">
                <Flame size={20} color="#fb923c" />
                <div><div style={{fontSize:'1.2rem', fontWeight:'bold'}}>{data.stats.streak}</div><div style={{fontSize:'0.6rem', textTransform:'uppercase', opacity:0.7}}>Day Streak</div></div>
              </div>
              <div className="stat-box">
                <Zap size={20} color="#818cf8" />
                <div><div style={{fontSize:'1.2rem', fontWeight:'bold'}}>{data.stats.totalFocusMinutes}</div><div style={{fontSize:'0.6rem', textTransform:'uppercase', opacity:0.7}}>Focus Mins</div></div>
              </div>
            </div>
          </div>

          <div className="card flex-gap" style={{alignItems:'center', padding:'12px'}}>
            <Search size={20} color="var(--text-muted)" />
            <input 
              className="input-field" 
              style={{marginBottom:0, border:'none', background:'transparent', padding:0}} 
              placeholder="Search subjects or topics..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {searchTerm && (
            <div className="mb-4">
              {filteredTopics.length > 0 && <h3 className="card-subtitle mb-2">Matching Topics</h3>}
              {filteredTopics.map(t => (
                <div key={t.id} onClick={() => setNavStack([...navStack, { type: 'topic', id: t.id }])} className="card flex-between">
                  <div className="flex-gap" style={{alignItems:'center'}}>
                    <FileText size={16} color="var(--primary)"/>
                    <span>{t.title}</span>
                  </div>
                  <ChevronRight color="var(--text-muted)" />
                </div>
              ))}
            </div>
          )}

          <div className="flex-between mb-4 mt-4">
            <h2 className="card-title">Subjects</h2>
            <button onClick={() => { tempColorRef.current='bg-blue-500'; setModal('add-subject'); }} style={{background:'var(--border-color)', padding:'4px 8px', borderRadius:'6px', fontSize:'0.8rem'}}>+ Add</button>
          </div>
          
          {filteredSubjects.map(sub => (
            <div key={sub.id} onClick={() => setNavStack([...navStack, { type: 'subject', id: sub.id }])} className="card" style={{borderLeft:`4px solid`}}>
               <div className="flex-between">
                  <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
                     <Book className={sub.color.replace('bg-', 'text-')} />
                     <div>
                       <h3 className="card-title">{sub.title}</h3>
                       <p className="card-subtitle">{data.topics.filter(t => t.subjectId === sub.id).length} Topics</p>
                     </div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); deleteItem('subject', sub.id); }}><MoreVertical size={16} color="var(--text-muted)"/></button>
               </div>
            </div>
          ))}
        </div>
      );
    }

    if (view.type === 'subject') {
      const sub = data.subjects.find(s => s.id === view.id);
      if(!sub) return setNavStack([{type:'root'}]);
      const topics = data.topics.filter(t => t.subjectId === sub.id);
      return (
        <div className="view-container">
          <div className="flex-gap mb-4" style={{alignItems:'center'}}>
            <button onClick={() => setNavStack(navStack.slice(0, -1))}><ArrowLeft /></button>
            <h1 style={{fontSize:'1.5rem', fontWeight:'bold'}}>{sub.title}</h1>
          </div>
          {topics.map(t => (
            <div key={t.id} onClick={() => setNavStack([...navStack, { type: 'topic', id: t.id }])} className="card flex-between">
              <div>
                <div className="card-title">{t.title}</div>
                <div className="card-subtitle">{data.tasks.filter(k=>k.topicId===t.id).length} Tasks</div>
              </div>
              <ChevronRight color="var(--text-muted)" />
            </div>
          ))}
          <button onClick={() => setModal('add-topic')} style={{position:'fixed', bottom:'110px', right:'calc(50% - 220px + 20px)', width:'56px', height:'56px', borderRadius:'50%', background:'var(--primary)', color:'white', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(0,0,0,0.2)'}}><Plus /></button>
        </div>
      );
    }

    if (view.type === 'topic') {
      const topic = data.topics.find(t => t.id === view.id);
      if(!topic) return setNavStack([{type:'root'}]);
      const tasks = data.tasks.filter(t => t.topicId === topic.id);
      const [input, setInput] = useState('');
      return (
        <div className="view-container">
          <div className="flex-between mb-4">
             <button onClick={() => setNavStack(navStack.slice(0, -1))} className="flex-gap" style={{alignItems:'center', fontWeight:'bold', color:'var(--text-muted)'}}><ArrowLeft size={20}/> Back</button>
             <button onClick={() => setModal('ai-chat')} style={{background:'linear-gradient(to right, #6366f1, #a855f7)', color:'white', padding:'6px 12px', borderRadius:'20px', fontSize:'0.8rem', display:'flex', gap:'4px', alignItems:'center'}}><Sparkles size={14}/> Ask AI</button>
          </div>
          <h1 style={{fontSize:'1.5rem', fontWeight:'bold'}}>{topic.title}</h1>
          <p style={{color:'var(--text-muted)', marginBottom:'20px'}}>{topic.desc}</p>

          <div className="flex-between mb-2">
            <span style={{fontSize:'0.75rem', fontWeight:'bold', textTransform:'uppercase', color:'var(--text-muted)'}}>Resources</span>
            <button onClick={() => { tempTypeRef.current='link'; setModal('add-attachment'); }} style={{fontSize:'0.75rem', background:'var(--border-color)', padding:'4px 8px', borderRadius:'4px'}}>+ Add</button>
          </div>
          <div className="scrollbar-hide" style={{display:'flex', gap:'10px', overflowX:'auto', paddingBottom:'10px'}}>
             {topic.attachments?.map(att => (
               <a key={att.id} href={att.url} target="_blank" className="card" style={{minWidth:'120px', display:'block', textDecoration:'none', color:'inherit', marginBottom:0}}>
                 <div style={{marginBottom:'8px'}}>{att.type==='video'?<Youtube color="#ef4444"/>:att.type==='doc'?<FileText color="#3b82f6"/>:<LinkIcon color="#64748b"/>}</div>
                 <div style={{fontSize:'0.8rem', fontWeight:'bold', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{att.label}</div>
               </a>
             ))}
          </div>

          <div className="mt-4">
            <div style={{fontSize:'0.75rem', fontWeight:'bold', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'8px'}}>Checklist</div>
            {tasks.map(t => (
               <div key={t.id} className="card flex-between" style={{padding:'12px'}}>
                 <div className="flex-gap" style={{alignItems:'center'}}>
                   <button onClick={() => toggleTask(t.id)}>{t.completed ? <CheckCircle color="#10b981" /> : <Circle color="var(--border-color)" />}</button>
                   <span style={{textDecoration: t.completed?'line-through':'none', color: t.completed?'var(--text-muted)':'var(--text-main)'}}>{t.text}</span>
                 </div>
                 <button onClick={() => deleteItem('task', t.id)}><Trash2 size={16} color="var(--text-muted)"/></button>
               </div>
            ))}
            <form onSubmit={e => {e.preventDefault(); if(input.trim()){addTask(topic.id, input); setInput('');}}} style={{display:'flex', marginTop:'8px'}}>
               <input value={input} onChange={e=>setInput(e.target.value)} className="input-field" placeholder="Add task..." style={{margin:0, borderTopRightRadius:0, borderBottomRightRadius:0}}/>
               <button type="submit" style={{background:'var(--border-color)', padding:'0 16px', borderTopRightRadius:'12px', borderBottomRightRadius:'12px', fontWeight:'bold'}}>+</button>
            </form>
          </div>
        </div>
      );
    }
  };

  const FocusView = () => (
    <div className="view-container" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'70vh'}}>
      <div style={{fontSize:'4rem', fontWeight:'900', fontFamily:'monospace', margin:'20px 0', color: 'var(--text-main)'}}>{formatTime(focusTimer)}</div>
      <button onClick={() => setIsFocusing(!isFocusing)} className="btn-primary" style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', maxWidth:'200px'}}>
        {isFocusing ? <><Pause size={20}/> Pause</> : <><Play size={20}/> Start Focus</>}
      </button>
      <button onClick={() => {setIsFocusing(false); setFocusTimer(25*60)}} style={{marginTop:'20px', color:'var(--text-muted)', display:'flex', alignItems:'center', gap:'4px'}}><RotateCcw size={14}/> Reset</button>
    </div>
  );

  const StatsView = () => {
    // Calculate Weekly Data for Bar Chart
    const weeklyData = Array.from({length: 7}, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dateKey = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      return {
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        count: data.activity[dateKey] || 0
      };
    });
    
    // Calculate scaling for bars
    const maxCount = Math.max(...weeklyData.map(d => d.count), 1); // Avoid div by zero

    // Recent Completed Tasks
    const completedTasks = data.tasks
      .filter(t => t.completed)
      .sort((a,b) => (b.completedAt || 0) - (a.completedAt || 0))
      .slice(0, 3);

    return (
      <div className="view-container">
         <h1 className="card-title mb-4">Your Progress</h1>
         
         {/* Weekly Bar Chart */}
         <div className="card">
           <h2 className="card-subtitle mb-2">Last 7 Days Activity</h2>
           <div className="bar-chart">
             {weeklyData.map((d, i) => (
               <div key={i} className="bar-column">
                 <div className={`bar ${d.count > 0 ? 'active' : ''}`} style={{height: `${(d.count / maxCount) * 100}%`}}></div>
                 <span className="bar-label">{d.day}</span>
               </div>
             ))}
           </div>
         </div>

         {/* Detailed Stats */}
         <div className="flex-between gap-3 mb-4">
            <div className="card flex-1" style={{marginBottom:0, textAlign:'center'}}>
               <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'var(--primary)'}}>{data.tasks.filter(t => t.completed).length}</div>
               <div className="card-subtitle">Total Done</div>
            </div>
            <div className="card flex-1" style={{marginBottom:0, textAlign:'center'}}>
               <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'var(--primary)'}}>{data.stats.streak}</div>
               <div className="card-subtitle">Best Streak</div>
            </div>
         </div>

         {/* Recent Wins */}
         <div className="card">
           <div className="flex-between mb-2">
             <h2 className="card-title flex-gap" style={{alignItems:'center'}}><TrendingUp size={18} /> Recent Wins</h2>
           </div>
           {completedTasks.length === 0 && <p className="card-subtitle">No tasks completed yet.</p>}
           {completedTasks.map(t => (
             <div key={t.id} style={{padding:'8px 0', borderBottom:'1px solid var(--border-color)', display:'flex', alignItems:'center', gap:'8px'}}>
               <CheckCircle size={16} color="var(--success)" />
               <span style={{fontSize:'0.9rem', color:'var(--text-muted)'}}>{t.text}</span>
             </div>
           ))}
         </div>

         {/* Heatmap */}
         <div className="card mt-4">
           <h2 className="card-subtitle mb-2">30-Day Heatmap</h2>
           <div className="heatmap-grid">
             {Array.from({length:28}, (_, i) => { 
                const d = new Date(); 
                d.setDate(d.getDate() - (27-i));
                const date = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
                const count = data.activity[date] || 0;
                let bg = 'var(--input-bg)';
                if(count>0) bg='#bbf7d0'; if(count>3) bg='#4ade80'; if(count>6) bg='#16a34a';
                return (
                  <div key={date} 
                       title={`${date}: ${count} tasks`} 
                       className="heatmap-cell" 
                       style={{background: bg}}
                  />
                )
             })}
           </div>
         </div>
      </div>
    );
  };

  const SettingsView = () => (
    <div className="view-container">
      <h1 className="card-title mb-4">Settings</h1>
      
      <div className="card flex-between">
        <span className="flex-gap" style={{alignItems:'center'}}>{data.settings.theme === 'dark' ? <Moon size={18}/> : <Sun size={18}/>} Dark Mode</span>
        <button onClick={toggleTheme} className="btn-icon" style={{background:'var(--border-color)'}}>
           {data.settings.theme === 'dark' ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="card">
        <div className="card-title flex-gap" style={{alignItems:'center'}}><Sparkles color="#6366f1"/> Gemini API Key</div>
        <input type="password" value={data.settings.apiKey} onChange={e => setData(p => ({...p, settings: {...p.settings, apiKey: e.target.value}}))} className="input-field" placeholder="Paste API Key..." />
      </div>

      <div className="card">
        <h3 className="card-title mb-2">Data Management</h3>
        <div className="flex-gap">
           <button onClick={exportData} className="btn-primary" style={{flex:1, background:'var(--input-bg)', color:'var(--text-main)'}}>
             <Download size={16}/> Backup
           </button>
           <button onClick={()=>fileInputRef.current.click()} className="btn-primary" style={{flex:1, background:'var(--input-bg)', color:'var(--text-main)'}}>
             <Upload size={16}/> Restore
           </button>
           <input type="file" ref={fileInputRef} onChange={importData} style={{display:'none'}} accept=".json" />
        </div>
      </div>

      <button onClick={() => {if(confirm("Reset App?")){localStorage.clear(); window.location.reload()}}} className="btn-primary" style={{background:'var(--danger)', color:'white', marginTop:'20px'}}>Reset All Data</button>
    </div>
  );

  return (
    <div className={`app-container ${data.settings.theme || 'light'}`}>
      <style>{APP_STYLES}</style>
      <main>
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'focus' && <FocusView />}
        {activeTab === 'stats' && <StatsView />}
        {activeTab === 'settings' && <SettingsView />}
      </main>

      <nav className="bottom-nav">
        {['home','focus','stats','settings'].map(t => (
          <button key={t} onClick={()=>{setActiveTab(t); if(t==='home') setNavStack([{type:'root'}])}} className={`nav-item ${activeTab===t ? 'active' : ''}`}>
             {t==='home' && <Home size={24}/>} {t==='focus' && <Clock size={24}/>}
             {t==='stats' && <BarChart3 size={24}/>} {t==='settings' && <Settings size={24}/>}
             <span>{t}</span>
          </button>
        ))}
      </nav>

      {modal === 'add-subject' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="card-title mb-4">New Subject</h2>
            <input ref={subTitleRef} id="sub-title" className="input-field" placeholder="Name" />
            <div className="flex-gap mb-4" style={{justifyContent:'center'}}>
              {['bg-blue-500','bg-red-500','bg-green-500','bg-purple-500','bg-orange-500'].map(c=>(
                <div key={c} 
                     onClick={()=>{ tempColorRef.current=c; setTick(t=>t+1); }} 
                     className={`dot ${c} ${tempColorRef.current===c ? 'selected' : ''}`}>
                </div>
              ))}
            </div>
            <div className="flex-gap"><button onClick={()=>setModal(null)} className="btn-primary" style={{background:'var(--border-color)', color:'var(--text-muted)'}}>Cancel</button><button onClick={()=>{addSubject(subTitleRef.current.value, tempColorRef.current)}} className="btn-primary">Save</button></div>
          </div>
        </div>
      )}
      
      {modal === 'add-topic' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="card-title mb-4">New Topic</h2>
            <input ref={topTitleRef} id="top-title" className="input-field" placeholder="Title" />
            <input ref={topDescRef} id="top-desc" className="input-field" placeholder="Description" />
            <div className="flex-gap"><button onClick={()=>setModal(null)} className="btn-primary" style={{background:'var(--border-color)', color:'var(--text-muted)'}}>Cancel</button><button onClick={()=>{addTopic(getCurrentView().id, topTitleRef.current.value, topDescRef.current.value)}} className="btn-primary">Save</button></div>
          </div>
        </div>
      )}

      {modal === 'add-attachment' && (
         <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="card-title mb-4">Add Resource</h2>
            <div className="flex-gap mb-4">
              {['link','video','doc','image'].map(t=>(
                <button key={t} 
                        onClick={()=>{ tempTypeRef.current=t; setTick(tick+1); }} 
                        style={{
                          padding:'4px', 
                          border:'1px solid var(--border-color)', 
                          borderRadius:'4px', 
                          fontSize:'0.7rem', 
                          textTransform:'uppercase',
                          background: tempTypeRef.current===t ? 'var(--text-main)' : 'var(--card-bg)',
                          color: tempTypeRef.current===t ? 'var(--bg-color)' : 'var(--text-muted)'
                        }}>
                  {t}
                </button>
              ))}
            </div>
            <input ref={attUrlRef} id="att-url" className="input-field" placeholder="URL" />
            <input ref={attLabelRef} id="att-label" className="input-field" placeholder="Label" />
            <div className="flex-gap"><button onClick={()=>setModal(null)} className="btn-primary" style={{background:'var(--border-color)', color:'var(--text-muted)'}}>Cancel</button><button onClick={()=>{addAttachment(getCurrentView().id, tempTypeRef.current, attUrlRef.current.value, attLabelRef.current.value)}} className="btn-primary">Add</button></div>
          </div>
        </div>
      )}

      {modal === 'ai-chat' && (
        <div className="modal-overlay" style={{alignItems:'flex-end', padding:0}}>
          <div className="modal-content" style={{height:'80vh', maxWidth:'100%', borderBottomLeftRadius:0, borderBottomRightRadius:0, display:'flex', flexDirection:'column'}}>
            <div className="flex-between mb-4"><h2 className="card-title flex-gap" style={{alignItems:'center'}}><Sparkles color="#6366f1"/> AI Assistant</h2><button onClick={()=>setModal(null)}><X/></button></div>
            <div style={{flex:1, overflowY:'auto', marginBottom:'12px', display:'flex', flexDirection:'column', gap:'8px'}}>
              {aiChat.map((m,i)=>(<div key={i} style={{alignSelf: m.role==='user'?'flex-end':'flex-start', background: m.role==='user'?'#4f46e5':'#f1f5f9', color: m.role==='user'?'white':'#1e293b', padding:'8px 12px', borderRadius:'12px', maxWidth:'85%'}}>{m.text}</div>))}
              {aiLoading && <div style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>Thinking...</div>}
            </div>
            <form onSubmit={e=>{e.preventDefault(); if(aiInput.trim()){callGemini(aiInput); setAiInput('')}}} style={{display:'flex', gap:'8px'}}>
               <input value={aiInput} onChange={e=>setAiInput(e.target.value)} className="input-field" style={{marginBottom:0}} placeholder="Ask..." />
               <button type="submit" className="btn-icon" style={{background:'#4f46e5', color:'white'}}><Send size={18}/></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}