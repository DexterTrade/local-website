"use client";

import { FormEvent, useMemo, useState } from "react";

type CountryRate = {
  country: string;
  rate_per_kg: number;
  rate_per_pound: number;
  updated_at: string;
};

export default function AdminRatesPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [search, setSearch] = useState("");
  const [rates, setRates] = useState<CountryRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const filteredRates = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rates;
    return rates.filter((rate) => rate.country.toLowerCase().includes(query));
  }, [rates, search]);

  const loadRates = async (user: string, pass: string) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/admin/rates", {
        method: "GET",
        headers: {
          "x-admin-user": user,
          "x-admin-password": pass,
        },
      });

      const data = (await response.json()) as {
        ok: boolean;
        error?: string;
        rates?: CountryRate[];
      };

      if (!response.ok || !data.ok || !data.rates) {
        throw new Error(data.error || "Failed to load rates");
      }

      setRates(data.rates);
      setAuthorized(true);
      setMessage("Rates loaded.");
    } catch (err) {
      setAuthorized(false);
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loadRates(username.trim(), password);
  };

  const updateRateField = (country: string, field: "rate_per_kg", value: string) => {
    const parsed = Number(value);
    setRates((prev) =>
      prev.map((rate) =>
        rate.country === country
          ? {
              ...rate,
              [field]: Number.isFinite(parsed) && parsed >= 0 ? parsed : 0,
            }
          : rate,
      ),
    );
  };

  const saveRates = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const payload = {
        username: username.trim(),
        password,
        rates: rates.map((rate) => ({
          ...rate,
          updated_at: new Date().toISOString(),
        })),
      };

      const response = await fetch("/api/admin/rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        ok: boolean;
        error?: string;
        rates?: CountryRate[];
      };

      if (!response.ok || !data.ok || !data.rates) {
        throw new Error(data.error || "Failed to save rates");
      }

      setRates(data.rates);
      setMessage("Rates saved successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save rates");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold">Admin Country Rates</h1>
        <p className="text-foreground/70 mt-2">
          Update rate per kg for each country.
        </p>

        {!authorized ? (
          <form
            onSubmit={onLogin}
            className="mt-8 max-w-md space-y-4 border border-border rounded-2xl p-6 bg-card"
          >
            <div>
              <label htmlFor="admin-user" className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                id="admin-user"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
                required
              />
            </div>
            <div>
              <label htmlFor="admin-pass" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="admin-pass"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 rounded-md bg-primary text-primary-foreground font-medium disabled:opacity-60"
            >
              {loading ? "Checking..." : "Login"}
            </button>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </form>
        ) : (
          <div className="mt-8">
            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
              <input
                type="text"
                placeholder="Search country..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
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
                            onChange={(event) =>
                              updateRateField(rate.country, "rate_per_kg", event.target.value)
                            }
                            className="w-36 h-9 rounded-md border border-input bg-background px-2"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {message ? <p className="mt-3 text-sm text-emerald-600">{message}</p> : null}
            {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
          </div>
        )}
      </section>
    </main>
  );
}
