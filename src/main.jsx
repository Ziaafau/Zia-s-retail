import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  LogOut, 
  CheckCircle,
  ShoppingBag,
  Heart,
  LayoutGrid,
  Settings,
  User,
  ChevronRight,
  X,
  Printer,
  Sparkles,
  Gift,
  Moon,
  Clock,
  Star
} from 'lucide-react';

/* ==========================================
   AUTHENTICATION COMPONENT
   ========================================== */
const AuthScreen = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ name: email.split('@')[0], email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F4EBD0]/40">
      <div className="clay-card w-full max-w-md p-10 relative overflow-hidden animate-in zoom-in duration-500">
        <div className="absolute top-0 right-0 p-8 opacity-10 animate-float text-[#D1E8E2]">
          <Moon size={100} />
        </div>
        
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-[#D1E8E2] rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#D1E8E2]/30">
            <ShoppingBag className="text-slate-700 w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2 uppercase">Zia's Barakah</h1>
          <p className="text-[10px] font-black text-[#D1E8E2] uppercase tracking-[0.4em]">Haji & Umrah Hub</p>
        </div>

        <div className="bg-[#D1E8E2]/20 p-5 rounded-[2rem] mb-8 border-2 border-[#D1E8E2] text-center">
          <p className="text-sm font-black text-slate-600 italic leading-relaxed">
            "Mulai harimu dengan Bismillah & Niat Jujur"
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="email" 
            required
            className="w-full clay-input py-4 px-6 text-slate-700 font-bold outline-none" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            required
            className="w-full clay-input py-4 px-6 text-slate-700 font-bold outline-none" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-[#D1E8E2] text-slate-700 py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-[#D1E8E2]/40 hover:scale-[1.02] active:scale-95 transition-all">
            {isLogin ? 'BISMILLAH, MASUK' : 'DAFTAR AKUN BARU'}
          </button>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-10 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-[#D4AF37] transition-colors"
        >
          {isLogin ? 'Belum punya akun? Daftar Akun Baru' : 'Sudah punya akun? Masuk'}
        </button>
      </div>
    </div>
  );
};

/* ==========================================
   DASHBOARD COMPONENT
   ========================================== */
const Dashboard = ({ user, onLogout }) => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [transactionTime, setTransactionTime] = useState('');

  const products = [
    { 
      id: 1, 
      name: 'Kain Ihram Premium', 
      price: 250000, 
      category: 'Perlengkapan', 
      image: 'https://images.unsplash.com/photo-1599388147820-205167ea9a4e?q=80&w=800&auto=format&fit=crop', 
      keyword: 'ihram,white',
      specs: 'Putih Bersih, Nyaman & Syar\'i'
    },
    { 
      id: 2, 
      name: 'Gesper Haji', 
      price: 85000, 
      category: 'Perlengkapan', 
      image: 'https://images.unsplash.com/photo-1506509939526-72922650eb34?q=80&w=800&auto=format&fit=crop', 
      keyword: 'leather,belt,brown',
      specs: 'Kunci Ganda, Kuat & Aman'
    },
    { 
      id: 3, 
      name: 'Mukena Haji', 
      price: 195000, 
      category: 'Perlengkapan', 
      image: 'https://images.unsplash.com/photo-1590004953392-5aba2e78636b?q=80&w=800&auto=format&fit=crop', 
      keyword: 'white,pray,woman',
      specs: 'Bahan Silk, Putih Suci'
    },
    { 
      id: 4, 
      name: 'Kurma Ajwa', 
      price: 350000, 
      category: 'Buah Tangan', 
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=800&auto=format&fit=crop', 
      keyword: 'dates,fruit',
      specs: 'Asli Madinah, Tekstur Lembut'
    },
    { 
      id: 5, 
      name: 'Kacang Pistachio', 
      price: 115000, 
      category: 'Buah Tangan', 
      image: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=800&auto=format&fit=crop', 
      keyword: 'pistachio,nuts',
      specs: 'Roasted with Sea Salt'
    },
    { 
      id: 6, 
      name: 'Air Zam-zam', 
      price: 35000, 
      category: 'Buah Tangan', 
      image: 'https://images.unsplash.com/photo-1533230408708-8666504a33cb?q=80&w=800&auto=format&fit=crop', 
      keyword: 'water,bottle',
      specs: 'Murni & Menyehatkan'
    },
    { 
      id: 7, 
      name: 'Sajadah Bulu', 
      price: 245000, 
      category: 'Aksesoris', 
      image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop', 
      keyword: 'prayer,rug',
      specs: 'Plush Texture, Nyaman Ibadah'
    },
    { 
      id: 8, 
      name: 'Tasbih Digital', 
      price: 65000, 
      category: 'Aksesoris', 
      image: 'https://images.unsplash.com/photo-1698305001479-79a6152a5130?q=80&w=800&auto=format&fit=crop&v=555', 
      keyword: 'zikr,ring,smart,tally',
      specs: 'Modern Counter, Zikr Ring Style'
    }
  ];

  const subtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  const infaq = Math.round(subtotal * 0.005);
  const total = subtotal + infaq;

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...p, quantity: 1 }];
    });
  };

  const updateQty = (id, d) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + d) } : i));
  };

  const remove = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const handlePay = () => {
    setTransactionId(Math.floor(100000 + Math.random() * 900000).toString());
    setTransactionTime(new Date().toLocaleString('id-ID'));
    setShowReceipt(true);
  };

  const handleFinish = () => {
    setCart([]);
    setShowReceipt(false);
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex h-screen bg-[#F4EBD0]/10 font-sans overflow-hidden">
      {/* Sidebar Nav */}
      <aside className="w-24 lg:w-28 flex flex-col items-center py-10 bg-white shadow-2xl z-20">
        <div className="w-16 h-16 bg-[#D1E8E2] rounded-[2rem] flex items-center justify-center mb-16 shadow-lg shadow-[#D1E8E2]/30">
          <ShoppingBag className="text-slate-700 w-8 h-8" />
        </div>
        <nav className="flex-1 flex flex-col gap-10">
          <div className="clay-button p-4 text-[#D1E8E2] bg-slate-50"><LayoutGrid size={24} /></div>
          <div className="text-slate-200 hover:text-[#D1E8E2] p-4"><User size={24} /></div>
          <div className="text-slate-200 hover:text-[#D1E8E2] p-4"><Settings size={24} /></div>
        </nav>
        <button onClick={onLogout} className="text-slate-100 hover:text-rose-400 p-4 transition-colors">
          <LogOut size={24} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-8 lg:p-14 overflow-hidden relative">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8 shrink-0">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#D4AF37] px-4 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={12} />
                Haji & Umrah Hub
              </span>
            </div>
            <h1 className="text-5xl font-black text-slate-800 tracking-tighter uppercase">Zia's Barakah</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
            <input 
              className="w-full lg:w-[450px] clay-input py-5 pl-16 pr-8 text-slate-700 font-bold outline-none placeholder:text-slate-300"
              placeholder="Cari produk barakah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {/* Product Grid */}
        <section className="flex-1 overflow-y-auto pr-6 custom-scrollbar pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10">
            {filtered.map(p => (
              <div key={p.id} className="clay-card p-6 flex flex-col group hover:scale-[1.02] transition-all duration-500">
                <div className="h-64 rounded-[2.5rem] overflow-hidden mb-8 relative bg-slate-50">
                  <img 
                    src={p.image} 
                    onError={(e) => {
                      if (!e.target.dataset.triedFallback) {
                        e.target.dataset.triedFallback = 'true';
                        // Use the specific product keyword for fallback
                        e.target.src = `https://source.unsplash.com/featured/800x600/?${p.keyword}`;
                      } else if (e.target.dataset.triedFallback === 'true') {
                        e.target.dataset.triedFallback = 'final';
                        // Final safety net
                        e.target.src = `https://loremflickr.com/800/600/${p.keyword.split(',')[0]}`;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    alt={p.name} 
                  />
                  <div className="absolute top-4 left-4 glass-effect px-4 py-3 rounded-2xl text-[9px] font-black text-[#D4AF37] uppercase tracking-widest">
                    Halal & Thayyiban
                  </div>
                </div>
                <div className="flex-1 flex flex-col px-2">
                  <div className="mb-4">
                    <span className="text-[10px] font-black text-[#D1E8E2] uppercase tracking-widest">{p.category}</span>
                    <h3 className="text-2xl font-black text-slate-800 truncate">{p.name}</h3>
                  </div>
                  <p className="text-sm text-slate-400 font-bold mb-8 italic text-slate-400 leading-relaxed">"{p.specs}"</p>
                  
                  <div className="mt-auto flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest mb-1">Harga Akad</p>
                      <span className="text-3xl font-black text-slate-900 tabular-nums">Rp {p.price.toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(p)}
                      className="w-16 h-16 bg-[#D1E8E2] rounded-3xl flex items-center justify-center text-slate-700 shadow-xl shadow-[#D1E8E2]/40 hover:scale-110 active:scale-95 transition-all"
                    >
                      <Plus size={32} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Cart Drawer */}
      <aside className="hidden xl:flex w-[500px] bg-white border-l-8 border-[#F4EBD0]/30 shadow-2xl flex-col shrink-0 z-10">
        <div className="p-12 border-b-2 border-[#F4EBD0]/20 bg-[#F4EBD0]/5">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2 uppercase">Pesanan Akad</h2>
          <p className="text-xs font-black text-slate-300 uppercase tracking-[0.3em]">{cart.length} Item Pilihan</p>
        </div>

        <div className="flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-200 space-y-6 opacity-40">
              <ShoppingBag size={80} />
              <p className="font-black text-xl italic tracking-widest uppercase">Keranjang Kosong</p>
            </div>
          ) : (
            cart.map(i => (
              <div key={i.id} className="flex gap-6 items-center group animate-in slide-in-from-right-4">
                <img src={i.image} className="w-20 h-20 rounded-3xl object-cover shadow-lg" alt="" />
                <div className="flex-1 min-w-0">
                  <p className="font-black text-slate-800 truncate text-lg mb-1">{i.name}</p>
                  <p className="text-sm text-[#D1E8E2] font-black">Rp {i.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-2 px-3">
                  <button onClick={() => updateQty(i.id, -1)} className="text-slate-300 hover:text-[#D1E8E2]"><Minus size={16} /></button>
                  <span className="font-black text-xs text-slate-600 min-w-[24px] text-center">{i.quantity}</span>
                  <button onClick={() => addToCart(i)} className="text-slate-300 hover:text-[#D1E8E2]"><Plus size={16} /></button>
                </div>
                <button onClick={() => remove(i.id)} className="text-slate-100 hover:text-rose-400 p-2 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-12 space-y-10 bg-white border-t-8 border-[#F4EBD0]/20">
          <div className="space-y-6">
            <div className="flex justify-between items-center text-[10px] font-black text-slate-300 uppercase tracking-widest px-2">
              <span>Infaq Berkah (0.5%)</span>
              <span className="text-[#D1E8E2]">Rp {infaq.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-end px-2">
              <span className="text-slate-400 font-black text-sm uppercase tracking-widest mb-2">Total Akad</span>
              <span className="text-5xl font-black text-slate-900 tracking-tighter tabular-nums text-right">Rp {total.toLocaleString()}</span>
            </div>
          </div>

          <button 
            disabled={cart.length === 0}
            onClick={handlePay}
            className="w-full bg-[#D1E8E2] text-slate-700 py-8 rounded-[2.5rem] text-2xl font-black shadow-2xl shadow-[#D1E8E2]/40 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-6 disabled:opacity-30"
          >
            BAYAR BISMILLAH
            <ChevronRight size={32} />
          </button>
        </div>
      </aside>

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-900/60 backdrop-blur-3xl animate-in fade-in duration-500">
          <div className="bg-white w-full max-w-xl rounded-[4rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-500 border-[12px] border-[#D1E8E2]/20">
            <div className="receipt-pattern h-8 bg-[#D1E8E2]/10" />
            
            <div className="p-12 text-center border-b-4 border-dashed border-[#F4EBD0] relative bg-white">
              <div className="w-24 h-24 bg-[#D1E8E2]/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner shadow-[#D1E8E2]/20">
                <Heart className="w-12 h-12 text-[#D1E8E2] fill-[#D1E8E2] animate-pulse" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 uppercase">Zia's Barakah</h2>
              <p className="text-[11px] font-black text-[#D1E8E2] uppercase tracking-[0.5em]">Haji & Umrah Hub Official</p>
            </div>

            <div className="p-12 space-y-10 bg-white max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="bg-[#D1E8E2]/30 p-8 rounded-3xl text-center border-2 border-[#D1E8E2]">
                <p className="text-xl font-black text-[#D1E8E2] italic leading-relaxed text-center">
                   "Semoga Menjadi Haji Mabrur & Umrah yang Maqbullah"
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-black text-slate-300 uppercase tracking-widest px-2 pb-6 border-b border-slate-50">
                <div className="flex items-center gap-3"><Clock size={16} /> {transactionTime}</div>
                <div className="flex items-center gap-3">ID #{transactionId}</div>
              </div>

              <div className="space-y-8">
                {cart.map(i => (
                  <div key={i.id} className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-6 text-left">
                      <span className="w-12 h-12 flex items-center justify-center bg-[#F4EBD0]/30 rounded-2xl text-[#D4AF37] font-black text-xs">{i.quantity}x</span>
                      <div>
                        <p className="font-black text-slate-800 text-lg mb-0.5">{i.name}</p>
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.1em]">{i.category}</p>
                      </div>
                    </div>
                    <span className="font-black text-slate-900 text-xl tabular-nums">Rp {(i.price * i.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t-2 border-[#F4EBD0]/50 space-y-4">
                <div className="flex justify-between items-center text-xs font-black text-slate-400 tracking-widest uppercase px-2">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-black text-[#D1E8E2] tracking-widest uppercase px-2">
                  <span>Infaq Berkah (0.5%)</span>
                  <span>Rp {infaq.toLocaleString()}</span>
                </div>
                <div className="pt-8 border-t-4 border-slate-900 border-dotted flex justify-between items-center px-2">
                  <span className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Total Akad</span>
                  <span className="text-5xl font-black text-[#D4AF37] tabular-nums">Rp {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-12">
                 <button 
                  onClick={handleFinish}
                  className="w-full h-24 bg-[#D1E8E2] text-slate-700 rounded-[3rem] flex items-center justify-center gap-5 text-3xl font-black shadow-2xl shadow-[#D1E8E2]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <CheckCircle size={40} />
                  SELESAI (RESET)
                </button>
                <p className="text-[10px] text-center text-slate-200 font-black uppercase tracking-[0.4em] pt-12 mt-10">
                  Jazakumullahu Khairan Katsiran - Zia Retail
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ==========================================
   APP ROOT
   ========================================== */
function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <AuthScreen onLogin={setUser} />;
  }

  return (
    <Dashboard 
      user={user} 
      onLogout={() => setUser(null)} 
    />
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
