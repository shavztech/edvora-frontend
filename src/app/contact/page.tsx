

import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
// import OfficeLocation from "@/components/contact/OfficeLocation";
import FAQSection from "@/components/contact/FAQSection";
// import ContactCTA from "@/components/contact/ContactCTA";
import Reveal from "@/components/Reveal";


export default function ContactPage() {
  return (
    <main className="overflow-hidden px-1">

     <Reveal>

      {/* Contact Information */}
      <ContactInfo />
      </Reveal>
      <Reveal>
      {/* Contact Form */}
      <ContactForm />
      </Reveal>

      {/* Office Location + Google Map */}
      {/* <OfficeLocation /> */}

      {/* Frequently Asked Questions */}
      <Reveal>
      <FAQSection />
      </Reveal>

     

    </main>
  );
}

