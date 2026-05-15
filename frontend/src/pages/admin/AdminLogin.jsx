import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { cmsApi, setToken } from '../../lib/api';
import { WaveLogoMark } from '../../components/LogoMark';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await cmsApi.login(username, password);
      setToken(token);
      navigate('/admin/dashboard', { replace: true });
    } catch {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen items-center justify-center bg-charcoal px-4"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-md rounded-3xl border border-lineDark bg-navy/80 p-10 shadow-lift backdrop-blur-xl"
      >
        <motion.div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold"
          whileHover={{ scale: 1.05 }}
        >
          <WaveLogoMark className="h-8 w-8" />
        </motion.div>
        <h1 className="mt-6 text-center font-serif text-2xl text-snow">Administration</h1>
        <p className="mt-2 text-center text-sm text-slate">Vaaman Texprint — secure access</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <motion.div whileFocus={{ scale: 1.01 }}>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-3 text-snow focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              autoComplete="username"
              required
            />
          </motion.div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-lineDark bg-charcoal/50 px-4 py-3 text-snow focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              autoComplete="current-password"
              required
            />
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400"
            >
              {error}
            </motion.p>
          )}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-navy disabled:opacity-60"
          >
            <Lock className="h-4 w-4" />
            {loading ? 'Signing in…' : 'Sign in'}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
