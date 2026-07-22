

import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
// import OfficeLocation from "@/components/contact/OfficeLocation";
import FAQSection from "@/components/contact/FAQSection";
// import ContactCTA from "@/components/contact/ContactCTA";

export default function ContactPage() {
  return (
    <main className="overflow-hidden">

     

      {/* Contact Information */}
      <ContactInfo />

      {/* Contact Form */}
      <ContactForm />

      {/* Office Location + Google Map */}
      {/* <OfficeLocation /> */}

      {/* Frequently Asked Questions */}
      <FAQSection />

     

    </main>
  );
}

