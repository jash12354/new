'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, Download, Calendar as CalendarIcon, List,
  LogOut, Sparkles, Phone, MapPin, Edit3, Trash2, X, RefreshCw
} from 'lucide-react';
import { BookingRecord } from '@/lib/db';
import { BRAND_INFO } from '@/data/brandData';

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [activeTab, setActiveTab] = useState<'table' | 'calendar'>('table');
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const router = useRouter();

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (data.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error('Failed to fetch bookings', err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus as BookingRecord['status'] } : b))
        );
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: editingNotes }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, notes: editingNotes } : b))
        );
        setSelectedBooking(null);
      }
    } catch (err) {
      console.error('Failed to save notes', err);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking request?')) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        if (selectedBooking?.id === id) setSelectedBooking(null);
      }
    } catch (err) {
      console.error('Failed to delete booking', err);
    }
  };

  const exportToCSV = () => {
    if (bookings.length === 0) return;
    const headers = ['ID', 'Full Name', 'WhatsApp', 'Email', 'Service', 'Event Date', 'Time', 'Location', 'City', 'State', 'People', 'Status', 'Notes', 'Created At'];
    const rows = bookings.map((b) => [
      b.id,
      `"${b.fullName.replace(/"/g, '""')}"`,
      `"${b.whatsappNumber}"`,
      `"${b.email || ''}"`,
      `"${b.service}"`,
      `"${b.eventDate}"`,
      `"${b.preferredTime || ''}"`,
      `"${b.eventLocation || ''}"`,
      `"${b.city || ''}"`,
      `"${b.state || ''}"`,
      b.numberOfPeople || 1,
      b.status,
      `"${(b.notes || '').replace(/"/g, '""')}"`,
      b.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hasti_henna_bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.whatsappNumber.includes(searchTerm) ||
      (b.city && b.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.eventLocation && b.eventLocation.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesService = filterService === 'All' || b.service === filterService;
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;

    return matchesSearch && matchesService && matchesStatus;
  });

  const servicesList = ['All', ...Array.from(new Set(bookings.map((b) => b.service)))];
  const statusesList = ['All', 'New', 'Contacted', 'Quoted', 'Confirmed', 'Completed', 'Cancelled'];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/40';
      case 'Contacted':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/40';
      case 'Quoted':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/40';
      case 'Confirmed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40';
      case 'Completed':
        return 'bg-emerald-700/20 text-emerald-200 border-emerald-600/40';
      case 'Cancelled':
        return 'bg-red-500/20 text-red-300 border-red-400/40';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/40';
    }
  };

  return (
    <main className="min-h-screen bg-henna-dark text-cream-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold-400/20 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-400 text-mehndi-950 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold">{BRAND_INFO.name} Admin Portal</h1>
              <p className="text-xs text-gold-300">Booking Management & Event Calendar</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              className="p-2.5 rounded-xl bg-mehndi-900 hover:bg-mehndi-800 text-cream-200 border border-gold-400/30 text-xs flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4 text-gold-400" />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-500/40 text-xs flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-mehndi-950 border border-gold-400/20 space-y-1">
            <span className="text-xs text-gold-300">Total Requests</span>
            <div className="font-serif text-2xl font-bold text-cream-50">{bookings.length}</div>
          </div>
          <div className="p-5 rounded-2xl bg-mehndi-950 border border-gold-400/20 space-y-1">
            <span className="text-xs text-blue-300">New Requests</span>
            <div className="font-serif text-2xl font-bold text-blue-400">
              {bookings.filter((b) => b.status === 'New').length}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-mehndi-950 border border-gold-400/20 space-y-1">
            <span className="text-xs text-emerald-300">Confirmed Events</span>
            <div className="font-serif text-2xl font-bold text-emerald-400">
              {bookings.filter((b) => b.status === 'Confirmed').length}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-mehndi-950 border border-gold-400/20 space-y-1">
            <span className="text-xs text-purple-300">Completed Services</span>
            <div className="font-serif text-2xl font-bold text-purple-400">
              {bookings.filter((b) => b.status === 'Completed').length}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-mehndi-950 p-4 rounded-2xl border border-gold-400/20">
          <div className="flex items-center gap-2 bg-mehndi-900 p-1 rounded-xl border border-gold-400/20">
            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'table' ? 'bg-gold-400 text-mehndi-950' : 'text-cream-200 hover:text-cream-50'
              }`}
            >
              <List className="w-4 h-4" />
              Table View
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'calendar' ? 'bg-gold-400 text-mehndi-950' : 'text-cream-200 hover:text-cream-50'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              Calendar View
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-gold-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, phone, city..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-mehndi-900 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
              />
            </div>

            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-mehndi-900 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
            >
              {servicesList.map((s) => (
                <option key={s} value={s}>Service: {s}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-mehndi-900 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
            >
              {statusesList.map((st) => (
                <option key={st} value={st}>Status: {st}</option>
              ))}
            </select>

            <button
              onClick={exportToCSV}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {activeTab === 'table' && (
          <div className="bg-mehndi-950 rounded-2xl border border-gold-400/20 overflow-x-auto shadow-2xl">
            {loading ? (
              <div className="p-12 text-center text-cream-300 text-xs">Loading bookings...</div>
            ) : filteredBookings.length === 0 ? (
              <div className="p-12 text-center text-cream-300/60 text-xs">No booking requests found.</div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-mehndi-900/80 text-gold-300 border-b border-gold-400/20 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Event Date</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold-400/10">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-mehndi-900/40 transition-colors">
                      <td className="p-4 space-y-1">
                        <div className="font-bold text-cream-50 text-sm">{b.fullName}</div>
                        <div className="text-[11px] text-cream-300 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-emerald-400" />
                          <a
                            href={`https://wa.me/${b.whatsappNumber.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline text-emerald-400 font-mono"
                          >
                            {b.whatsappNumber}
                          </a>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="font-semibold text-gold-300">{b.service}</span>
                        <div className="text-[10px] text-cream-300/70">{b.numberOfPeople} people</div>
                      </td>

                      <td className="p-4 space-y-0.5">
                        <div className="font-semibold text-cream-100">{b.eventDate}</div>
                        <div className="text-[10px] text-cream-300/70">{b.preferredTime}</div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1 text-cream-200">
                          <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                          <span>{b.city}, {b.state}</span>
                        </div>
                        <div className="text-[10px] text-cream-300/70 line-clamp-1">{b.eventLocation}</div>
                      </td>

                      <td className="p-4">
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b.id, e.target.value)}
                          className={`px-3 py-1 rounded-full border text-[11px] font-semibold focus:outline-none cursor-pointer ${getStatusBadgeClass(b.status)}`}
                        >
                          {statusesList.filter((s) => s !== 'All').map((st) => (
                            <option key={st} value={st} className="bg-mehndi-950 text-cream-50">
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedBooking(b);
                            setEditingNotes(b.notes || '');
                          }}
                          className="p-2 rounded-lg bg-mehndi-900 border border-gold-400/30 text-gold-300 hover:bg-gold-400 hover:text-mehndi-950 transition-colors"
                          title="View / Edit Notes"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          className="p-2 rounded-lg bg-red-950/80 border border-red-500/40 text-red-300 hover:bg-red-900 transition-colors"
                          title="Delete Request"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="bg-mehndi-950 rounded-2xl border border-gold-400/20 p-6 space-y-6">
            <h2 className="font-serif text-xl font-bold text-gold-300 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Upcoming Scheduled Events Agenda
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookings.length === 0 ? (
                <div className="col-span-full text-center text-cream-300/60 text-xs py-8">
                  No scheduled bookings found.
                </div>
              ) : (
                bookings
                  .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
                  .map((b) => (
                    <div
                      key={b.id}
                      className="p-5 rounded-2xl bg-mehndi-900/60 border border-gold-400/20 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-gold-400/10 pb-2">
                        <span className="font-serif text-base font-bold text-gold-300">{b.eventDate}</span>
                        <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${getStatusBadgeClass(b.status)}`}>
                          {b.status}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="font-bold text-cream-50 text-sm">{b.fullName}</div>
                        <div className="text-gold-400 font-semibold">{b.service}</div>
                        <div className="text-cream-300 text-[11px]">📍 {b.city}, {b.state} ({b.numberOfPeople} people)</div>
                        <div className="text-emerald-400 font-mono text-[11px]">📱 {b.whatsappNumber}</div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedBooking(b);
                          setEditingNotes(b.notes || '');
                        }}
                        className="w-full text-center py-2 rounded-xl bg-gold-400/10 hover:bg-gold-400/20 border border-gold-400/30 text-gold-300 text-xs font-semibold transition-colors"
                      >
                        View Full Details
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>
        )}

        {selectedBooking && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedBooking(null)}
          >
            <div
              className="max-w-lg w-full bg-mehndi-950 border border-gold-400/40 rounded-3xl p-6 shadow-2xl space-y-4 text-cream-50 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedBooking(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-mehndi-900 text-cream-200 hover:text-cream-50"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-xl font-bold text-gold-300">
                Booking Request Details
              </h3>

              <div className="space-y-2 text-xs bg-mehndi-900/80 p-4 rounded-2xl border border-gold-400/20">
                <div><span className="text-gold-400 font-semibold">ID:</span> {selectedBooking.id}</div>
                <div><span className="text-gold-400 font-semibold">Name:</span> {selectedBooking.fullName}</div>
                <div><span className="text-gold-400 font-semibold">WhatsApp:</span> {selectedBooking.whatsappNumber}</div>
                <div><span className="text-gold-400 font-semibold">Email:</span> {selectedBooking.email || 'N/A'}</div>
                <div><span className="text-gold-400 font-semibold">Service:</span> {selectedBooking.service}</div>
                <div><span className="text-gold-400 font-semibold">Date & Time:</span> {selectedBooking.eventDate} ({selectedBooking.preferredTime})</div>
                <div><span className="text-gold-400 font-semibold">Location:</span> {selectedBooking.eventLocation}, {selectedBooking.city}, {selectedBooking.state}</div>
                <div><span className="text-gold-400 font-semibold">Design Style:</span> {selectedBooking.designPreference}</div>
                <div><span className="text-gold-400 font-semibold">Bridal Pkg:</span> {selectedBooking.bridalPackagePreference}</div>
                <div><span className="text-gold-400 font-semibold">Artists & Travel:</span> {selectedBooking.artistsRequired} | {selectedBooking.travelRequirement}</div>
                {selectedBooking.additionalMessage && (
                  <div className="pt-2 border-t border-gold-400/10">
                    <span className="text-gold-400 font-semibold">Customer Message:</span> {selectedBooking.additionalMessage}
                  </div>
                )}
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="block text-gold-300 font-semibold">Internal Admin Notes</label>
                <textarea
                  rows={3}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Add private internal notes (e.g. Quoted ₹12,000, deposit received)..."
                  className="w-full px-4 py-2.5 rounded-xl bg-mehndi-900 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 rounded-xl border border-gold-400/30 text-xs text-cream-200"
                >
                  Close
                </button>
                <button
                  onClick={() => handleSaveNotes(selectedBooking.id)}
                  className="px-6 py-2 rounded-xl bg-gold-400 text-mehndi-950 font-bold text-xs shadow-md"
                >
                  Save Notes
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}
