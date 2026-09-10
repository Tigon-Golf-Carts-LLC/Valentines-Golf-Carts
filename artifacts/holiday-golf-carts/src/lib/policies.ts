export type PolicySection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  closingParagraphs?: string[];
};

export type Policy = {
  slug: string;
  title: string;
  description: string;
  sections: PolicySection[];
};

export const policies: Policy[] = [
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    description:
      "Terms governing use of the Valentines Golf Carts website and its nationwide golf cart event information.",
    sections: [
      {
        heading: "Website Use",
        paragraphs: [
          "By using this website, you agree to use it only for lawful purposes. Site content is provided for general information about the annual Valentine's Day Golf Cart Sales Event.",
          "We may update these terms and the website at any time. Continued use after an update constitutes acceptance of the revised terms.",
        ],
      },
      {
        heading: "Listings and Transactions",
        paragraphs: [
          "Inventory, prices, specifications, incentives, and availability may change without notice. A listing is not a binding offer or guarantee of availability.",
          "Vehicle purchases, financing, delivery, warranties, taxes, registration, and related services are governed by the documents provided by the participating dealer, lender, or service provider.",
        ],
      },
      {
        heading: "Intellectual Property and Liability",
        paragraphs: [
          "Website text, branding, graphics, and original materials may not be copied or republished without permission, except for personal, noncommercial use.",
          "To the fullest extent permitted by law, the website is provided as available without warranties regarding uninterrupted access or error-free content.",
        ],
      },
    ],
  },
  {
    slug: "sales-event-policy",
    title: "Valentines Golf Carts Sales Event Policy",
    description:
      "Terms for Valentines Golf Carts event eligibility, dealership participation, pricing, financing, vehicle availability, and customer transactions.",
    sections: [
      {
        heading: "Annual One-Day Sales Event",
        paragraphs: [
          "Valentines Golf Carts is an annual, nationwide, one-day sales event supported by participating independent golf cart dealerships.",
          "The event begins at 9:00 AM and ends at 5:00 PM local time on the officially announced event date. Unless expressly stated otherwise in writing by a participating dealer, all Valentine's Day offers expire at 5:00 PM local time on that date.",
          "The event date, participating dealerships, dealership hours, eligible vehicles, discounts, financing offers, and promotional terms may vary by location. Participation is voluntary, and not every dealership, vehicle, brand, model, or service will be included.",
        ],
      },
      {
        heading: "Participating Dealerships",
        paragraphs: [
          "Only dealerships specifically identified as participating locations are authorized to offer Valentines Golf Carts event promotions.",
          "Participating dealerships are independently owned or operated and are responsible for their own:",
        ],
        bullets: [
          "Inventory",
          "Pricing",
          "Advertising",
          "Financing arrangements",
          "Vehicle representations",
          "Customer transactions",
          "Taxes and fees",
          "Warranties",
          "Deliveries",
          "Returns and cancellations",
          "Compliance with federal, state, and local laws",
        ],
        closingParagraphs: [
          "Unless expressly identified as the selling dealer, Valentines Golf Carts is an event organizer and advertising platform. It is not the seller, creditor, lender, manufacturer, warrantor, or service provider for dealership transactions.",
        ],
      },
      {
        heading: "Event Eligibility",
        paragraphs: [
          "Event offers apply only to qualifying transactions initiated and completed during the published event hours, unless the participating dealer provides different written terms.",
          "A customer may be required to:",
        ],
        bullets: [
          "Be present at the participating dealership",
          "Present valid government-issued identification",
          "Complete and sign the required purchase documents",
          "Pay the required deposit or purchase amount",
          "Receive financing approval during the event period",
          "Mention the Valentine's Day promotion before the transaction is finalized",
          "Present an advertised coupon code or offer, if required",
        ],
        closingParagraphs: [
          "Submitting an inquiry, financing application, online form, reservation request, or deposit does not guarantee eligibility, financing approval, vehicle availability, or promotional pricing unless confirmed in writing by the selling dealer.",
        ],
      },
      {
        heading: "Vehicle Availability",
        paragraphs: [
          "All vehicles are subject to prior sale and are available only while supplies last. Inventory may be limited by location, vehicle type, brand, model, color, configuration, condition, or stock number.",
          "Vehicles displayed online or in advertising may be sold, reserved, transferred, unavailable, or located at another dealership. Online inventory systems may not reflect sales or availability in real time.",
          "Unless specifically offered by the participating dealer, there are no rain checks, substitutions, backorders, or guaranteed transfers. Special-order and factory-order vehicles may be excluded.",
          "Customers should confirm availability directly with the participating dealership before traveling.",
        ],
      },
      {
        heading: "Pricing and Required Charges",
        paragraphs: [
          "Participating dealerships establish their own prices. Prices and offers may vary by location.",
          "Where required by applicable law, an advertised price will include all charges that the dealership requires the customer to pay as a condition of purchasing the advertised vehicle. Advertised prices may exclude:",
        ],
        bullets: [
          "Sales tax",
          "Title and registration charges",
          "Government-imposed fees",
          "Optional accessories or equipment selected by the customer",
          "Optional protection products or service contracts",
          "Optional delivery or transportation services",
          "Financing charges and interest",
          "Other charges permitted to be excluded by applicable law",
        ],
        closingParagraphs: [
          "Any excluded charge will be disclosed by the participating dealer before the customer completes the purchase.",
          "Customers should request and review a written buyer’s order showing the vehicle price, discounts, taxes, fees, optional products, trade-in credit, financing terms, and total amount due before signing.",
        ],
      },
      {
        heading: "Advertised Discounts and Savings",
        paragraphs: [
          "Discounts apply only to specifically identified qualifying vehicles and transactions. Advertised savings may be based on the vehicle’s regular dealer price, manufacturer’s suggested retail price, or another clearly identified comparison price.",
          "A comparison to MSRP does not necessarily represent a price at which the vehicle was previously sold.",
          "Discounts have no cash value and cannot be redeemed for cash, transferred, applied retroactively, or used toward a prior purchase, existing contract, prior deposit, or completed transaction.",
          "Unless expressly stated otherwise, Valentine's Day offers cannot be combined with:",
        ],
        bullets: [
          "Other coupons",
          "Employee or dealership discounts",
          "Fleet or commercial pricing",
          "Manufacturer incentives",
          "Previous price negotiations",
          "Referral credits",
          "Trade-in bonuses",
          "Financing incentives",
          "Other promotional or special pricing",
        ],
        closingParagraphs: [
          "If multiple discounts could apply, the participating dealer may apply the single qualifying offer that provides the greatest eligible savings.",
        ],
      },
      {
        heading: "Deposits and Reservations",
        paragraphs: [
          "A deposit does not guarantee that a vehicle will be held unless the dealership provides written confirmation identifying the vehicle, deposit amount, reservation period, refund conditions, and agreed purchase terms.",
          "Deposit policies are established by each participating dealer. Deposits may be nonrefundable where disclosed in writing and permitted by applicable law.",
          "Customers should review all deposit and cancellation terms before making a payment.",
        ],
      },
      {
        heading: "Financing Offers",
        paragraphs: [
          "Financing is subject to a completed application, credit approval, lender underwriting, lender availability, and separate financing terms.",
          "Not every customer or vehicle will qualify. Available interest rates, annual percentage rates, loan terms, monthly payments, down-payment requirements, credit limits, fees, and eligibility requirements may vary based on:",
        ],
        bullets: [
          "Applicant creditworthiness",
          "Income and ability to repay",
          "Amount financed",
          "Vehicle age and condition",
          "Loan duration",
          "Participating lender",
          "State of residence",
          "Other lender requirements",
        ],
        closingParagraphs: [
          "Any advertised financing terms are available only to applicants who satisfy the applicable lender’s qualifications. Advertised monthly payments may require a specified down payment, approved credit tier, loan term, or financed amount.",
          "Valentines Golf Carts and participating dealerships do not guarantee financing approval. Customers should review the lender’s final disclosures and credit agreement before accepting financing.",
        ],
      },
      {
        heading: "Trade-Ins",
        paragraphs: [
          "Trade-in values are not guaranteed and are subject to inspection, verification of ownership, vehicle condition, mileage or hours, equipment, market demand, and dealership appraisal.",
          "Any estimated online or verbal trade-in value is preliminary. The final trade-in allowance must be confirmed in writing by the participating dealership.",
          "Customers must have legal authority to transfer the trade-in and must disclose any liens, damage, mechanical problems, title issues, or other material conditions.",
        ],
      },
      {
        heading: "New and Used Vehicle Condition",
        paragraphs: [
          "New, used, pre-owned, demo, rental, consignment, and refurbished vehicles may be included in the event. Vehicle condition and warranty coverage vary.",
          "Used vehicles may show normal wear and may be sold with limited warranty coverage or as-is where permitted by law. Customers are encouraged to inspect and test-drive a vehicle before purchasing it.",
          "Any warranty must be provided in a separate written warranty document. Oral statements do not modify written warranty terms or create additional coverage.",
          "Nothing in this policy limits any warranty, disclosure, or consumer protection right that cannot legally be waived.",
        ],
      },
      {
        heading: "Vehicle Specifications and Images",
        paragraphs: [
          "Vehicle photographs, videos, descriptions, colors, features, ranges, speeds, capacities, and specifications are provided for general informational purposes.",
          "Images may show optional accessories, upgraded equipment, previous model years, or vehicles not included in an advertised price. Actual vehicle colors and equipment may vary.",
          "Driving range, charging time, speed, payload, towing capacity, and performance may be affected by terrain, weather, battery condition, passenger weight, cargo, driving behavior, tire pressure, vehicle configuration, maintenance, and other conditions.",
          "Customers must confirm the exact year, make, model, condition, equipment, warranty, and specifications with the selling dealer before purchase.",
        ],
      },
      {
        heading: "Street-Legal Use and Vehicle Classification",
        paragraphs: [
          "Not every golf cart is street legal or eligible for registration. Golf cart, PTV, LSV, NEV, MSV, and other vehicle classifications vary by jurisdiction.",
          "The customer is responsible for confirming applicable licensing, registration, insurance, inspection, safety-equipment, driver-age, and operating requirements with the appropriate state and local authorities.",
          "No statement or advertisement should be interpreted as a guarantee that a vehicle may legally be operated on any particular public road.",
        ],
      },
      {
        heading: "Test Drives and Event Attendance",
        paragraphs: [
          "Test drives may require a valid driver’s license, proof of insurance, a signed waiver, and compliance with dealership safety rules. Dealerships may refuse or discontinue a test drive for safety, legal, insurance, or operational reasons.",
          "Customers and guests attend the event at their own risk and must follow posted dealership rules. Parents and guardians are responsible for supervising minors.",
        ],
      },
      {
        heading: "Returns, Exchanges, and Cancellations",
        paragraphs: [
          "Vehicle sales are generally final unless the selling dealer provides a written return, exchange, or cancellation policy or applicable law requires otherwise.",
          "There is not necessarily a federal or state cooling-off period for vehicle purchases made at a dealership. Customers should review all documents carefully before signing.",
          "Return, exchange, cancellation, and refund policies vary by dealership and must be confirmed in writing before purchase.",
        ],
      },
      {
        heading: "Errors and Corrections",
        paragraphs: [
          "Valentines Golf Carts and participating dealerships attempt to provide accurate information. However, typographical errors, pricing errors, incorrect photographs, technical problems, inventory delays, and inaccurate vehicle descriptions may occur.",
          "Errors may be corrected when discovered, subject to applicable law. A dealership is not required to complete a transaction based on an obvious pricing or listing error where permitted by law.",
          "If an error affects a transaction, the participating dealer will provide any remedy required by applicable law.",
        ],
      },
      {
        heading: "Changes, Suspension, or Cancellation",
        paragraphs: [
          "The event or an individual offer may be changed, suspended, or canceled because of inventory limitations, system failures, severe weather, emergencies, legal requirements, lender changes, manufacturer restrictions, dealership closure, or circumstances outside reasonable control.",
          "No change will affect a completed and signed transaction except as permitted by the purchase agreement or applicable law.",
        ],
      },
      {
        heading: "No Guarantee of Lowest Price",
        paragraphs: [
          "Participation in the event does not guarantee that an advertised vehicle represents the lowest available price in the market or that the same or a similar vehicle will not be offered at a different price before or after the event.",
          "Customers are responsible for evaluating whether a vehicle, price, financing arrangement, and promotion meet their needs.",
        ],
      },
      {
        heading: "Privacy and Communications",
        paragraphs: [
          "Information submitted through an event form, dealership website, financing application, telephone call, text message, or other communication may be shared with the selected participating dealership and service providers as described in the applicable privacy policy.",
          "Submitting an inquiry does not require a customer to purchase a vehicle. Marketing calls or text messages will be sent only as permitted by applicable law and any consent provided by the customer.",
          "Consent to receive marketing communications is not a condition of purchasing a vehicle or applying for financing unless expressly permitted by law.",
        ],
      },
      {
        heading: "Consumer Rights",
        paragraphs: [
          "These terms are intended to supplement, not replace, the purchase agreement, financing agreement, warranty, privacy policy, and other written documents provided by the participating dealership or lender.",
          "Nothing in this policy waives or limits any consumer right or remedy that cannot legally be waived or limited.",
          "If this policy conflicts with applicable law, the applicable law will control. If this policy conflicts with a signed purchase or financing agreement, the signed agreement will control to the extent permitted by law.",
        ],
      },
      {
        heading: "Contacting a Participating Dealer",
        paragraphs: [
          "Before making a purchase decision, customers should contact the participating dealership to confirm:",
        ],
        bullets: [
          "Event participation and hours",
          "Vehicle availability",
          "Final selling price",
          "Required and optional charges",
          "Discount eligibility",
          "Financing requirements",
          "Trade-in terms",
          "Warranty coverage",
          "Street-legal status",
          "Delivery availability",
          "Deposit and cancellation policies",
        ],
        closingParagraphs: [
          "By participating in the event or completing a qualifying purchase, the customer acknowledges that they have had an opportunity to review the applicable offer terms and transaction documents.",
        ],
      },
    ],
  },
  {
    slug: "return-policy",
    title: "Return Policy",
    description:
      "Important information about returns, cancellations, deposits, and dealer-specific golf cart purchase terms.",
    sections: [
      {
        heading: "Dealer-Specific Terms",
        paragraphs: [
          "Golf cart sales are completed through participating dealers. Return, exchange, cancellation, and deposit policies are established by the selling dealer and may vary by location, vehicle, and transaction.",
          "Before signing or paying, review the dealer’s written purchase documents and ask for clarification about whether a deposit is refundable and whether a return or exchange period applies.",
        ],
      },
      {
        heading: "Vehicle Condition and Delivery",
        paragraphs: [
          "Inspect the vehicle and confirm its condition, specifications, included accessories, warranty coverage, and delivery acceptance terms before completing the transaction.",
          "If you believe a delivered vehicle differs from your written agreement, contact the selling dealer promptly and retain your purchase and delivery documents.",
        ],
      },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description:
      "How Valentines Golf Carts handles contact information, website activity, and privacy choices.",
    sections: [
      {
        heading: "Information You Provide",
        paragraphs: [
          "When you contact us, we may receive information such as your name, email address, phone number, message, and vehicle interests. Do not submit sensitive financial information through a general contact form.",
          "Information submitted for financing on a lender’s website is governed by that lender’s privacy policy and security practices.",
        ],
      },
      {
        heading: "How Information Is Used",
        paragraphs: [
          "Contact information may be used to respond to inquiries, help locate inventory or participating dealers, provide requested event information, and maintain site security and operations.",
          "We do not represent that personal information is sold. Information may be shared with a participating dealer or service provider when needed to respond to a request or complete a service the visitor requested.",
        ],
      },
      {
        heading: "Choices and Contact",
        paragraphs: [
          "You may ask a question about your information by calling 1-844-456-2228 or emailing sales@valentinesgolfcarts.com. Legal rights may vary by jurisdiction.",
        ],
      },
    ],
  },
  {
    slug: "delivery-policy",
    title: "Delivery Policy",
    description:
      "How delivery availability, estimates, costs, inspection, and acceptance work for participating golf cart dealers.",
    sections: [
      {
        heading: "Delivery Arrangements",
        paragraphs: [
          "Delivery is arranged by the participating dealer or its delivery provider. Availability, service areas, pricing, scheduling, and transport methods vary by vehicle and destination.",
          "Any delivery date is an estimate unless the selling dealer expressly agrees otherwise in writing. Weather, distance, carrier availability, and other conditions may affect timing.",
        ],
      },
      {
        heading: "Before Delivery",
        paragraphs: [
          "Confirm the destination, access requirements, delivery fee, responsible party, insurance terms, and required recipient identification with the dealer before dispatch.",
        ],
      },
      {
        heading: "Inspection and Acceptance",
        paragraphs: [
          "Inspect the vehicle at delivery and note visible damage or discrepancies on the delivery documents before acceptance. Report concerns promptly to the selling dealer.",
        ],
      },
    ],
  },
  {
    slug: "publishing-policy",
    title: "Publishing Policy",
    description:
      "Standards used to publish accurate, useful Valentine's Day golf cart event and inventory information.",
    sections: [
      {
        heading: "Purpose and Standards",
        paragraphs: [
          "We publish event, inventory, brand, location, and financing information intended to help shoppers evaluate Valentine's Day golf cart opportunities.",
          "Content should be clear, relevant, factual, and distinguish general event information from dealer- or lender-specific terms.",
        ],
      },
      {
        heading: "Sources and Updates",
        paragraphs: [
          "Inventory information is supplied through participating business systems and may change as vehicles are sold or updated. Editorial content is reviewed for relevance and may be revised without notice.",
          "We do not knowingly publish fabricated testimonials, locations, pricing guarantees, or unsupported claims.",
        ],
      },
      {
        heading: "Commercial Context",
        paragraphs: [
          "This website promotes an annual sales event. Commercial relationships or calls to action do not change our commitment to describe offers and limitations accurately.",
        ],
      },
    ],
  },
  {
    slug: "feedback-policy",
    title: "Feedback Policy",
    description:
      "How visitors can submit feedback about the Valentines Golf Carts website, content, and event experience.",
    sections: [
      {
        heading: "Submitting Feedback",
        paragraphs: [
          "We welcome useful feedback about website accessibility, content clarity, inventory information, and the inquiry experience. Contact us at sales@valentinesgolfcarts.com or 1-844-456-2228.",
          "Include the relevant page, vehicle, location, or issue and enough detail for the team to understand the concern. Do not email payment card, banking, or government identification information.",
        ],
      },
      {
        heading: "Review Process",
        paragraphs: [
          "Feedback may be reviewed by the appropriate website, event, or dealer team. Submitting feedback does not guarantee publication, compensation, or a particular resolution.",
          "Vehicle sale or service disputes should also be directed to the dealer identified in the applicable transaction documents.",
        ],
      },
    ],
  },
  {
    slug: "corrections-policy",
    title: "Corrections Policy",
    description:
      "How Valentines Golf Carts reviews and corrects inaccurate website or event information.",
    sections: [
      {
        heading: "Reporting an Error",
        paragraphs: [
          "Send suspected errors to sales@valentinesgolfcarts.com with the page address, the information you believe is incorrect, and any supporting context.",
        ],
      },
      {
        heading: "Review and Correction",
        paragraphs: [
          "We review credible reports against available source information. Confirmed material errors are corrected as promptly as reasonably possible.",
          "Inventory, pricing, and availability can change frequently. A normal status change is not necessarily an editorial error, but we may refresh or remove stale information when identified.",
        ],
      },
      {
        heading: "Transparency",
        paragraphs: [
          "Minor spelling, formatting, and clarity edits may be made without a correction notice. Material changes may be explained on the affected page when context would help visitors.",
        ],
      },
    ],
  },
  {
    slug: "diversity-policy",
    title: "Diversity Policy",
    description:
      "Our commitment to respectful access and equal treatment across the nationwide Valentines Golf Carts event.",
    sections: [
      {
        heading: "Equal Respect",
        paragraphs: [
          "We aim to provide a respectful experience for visitors, customers, participating businesses, and team members across the United States.",
          "We do not support discrimination or harassment based on legally protected characteristics.",
        ],
      },
      {
        heading: "Access and Inclusion",
        paragraphs: [
          "We work to make public website content understandable and accessible and welcome feedback about barriers that may prevent someone from using the site.",
          "Participating dealers are responsible for their own employment practices, facilities, and customer interactions.",
        ],
      },
    ],
  },
  {
    slug: "ethics-policy",
    title: "Ethics Policy",
    description:
      "Ethical standards for Valentines Golf Carts content, customer communication, and event promotion.",
    sections: [
      {
        heading: "Honest Communication",
        paragraphs: [
          "We aim to communicate event details, pricing limitations, inventory status, and commercial relationships accurately and without deliberately misleading claims.",
        ],
      },
      {
        heading: "Conflicts and Conduct",
        paragraphs: [
          "Business interests should not override truthful presentation of material facts. Team members should avoid undisclosed conflicts that could improperly influence published information or customer support.",
          "We expect respectful, lawful conduct and do not tolerate bribery, fraud, harassment, or misuse of confidential information.",
        ],
      },
      {
        heading: "Reporting Concerns",
        paragraphs: [
          "Ethics concerns may be reported to sales@valentinesgolfcarts.com. Reports are reviewed based on the information available and directed to the appropriate responsible party.",
        ],
      },
    ],
  },
  {
    slug: "staffing-report",
    title: "Staffing Report",
    description:
      "A transparent overview of the teams responsible for the Valentines Golf Carts event website and customer support.",
    sections: [
      {
        heading: "Operating Model",
        paragraphs: [
          "Valentines Golf Carts is an annual sales event supporting nationwide discovery of inventory and participating dealerships.",
          "The event relies on customer-support personnel, participating dealer teams, technology providers, and independent financing or delivery providers.",
        ],
      },
      {
        heading: "Responsibilities",
        bullets: [
          "Event and customer-support teams respond to general inquiries during published business hours.",
          "Participating dealers manage vehicle-specific sales, pricing, documentation, delivery, and after-sale obligations.",
          "Lenders independently manage applications, approvals, disclosures, and financing terms.",
          "Website and content contributors maintain the digital experience and published information.",
        ],
        paragraphs: [],
      },
      {
        heading: "Reporting Scope",
        paragraphs: [
          "Because participation and seasonal staffing may change throughout the annual event, this page describes operational roles rather than publishing a fixed employee count.",
        ],
      },
    ],
  },
];

export const policiesBySlug = Object.fromEntries(
  policies.map((policy) => [policy.slug, policy]),
) as Record<string, Policy>;
