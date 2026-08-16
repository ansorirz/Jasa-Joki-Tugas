import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Order,
  Client,
  ServiceItem,
  PortfolioItem,
  Testimonial,
  FAQItem,
  ContactMessage,
  NotificationItem,
  WebsiteSettings,
  OrderStatus,
  Gender,
  ServiceCategory,
  AdminTab
} from '../types';
import {
  initialOrders,
  initialClients,
  initialServices,
  initialPortfolio,
  initialTestimonials,
  initialFAQs,
  initialNotifications,
  initialWebsiteSettings
} from '../data/initialData';

interface AppContextType {
  // Navigation
  currentView: string;
  navigateTo: (view: string, param?: string) => void;
  activeSearchOrderId: string;
  setActiveSearchOrderId: (id: string) => void;
  adminActiveTab: AdminTab;
  setAdminActiveTab: (tab: AdminTab) => void;
  navigateToAdminTab: (tab?: AdminTab, orderId?: string) => void;

  // Modals
  orderModalOpen: boolean;
  setOrderModalOpen: (open: boolean) => void;
  selectedServiceForModal: ServiceCategory | null;
  openOrderModalWithService: (service?: ServiceCategory) => void;

  // Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (u: string, p: string) => boolean;
  logoutAdmin: () => void;
  updateAdminCredentials: (u: string, p: string) => void;

