import { useEffect, useState } from 'react'
import './App.css'
import shipsureLogo from './assets/shipsure-logo.png'

const navItems = ['Overview', 'Orders', 'Routes', 'Drivers', 'POD Archive', 'Reports']
const API_BASE_URL = 'http://localhost:8080/api'

const mockDashboard = {
  kpis: [
  { label: 'Delivered today', value: '428', change: '+12.4%', tone: 'text-emerald-600' },
  { label: 'Pending PODs', value: '36', change: '-8 since 10:00', tone: 'text-amber-600' },
  { label: 'On-time rate', value: '94.8%', change: '+2.1%', tone: 'text-sky-600' },
  { label: 'Exceptions', value: '11', change: '3 critical', tone: 'text-rose-600' },
],
  orders: [
  {
    id: 'DO-78342',
    customer: 'Atlas Foods',
    route: 'PNH-N-04',
    driver: 'Dara C.',
    eta: '13:40',
    pod: 'Signed',
    status: 'Delivered',
  },
  {
    id: 'DO-78343',
    customer: 'Mira Retail',
    route: 'PNH-C-11',
    driver: 'Sophea S.',
    eta: '14:10',
    pod: 'Photo pending',
    status: 'In transit',
  },
  {
    id: 'DO-78344',
    customer: 'Northline Pharma',
    route: 'PNH-W-02',
    driver: 'Vannak P.',
    eta: '14:25',
    pod: 'Temperature logged',
    status: 'At stop',
  },
  {
    id: 'DO-78345',
    customer: 'Kumo Market',
    route: 'PNH-S-09',
    driver: 'Srey T.',
    eta: '15:05',
    pod: 'Damaged item',
    status: 'Exception',
  },
  {
    id: 'DO-78346',
    customer: 'Harbor Office',
    route: 'PNH-E-07',
    driver: 'Rotha R.',
    eta: '15:30',
    pod: 'Awaiting signature',
    status: 'In transit',
  },
],
  selectedOrder: {
  id: 'DO-78342',
  customer: 'Atlas Foods',
  address: '88 Monivong Blvd, Boeung Keng Kang, Phnom Penh',
  receiver: 'S. Sokha',
  signedAt: '13:32 Cambodia time',
  packages: '18 cartons',
  condition: 'Accepted in full',
  timeline: [
    { time: '09:12', title: 'Loaded at depot', detail: 'Dock 4 scan completed' },
    { time: '11:45', title: 'Arrived near site', detail: 'Driver checked in within geofence' },
    { time: '13:24', title: 'Delivery verified', detail: '18 cartons counted by receiver' },
    { time: '13:32', title: 'POD captured', detail: 'Signature and proof photo uploaded' },
  ],
},
}

const statusStyles = {
  Delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'In transit': 'bg-sky-50 text-sky-700 ring-sky-200',
  'At stop': 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  Exception: 'bg-rose-50 text-rose-700 ring-rose-200',
}

