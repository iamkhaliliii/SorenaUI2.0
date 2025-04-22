export const siteConfig = {
  name: "Planner",
  url: "https://planner.tremor.so",
  description: "The simplest dashboard template.",
  baseLinks: {
    home: "/",
    quotes: {
      overview: "/quotes/overview",
      monitoring: "/quotes/monitoring",
      audits: "/quotes/audits",
    },
    inbox: {
      overview: "/inbox/overview",
      notifications: "/inbox/notifications",
      messages: "/inbox/messages",
    },
    sales: {
      orders: "/sales/orders",
      insights: "/sales/insights",
    },
    products: {
      items: "/products/items",
      variants: "/products/variants",
      suppliers: "/products/suppliers",
    },
  },
}

export type siteConfig = typeof siteConfig
