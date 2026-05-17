"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Copy, Check, LogOut } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase, type FreightType, type Parcel, type ParcelStatus } from "@/lib/supabase";

type CountryRate = {
  country: string;
  rate_per_kg: number;
  rate_per_pound: number;
  updated_at: string;
};

type Tab = "rates" | "orders";

const EMPTY_ORDER = {
  sender_name: "",
  sender_number: "",
  receiver_name: "",
  receiver_number: "",
  weight: "",
  status_id: "",
  freight_type_id: "",
  estimated_delivery: "",
  duty_added: false,
};

function IdCell({ id, copied, onCopy }: { id: string; copied: boolean; onCopy: () => void }) {
  const [open, setOpen] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLongPress = () => {
    longPressTimer.current = setTimeout(() => setOpen(true), 500);
  };

  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <span
            className="font-mono text-xs bg-muted px-2 py-1 rounded cursor-default select-all"
            onTouchStart={startLongPress}
            onTouchEnd={() => {
              cancelLongPress();
              if (open) setTimeout(() => setOpen(false), 1500);
            }}
            onTouchMove={cancelLongPress}
          >
            {id.slice(0, 8)}…
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="font-mono text-xs break-all max-w-xs">
          {id}
        </TooltipContent>
      </Tooltip>
      <button
        type="button"
        title="Copy full ID"
        onClick={onCopy}
        className="text-foreground/40 hover:text-foreground transition-colors"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("rates");

  // Rates state
  const [rates, setRates] = useState<CountryRate[]>([]);
  const [search, setSearch] = useState("");

  // Orders state
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [freightTypes, setFreightTypes] = useState<FreightType[]>([]);
  const [statuses, setStatuses] = useState<ParcelStatus[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [orderForm, setOrderForm] = useState(EMPTY_ORDER);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Shared
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const filteredRates = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rates;
    return rates.filter((r) => r.country.toLowerCase().includes(query));
  }, [rates, search]);

  // ── Session bootstrap ─────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setSessionLoading(false);
      if (s) void loadRates(s.access_token);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (!s) {
        setRates([]);
        setParcels([]);
        setFreightTypes([]);
        setStatuses([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── Auth ──────────────────────────────────────────────────────────────────
  const loadRates = async (token: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/rates", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = (await res.json()) as { ok: boolean; error?: string; rates?: CountryRate[] };
      if (!res.ok || !data.ok || !data.rates) throw new Error(data.error ?? "Failed to load rates");
      setRates(data.rates);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load rates");
    } finally {
      setLoading(false);
    }
  };

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (authError) throw authError;
      if (data.session) {
        setSession(data.session);
        await loadRates(data.session.access_token);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setEmail("");
    setPassword("");
    setActiveTab("rates");
    setError("");
    setMessage("");
  };

  // ── Rates ─────────────────────────────────────────────────────────────────
  const updateRateField = (country: string, value: string) => {
    const parsed = Number(value);
    setRates((prev) =>
      prev.map((r) =>
        r.country === country
          ? { ...r, rate_per_kg: Number.isFinite(parsed) && parsed >= 0 ? parsed : 0 }
          : r,
      ),
    );
  };

  const saveRates = async () => {
    if (!session) return;
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/admin/rates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          rates: rates.map((r) => ({ ...r, updated_at: new Date().toISOString() })),
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string; rates?: CountryRate[] };
      if (!res.ok || !data.ok || !data.rates) throw new Error(data.error ?? "Failed to save");
      setRates(data.rates);
      setMessage("Rates saved successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save rates");
    } finally {
      setLoading(false);
    }
  };

  // ── Orders (Supabase) ─────────────────────────────────────────────────────
  const loadOrdersData = async () => {
    setLoading(true);
    setError("");
    try {
      const [{ data: ft, error: ftErr }, { data: ps, error: psErr }, { data: parcelsData, error: pErr }] =
        await Promise.all([
          supabase.from("feight_type").select("*").order("sort_order"),
          supabase.from("parcel_status").select("*").order("sort_order"),
          supabase
            .from("parcel")
            .select("*, parcel_status(*), feight_type(*)")
            .order("created_at", { ascending: false }),
        ]);
      if (ftErr) throw new Error(ftErr.message);
      if (psErr) throw new Error(psErr.message);
      if (pErr) throw new Error(pErr.message);
      setFreightTypes((ft ?? []) as FreightType[]);
      setStatuses((ps ?? []) as ParcelStatus[]);
      setParcels((parcelsData ?? []) as Parcel[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session && activeTab === "orders" && freightTypes.length === 0) {
      void loadOrdersData();
    }
  }, [session, activeTab]);

  const openNewForm = () => {
    setEditingId(null);
    setOrderForm(EMPTY_ORDER);
    setShowForm(true);
    setError("");
    setMessage("");
  };

  const openEditForm = (parcel: Parcel) => {
    setEditingId(parcel.id);
    setOrderForm({
      sender_name: parcel.sender_name,
      sender_number: parcel.sender_number,
      receiver_name: parcel.receiver_name,
      receiver_number: parcel.receiver_number,
      weight: parcel.weight,
      status_id: String(parcel.status_id),
      freight_type_id: String(parcel.freight_type_id),
      estimated_delivery: parcel.estimated_delivery
        ? parcel.estimated_delivery.slice(0, 16)
        : "",
      duty_added: parcel.duty_added,
    });
    setShowForm(true);
    setError("");
    setMessage("");
  };

  const submitOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const payload = {
        sender_name: orderForm.sender_name.trim(),
        sender_number: orderForm.sender_number.trim(),
        receiver_name: orderForm.receiver_name.trim(),
        receiver_number: orderForm.receiver_number.trim(),
        weight: orderForm.weight.trim(),
        status_id: Number(orderForm.status_id),
        freight_type_id: Number(orderForm.freight_type_id),
        estimated_delivery: orderForm.estimated_delivery || null,
        duty_added: orderForm.duty_added,
      };

      if (editingId) {
        const { error: err } = await supabase
          .from("parcel")
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq("id", editingId);
        if (err) throw new Error(err.message);
        setMessage("Order updated.");
      } else {
        const { error: err } = await supabase.from("parcel").insert(payload);
        if (err) throw new Error(err.message);
        setMessage("Order created.");
      }

      setShowForm(false);
      setOrderForm(EMPTY_ORDER);
      setEditingId(null);
      await loadOrdersData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save order");
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!window.confirm("Delete this order?")) return;
    setLoading(true);
    setError("");
    try {
      const { error: err } = await supabase.from("parcel").delete().eq("id", id);
      if (err) throw new Error(err.message);
      setParcels((prev) => prev.filter((p) => p.id !== id));
      setMessage("Order deleted.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete order");
    } finally {
      setLoading(false);
    }
  };

  const field = (label: string, children: ReactNode) => (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {children}
    </div>
  );

  const inputCls = "w-full h-10 rounded-md border border-input bg-background px-3 text-sm";
  const selectCls = "w-full h-10 rounded-md border border-input bg-background px-3 text-sm";

  // ── Render ────────────────────────────────────────────────────────────────
  if (sessionLoading) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-foreground/60">Loading…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold">Admin Panel</h1>

        {!session ? (
          <form
            onSubmit={onLogin}
            className="mt-8 max-w-md space-y-4 border border-border rounded-2xl p-6 bg-card"
          >
            <p className="text-foreground/70 text-sm">Enter your credentials to continue.</p>
            {field(
              "Email",
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
                required
                autoComplete="email"
              />,
            )}
            {field(
              "Password",
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputCls}
                required
                autoComplete="current-password"
              />,
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 rounded-md bg-primary text-primary-foreground font-medium disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Login"}
            </button>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </form>
        ) : (
          <div className="mt-6">
            {/* Tab nav + logout */}
            <div className="flex items-center justify-between border-b border-border mb-6">
              <div className="flex gap-1">
                {(["rates", "orders"] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setError("");
                      setMessage("");
                      setShowForm(false);
                    }}
                    className={`px-5 py-2.5 text-sm font-medium rounded-t-md transition-colors capitalize ${
                      activeTab === tab
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {tab === "rates" ? "Country Rates" : "Orders"}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-1.5 text-sm text-foreground/60 hover:text-destructive transition-colors pb-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>

            {/* Feedback */}
            {message ? <p className="mb-4 text-sm text-emerald-600">{message}</p> : null}
            {error ? <p className="mb-4 text-sm text-destructive">{error}</p> : null}

            {/* ── Rates Tab ── */}
            {activeTab === "rates" && (
              <div>
                <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
                  <input
                    type="text"
                    placeholder="Search country..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:max-w-sm h-10 rounded-md border border-input bg-background px-3"
                  />
                  <button
                    type="button"
                    onClick={saveRates}
                    disabled={loading}
                    className="h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium disabled:opacity-60"
                  >
                    {loading ? "Saving..." : "Save All Rates"}
                  </button>
                </div>
                <div className="rounded-2xl border border-border overflow-hidden">
                  <div className="max-h-[65vh] overflow-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted sticky top-0">
                        <tr>
                          <th className="text-left px-4 py-3">Country</th>
                          <th className="text-left px-4 py-3">Rate / kg</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRates.map((rate) => (
                          <tr key={rate.country} className="border-t border-border">
                            <td className="px-4 py-3">{rate.country}</td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={rate.rate_per_kg}
                                onChange={(e) => updateRateField(rate.country, e.target.value)}
                                className="w-36 h-9 rounded-md border border-input bg-background px-2"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── Orders Tab ── */}
            {activeTab === "orders" && (
              <div>
                {/* New order form */}
                {showForm ? (
                  <div className="border border-border rounded-2xl p-6 bg-card mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">
                        {editingId ? "Edit Order" : "New Order"}
                      </h2>
                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          setEditingId(null);
                          setOrderForm(EMPTY_ORDER);
                        }}
                        className="text-sm text-foreground/60 hover:text-foreground"
                      >
                        Cancel
                      </button>
                    </div>
                    <form onSubmit={submitOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {field(
                        "Sender Name *",
                        <input
                          type="text"
                          value={orderForm.sender_name}
                          onChange={(e) => setOrderForm((f) => ({ ...f, sender_name: e.target.value }))}
                          className={inputCls}
                          required
                        />,
                      )}
                      {field(
                        "Sender Number *",
                        <input
                          type="text"
                          value={orderForm.sender_number}
                          onChange={(e) => setOrderForm((f) => ({ ...f, sender_number: e.target.value }))}
                          className={inputCls}
                          required
                        />,
                      )}
                      {field(
                        "Receiver Name *",
                        <input
                          type="text"
                          value={orderForm.receiver_name}
                          onChange={(e) => setOrderForm((f) => ({ ...f, receiver_name: e.target.value }))}
                          className={inputCls}
                          required
                        />,
                      )}
                      {field(
                        "Receiver Number *",
                        <input
                          type="text"
                          value={orderForm.receiver_number}
                          onChange={(e) =>
                            setOrderForm((f) => ({ ...f, receiver_number: e.target.value }))
                          }
                          className={inputCls}
                          required
                        />,
                      )}
                      {field(
                        "Weight *",
                        <input
                          type="text"
                          placeholder="e.g. 5kg"
                          value={orderForm.weight}
                          onChange={(e) => setOrderForm((f) => ({ ...f, weight: e.target.value }))}
                          className={inputCls}
                          required
                        />,
                      )}
                      {field(
                        "Freight Type *",
                        <select
                          value={orderForm.freight_type_id}
                          onChange={(e) =>
                            setOrderForm((f) => ({ ...f, freight_type_id: e.target.value }))
                          }
                          className={selectCls}
                          required
                        >
                          <option value="">Select freight type</option>
                          {freightTypes.map((ft) => (
                            <option key={ft.id} value={ft.id}>
                              {ft.lable}
                            </option>
                          ))}
                        </select>,
                      )}
                      {field(
                        "Status *",
                        <select
                          value={orderForm.status_id}
                          onChange={(e) =>
                            setOrderForm((f) => ({ ...f, status_id: e.target.value }))
                          }
                          className={selectCls}
                          required
                        >
                          <option value="">Select status</option>
                          {statuses.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.lable}
                            </option>
                          ))}
                        </select>,
                      )}
                      {field(
                        "Estimated Delivery",
                        <input
                          type="datetime-local"
                          value={orderForm.estimated_delivery}
                          onChange={(e) =>
                            setOrderForm((f) => ({ ...f, estimated_delivery: e.target.value }))
                          }
                          className={inputCls}
                        />,
                      )}
                      <div className="md:col-span-2 flex items-center gap-3">
                        <input
                          id="duty_added"
                          type="checkbox"
                          checked={orderForm.duty_added}
                          onChange={(e) =>
                            setOrderForm((f) => ({ ...f, duty_added: e.target.checked }))
                          }
                          className="h-4 w-4 rounded border-input accent-primary"
                        />
                        <label htmlFor="duty_added" className="text-sm font-medium">
                          Duty Added
                        </label>
                      </div>
                      <div className="md:col-span-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="h-10 px-8 rounded-md bg-primary text-primary-foreground font-medium disabled:opacity-60"
                        >
                          {loading ? "Saving..." : editingId ? "Update Order" : "Create Order"}
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="flex justify-end mb-4">
                    <button
                      type="button"
                      onClick={openNewForm}
                      className="h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium"
                    >
                      + New Order
                    </button>
                  </div>
                )}

                {/* Orders table */}
                {loading && parcels.length === 0 ? (
                  <p className="text-sm text-foreground/60 py-8 text-center">Loading orders…</p>
                ) : parcels.length === 0 ? (
                  <p className="text-sm text-foreground/60 py-8 text-center">No orders yet.</p>
                ) : (
                  <div className="rounded-2xl border border-border overflow-hidden">
                    <div className="overflow-auto max-h-[60vh]">
                      <table className="w-full text-sm">
                        <thead className="bg-muted sticky top-0">
                          <tr>
                            <th className="text-left px-4 py-3 whitespace-nowrap">ID</th>
                            <th className="text-left px-4 py-3 whitespace-nowrap">Sender</th>
                            <th className="text-left px-4 py-3 whitespace-nowrap">Receiver</th>
                            <th className="text-left px-4 py-3 whitespace-nowrap">Weight</th>
                            <th className="text-left px-4 py-3 whitespace-nowrap">Freight</th>
                            <th className="text-left px-4 py-3 whitespace-nowrap">Status</th>
                            <th className="text-left px-4 py-3 whitespace-nowrap">Duty</th>
                            <th className="text-left px-4 py-3 whitespace-nowrap">Est. Delivery</th>
                            <th className="text-left px-4 py-3 whitespace-nowrap">Created</th>
                            <th className="px-4 py-3" />
                          </tr>
                        </thead>
                        <tbody>
                          {parcels.map((p) => (
                            <tr key={p.id} className="border-t border-border hover:bg-muted/30">
                              <td className="px-4 py-3 whitespace-nowrap">
                                <IdCell
                                  id={p.id}
                                  copied={copiedId === p.id}
                                  onCopy={() => {
                                    void navigator.clipboard.writeText(p.id).then(() => {
                                      setCopiedId(p.id);
                                      setTimeout(() => setCopiedId(null), 2000);
                                    });
                                  }}
                                />
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="font-medium">{p.sender_name}</div>
                                <div className="text-xs text-foreground/60">{p.sender_number}</div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="font-medium">{p.receiver_name}</div>
                                <div className="text-xs text-foreground/60">{p.receiver_number}</div>
                              </td>
                              <td className="px-4 py-3">{p.weight}</td>
                              <td className="px-4 py-3">
                                {p.feight_type?.lable ?? p.freight_type_id}
                              </td>
                              <td className="px-4 py-3">
                                <span className="inline-block rounded-full bg-primary/10 text-primary text-xs px-2 py-0.5">
                                  {p.parcel_status?.lable ?? p.status_id}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-center">
                                {p.duty_added ? "✓" : "—"}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-foreground/70">
                                {p.estimated_delivery
                                  ? new Date(p.estimated_delivery).toLocaleString()
                                  : "—"}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-foreground/70">
                                {new Date(p.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => openEditForm(p)}
                                    className="text-xs px-3 py-1 rounded-md border border-border hover:bg-muted"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => deleteOrder(p.id)}
                                    className="text-xs px-3 py-1 rounded-md border border-destructive/40 text-destructive hover:bg-destructive/10"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