function App() {
  const [dashboard, setDashboard] = useState(mockDashboard)
  const [apiState, setApiState] = useState('Loading API')
  const [podState, setPodState] = useState('Ready')

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${API_BASE_URL}/dashboard`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Dashboard API request failed')
        }

        return response.json()
      })
      .then((data) => {
        setDashboard(data)
        setApiState('Spring Boot API')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setDashboard(mockDashboard)
          setApiState('Local mock data')
        }
      })

    return () => controller.abort()
  }, [])

  const { kpis, orders, selectedOrder } = dashboard

  function buildFallbackPod(order) {
    return {
      id: order.id,
      customer: order.customer,
      address: 'Mock delivery address, Phnom Penh',
      receiver: order.status === 'Delivered' ? 'S. Sokha' : 'Pending receiver',
      signedAt: order.status === 'Delivered' ? '13:32 Cambodia time' : order.status,
      packages: order.id === 'DO-78344' ? '6 cold-chain boxes' : '12 parcels',
      condition: order.pod,
      timeline: [
        { time: '09:10', title: 'Loaded at depot', detail: `${order.route} assigned to ${order.driver}` },
        { time: order.eta, title: order.status, detail: order.pod },
      ],
    }
  }

  function handleSelectOrder(order) {
    if (order.id === selectedOrder.id) {
      return
    }

    setPodState('Loading POD')

    fetch(`${API_BASE_URL}/orders/${order.id}/pod`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('POD detail request failed')
        }

        return response.json()
      })
      .then((podDetail) => {
        setDashboard((current) => ({ ...current, selectedOrder: podDetail }))
        setApiState('Spring Boot API')
        setPodState('Ready')
      })
      .catch(() => {
        setDashboard((current) => ({ ...current, selectedOrder: buildFallbackPod(order) }))
        setApiState('Local mock data')
        setPodState('POD loaded from fallback')
      })
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-slate-200 bg-white px-4 py-4 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r lg:px-5">
          <div className="flex items-center justify-between lg:block">
            <div className="flex items-center gap-3 lg:block">
              <img
                alt="ShipSure"
                className="h-9 w-auto object-contain lg:h-auto lg:w-24"
                src={shipsureLogo}
              />
              <div className="lg:mt-3">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-700">
                  POD Control
                </div>
                <h1 className="mt-1 text-2xl font-medium tracking-normal text-slate-950">ShipSure</h1>
              </div>
            </div>
            <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 lg:hidden">
              Menu
            </button>
          </div>

          <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            {navItems.map((item) => (
              <a
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-normal transition ${
                  item === 'Overview'
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`}
                href="#"
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="mt-6 hidden rounded-lg border border-slate-200 bg-slate-50 p-4 lg:block">
            <p className="text-sm font-medium text-slate-950">Fleet pulse</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Active drivers</span>
                <span className="font-medium text-slate-950">64</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-2 w-4/5 rounded-full bg-cyan-600" />
              </div>
              <div className="flex justify-between">
                <span>Vehicle capacity</span>
                <span className="font-medium text-slate-950">81%</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-1 p-4 sm:p-6 xl:p-8">
          <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-normal text-cyan-700">Live delivery operations</p>
              <h2 className="mt-1 text-3xl font-medium tracking-normal text-slate-950">
                Proof of delivery dashboard
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Data source: {apiState} - {podState}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                Export PODs
              </button>
              <button className="rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-cyan-900/10">
                Dispatch review
              </button>
            </div>
          </header>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi) => (
              <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" key={kpi.label}>
                <p className="text-sm font-normal text-slate-500">{kpi.label}</p>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <span className="text-3xl font-medium tracking-normal text-slate-950">{kpi.value}</span>
                  <span className={`text-sm font-medium ${kpi.tone}`}>{kpi.change}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
            <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-medium text-slate-950">Delivery orders</h3>
                  <p className="mt-1 text-sm text-slate-500">Today, Phnom Penh metro routes</p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-normal text-slate-700">
                    Filter
                  </button>
                  <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-normal text-slate-700">
                    Sort
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                    <tr>
                      <th className="px-5 py-4 font-medium">Order</th>
                      <th className="px-5 py-4 font-medium">Customer</th>
                      <th className="px-5 py-4 font-medium">Route</th>
                      <th className="px-5 py-4 font-medium">Driver</th>
                      <th className="px-5 py-4 font-medium">ETA</th>
                      <th className="px-5 py-4 font-medium">POD</th>
                      <th className="px-5 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {orders.map((order) => (
                      <tr
                        aria-selected={order.id === selectedOrder.id}
                        className={`cursor-pointer transition ${
                          order.id === selectedOrder.id
                            ? 'bg-cyan-50/80 ring-1 ring-inset ring-cyan-200'
                            : 'hover:bg-slate-50'
                        }`}
                        key={order.id}
                        onClick={() => handleSelectOrder(order)}
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            handleSelectOrder(order)
                          }
                        }}
                      >
                        <td className="px-5 py-4 font-medium text-slate-950">{order.id}</td>
                        <td className="px-5 py-4 text-slate-700">{order.customer}</td>
                        <td className="px-5 py-4 text-slate-600">{order.route}</td>
                        <td className="px-5 py-4 text-slate-600">{order.driver}</td>
                        <td className="px-5 py-4 text-slate-600">{order.eta}</td>
                        <td className="px-5 py-4 text-slate-600">{order.pod}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-normal text-cyan-700">{selectedOrder.id}</p>
                  <h3 className="mt-1 text-xl font-medium text-slate-950">{selectedOrder.customer}</h3>
                  <p className="mt-1 text-sm text-slate-500">{selectedOrder.address}</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                  Verified
                </span>
              </div>

              <div className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-slate-950">
                <div className="aspect-[4/3] bg-[linear-gradient(140deg,#e8f7ff_0%,#f8fafc_42%,#d6f5ea_100%)] p-4">
                  <div className="flex h-full flex-col justify-between rounded-md border border-white/70 bg-white/85 p-4 shadow-lg backdrop-blur">
                    <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Proof image</p>
                        <p className="mt-1 text-lg font-medium text-slate-950">Receiver signature</p>
                      </div>
                      <div className="rounded bg-slate-950 px-2 py-1 text-xs font-medium text-white">POD</div>
                    </div>
                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="flex justify-between">
                        <span>Receiver</span>
                        <span className="font-medium text-slate-950">{selectedOrder.receiver}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Packages</span>
                        <span className="font-medium text-slate-950">{selectedOrder.packages}</span>
                      </div>
                      <div className="h-12 rounded border border-dashed border-slate-300 bg-white px-3 py-2 font-serif text-2xl italic text-slate-700">
                        {selectedOrder.receiver}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md bg-slate-50 p-3">
                  <dt className="text-slate-500">Signed at</dt>
                  <dd className="mt-1 font-medium text-slate-950">{selectedOrder.signedAt}</dd>
                </div>
                <div className="rounded-md bg-slate-50 p-3">
                  <dt className="text-slate-500">Condition</dt>
                  <dd className="mt-1 font-medium text-slate-950">{selectedOrder.condition}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <h4 className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">
                  Delivery timeline
                </h4>
                <ol className="mt-4 space-y-4">
                  {selectedOrder.timeline.map((event, index) => (
                    <li className="grid grid-cols-[54px_1fr] gap-3" key={event.title}>
                      <time className="text-sm font-medium text-slate-500">{event.time}</time>
                      <div className="relative border-l border-slate-200 pl-4">
                        <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-cyan-600 ring-4 ring-cyan-50" />
                        <p className="font-medium text-slate-950">{event.title}</p>
                        <p className="mt-1 text-sm text-slate-500">{event.detail}</p>
                        {index === selectedOrder.timeline.length - 1 ? null : <div className="h-3" />}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
