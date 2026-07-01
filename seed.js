import mongoose from "mongoose"
import dotenv from "dotenv"
import Service from "./models/Service.model.js"
dotenv.config()
const seedServices = [
    {
        service_name: "Living Room Styling",
        cost: 4500,
        unit: "per room",
        service_category: "home",
        description: "Modern living room styling with curated furniture, lighting, and wall décor.",
        image: "https://plus.unsplash.com/premium_photo-1706140675031-1e0548986ad1?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2aW5nJTIwcm9vbSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://plus.unsplash.com/premium_photo-1706140675031-1e0548986ad1?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2aW5nJTIwcm9vbSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D", // 1st (cover) image
            "https://images.unsplash.com/photo-1631679706909-1844bbd07221?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1632119580908-ae947d4c7691?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hbGwlMjBsaXZpbmclMjByb29tfGVufDB8fDB8fHww", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1705321963943-de94bb3f0dd3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9kZXJuJTIwbGl2aW5ncm9vbXxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Bedroom Theme Makeover",
        cost: 6000,
        unit: "per room",
        service_category: "home",
        description: "Cozy bedroom redesign with theme-based colors, fabrics and lighting.",
        image: "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlZHJvb218ZW58MHx8MHx8fDA%3D",
        images: [
            "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlZHJvb218ZW58MHx8MHx8fDA%3D", // 1st (cover) image
            "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1696762932825-2737db830bbe?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9kZXJuJTIwYmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Kids Room Decoration",
        cost: 5500,
        unit: "per room",
        service_category: "home",
        description: "Fun and safe kids room décor with custom themes and wall art.",
        image: "https://images.unsplash.com/photo-1763478958800-3a2a6321f645?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGQlMjBiZWRyb29tfGVufDB8fDB8fHww",
        images: [
            "https://images.unsplash.com/photo-1763478958800-3a2a6321f645?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGQlMjBiZWRyb29tfGVufDB8fDB8fHww", // 1st (cover) image
            "https://images.unsplash.com/photo-1721395288477-b546804ce392?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGtpZHMlMjByb29tfGVufDB8fDB8fHww", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1505692795793-20f543407193?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lkcyUyMGJlZHJvb218ZW58MHx8MHx8fDA%3D", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1693034433366-57fbb0286641?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGtpZHMlMjByb29tfGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Kitchen & Dining Styling",
        cost: 7000,
        unit: "per area",
        service_category: "home",
        description: "Functional and stylish kitchen-dining décor with storage and lighting upgrades.",
        image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2l0Y2hlbiUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2l0Y2hlbiUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D", // 1st (cover) image
            "https://images.unsplash.com/photo-1676088933950-bae87cf34fee?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b3BlbiUyMGtpdGNoZW58ZW58MHx8MHx8fDA%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://plus.unsplash.com/premium_photo-1661962752158-f7b15d5ec42b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmVhdXRpZnVsJTIwa2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1646678187010-664fb00512b9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Balcony & Terrace Décor",
        cost: 3800,
        unit: "per area",
        service_category: "home",
        description: "Convert your balcony or terrace into a cozy outdoor retreat.",
        image: "https://images.unsplash.com/photo-1746553618662-2965b5a4ef8d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFsY29ueSUyMHBsYW50c3xlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://images.unsplash.com/photo-1746553618662-2965b5a4ef8d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFsY29ueSUyMHBsYW50c3xlbnwwfHwwfHx8MA%3D%3D", // 1st (cover) image
            "https://images.unsplash.com/photo-1613685302957-3a6fc45346ef?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b3V0ZG9vciUyMHBhdGlvfGVufDB8fDB8fHww", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1616593969747-4797dc75033e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFsa29ufGVufDB8fDB8fHww", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1524549207884-e7d1130ae2f3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFsa29ufGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Home Festive Decoration",
        cost: 9000,
        unit: "per home",
        service_category: "home",
        description: "Complete festive home décor with lights, florals and thematic props.",
        image: "https://images.unsplash.com/photo-1664289342468-fa99588e60b8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hyaXN0bWFzJTIwaG91c2V8ZW58MHx8MHx8fDA%3D",
        images: [
            "https://images.unsplash.com/photo-1664289342468-fa99588e60b8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hyaXN0bWFzJTIwaG91c2V8ZW58MHx8MHx8fDA%3D", // 1st (cover) image
            "https://images.unsplash.com/photo-1482638591678-a11589a805f2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hyaXN0bWFzJTIwYXQlMjBob21lfGVufDB8fDB8fHww", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1616486788371-62d930495c44?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hyaXN0bWFzJTIwYXQlMjBob21lfGVufDB8fDB8fHww", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1529973625058-a665431328fb?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hyaXN0bWFzJTIwaG91c2V8ZW58MHx8MHx8fDA%3D", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Engagement Ceremony Setup",
        cost: 20000,
        unit: "per event",
        service_category: "wedding",
        description: "Romantic engagement stage, entry gate and seating décor.",
        image: "https://images.unsplash.com/photo-1625076932159-61a032e2b7ad?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdlZGRpbmclMjBzZXR1cHxlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://images.unsplash.com/photo-1625076932159-61a032e2b7ad?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdlZGRpbmclMjBzZXR1cHxlbnwwfHwwfHx8MA%3D%3D", // 1st (cover) image
            "https://images.unsplash.com/photo-1712068534065-f56c36e21759?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VkZGluZyUyMG91dGRvb3J8ZW58MHx8MHx8fDA%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZyUyMHNldHVwfGVufDB8fDB8fHww", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1632316962873-47ee3d309f02?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2VkZGluZyUyMHNldHVwfGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Mehndi & Haldi Décor",
        cost: 16000,
        unit: "per event",
        service_category: "wedding",
        description: "Colorful mehndi/haldi setups with traditional backdrops and seating.",
        image: "https://images.unsplash.com/photo-1744891471118-f74c0453cd21?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2VkZGluZyUyMG1hbmRhcHxlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://images.unsplash.com/photo-1744891471118-f74c0453cd21?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2VkZGluZyUyMG1hbmRhcHxlbnwwfHwwfHx8MA%3D%3D", // 1st (cover) image
            "https://images.unsplash.com/photo-1556536088-f010a312a8d3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1laGVuZGl8ZW58MHx8MHx8fDA%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1730003873829-09b4b16444c1?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVoZW5kaSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1738849760236-541fcdd3931d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1laGVuZGl8ZW58MHx8MHx8fDA%3D", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Sangeet Night Decoration",
        cost: 22000,
        unit: "per event",
        service_category: "wedding",
        description: "Vibrant stage, dance floor and lighting décor for sangeet nights.",
        image: "https://images.unsplash.com/photo-1736155983520-a0f7d5949d39?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5kaWFuJTIwd2VkZGluZyUyMGRlY29yfGVufDB8fDB8fHww",
        images: [
            "https://images.unsplash.com/photo-1736155983520-a0f7d5949d39?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5kaWFuJTIwd2VkZGluZyUyMGRlY29yfGVufDB8fDB8fHww", // 1st (cover) image
            "https://images.unsplash.com/photo-1744805624954-a6686543c3ff?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kaWFuJTIwd2VkZGluZyUyMGRlY29yfGVufDB8fDB8fHww", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1714004941173-0054629146c2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdlZGRpbmclMjBzdGFnZXxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1745573673583-a51f665ae48e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2VkZGluZyUyMHN0YWdlfGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Destination Wedding Décor",
        cost: 75000,
        unit: "per event",
        service_category: "wedding",
        description: "End‑to‑end destination wedding decoration with custom themes.",
        image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzdGluYXRpb24lMjB3ZWRkaW5nfGVufDB8fDB8fHww",
        images: [
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzdGluYXRpb24lMjB3ZWRkaW5nfGVufDB8fDB8fHww", // 1st (cover) image
            "https://images.unsplash.com/photo-1543359905-c5d15c3a23dd?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJvcGljYWwlMjB3ZWRkaW5nfGVufDB8fDB8fHww", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1750735465200-842e40143e1a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJvcGljYWwlMjB3ZWRkaW5nfGVufDB8fDB8fHww", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1515232389446-a17ce9ca7434?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGVzdGluYXRpb24lMjB3ZWRkaW5nfGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Wedding Photo Booth Setup",
        cost: 8000,
        unit: "per event",
        service_category: "wedding",
        description: "Creative wedding photo booth with props and designer backdrops.",
        image: "https://images.unsplash.com/photo-1515715709530-858f7bfa1b10?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VkZGluZyUyMHNldHVwfGVufDB8fDB8fHww",
        images: [
            "https://images.unsplash.com/photo-1515715709530-858f7bfa1b10?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VkZGluZyUyMHNldHVwfGVufDB8fDB8fHww", // 1st (cover) image
            "https://images.unsplash.com/photo-1724855946379-451f59d45df6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlZGRpbmclMjBkZXNpZ258ZW58MHx8MHx8fDA%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1696021922703-022b8c280fb1?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlZGRpbmclMjBzZXR1cHxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1505944357431-27579db47558?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2VkZGluZyUyMHNldHVwfGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Mandap & Stage Floral Décor",
        cost: 30000,
        unit: "per event",
        service_category: "wedding",
        description: "Premium floral mandap and stage decoration for traditional ceremonies.",
        image: "https://images.unsplash.com/photo-1772127822552-ce9ef537bdcf?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2VkZGluZyUyMG1hbmRhcHxlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://images.unsplash.com/photo-1772127822552-ce9ef537bdcf?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2VkZGluZyUyMG1hbmRhcHxlbnwwfHwwfHx8MA%3D%3D", // 1st (cover) image
            "https://images.unsplash.com/photo-1745573674206-1d4805fcc427?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8fA%3D%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1591203281954-23fa2ff8ef18?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2VkZGluZyUyMHN0YWdlfGVufDB8fDB8fHww", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1712068534065-f56c36e21759?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2VkZGluZyUyMGRlY29yYXRpb25zfGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Corporate Event Backdrop Design",
        cost: 10000,
        unit: "per event",
        service_category: "seminar",
        description: "Custom printed and floral backdrops for seminars and launches.",
        image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZXZlbnQlMjBidXNpbmVzc3xlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://images.unsplash.com/photo-1515169067868-5387ec356754?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZXZlbnQlMjBidXNpbmVzc3xlbnwwfHwwfHx8MA%3D%3D", // 1st (cover) image
            "https://images.unsplash.com/photo-1561489396-888724a1543d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXZlbnQlMjBtYW5hZ2VtZW50fGVufDB8fDB8fHww", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnQlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1511578314322-379afb476865?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29tcGFueSUyMGV2ZW50fGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Conference Stage & Podium Setup",
        cost: 14000,
        unit: "per event",
        service_category: "seminar",
        description: "Professional conference stage, podium, and banner decoration.",
        image: "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29uZmVyZW5jZSUyMHN0YWdlfGVufDB8fDB8fHww",
        images: [
            "https://images.unsplash.com/photo-1596522354195-e84ae3c98731?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29uZmVyZW5jZSUyMHN0YWdlfGVufDB8fDB8fHww", // 1st (cover) image
            "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlydHVhbCUyMGNvbmZlcmVuY2V8ZW58MHx8MHx8fDA%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1582192730841-2a682d7375f9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uZmVyZW5jZSUyMHN0YWdlfGVufDB8fDB8fHww", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29uZmVyZW5jZSUyMHN0YWdlfGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Product Launch Event Décor",
        cost: 18000,
        unit: "per event",
        service_category: "seminar",
        description: "Brand‑focused decoration for product launches and press meets.",
        image: "https://images.unsplash.com/photo-1766270122947-519fa0413875?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3QlMjBsYXVuY2h8ZW58MHx8MHx8fDA%3D",
        images: [
            "https://images.unsplash.com/photo-1766270122947-519fa0413875?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3QlMjBsYXVuY2h8ZW58MHx8MHx8fDA%3D", // 1st (cover) image
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGF1bmNoJTIwZXZlbnR8ZW58MHx8MHx8fDA%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1531058020387-3be344556be6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGF1bmNoJTIwZXZlbnR8ZW58MHx8MHx8fDA%3D", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1561489401-fc2876ced162?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdCUyMGxhdW5jaCUyMGV2ZW50fGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Corporate Office Entrance Styling",
        cost: 5000,
        unit: "per area",
        service_category: "office",
        description: "Elegant office reception and entrance decoration for strong first impressions.",
        image: "https://plus.unsplash.com/premium_photo-1676320103087-4aec0a09088f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8b2ZmaWNlJTIwZW50cmFuY2V8ZW58MHx8MHx8fDA%3D",
        images: [
            "https://plus.unsplash.com/premium_photo-1676320103087-4aec0a09088f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8b2ZmaWNlJTIwZW50cmFuY2V8ZW58MHx8MHx8fDA%3D", // 1st (cover) image
            "https://images.unsplash.com/photo-1505410603994-c3ac6269711f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b2ZmaWNlJTIwZW50cmFuY2V8ZW58MHx8MHx8fDA%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1566890463705-46b4fefa8a53?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW50cmFuY2UlMjBoYWxsfGVufDB8fDB8fHww", // TODO: replace with a 3rd unique Unsplash link
            "https://plus.unsplash.com/premium_photo-1676823570572-db8c83487ed5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVpbGRpbmclMjBlbnRyYW5jZXxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Coworking Space Decoration",
        cost: 9000,
        unit: "per floor",
        service_category: "office",
        description: "Modern coworking décor with zones for focus, collaboration and relaxation.",
        image: "https://plus.unsplash.com/premium_photo-1684769161054-2fa9a998dcb6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y293b3JraW5nfGVufDB8fDB8fHww",
        images: [
            "https://plus.unsplash.com/premium_photo-1684769161054-2fa9a998dcb6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y293b3JraW5nfGVufDB8fDB8fHww", // 1st (cover) image
            "https://images.unsplash.com/photo-1716703373229-b0e43de7dd5c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sb3JmdWwlMjBvZmZpY2V8ZW58MHx8MHx8fDA%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y293b3JraW5nfGVufDB8fDB8fHww", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1604328727766-a151d1045ab4?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvd29ya2luZyUyMHNwYWNlfGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Office Festive & Event Décor",
        cost: 11000,
        unit: "per event",
        service_category: "office",
        description: "Themed office decorations for festivals, annual days and celebrations.",
        image: "https://plus.unsplash.com/premium_photo-1664476746446-73dcb97ff366?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b2ZmaWNlJTIwcGFydHl8ZW58MHx8MHx8fDA%3D",
        images: [
            "https://plus.unsplash.com/premium_photo-1664476746446-73dcb97ff366?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b2ZmaWNlJTIwcGFydHl8ZW58MHx8MHx8fDA%3D", // 1st (cover) image
            "https://plus.unsplash.com/premium_photo-1764702393686-4f4d4c2b3dc9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnQlMjBkZWNvcnxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG9mZmljZSUyMHBhcnR5fGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Kids Birthday Theme Party",
        cost: 5000,
        unit: "per event",
        service_category: "birthday",
        description: "Cartoon and superhero themed décor for kids birthday parties.",
        image: "https://images.unsplash.com/photo-1562967005-a3c85514d3e9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFieSUyMHBhcnR5fGVufDB8fDB8fHww",
        images: [
            "https://images.unsplash.com/photo-1562967005-a3c85514d3e9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFieSUyMHBhcnR5fGVufDB8fDB8fHww", // 1st (cover) image
            "https://images.unsplash.com/photo-1741969494307-55394e3e4071?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGtpZHMlMjBiaXJ0aGRheXxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1769038932067-6183daa327ad?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRoZW1lJTIwcGFydHl8ZW58MHx8MHx8fDA%3D", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1688632107202-7902806ff3d4?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2lkJTIwcGFydHl8ZW58MHx8MHx8fDA%3D", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Milestone Birthday Celebration Décor",
        cost: 7000,
        unit: "per event",
        service_category: "birthday",
        description: "Elegant décor for 18th, 25th, 40th and 50th birthday events.",
        image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80",
        images: [
            "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80", // assorted colorful balloons close-up
            "https://images.unsplash.com/photo-1741969494307-55394e3e4071?w=500&q=80", // festive birthday celebration with balloons
            "https://images.unsplash.com/photo-1604668915840-580c30026e5f?w=500&q=80", // yellow & white balloons styled on table
            "https://images.unsplash.com/photo-1689601535474-195d10eca664?w=500&q=80", // happy birthday balloon banner
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Surprise Room Decoration",
        cost: 3000,
        unit: "per room",
        service_category: "birthday",
        description: "Balloon and flower based surprise room setup for special occasions.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80",
        images: [
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80", // 1st (cover) image
            "https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJvb20lMjBkZWNvcmF0aW9ufGVufDB8fDB8fHww", // TODO: replace with a 2nd unique Unsplash link
            "https://plus.unsplash.com/premium_photo-1661963239507-7bdf41a5e66b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cm9vbSUyMGRlY29yYXRpb258ZW58MHx8MHx8fDA%3D", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1611019996937-eff60265f4e6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRlY29yYXRpb24lMjBob21lfGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Festival Home Lighting Setup",
        cost: 6000,
        unit: "per home",
        service_category: "festival",
        description: "Outdoor and indoor decorative lighting for Diwali, Christmas and Eid.",
        image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFydHklMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFydHklMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D", // 1st (cover) image
            "https://plus.unsplash.com/premium_photo-1738016970456-66c0485ccff2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGFuZHNjYXBlJTIwbGlnaHRpbmd8ZW58MHx8MHx8fDA%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1630381962685-b2c8dbe97ca2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmVzdG9vbiUyMGxpZ2h0c3xlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1508519829430-40f7d3d161b4?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlnaHQlMjBmZXN0aXZhbHxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Religious Function Stage Décor",
        cost: 15000,
        unit: "per event",
        service_category: "festival",
        description: "Stage decoration for puja, kirtan, and other religious gatherings.",
        image: "https://images.unsplash.com/photo-1708606811579-23b18fc48007?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGluZGlhbiUyMHdlZGRpbmclMjBzdGFnZXxlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://images.unsplash.com/photo-1708606811579-23b18fc48007?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGluZGlhbiUyMHdlZGRpbmclMjBzdGFnZXxlbnwwfHwwfHx8MA%3D%3D", // 1st (cover) image
            "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZyUyMHN0YWdlfGVufDB8fDB8fHww", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1745573673043-43a4f3b91466?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdlZGRpbmclMjBzdGFnZXxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwd2VkZGluZyUyMHZlbnVlfGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Exhibition Stall Design & Décor",
        cost: 20000,
        unit: "per stall",
        service_category: "exhibition",
        description: "Customized exhibition stall layout, branding and decoration.",
        image: "https://images.unsplash.com/photo-1621685743771-fd5e13734ae6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RXhoaWJpdGlvbiUyMFN0YW5kc3xlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://images.unsplash.com/photo-1621685743771-fd5e13734ae6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RXhoaWJpdGlvbiUyMFN0YW5kc3xlbnwwfHwwfHx8MA%3D%3D", // 1st (cover) image
            "https://images.unsplash.com/photo-1711390811443-ae5a33144f7d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RXhoaWJpdGlvbiUyMFN0YW5kc3xlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://plus.unsplash.com/premium_photo-1706432893245-879578bdee4d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXhoaWJpdGlvbiUyMHN0YW5kfGVufDB8fDB8fHww", // TODO: replace with a 3rd unique Unsplash link
            "https://plus.unsplash.com/premium_photo-1758653024876-bc3f2b4b9601?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGV4aGliaXRpb24lMjBzdGFuZHxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Home Interior Decoration",
        cost: 5000,
        unit: "per room",
        service_category: "home",
        description: "Transform your living spaces with our expert interior decoration services tailored to your personal style and budget.",
        image: "https://plus.unsplash.com/premium_photo-1670360414483-64e6d9ba9038?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
        images: [
            "https://plus.unsplash.com/premium_photo-1670360414483-64e6d9ba9038?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D", // 1st (cover) image
            "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBpbnRlcmlvcnN8ZW58MHx8MHx8fDA%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1618219944342-824e40a13285?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGludGVyaW9yJTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhZGl0aW9uYWwlMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Wedding Ceremony Setup",
        cost: 25000,
        unit: "per event",
        service_category: "wedding",
        description: "Make your special day unforgettable with breathtaking floral arrangements and full venue decoration.",
        image: "https://images.unsplash.com/photo-1625038032515-308ab14d10b9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2VkZGluZyUyMGxvY2F0aW9ufGVufDB8fDB8fHww",
        images: [
            "https://images.unsplash.com/photo-1625038032515-308ab14d10b9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2VkZGluZyUyMGxvY2F0aW9ufGVufDB8fDB8fHww", // 1st (cover) image
            "https://images.unsplash.com/photo-1727425383452-2be55354f06e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2VkZGluZyUyMHZlbnVlc3xlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1680695779444-24fc71296e66?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2VkZGluZyUyMGxvY2F0aW9ufGVufDB8fDB8fHww", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1665607437981-973dcd6a22bb?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2VkZGluZyUyMGxvY2F0aW9ufGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Office Space Decoration",
        cost: 8000,
        unit: "per floor",
        service_category: "office",
        description: "Create an inspiring and productive work environment with our professional office decoration packages.",
        image: "https://images.unsplash.com/photo-1706074793638-da28b90ea8ae?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlJTIwZGVjb3JhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://images.unsplash.com/photo-1706074793638-da28b90ea8ae?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlJTIwZGVjb3JhdGlvbnxlbnwwfHwwfHx8MA%3D%3D", // 1st (cover) image
            "https://images.unsplash.com/photo-1700809888987-cf2b29ecbd2c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b2ZmaWNlJTIwZGVjb3JhdGlvbnxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://plus.unsplash.com/premium_photo-1661963791627-19a088477141?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8b2ZmaWNlJTIwZGVjb3JhdGlvbnxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG9mZmljZSUyMHJvb218ZW58MHx8MHx8fDA%3D", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Seminar Hall Decoration",
        cost: 12000,
        unit: "per event",
        service_category: "seminar",
        description: "Impress your guests with stunning stage setups and hall decorations for any corporate seminar or event.",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXZlbnQlMjBoYWxsfGVufDB8fDB8fHww",
        images: [
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXZlbnQlMjBoYWxsfGVufDB8fDB8fHww", // 1st (cover) image
                        "https://images.unsplash.com/photo-1769667693426-6ce4b8732060?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnQlMjByb29tfGVufDB8fDB8fHww", // 1st (cover) image
            "https://images.unsplash.com/photo-1778086170602-f40da010e5fb?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGV2ZW50JTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1679205691826-9157415559c2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnQlMjByb29tfGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Birthday Party Setup",
        cost: 3500, unit: "per event",
        service_category: "birthday",
        description: "Celebrate in style with vibrant themed birthday decorations that bring joy and energy to every moment.",
        image: "https://plus.unsplash.com/premium_photo-1692880429643-c0f3c9489046?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlydGhkYXklMjB0YWJsZXxlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://plus.unsplash.com/premium_photo-1692880429643-c0f3c9489046?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlydGhkYXklMjB0YWJsZXxlbnwwfHwwfHx8MA%3D%3D", // 1st (cover) image
            "https://plus.unsplash.com/premium_photo-1683121073242-7bde1375c742?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFydHklMjBwbGFubmluZ3xlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://plus.unsplash.com/premium_photo-1691752880922-f89ff74f4c16?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJpcnRoZGF5JTIwcGFydGllc3xlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1531956531700-dc0ee0f1f9a5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFydHklMjBwbGFubmluZ3xlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Meeting Room Setup",
        cost: 4000,
        unit: "per room",
        service_category: "meeting",
        description: "Professional and elegant meeting room setups that leave a lasting impression on your clients and partners.",
        image: "https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9hcmRyb29tfGVufDB8fDB8fHww",
        images: [
            "https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9hcmRyb29tfGVufDB8fDB8fHww", // 1st (cover) image
            "https://plus.unsplash.com/premium_photo-1670315267653-2adecd823d9e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJlc2VudGF0aW9uJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1503423571797-2d2bb372094a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW1wdHklMjBib2FyZHJvb218ZW58MHx8MHx8fDA%3D", // TODO: replace with a 3rd unique Unsplash link
            "https://plus.unsplash.com/premium_photo-1661301075272-c172fecd2a3b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJlc2VudGF0aW9uJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Full Home Makeover",
        cost: 35000,
        unit: "per home",
        service_category: "home",
        description: "Complete home transformation from living room to bedroom with premium furniture arrangement and decor.",
        image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvbWUlMjBpbXByb3ZlbWVudHxlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvbWUlMjBpbXByb3ZlbWVudHxlbnwwfHwwfHx8MA%3D%3D", // 1st (cover) image
            "https://plus.unsplash.com/premium_photo-1681691423422-bcaa3eaad7e8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWUlMjByZW5vdmF0aW9ufGVufDB8fDB8fHww", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1501183638710-841dd1904471?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW50ZXJpb3IlMjByZW5vdmF0aW9ufGVufDB8fDB8fHww", // TODO: replace with a 3rd unique Unsplash link
            "https://plus.unsplash.com/premium_photo-1663099712917-b940ace3dc31?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9tZSUyMG1ha2VvdmVyfGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Reception Decoration",
        cost: 18000,
        unit: "per event",
        service_category: "wedding",
        description: "Elegant reception setups with custom lighting, floral backdrops and table arrangements for your big night.",
        image: "https://images.unsplash.com/photo-1751257567128-a90534b263e6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdlZGRpbmclMjB0aGVtZXxlbnwwfHwwfHx8MA%3D%3D",
        images: [
            "https://images.unsplash.com/photo-1751257567128-a90534b263e6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdlZGRpbmclMjB0aGVtZXxlbnwwfHwwfHx8MA%3D%3D", // 1st (cover) image
            "https://images.unsplash.com/photo-1747115276395-607f2e5dc269?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZXZlbnQlMjBkZWNvcnxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1707333514312-39cf7658479c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRlY29yYXRpb24lMjB3ZWRkaW5nfGVufDB8fDB8fHww", // TODO: replace with a 3rd unique Unsplash link
            "https://plus.unsplash.com/premium_photo-1764691253159-0b7e571b1fa8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVjZXB0aW9uJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    },
    {
        service_name: "Trade Fair Booth Styling",
        cost: 24000,
        unit: "per event",
        service_category: "exhibition",
        description: "Attractive trade fair booth décor to maximize visitor engagement.",
        image: "https://images.unsplash.com/photo-1632383380175-812d44ec112b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXhoaWJpdGlvbiUyMGJvb3RofGVufDB8fDB8fHww",
        images: [
            "https://images.unsplash.com/photo-1632383380175-812d44ec112b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXhoaWJpdGlvbiUyMGJvb3RofGVufDB8fDB8fHww", // 1st (cover) image
            "https://images.unsplash.com/photo-1698581075105-924b6c70b5d6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXhwbyUyMGJvb3RofGVufDB8fDB8fHww", // TODO: replace with a 2nd unique Unsplash link
            "https://images.unsplash.com/photo-1761225646548-bc92fea0dc72?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXhoaWJpdGlvbiUyMHN0YW5kfGVufDB8fDB8fHww", // TODO: replace with a 3rd unique Unsplash link
            "https://images.unsplash.com/photo-1530263131525-1c1d26feaa60?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVzaW5lc3MlMjBleGhpYml0aW9ufGVufDB8fDB8fHww", // TODO: replace with a 4th unique Unsplash link
        ],
        createdByEmail: "admin@styledecor.com",
    }
]
const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(" Connected to MongoDB")
        await Service.deleteMany({})
        console.log("  Cleared existing services")
        await Service.insertMany(seedServices)
        console.log(` Seeded ${seedServices.length} services successfully!`)
        process.exit(0)
    } catch (error) {
        console.error(" Seeding failed:", error)
        process.exit(1)
    }
}
seedDB()