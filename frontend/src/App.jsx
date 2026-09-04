import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";
import "./App.css";
import { getSales, createSale, getPrediction } from "./api";

function App() {
  const [sales, setSales] = useState([]);
  const [page, setPage] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const [form, setForm] = useState({
    product_name: "",
    category: "",
    quantity: 1,
    unit_price: "",
    customer_name: "",
    payment_method: "UPI",
    sale_date: new Date().toISOString().split("T")[0],
  });

  // LOAD SALES
  const loadSales = async () => {
    try {
      const data = await getSales();
      setSales(data);
    } catch (e) {
      console.error(e);
    }
  };

  // LOAD PREDICTION
  const loadPrediction = async () => {
    try {
      const data = await getPrediction();
      setPrediction(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadSales();
  }, []);

  useEffect(() => {
    if (page === "prediction") loadPrediction();
  }, [page]);

  // FORM
  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD SALE
  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createSale({
        ...form,
        quantity: Number(form.quantity),
        unit_price: Number(form.unit_price),
      });

      alert("Sale added successfully!");

      setShowForm(false);

      setForm({
        product_name: "",
        category: "",
        quantity: 1,
        unit_price: "",
        customer_name: "",
        payment_method: "UPI",
        sale_date: new Date().toISOString().split("T")[0],
      });

      await loadSales();
      setPage("dashboard");
    } catch (e) {
      alert("Could not add sale. Check backend.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // CALCULATIONS
  const revenue = sales.reduce(
    (a, s) => a + Number(s.total_amount || 0), 0
  );

  const orders = sales.length;

  const products = sales.reduce(
    (a, s) => a + Number(s.quantity || 0), 0
  );

  const average = orders ? revenue / orders : 0;

  const money = (n) =>
    `₹${Number(n || 0).toLocaleString("en-IN")}`;

  // PRODUCT DATA
  const productData = Object.values(
    sales.reduce((acc, s) => {
      const name = s.product_name || "Unknown";

      if (!acc[name]) {
        acc[name] = { name, quantity: 0 };
      }

      acc[name].quantity += Number(s.quantity || 0);
      return acc;
    }, {})
  );

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">S</div>
          <div>
            <h2>Smart Sales</h2>
            <span>Record Manager</span>
          </div>
        </div>

        <nav>

          <a
            className={page === "dashboard" ? "active" : ""}
            onClick={() => {
              setPage("dashboard");
              setShowForm(false);
            }}
          >
            📊 Dashboard
          </a>

          <a
            className={page === "sales" ? "active" : ""}
            onClick={() => {
              setPage("sales");
              setShowForm(false);
            }}
          >
            🧾 Sales Records
          </a>

          <a onClick={() => setShowForm(true)}>
            ➕ Add Sale
          </a>

          <a
            className={page === "analytics" ? "active" : ""}
            onClick={() => {
              setPage("analytics");
              setShowForm(false);
            }}
          >
            📈 Analytics
          </a>

          <a
            className={page === "prediction" ? "active" : ""}
            onClick={() => {
              setPage("prediction");
              setShowForm(false);
            }}
          >
            🔮 Prediction
          </a>

          <a
            className={page === "reports" ? "active" : ""}
            onClick={() => {
              setPage("reports");
              setShowForm(false);
            }}
          >
            📥 Reports
          </a>

        </nav>

        <div className="sidebar-bottom">
          <div className="cloud-status">
            <span className="status-dot"></span>
            Cloud Database
            <small>Connected</small>
          </div>
        </div>

      </aside>


      {/* MAIN */}
      <main className="main-content">

        {/* ADD SALE */}
        {showForm && (
          <section className="panel">

            <div className="panel-header">
              <div>
                <h3>Add New Sale</h3>
                <p>Enter sales details.</p>
              </div>

              <button
                className="view-btn"
                onClick={() => setShowForm(false)}
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={submit}>

              <div className="form-grid">

                <input
                  name="product_name"
                  placeholder="Product Name"
                  value={form.product_name}
                  onChange={change}
                  required
                />

                <input
                  name="category"
                  placeholder="Category"
                  value={form.category}
                  onChange={change}
                  required
                />

                <input
                  type="number"
                  name="quantity"
                  min="1"
                  placeholder="Quantity"
                  value={form.quantity}
                  onChange={change}
                  required
                />

                <input
                  type="number"
                  name="unit_price"
                  placeholder="Unit Price"
                  value={form.unit_price}
                  onChange={change}
                  required
                />

                <input
                  name="customer_name"
                  placeholder="Customer Name"
                  value={form.customer_name}
                  onChange={change}
                />

                <select
                  name="payment_method"
                  value={form.payment_method}
                  onChange={change}
                >
                  <option>UPI</option>
                  <option>Cash</option>
                  <option>Card</option>
                  <option>Net Banking</option>
                </select>

                <input
                  type="date"
                  name="sale_date"
                  value={form.sale_date}
                  onChange={change}
                  required
                />

              </div>

              <button
                className="primary-btn"
                disabled={loading}
              >
                {loading ? "Saving..." : "💾 Save Sale"}
              </button>

            </form>

          </section>
        )}


        {/* DASHBOARD */}
        {page === "dashboard" && !showForm && (
          <>
            <header className="topbar">
              <div>
                <h1>Sales Dashboard</h1>
                <p>Welcome to Smart Sales Record Manager.</p>
              </div>

              <button
                className="add-sale-btn"
                onClick={() => setShowForm(true)}
              >
                + Add New Sale
              </button>
            </header>

            <section className="stats-grid">

              <div className="stat-card">
                <div className="stat-icon revenue">₹</div>
                <div>
                  <p>Total Revenue</p>
                  <h2>{money(revenue)}</h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon orders">🧾</div>
                <div>
                  <p>Total Orders</p>
                  <h2>{orders}</h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon products">📦</div>
                <div>
                  <p>Products Sold</p>
                  <h2>{products}</h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon average">📊</div>
                <div>
                  <p>Average Order</p>
                  <h2>{money(average)}</h2>
                </div>
              </div>

            </section>

            <section className="panel recent-sales">

              <div className="panel-header">
                <h3>Recent Sales</h3>

                <button
                  className="view-btn"
                  onClick={() => setPage("sales")}
                >
                  View All
                </button>
              </div>

              {sales.length === 0 ? (
                <div className="empty-table">
                  <h3>No sales records yet</h3>
                  <button
                    className="primary-btn"
                    onClick={() => setShowForm(true)}
                  >
                    + Add Sale
                  </button>
                </div>
              ) : (
                sales.slice(-5).reverse().map((s) => (
                  <div className="sale-row" key={s.id}>
                    <strong>{s.product_name}</strong>
                    <span>{s.quantity} units</span>
                    <strong>{money(s.total_amount)}</strong>
                  </div>
                ))
              )}

            </section>
          </>
        )}


        {/* SALES */}
        {page === "sales" && !showForm && (
          <>
            <header className="topbar">
              <div>
                <h1>Sales Records</h1>
                <p>All your sales transactions.</p>
              </div>

              <button
                className="add-sale-btn"
                onClick={() => setShowForm(true)}
              >
                + Add New Sale
              </button>
            </header>

            <section className="panel">

              <h3>🧾 All Sales</h3>

              {sales.length === 0 ? (
                <p>No sales available.</p>
              ) : (
                sales.map((s) => (
                  <div className="sale-row" key={s.id}>
                    <div>
                      <strong>{s.product_name}</strong>
                      <small>{s.category}</small>
                    </div>

                    <span>
                      {s.quantity} × {money(s.unit_price)}
                    </span>

                    <strong>
                      {money(s.total_amount)}
                    </strong>
                  </div>
                ))
              )}

            </section>
          </>
        )}


        {/* ANALYTICS */}
        {page === "analytics" && !showForm && (
          <>
            <header className="topbar">
              <div>
                <h1>📈 Analytics</h1>
                <p>Analyze your sales performance.</p>
              </div>
            </header>

            <section className="stats-grid">

              <div className="stat-card">
                <div>
                  <p>Revenue</p>
                  <h2>{money(revenue)}</h2>
                </div>
              </div>

              <div className="stat-card">
                <div>
                  <p>Orders</p>
                  <h2>{orders}</h2>
                </div>
              </div>

              <div className="stat-card">
                <div>
                  <p>Units Sold</p>
                  <h2>{products}</h2>
                </div>
              </div>

            </section>

            <section className="panel">

              <h3>📊 Product Sales</h3>

              {productData.length === 0 ? (
                <p>Add sales to view the chart.</p>
              ) : (
                <ResponsiveContainer
                  width="100%"
                  height={350}
                >
                  <BarChart data={productData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="quantity"
                      name="Units Sold"
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}

            </section>
          </>
        )}


        {/* PREDICTION */}
        {page === "prediction" && !showForm && (
          <>
            <header className="topbar">
              <div>
                <h1>🔮 Sales Prediction</h1>
                <p>AI-powered revenue prediction.</p>
              </div>
            </header>

            <section className="panel">

              {prediction ? (
                <div className="empty-insight">

                  <div className="chart-icon">
                    🔮
                  </div>

                  <h2>
                    {money(
                      prediction.predicted_revenue
                    )}
                  </h2>

                  <p>
                    Predicted Next Month Revenue
                  </p>

                  <p>
                    Current Revenue:
                    {" "}
                    {money(
                      prediction.current_revenue
                    )}
                  </p>

                  <p>
                    Growth:
                    {" "}
                    {prediction.growth_percentage}%
                  </p>

                  <p>
                    🤖 {prediction.message}
                  </p>

                </div>
              ) : (
                <div className="empty-insight">
                  <h3>Loading prediction...</h3>
                </div>
              )}

            </section>
          </>
        )}


        {/* REPORTS */}
        {page === "reports" && !showForm && (
          <>
            <header className="topbar">
              <div>
                <h1>📥 Reports</h1>
                <p>Sales summary and transactions.</p>
              </div>

              <button
                className="primary-btn"
                onClick={() => window.print()}
              >
                Print / Save Report
              </button>
            </header>

            <section className="panel">

              <div className="stats-grid">

                <div className="stat-card">
                  <div>
                    <p>Total Revenue</p>
                    <h2>{money(revenue)}</h2>
                  </div>
                </div>

                <div className="stat-card">
                  <div>
                    <p>Total Orders</p>
                    <h2>{orders}</h2>
                  </div>
                </div>

                <div className="stat-card">
                  <div>
                    <p>Products Sold</p>
                    <h2>{products}</h2>
                  </div>
                </div>

              </div>

              <h3>Transaction Report</h3>

              {sales.map((s) => (
                <div className="sale-row" key={s.id}>
                  <strong>{s.product_name}</strong>
                  <span>{s.sale_date}</span>
                  <strong>
                    {money(s.total_amount)}
                  </strong>
                </div>
              ))}

            </section>
          </>
        )}

      </main>
    </div>
  );
}

export default App;