  // Data Collections
  orders: Order[];
  clients: Client[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  messages: ContactMessage[];
  notifications: NotificationItem[];
  settings: WebsiteSettings;

  // CRUD Actions
  createOrder: (data: {
    clientName: string;
    gender: Gender;
    university: string;
    phone: string;
    serviceCategory: ServiceCategory;
    deadline: string;
    brief: string;
  }) => Order;
  updateOrder: (id: string, updated: Partial<Order>) => void;
  deleteOrder: (id: string) => void;

  createClient: (client: Omit<Client, 'id'>) => void;
  updateClient: (id: string, updated: Partial<Client>) => void;
  deleteClient: (id: string) => void;

  createService: (srv: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  createPortfolio: (item: Omit<PortfolioItem, 'id'>) => void;
  updatePortfolio: (id: string, updated: Partial<PortfolioItem>) => void;
  deletePortfolio: (id: string) => void;

  createTestimonial: (item: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, updated: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  createFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  updateFAQ: (id: string, updated: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;

  sendMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => void;
  markMessageAsRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;
  resetAllDataToDefault: () => void;

  // Computed Live Stats
  liveStats: {
    totalClients: string;
    completedProjects: string;
    satisfactionRate: string;
    responseTime: string;
    totalOrders: number;
    activeOrders: number;
  };

  // Helpers
  generateWhatsAppLink: (phone: string, text: string) => string;
  getWhatsAppOrderMessage: (order: Order) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'jaskis_v1_';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeSearchOrderId, setActiveSearchOrderId] = useState<string>('');
  const [adminActiveTab, setAdminActiveTab] = useState<AdminTab>('overview');
  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceCategory | null>(null);

  // Helper to read from LocalStorage with fallback and deep merge
  const getInitialState = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + key);
      if (!saved) return fallback;
      const parsed = JSON.parse(saved);
      // If fallback is an object (like settings) and not an array, deep merge
      if (fallback && typeof fallback === 'object' && !Array.isArray(fallback)) {
        return { ...fallback, ...parsed };
      }
      return parsed ?? fallback;
    } catch (e) {
      console.warn(`Error reading ${key} from localStorage`, e);
      return fallback;
    }
  };

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() =>
    getInitialState('admin_auth', false)
  );

  const [orders, setOrders] = useState<Order[]>(() =>
    getInitialState('orders', initialOrders)
  );

  const [clients, setClients] = useState<Client[]>(() =>
    getInitialState('clients', initialClients)
  );

  const [services, setServices] = useState<ServiceItem[]>(() =>
    getInitialState('services', initialServices)
  );

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() =>
    getInitialState('portfolio', initialPortfolio)
  );

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() =>
    getInitialState('testimonials', initialTestimonials)
  );

  const [faqs, setFaqs] = useState<FAQItem[]>(() =>
    getInitialState('faqs', initialFAQs)
  );

  const [messages, setMessages] = useState<ContactMessage[]>(() =>
    getInitialState('messages', [])
  );

  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    getInitialState('notifications', initialNotifications)
  );

  const [settings, setSettings] = useState<WebsiteSettings>(() =>
    getInitialState('settings', initialWebsiteSettings)
  );

  // Sync across open browser tabs / windows in real-time
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.key || !e.newValue) return;
      try {
        if (e.key === LOCAL_STORAGE_KEY_PREFIX + 'orders') {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setOrders(parsed);
        } else if (e.key === LOCAL_STORAGE_KEY_PREFIX + 'settings') {
          const parsed = JSON.parse(e.newValue);
          setSettings(prev => ({ ...initialWebsiteSettings, ...prev, ...parsed }));
        } else if (e.key === LOCAL_STORAGE_KEY_PREFIX + 'services') {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setServices(parsed);
        } else if (e.key === LOCAL_STORAGE_KEY_PREFIX + 'portfolio') {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setPortfolio(parsed);
        } else if (e.key === LOCAL_STORAGE_KEY_PREFIX + 'testimonials') {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setTestimonials(parsed);
        } else if (e.key === LOCAL_STORAGE_KEY_PREFIX + 'faqs') {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setFaqs(parsed);
        } else if (e.key === LOCAL_STORAGE_KEY_PREFIX + 'clients') {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setClients(parsed);
        } else if (e.key === LOCAL_STORAGE_KEY_PREFIX + 'admin_auth') {
          const parsed = JSON.parse(e.newValue);
          setIsAdminLoggedIn(Boolean(parsed));
        }
      } catch (err) {
        console.warn('Error handling storage event update', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save to LocalStorage on state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'admin_auth', JSON.stringify(isAdminLoggedIn));
  }, [isAdminLoggedIn]);

  // Navigation controller
  const navigateTo = (view: string, param?: string) => {
    if (param && view === 'cek-pesanan') {
      setActiveSearchOrderId(param);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdminTab = (tab: AdminTab = 'orders', orderId?: string) => {
    setAdminActiveTab(tab);
    if (orderId) {
      setActiveSearchOrderId(orderId);
    }
    if (!isAdminLoggedIn) {
      setCurrentView('admin-login');
    } else {
      setCurrentView('admin-dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openOrderModalWithService = (serviceCategory?: ServiceCategory) => {
    if (serviceCategory) {
      setSelectedServiceForModal(serviceCategory);
    } else {
      setSelectedServiceForModal(null);
    }
    setOrderModalOpen(true);
  };

  // Auth controller
  const loginAdmin = (username: string, password: string): boolean => {
    if (username === settings.adminUsername && password === settings.adminPasswordHash) {
      setIsAdminLoggedIn(true);
      navigateTo('admin-dashboard');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    navigateTo('home');
  };

  const updateAdminCredentials = (username: string, password: string) => {
    setSettings(prev => ({
      ...prev,
      adminUsername: username,
      adminPasswordHash: password
    }));
  };

  // Helper mask name
  const maskName = (name: string): string => {
    const parts = name.trim().split(' ');
    return parts.map(p => {
      if (p.length <= 1) return p;
      return p[0] + '***';
    }).join(' ');
  };

  // Create Order Action
  const createOrder = (data: {
    clientName: string;
    gender: Gender;
    university: string;
    phone: string;
    serviceCategory: ServiceCategory;
    deadline: string;
    brief: string;
  }): Order => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newId = `JKS-2026-${randomNum}`;
    const todayStr = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    const masked = maskName(data.clientName);

    const newOrder: Order = {
      id: newId,
      clientName: data.clientName,
      maskedName: masked,
      university: data.university,
      gender: data.gender,
      phone: data.phone,
      serviceCategory: data.serviceCategory,
      orderDate: todayStr,
      deadline: data.deadline,
      status: 'Pesanan Diterima',
      progress: 10,
      totalPrice: 350000, // estimated base price
      paidAmount: 0,
      brief: data.brief,
      timeline: [
        { title: 'Pesanan diterima', timestamp: `${todayStr} ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`, completed: true, active: true },
        { title: 'Brief dikonfirmasi', timestamp: '-', completed: false },
        { title: 'Pembayaran dikonfirmasi', timestamp: '-', completed: false },
        { title: 'Sedang dikerjakan', timestamp: '-', completed: false },
        { title: 'Review', timestamp: '-', completed: false },
        { title: 'Selesai', timestamp: '-', completed: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);

    // Check client existence or create
    const existingClientIndex = clients.findIndex(c => c.phone === data.phone);
    if (existingClientIndex >= 0) {
      setClients(prev => {
        const copy = [...prev];
        copy[existingClientIndex] = {
          ...copy[existingClientIndex],
          name: data.clientName,
          maskedName: masked,
          gender: data.gender,
          university: data.university || copy[existingClientIndex].university,
          totalOrders: copy[existingClientIndex].totalOrders + 1
        };
        return copy;
      });
    } else {
      const newClient: Client = {
        id: `CLI-${Date.now().toString().slice(-4)}`,
        name: data.clientName,
        maskedName: masked,
        gender: data.gender,
        university: data.university,
        phone: data.phone,
        email: `${data.clientName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@student.ac.id`,
        totalOrders: 1,
        totalSpent: 0,
        registeredDate: todayStr
      };
      setClients(prev => [...prev, newClient]);
    }

    // Push real-time notification to admin
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: '⚡ Pesanan Baru Masuk!',
      message: `${masked} memesan ${data.serviceCategory} (#${newId})`,
      time: 'Baru saja',
      read: false,
      type: 'new_order',
      orderId: newId
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newOrder;
  };

  const updateOrder = (id: string, updated: Partial<Order>) => {
    setOrders(prev => {
      const updatedOrders = prev.map(ord => {
        if (ord.id === id) {
          const merged = { ...ord, ...updated };

          if (updated.clientName) {
            merged.maskedName = maskName(updated.clientName);
          }
          
          // Update timeline active indicators if status changed
          if (updated.status && updated.status !== ord.status) {
            const statusIndex = [
              'Pesanan Diterima',
              'Brief Dikonfirmasi',
              'Pembayaran Dikonfirmasi',
              'Sedang Dikerjakan',
              'Review',
              'Selesai'
            ].indexOf(updated.status);

            const nowStr = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

            merged.timeline = merged.timeline.map((step, idx) => ({
              ...step,
              completed: idx <= statusIndex,
              active: idx === statusIndex,
              timestamp: idx <= statusIndex && step.timestamp === '-' ? nowStr : step.timestamp
            }));

            // Auto push notification to system
            const statusNotif: NotificationItem = {
              id: `NOTIF-${Date.now()}`,
              title: 'Status Pesanan Diperbarui',
              message: `Pesanan ${ord.id} diubah ke ${updated.status} (${merged.progress}%)`,
              time: 'Baru saja',
              read: false,
              type: 'status_update',
              orderId: ord.id
            };
            setNotifications(n => [statusNotif, ...n]);
          }

          return merged;
        }
        return ord;
      });

      // Synchronize client totalSpent and info
      const targetOrder = updatedOrders.find(o => o.id === id);
      if (targetOrder) {
        setClients(currentClients =>
          currentClients.map(c => {
            if (c.phone === targetOrder.phone) {
              const clientOrders = updatedOrders.filter(o => o.phone === c.phone);
              const totalSpent = clientOrders.reduce((sum, o) => sum + (o.paidAmount || 0), 0);
              return {
                ...c,
                name: targetOrder.clientName || c.name,
                maskedName: targetOrder.maskedName || c.maskedName,
                gender: targetOrder.gender || c.gender,
                university: targetOrder.university || c.university,
                totalOrders: clientOrders.length,
                totalSpent
              };
            }
            return c;
          })
        );
      }

      return updatedOrders;
    });
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => {
      const orderToDelete = prev.find(o => o.id === id);
      const remainingOrders = prev.filter(o => o.id !== id);

      if (orderToDelete) {
        // Synchronize client order counts & spending
        setClients(currentClients =>
          currentClients.map(c => {
            if (c.phone === orderToDelete.phone) {
              const clientOrders = remainingOrders.filter(o => o.phone === c.phone);
              const totalSpent = clientOrders.reduce((sum, o) => sum + (o.paidAmount || 0), 0);
              return {
                ...c,
                totalOrders: clientOrders.length,
                totalSpent
              };
            }
            return c;
          })
        );
      }

      return remainingOrders;
    });
  };

  // Client CRUD with Order Synchronization
  const createClient = (client: Omit<Client, 'id'>) => {
    const newClient: Client = {
      ...client,
      id: `CLI-${Date.now().toString().slice(-4)}`,
      maskedName: maskName(client.name)
    };
    setClients(prev => [...prev, newClient]);
  };

  const updateClient = (id: string, updated: Partial<Client>) => {
    setClients(prev => {
      const target = prev.find(c => c.id === id);
      const oldPhone = target?.phone;

      const updatedList = prev.map(c => {
        if (c.id === id) {
          const merged = { ...c, ...updated };
          if (updated.name) {
            merged.maskedName = maskName(updated.name);
          }
          return merged;
        }
        return c;
      });

      // Synchronize client changes to related Orders
      if (target) {
        const phoneToMatch = oldPhone || target.phone;
        const newPhone = updated.phone || target.phone;
        const newName = updated.name || target.name;
        const newMasked = updated.name ? maskName(updated.name) : target.maskedName;
        const newUni = updated.university || target.university;
        const newGender = updated.gender || target.gender;

        setOrders(currOrders =>
          currOrders.map(ord => {
            if (ord.phone === phoneToMatch) {
              return {
                ...ord,
                clientName: newName,
                maskedName: newMasked,
                university: newUni,
                gender: newGender,
                phone: newPhone
              };
            }
            return ord;
          })
        );
      }

      return updatedList;
    });
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(c => c.id !== id));
  };

  // Service CRUD
  const createService = (srv: Omit<ServiceItem, 'id'>) => {
    const newSrv: ServiceItem = {
      ...srv,
      id: `SRV-${Date.now().toString().slice(-4)}`
    };
    setServices(prev => [...prev, newSrv]);
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Portfolio CRUD
  const createPortfolio = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: `PORT-${Date.now().toString().slice(-4)}`
    };
    setPortfolio(prev => [newItem, ...prev]);
  };

  const updatePortfolio = (id: string, updated: Partial<PortfolioItem>) => {
    setPortfolio(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deletePortfolio = (id: string) => {
    setPortfolio(prev => prev.filter(p => p.id !== id));
  };

  // Testimonial CRUD
  const createTestimonial = (item: Omit<Testimonial, 'id'>) => {
    const newItem: Testimonial = {
      ...item,
      id: `TEST-${Date.now().toString().slice(-4)}`,
      maskedName: item.maskedName || maskName(item.clientName)
    };
    setTestimonials(prev => [newItem, ...prev]);
  };

  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    setTestimonials(prev =>
      prev.map(t => {
        if (t.id === id) {
          const merged = { ...t, ...updated };
          if (updated.clientName && !updated.maskedName) {
            merged.maskedName = maskName(updated.clientName);
          }
          return merged;
        }
        return t;
      })
    );
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  // FAQ CRUD
  const createFAQ = (faq: Omit<FAQItem, 'id'>) => {
    const newFaq: FAQItem = {
      ...faq,
      id: `FAQ-${Date.now().toString().slice(-4)}`
    };
    setFaqs(prev => [...prev, newFaq]);
  };

  const updateFAQ = (id: string, updated: Partial<FAQItem>) => {
    setFaqs(prev => prev.map(f => (f.id === id ? { ...f, ...updated } : f)));
  };

  const deleteFAQ = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  // Contact Messages & Inbox
  const sendMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `MSG-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      read: false
    };
    setMessages(prev => [newMsg, ...prev]);

    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Pesan Baru Diterima',
      message: `Pesan dari ${msg.name} (${msg.service})`,
      time: 'Baru saja',
      read: false,
      type: 'message'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markMessageAsRead = (id: string) => {
    setMessages(prev => prev.map(m => (m.id === id ? { ...m, read: true } : m)));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetAllDataToDefault = () => {
    setOrders(initialOrders);
    setClients(initialClients);
    setServices(initialServices);
    setPortfolio(initialPortfolio);
    setTestimonials(initialTestimonials);
    setFaqs(initialFAQs);
    setNotifications(initialNotifications);
    setMessages([]);
    setSettings(initialWebsiteSettings);
    localStorage.clear();
  };

  // Dynamically Computed Live Stats
  const liveStats = {
    totalClients: clients.length > 0 ? `${clients.length * 12 + 480}+` : settings.statsActiveClients || '500+',
    completedProjects: orders.length > 0 ? `${orders.filter(o => o.status === 'Selesai').length * 25 + 680}+` : settings.statsCompletedCount || '700+',
    satisfactionRate: testimonials.length > 0
      ? `${Math.round((testimonials.reduce((acc, t) => acc + (t.rating || 5), 0) / (testimonials.length * 5)) * 100)}%`
      : settings.statsSatisfactionRate || '98%',
    responseTime: settings.statsResponseTime || '< 10 Mnt',
    totalOrders: orders.length,
    activeOrders: orders.filter(o => o.status !== 'Selesai').length
  };

  // WhatsApp Helpers
  const generateWhatsAppLink = (phone: string, text: string): string => {
    let cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.slice(1);
    }
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const getWhatsAppOrderMessage = (order: Order): string => {
    return `Halo Admin *JASKIS – Tim Jaskis*,
Saya ingin mengonfirmasi / menanyakan status pesanan saya:

📌 *ID Pesanan:* ${order.id}
👤 *Nama:* ${order.clientName}
🎓 *Kampus:* ${order.university || '-'}
📚 *Layanan:* ${order.serviceCategory}
📅 *Deadline:* ${order.deadline}
📊 *Status Saat Ini:* ${order.status} (${order.progress}%)

Mohon informasi selengkapnya. Terima kasih!`;
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        navigateTo,
        activeSearchOrderId,
        setActiveSearchOrderId,
        adminActiveTab,
        setAdminActiveTab,
        navigateToAdminTab,

        orderModalOpen,
        setOrderModalOpen,
        selectedServiceForModal,
        openOrderModalWithService,

        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        updateAdminCredentials,

        orders,
        clients,
        services,
        portfolio,
        testimonials,
        faqs,
        messages,
        notifications,
        settings,

        createOrder,
        updateOrder,
        deleteOrder,

        createClient,
        updateClient,
        deleteClient,

        createService,
        updateService,
        deleteService,

        createPortfolio,
        updatePortfolio,
        deletePortfolio,

        createTestimonial,
        updateTestimonial,
        deleteTestimonial,

        createFAQ,
        updateFAQ,
        deleteFAQ,

        sendMessage,
        markMessageAsRead,
        deleteMessage,
        markNotificationAsRead,
        deleteNotification,
        clearAllNotifications,
        updateSettings,
        resetAllDataToDefault,

        liveStats,

        generateWhatsAppLink,
        getWhatsAppOrderMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
