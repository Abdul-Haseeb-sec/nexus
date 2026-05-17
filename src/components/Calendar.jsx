import React, { useState } from 'react';
import { useStore } from '../store';
import { ChevronLeft, ChevronRight, Plus, Trash2, Calendar as CalIcon, Clock, AlignLeft } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';

export default function Calendar({ t, playHoverSound }) {
  const { events, setEvents } = useStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ title: '', time: '', desc: '', color: '#3B82F6', duration: '1h' });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const startPadding = monthStart.getDay();
  const paddingDays = Array.from({ length: startPadding }).map((_, i) => `pad-${i}`);

  const addEvent = () => {
    if (!form.title) return;
    const dateStr = format(modal, 'yyyy-MM-dd');
    setEvents([...events, { id: 'ev_' + Date.now(), ...form, date: dateStr }]);
    setModal(null);
    setForm({ title: '', time: '', desc: '', color: '#3B82F6', duration: '1h' });
  };

  const deleteEvent = (id) => setEvents(events.filter(e => e.id !== id));

  const upcomingEvents = [...events]
    .filter(e => e.date >= format(new Date(), 'yyyy-MM-dd'))
    .sort((a, b) => a.date.localeCompare(b.date) || (a.time || '').localeCompare(b.time || ''))
    .slice(0, 8);

  return (
    <div style={{ display: 'flex', gap: 32, height: 'calc(100vh - 180px)', animation: 'fadeUp 0.4s ease' }}>
      
      {/* Main Calendar View */}
      <div style={{ flex: 1, background: t.card, border: `1px solid ${t.border}`, borderRadius: 24, padding: 32, display: 'flex', flexDirection: 'column', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
        
        {/* Calendar Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)' }}>
              <CalIcon size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>{format(currentDate, 'MMMM')}</h2>
              <div style={{ fontSize: 14, color: t.muted, fontWeight: 500 }}>{format(currentDate, 'yyyy')}</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => { playHoverSound(); setCurrentDate(new Date()); }} onMouseEnter={playHoverSound} style={{ padding: '8px 16px', borderRadius: 12, border: `1px solid ${t.border}`, background: t.inp, color: t.text, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Today</button>
            <div style={{ display: 'flex', background: t.inp, border: `1px solid ${t.border}`, borderRadius: 12, overflow: 'hidden' }}>
              <button onClick={() => { playHoverSound(); setCurrentDate(subMonths(currentDate, 1)); }} onMouseEnter={playHoverSound} style={{ width: 40, height: 40, border: 'none', borderRight: `1px solid ${t.border}`, background: 'transparent', color: t.text, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ChevronLeft size={18} /></button>
              <button onClick={() => { playHoverSound(); setCurrentDate(addMonths(currentDate, 1)); }} onMouseEnter={playHoverSound} style={{ width: 40, height: 40, border: 'none', background: 'transparent', color: t.text, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>

        {/* Days Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12, marginBottom: 12 }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: t.muted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d}</div>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12, flex: 1 }}>
          {paddingDays.map(pd => <div key={pd} />)}
          {days.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const dayEvents = events.filter(e => e.date === dateStr);
            const today = isToday(day);

            return (
              <div 
                key={dateStr}
                onClick={() => { playHoverSound(); setModal(day); }}
                onMouseEnter={(e) => { playHoverSound(); e.currentTarget.style.borderColor = t.muted; e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = today ? '#3B82F6' : t.border; e.currentTarget.style.transform = 'scale(1)'; }}
                style={{ 
                  borderRadius: 16, border: `1px solid ${today ? '#3B82F6' : t.border}`, 
                  background: today ? 'rgba(59, 130, 246, 0.05)' : t.inp, cursor: 'pointer', padding: 12,
                  display: 'flex', flexDirection: 'column', transition: 'all 0.2s',
                  position: 'relative', overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: today ? 700 : 500, color: today ? '#3B82F6' : t.text, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: today ? 'rgba(59, 130, 246, 0.1)' : 'transparent' }}>
                    {format(day, 'd')}
                  </span>
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
                  {dayEvents.slice(0, 3).map(ev => (
                    <div key={ev.id} style={{ fontSize: 11, fontWeight: 600, color: ev.color || '#3B82F6', background: `${ev.color || '#3B82F6'}15`, padding: '4px 8px', borderRadius: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {ev.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && <div style={{ fontSize: 10, color: t.muted, fontWeight: 600, paddingLeft: 4 }}>+{dayEvents.length - 3} more</div>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Sidebar: Upcoming & Mini Agenda */}
      <div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 24, padding: 32, flex: 1, boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, letterSpacing: '-0.02em' }}>Agenda</h3>
          
          {upcomingEvents.length === 0 ? (
            <div style={{ color: t.muted, fontSize: 14, textAlign: 'center', padding: '40px 0' }}>Your schedule is clear.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {upcomingEvents.map(ev => {
                const evDate = new Date(ev.date + 'T00:00:00');
                const isEvToday = isToday(evDate);
                return (
                  <div key={ev.id} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', position: 'relative', padding: '16px', background: t.inp, borderRadius: 16, border: `1px solid ${t.border}` }}>
                    <div style={{ width: 6, height: '100%', position: 'absolute', left: 0, top: 0, borderRadius: '16px 0 0 16px', background: ev.color || '#3B82F6' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: isEvToday ? '#3B82F6' : t.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                        {isEvToday ? 'Today' : format(evDate, 'MMM d')}
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: t.text, marginBottom: 8 }}>{ev.title}</div>
                      
                      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: t.muted, fontWeight: 500 }}>
                        {ev.time && <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {ev.time} ({ev.duration})</div>}
                      </div>
                    </div>
                    <button onClick={() => deleteEvent(ev.id)} onMouseEnter={playHoverSound} style={{ background: 'transparent', border: 'none', color: t.muted, cursor: 'pointer', padding: 8, borderRadius: 8 }}><Trash2 size={16} /></button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Elite Event Creation Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s ease' }}>
          <div style={{ width: 500, background: t.modal, border: `1px solid ${t.border}`, borderRadius: 24, padding: 40, boxShadow: '0 40px 100px rgba(0,0,0,0.5)', animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>New Event</h3>
            <p style={{ color: t.muted, fontSize: 14, marginBottom: 32, fontWeight: 500 }}>{format(modal, 'EEEE, MMMM d, yyyy')}</p>
            
            <div style={{ marginBottom: 24 }}>
              <input 
                value={form.title} onChange={e => setForm({...form, title: e.target.value})} 
                placeholder="Event Title" autoFocus
                style={{ width: '100%', padding: '16px', background: 'transparent', border: 'none', borderBottom: `2px solid ${t.border}`, color: t.text, fontSize: 24, fontWeight: 600, outline: 'none', transition: 'border-color 0.2s' }} 
                onFocus={e => e.target.style.borderColor = '#3B82F6'}
                onBlur={e => e.target.style.borderColor = t.border}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: t.muted, marginBottom: 8 }}><Clock size={14} /> Time</label>
                <input 
                  type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} 
                  style={{ width: '100%', padding: '14px 16px', background: t.inp, border: `1px solid ${t.border}`, borderRadius: 12, color: t.text, fontSize: 15, outline: 'none' }} 
                />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: t.muted, marginBottom: 8 }}><Clock size={14} /> Duration</label>
                <select 
                  value={form.duration} onChange={e => setForm({...form, duration: e.target.value})}
                  style={{ width: '100%', padding: '14px 16px', background: t.inp, border: `1px solid ${t.border}`, borderRadius: 12, color: t.text, fontSize: 15, outline: 'none', appearance: 'none' }}
                >
                  <option value="15m">15 minutes</option>
                  <option value="30m">30 minutes</option>
                  <option value="1h">1 hour</option>
                  <option value="2h">2 hours</option>
                  <option value="All Day">All Day</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: t.muted, marginBottom: 8 }}><AlignLeft size={14} /> Description</label>
              <textarea 
                value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} 
                placeholder="Add notes, meeting links, etc." 
                rows={3}
                style={{ width: '100%', padding: '14px 16px', background: t.inp, border: `1px solid ${t.border}`, borderRadius: 12, color: t.text, fontSize: 15, outline: 'none', resize: 'none' }} 
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 12 }}>
                {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'].map(c => (
                  <button 
                    key={c} onClick={() => setForm({...form, color: c})} onMouseEnter={playHoverSound}
                    style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: form.color === c ? `3px solid #fff` : '3px solid transparent', boxShadow: form.color === c ? `0 0 0 2px ${c}` : 'none', cursor: 'pointer', padding: 0, transition: 'all 0.2s' }}
                  />
                ))}
              </div>
              
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => { playHoverSound(); setModal(null); }} style={{ padding: '14px 24px', background: 'transparent', border: 'none', color: t.muted, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button onClick={() => { playHoverSound(); addEvent(); }} style={{ padding: '14px 32px', background: '#fff', color: '#000', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 24px rgba(255,255,255,0.2)' }}>Create</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
