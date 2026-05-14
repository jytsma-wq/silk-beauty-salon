"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, CalendarDays, Download, LogOut, Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "NO_SHOW" | "COMPLETED";
type ContactStatus = "NEW" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED";
type SubscriberStatus = "ACTIVE" | "UNSUBSCRIBED" | "BOUNCED";
type Tab = "today" | "bookings" | "messages" | "subscribers";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  date: string;
  timeSlot: string;
  message: string | null;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  locale: string;
  status: ContactStatus;
  createdAt: string;
}

interface Subscriber {
  id: string;
  email: string;
  locale: string;
  status: SubscriberStatus;
  createdAt: string;
}

const STORAGE_KEY = "silk_admin_key";
const PAGE_SIZE = 20;

const bookingStatuses: BookingStatus[] = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "NO_SHOW",
  "COMPLETED",
];

const tabs: Array<{ tab: Tab; label: string; icon: typeof CalendarDays }> = [
  { tab: "today", label: "Today", icon: CalendarDays },
  { tab: "bookings", label: "All Bookings", icon: Activity },
  { tab: "messages", label: "Messages", icon: Mail },
  { tab: "subscribers", label: "Subscribers", icon: Users },
];

const badgeClass: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-red-100 text-red-800",
  NO_SHOW: "bg-gray-100 text-gray-800",
  COMPLETED: "bg-blue-100 text-blue-800",
  NEW: "bg-amber-100 text-amber-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  ARCHIVED: "bg-gray-100 text-gray-800",
  ACTIVE: "bg-emerald-100 text-emerald-800",
  UNSUBSCRIBED: "bg-gray-100 text-gray-800",
  BOUNCED: "bg-red-100 text-red-800",
};

function todayValue() {
  return new Date().toISOString().slice(0, 10);
}

