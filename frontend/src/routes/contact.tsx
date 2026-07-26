import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, MapPin, Clock, Shield, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://localhost:5050/api/v1"
    : "https://server-ashy-rho.vercel.app/api/v1");

export const Route = createFileRoute("/contact")({
  component: ContactDashboardPage
});

const faqs = [
  { q: "Can I pause my membership package?", a: "Yes, Pro and Elite plans support pausing memberships once a year for up to 30 days. Contact your coach or drop us a query." },
  { q: "Are personal lockers included in all plans?", a: "Starter, Pro, and Elite tiers include locker access. Free Trial members are allocated day-use lockers during workouts." },
  { q: "Do you offer corporate or team booking discounts?", a: "Yes, we offer custom fitness schemes for organizations. Review the Membership calculator tab for estimation or request a consultation." },
  { q: "Can I bring a friend to workouts?", a: "Elite members receive 2 guest passes per month. Free Trial users cannot bring guests during their initial 7-day period." }
];

function ContactDashboardPage() {
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (!res.ok) {
        const errorMsg = result.errors && result.errors.length > 0
          ? result.errors.map((e: any) => e.message).join(". ")
          : result.message || "Failed to submit message.";
        throw new Error(errorMsg);
      }

      toast.success("Message recorded successfully! We'll reply within 24 hours.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 space-y-16">
        {/* Title */}
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-neon font-bold">Contact</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-black">
            Get in <span className="neon-text">touch.</span>
          </h2>
          <p className="mt-3 text-white/60 text-sm md:text-base leading-relaxed">
            Have questions about biometric tracking, pricing, or custom athletic routines? Leave us a message below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Details & Info */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3">
                <Clock className="h-5 w-5 text-neon" />
                <h4 className="font-display font-bold text-white">Hours</h4>
                <div className="text-xs text-white/60 space-y-1">
                  <p>Mon - Sat: 5:00 AM - 12:00 AM</p>
                  <p>Sunday: 6:00 AM - 08:00 PM</p>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3">
                <MapPin className="h-5 w-5 text-neon" />
                <h4 className="font-display font-bold text-white">Central Club</h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  12th Main Rd, Indiranagar, Bengaluru, KA, 560038
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3">
                <Phone className="h-5 w-5 text-neon" />
                <h4 className="font-display font-bold text-white">Support Channels</h4>
                <div className="text-xs text-white/60 space-y-1">
                  <p>Phone: +91 80 4912 3421</p>
                  <p>Email: support@matrixfitness.com</p>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3">
                <Shield className="h-5 w-5 text-neon" />
                <h4 className="font-display font-bold text-white">Emergency Support</h4>
                <p className="text-xs text-white/60">
                  Duty Manager: ext 911 from lounge terminals.
                </p>
              </div>
            </div>

            {/* Accordion FAQs */}
            <div className="space-y-3">
              <h3 className="font-display text-xl font-bold">Frequently Asked Questions</h3>
              <div className="space-y-2">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="border border-white/5 rounded-xl bg-white/[0.01] overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex justify-between items-center px-4 py-3.5 text-xs font-bold text-left text-white/80 hover:text-white"
                      >
                        <span>{faq.q}</span>
                        <span className="text-neon">{isOpen ? "−" : "+"}</span>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-4 pb-4 text-xs text-white/50 leading-relaxed border-t border-white/[0.03] pt-2"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass rounded-3xl p-6.5 md:p-8 border border-white/5 space-y-5">
            <h3 className="font-display text-xl font-bold border-b border-white/5 pb-2">Drop Us A Message</h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase text-white/50 tracking-wider font-bold">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Rahul Sharma"
                  className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white placeholder:text-white/30 focus:border-neon focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-white/50 tracking-wider font-bold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="rahul@example.com"
                  className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white placeholder:text-white/30 focus:border-neon focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-white/50 tracking-wider font-bold">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="e.g. Corporate Rate Inquiry"
                  className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white placeholder:text-white/30 focus:border-neon focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-white/50 tracking-wider font-bold">Your Query</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Provide details about your query (minimum 10 characters)..."
                  className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white placeholder:text-white/30 focus:border-neon focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-neon py-3.5 font-black text-black uppercase tracking-wider text-xs md:text-sm hover:opacity-90 neon-glow-btn transition"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending Message...
                  </span>
                ) : (
                  "Submit Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
