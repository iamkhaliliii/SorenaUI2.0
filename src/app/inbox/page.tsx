import { redirect } from "next/navigation"
import { siteConfig } from "../siteConfig"

export default function InboxPage() {
    redirect(siteConfig.baseLinks.inbox.overview)
} 