function dateValue(date: string) {
  return new Date(date).toISOString().slice(0, 10);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function csvEscape(value: string | null | undefined) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export default function AdminPage() {
  const [apiKey, setApiKey] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("today");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [health, setHealth] = useState<"healthy" | "unhealthy" | "unknown">("unknown");
  const [statusFilter, setStatusFilter] = useState<"ALL" | BookingStatus>("ALL");
  const [range, setRange] = useState<"7" | "30" | "custom">("30");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [page, setPage] = useState(1);
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const [expandedContact, setExpandedContact] = useState<string | null>(null);

  const adminFetch = useCallback(async <T,>(endpoint: string, key: string, init: RequestInit = {}) => {
    const response = await fetch(endpoint, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        ...(init.headers ?? {}),
      },
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({ error: "Request failed" }));
      throw new Error(body.error || "Request failed");
    }

    return response.json() as Promise<T>;
  }, []);

  const loadHealth = useCallback(async () => {
    try {
      const response = await fetch("/api/health/db");
      const data = await response.json();
      setHealth(response.ok && data.status === "healthy" ? "healthy" : "unhealthy");
    } catch {
      setHealth("unhealthy");
    }
  }, []);

  const loadData = useCallback(async (key: string) => {
    const [bookingData, contactData, subscriberData] = await Promise.all([
      adminFetch<Booking[]>("/api/bookings", key),
      adminFetch<ContactSubmission[]>("/api/admin/contacts", key),
      adminFetch<Subscriber[]>("/api/admin/subscribers", key),
    ]);
    setBookings(bookingData);
    setContacts(contactData);
    setSubscribers(subscriberData);
  }, [adminFetch]);

  const validateKey = useCallback(async (key: string) => {
    setError("");
    setIsLoading(true);
    try {
      await adminFetch<Booking[]>("/api/bookings", key);
      setApiKey(key);
      window.localStorage.setItem(STORAGE_KEY, key);
      setIsAuthenticated(true);
      await loadData(key);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      setIsAuthenticated(false);
      setError("Invalid access key");
    } finally {
      setIsLoading(false);
    }
  }, [adminFetch, loadData]);

  useEffect(() => {
    let cancelled = false;
    const storedKey = window.localStorage.getItem(STORAGE_KEY);

    const bootstrap = async () => {
      await loadHealth();
      if (cancelled) return;
      if (storedKey) {
        await validateKey(storedKey);
      } else {
        setIsLoading(false);
      }
    };

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [loadHealth, validateKey]);

  useEffect(() => {
    const interval = window.setInterval(() => void loadHealth(), 60000);
    return () => window.clearInterval(interval);
  }, [loadHealth]);

  const todaysBookings = useMemo(
    () =>
      bookings
        .filter((booking) => dateValue(booking.date) === todayValue())
        .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot)),
    [bookings]
  );

  const filteredBookings = useMemo(() => {
    const now = new Date();
    const from =
      range === "custom"
        ? customFrom
        : new Date(now.getTime() - Number(range) * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10);
    const to = range === "custom" ? customTo : "";

    return bookings
      .filter((booking) => statusFilter === "ALL" || booking.status === statusFilter)
      .filter((booking) => {
        const bookingDate = dateValue(booking.date);
        if (from && bookingDate < from) return false;
        if (to && bookingDate > to) return false;
        return true;
      })
      .sort((a, b) => `${dateValue(b.date)} ${b.timeSlot}`.localeCompare(`${dateValue(a.date)} ${a.timeSlot}`));
  }, [bookings, customFrom, customTo, range, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredBookings.length / PAGE_SIZE));
  const pagedBookings = filteredBookings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const updateBookingStatus = async (id: string, status: BookingStatus) => {
    const updated = await adminFetch<Booking>(`/api/bookings/${id}`, apiKey, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    setBookings((prev) => prev.map((booking) => (booking.id === id ? updated : booking)));
  };

  const updateContactStatus = async (id: string, status: ContactStatus) => {
    const updated = await adminFetch<ContactSubmission>(`/api/admin/contacts/${id}`, apiKey, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    setContacts((prev) => prev.map((contact) => (contact.id === id ? updated : contact)));
  };

  const logout = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setApiKey("");
    setPassword("");
    setIsAuthenticated(false);
  };

  const exportSubscribers = () => {
    const rows = [
      ["Email", "Locale", "Status", "Subscribed Date"],
      ...subscribers.map((subscriber) => [
        subscriber.email,
        subscriber.locale,
        subscriber.status,
        formatDate(subscriber.createdAt),
      ]),
    ];
    const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "silk-newsletter-subscribers.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const statusBadge = (status: string) => (
    <span className={`rounded-sm px-2 py-1 text-xs font-medium ${badgeClass[status] ?? badgeClass.PENDING}`}>
      {status.replace("_", " ")}
    </span>
  );

  if (isLoading) {
    return <main className="flex min-h-screen items-center justify-center bg-[#f7f4f0] text-[#241f1b]">Loading admin...</main>;
  }

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f4f0] px-4 text-[#241f1b]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void validateKey(password);
          }}
          className="w-full max-w-sm rounded-sm border border-[#e8e4df] bg-white p-6 shadow-sm"
        >
          <h1 className="font-serif text-2xl">Silk Beauty Salon</h1>
          <p className="mt-1 text-sm text-stone-600">Admin access</p>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Access key"
            className="mt-6"
          />
          {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
          <Button type="submit" className="mt-5 w-full">
            Enter
          </Button>
        </form>
      </main>
    );
  }

  const totalToday = todaysBookings.length;
  const confirmedToday = todaysBookings.filter((booking) => booking.status === "CONFIRMED").length;
  const pendingToday = todaysBookings.filter((booking) => booking.status === "PENDING").length;
  const cancelledToday = todaysBookings.filter((booking) => booking.status === "CANCELLED").length;

  return (
    <main className="min-h-screen bg-[#f7f4f0] text-[#241f1b]">
      <header className="sticky top-0 z-20 border-b border-[#e8e4df] bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-xl">Silk Beauty Salon - Admin</h1>
            <div className="mt-1 flex items-center gap-2 text-xs text-stone-600">
              <span className={`h-2 w-2 rounded-full ${health === "healthy" ? "bg-emerald-500" : "bg-red-500"}`} />
              Database {health}
            </div>
          </div>
          <Button type="button" variant="outline" onClick={logout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <nav className="mb-6 flex gap-2 overflow-x-auto">
          {tabs.map(({ tab, label, icon: Icon }) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cnTab(activeTab === tab)}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        {activeTab === "today" && (
          <section className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-4">
              {[
                ["Total Today", totalToday],
                ["Confirmed", confirmedToday],
                ["Pending", pendingToday],
                ["Cancelled", cancelledToday],
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-sm border border-[#e8e4df] bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-stone-500">{label as string}</p>
                  <p className="mt-2 font-serif text-3xl">{value as number}</p>
                </div>
              ))}
            </div>
            {todaysBookings.length === 0 ? (
              <div className="rounded-sm border border-[#e8e4df] bg-white p-10 text-center">
                <CalendarDays className="mx-auto h-10 w-10 text-[#8d6f58]" />
                <p className="mt-4 font-serif text-xl">No appointments today</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todaysBookings.map((booking) => (
                  <div key={booking.id} className="rounded-sm border border-[#e8e4df] bg-white p-4">
                    <button
                      type="button"
                      onClick={() => setExpandedBooking(expandedBooking === booking.id ? null : booking.id)}
                      className="flex w-full flex-wrap items-center justify-between gap-3 text-left"
                    >
                      <div>
                        <p className="font-medium">{booking.timeSlot} - {booking.name}</p>
                        <p className="text-sm text-stone-600">{booking.service} · {booking.phone || "No phone"}</p>
                      </div>
                      {statusBadge(booking.status)}
                    </button>
                    {expandedBooking === booking.id && (
                      <div className="mt-4 border-t border-[#e8e4df] pt-4 text-sm text-stone-700">
                        <p>{booking.email}</p>
                        {booking.message ? <p className="mt-2">{booking.message}</p> : null}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {bookingStatuses.map((status) => (
                            <Button key={status} type="button" variant="outline" size="sm" onClick={() => void updateBookingStatus(booking.id, status)}>
                              {status.replace("_", " ")}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "bookings" && (
          <section className="space-y-4">
            <div className="grid gap-3 rounded-sm border border-[#e8e4df] bg-white p-4 md:grid-cols-4">
              <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value as "ALL" | BookingStatus); setPage(1); }} className="h-10 rounded-md border px-3 text-sm">
                <option value="ALL">All statuses</option>
                {bookingStatuses.map((status) => <option key={status} value={status}>{status.replace("_", " ")}</option>)}
              </select>
              <select value={range} onChange={(event) => { setRange(event.target.value as "7" | "30" | "custom"); setPage(1); }} className="h-10 rounded-md border px-3 text-sm">
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="custom">Custom range</option>
              </select>
              <Input type="date" value={customFrom} disabled={range !== "custom"} onChange={(event) => setCustomFrom(event.target.value)} />
              <Input type="date" value={customTo} disabled={range !== "custom"} onChange={(event) => setCustomTo(event.target.value)} />
            </div>
            <div className="hidden overflow-hidden rounded-sm border border-[#e8e4df] bg-white md:block">
              <table className="w-full text-sm">
                <thead className="bg-[#f7f4f0] text-left">
                  <tr>
                    {["Date", "Time", "Name", "Service", "Status", "Actions"].map((header) => <th key={header} className="p-3 font-medium">{header}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {pagedBookings.map((booking) => (
                    <tr key={booking.id} className="border-t border-[#e8e4df]">
                      <td className="p-3">{formatDate(booking.date)}</td>
                      <td className="p-3">{booking.timeSlot}</td>
                      <td className="p-3">{booking.name}</td>
                      <td className="p-3">{booking.service}</td>
                      <td className="p-3">{statusBadge(booking.status)}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-2">
                          <Button type="button" size="sm" variant="outline" onClick={() => void updateBookingStatus(booking.id, "CONFIRMED")}>Confirm</Button>
                          <Button type="button" size="sm" variant="outline" onClick={() => void updateBookingStatus(booking.id, "CANCELLED")}>Cancel</Button>
                          <Button type="button" size="sm" variant="outline" onClick={() => void updateBookingStatus(booking.id, "NO_SHOW")}>No Show</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-3 md:hidden">
              {pagedBookings.map((booking) => (
                <div key={booking.id} className="rounded-sm border border-[#e8e4df] bg-white p-4">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-medium">{booking.name}</p>
                      <p className="text-sm text-stone-600">{formatDate(booking.date)} · {booking.timeSlot}</p>
                    </div>
                    {statusBadge(booking.status)}
                  </div>
                  <p className="mt-2 text-sm">{booking.service}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button type="button" size="sm" variant="outline" onClick={() => void updateBookingStatus(booking.id, "CONFIRMED")}>Confirm</Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => void updateBookingStatus(booking.id, "CANCELLED")}>Cancel</Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => void updateBookingStatus(booking.id, "NO_SHOW")}>No Show</Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <Button type="button" variant="outline" disabled={page === 1} onClick={() => setPage((prev) => Math.max(1, prev - 1))}>Previous</Button>
              <span className="text-sm text-stone-600">Page {page} of {pageCount}</span>
              <Button type="button" variant="outline" disabled={page === pageCount} onClick={() => setPage((prev) => Math.min(pageCount, prev + 1))}>Next</Button>
            </div>
          </section>
        )}

        {activeTab === "messages" && (
          <section className="space-y-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="rounded-sm border border-[#e8e4df] bg-white p-4">
                <button type="button" onClick={() => setExpandedContact(expandedContact === contact.id ? null : contact.id)} className="flex w-full flex-wrap items-center justify-between gap-3 text-left">
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-stone-600">{contact.email} · {formatDate(contact.createdAt)}</p>
                    <p className="mt-1 line-clamp-1 text-sm text-stone-700">{contact.message}</p>
                  </div>
                  {statusBadge(contact.status)}
                </button>
                {expandedContact === contact.id && (
                  <div className="mt-4 border-t border-[#e8e4df] pt-4">
                    <p className="text-sm text-stone-700">{contact.message}</p>
                    <p className="mt-2 text-sm text-stone-500">{contact.phone || "No phone"} · {contact.locale}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button type="button" size="sm" variant="outline" onClick={() => void updateContactStatus(contact.id, "IN_PROGRESS")}>In Progress</Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => void updateContactStatus(contact.id, "COMPLETED")}>Resolved</Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => void updateContactStatus(contact.id, "ARCHIVED")}>Archive</Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {activeTab === "subscribers" && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-[#e8e4df] bg-white p-4">
              <p className="font-serif text-2xl">{subscribers.length} subscribers</p>
              <Button type="button" variant="outline" onClick={exportSubscribers}>
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
            <div className="overflow-hidden rounded-sm border border-[#e8e4df] bg-white">
              {subscribers.map((subscriber) => (
                <div key={subscriber.id} className="grid gap-2 border-t border-[#e8e4df] p-4 first:border-t-0 md:grid-cols-[1fr_100px_140px_160px]">
                  <span className="font-medium">{subscriber.email}</span>
                  <span className="text-sm text-stone-600">{subscriber.locale}</span>
                  <span>{statusBadge(subscriber.status)}</span>
                  <span className="text-sm text-stone-600">{formatDate(subscriber.createdAt)}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function cnTab(active: boolean) {
  return `inline-flex shrink-0 items-center gap-2 rounded-sm border px-4 py-2 text-sm transition-colors ${
    active
      ? "border-[#241f1b] bg-[#241f1b] text-white"
      : "border-[#e8e4df] bg-white text-[#241f1b] hover:border-[#b5453a]"
  }`;
}
